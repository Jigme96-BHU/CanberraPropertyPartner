import Client from 'ssh2-sftp-client';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { parseREAXML } from '../../../lib/parseListings';

const FILE_PREFIX      = 'inspectre_IRE-CANBERRAPP';
const MASTER_FILE      = '/master-listings.json';
const LAST_SYNC        = '/last-sync.txt';
const MAX_LEASED       = 20;
const MAX_SOLD         = 20;
const MAX_IMAGES_PER_RUN = 5; // process 5 individual images per cron tick to avoid timeout

const SFTP_CONFIG = {
  host:         process.env.HETZNER_HOST,
  port:         22,
  username:     process.env.HETZNER_USERNAME,
  password:     process.env.HETZNER_PASSWORD,
  readyTimeout: 10000,
};

// ── Image Processing ──────────────────────────────────────────
// Downloads image from Azure, resizes to 800px WebP, generates
// a 10x10 base64 blur placeholder, uploads WebP to Vercel Blob.
// Returns { blobUrl, blurDataURL } or null on failure.
async function processImage(sourceUrl, propertyId) {
  const steps = [];
  try {
    // Step 1: Download
    steps.push('fetch');
    const res = await fetch(sourceUrl, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);
    steps.push(`downloaded ${inputBuffer.length} bytes`);

    // Step 2: Resize to max 800px wide, convert to WebP quality 75
    steps.push('sharp-resize');
    const webpBuffer = await sharp(inputBuffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    steps.push(`webp ${webpBuffer.length} bytes`);

    // Step 3: Generate 10x10 blur placeholder as base64
    steps.push('sharp-blur');
    const blurBuffer = await sharp(inputBuffer)
      .resize(10, 10, { fit: 'cover' })
      .webp({ quality: 20 })
      .toBuffer();
    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

    // Step 4: Upload WebP to Vercel Blob
    steps.push('blob-upload');
    const { url: blobUrl } = await put(
      `properties/${propertyId}.webp`,
      webpBuffer,
      { access: 'public', contentType: 'image/webp', addRandomSuffix: false, allowOverwrite: true }
    );
    steps.push(`uploaded ${blobUrl}`);

    console.log(`  Image processed: ${propertyId} → ${blobUrl}`);
    return { blobUrl, blurDataURL, steps };

  } catch (e) {
    const msg = `failed at [${steps[steps.length - 1]}]: ${e.message}`;
    console.error(`  Image processing failed for ${propertyId}:`, msg);
    return { error: msg };
  }
}

// ── Main Handler ──────────────────────────────────────────────
export default async function handler(req, res) {
  const auth = req.headers['authorization'] || '';
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sftp = new Client();

  try {
    await sftp.connect(SFTP_CONFIG);

    // ── Step 1: Find new XML files ────────────────────────────
    let lastSyncTime = 0;
    try {
      const buf = await sftp.get(LAST_SYNC);
      lastSyncTime = parseInt(buf.toString('utf8').trim(), 10) || 0;
    } catch {
      // no last-sync.txt yet — process everything
    }

    const files = await sftp.list('/');
    const newXml = files.filter(
      f => f.name.startsWith(FILE_PREFIX) &&
           f.name.endsWith('.xml') &&
           f.modifyTime > lastSyncTime
    ).sort((a, b) => a.modifyTime - b.modifyTime);

    if (newXml.length === 0) {
      // No new XML — but still process any pending images
      let master = {};
      try {
        const buf = await sftp.get(MASTER_FILE);
        JSON.parse(buf.toString('utf8')).forEach(l => { master[l.ireID] = l; });
      } catch (e) {
        await sftp.end();
        return res.status(200).json({ message: 'No new files, no master to process' });
      }

      // Build flat queue across all listings and all their images
      const queue = [];
      for (const l of Object.values(master)) {
        const allSrcs = l.images?.length > 0 ? l.images : (l.image ? [l.image] : []);
        allSrcs.forEach((url, idx) => {
          const alreadyDone = idx === 0
            ? (l.blobUrl && l.sourceImageUrl === url)
            : (l.blobImages?.[idx] && l.sourceImages?.[idx] === url);
          if (!alreadyDone) queue.push({ ireID: l.ireID, index: idx, url });
        });
      }

      const toProcess = queue.slice(0, MAX_IMAGES_PER_RUN);

      if (toProcess.length === 0) {
        await sftp.end();
        return res.status(200).json({ message: 'No new files, all images already processed' });
      }

      let processed = 0, failed = 0;
      const errors = [];
      for (const { ireID, index, url } of toProcess) {
        const blobKey = index === 0 ? `properties/${ireID}.webp` : `properties/${ireID}-${index}.webp`;
        const result  = await processImage(url, blobKey.replace('properties/','').replace('.webp',''));
        if (result && result.blobUrl) {
          const l = master[ireID];
          if (index === 0) {
            l.blobUrl        = result.blobUrl;
            l.blurDataURL    = result.blurDataURL;
            l.sourceImageUrl = url;
          } else {
            l.blobImages          = l.blobImages || [];
            l.sourceImages        = l.sourceImages || [];
            l.blobImages[index]   = result.blobUrl;
            l.sourceImages[index] = url;
          }
          processed++;
        } else {
          failed++;
          errors.push({ id: ireID, index, error: result?.error || 'unknown' });
        }
      }

      const masterJson = JSON.stringify(Object.values(master), null, 2);
      await sftp.put(Buffer.from(masterJson), MASTER_FILE);
      await sftp.end();
      return res.status(200).json({ message: 'No new files', images: { processed, failed, errors } });
    }

    // ── Step 2: Parse new XML files ───────────────────────────
    const parsed = [];
    for (const file of newXml) {
      try {
        const xml      = (await sftp.get(`/${file.name}`)).toString('utf8');
        const listings = await parseREAXML(xml);
        listings.forEach(l => { if (l?.ireID) parsed.push(l); });
        console.log(`Parsed ${file.name}: ${listings.length} listings`);
      } catch (e) {
        console.error(`Error parsing ${file.name}:`, e.message);
      }
    }

    // ── Step 3: Merge into master-listings.json ───────────────
    let master = {};
    try {
      const buf = await sftp.get(MASTER_FILE);
      JSON.parse(buf.toString('utf8')).forEach(l => { master[l.ireID] = l; });
      console.log(`Master loaded: ${Object.keys(master).length} existing listings`);
    } catch (e) {
      console.error('CRITICAL: Failed to read master-listings.json:', e.message);
      return res.status(500).json({ error: 'Could not read master-listings.json — sync aborted to prevent data loss' });
    }

    let added     = 0;
    let updated   = 0;
    let withdrawn = 0;

    for (const listing of parsed) {
      if (listing.status === 'withdrawn') {
        if (master[listing.ireID]) {
          delete master[listing.ireID];
          withdrawn++;
        }
      } else if (master[listing.ireID]) {
        // Preserve existing blobUrl/blurDataURL if image hasn't changed
        const existing = master[listing.ireID];
        master[listing.ireID] = {
          ...listing,
          blobUrl:      existing.blobUrl,
          blurDataURL:  existing.blurDataURL,
          sourceImageUrl: existing.sourceImageUrl,
          lastUpdated:  new Date().toISOString(),
        };
        updated++;
      } else {
        master[listing.ireID] = { ...listing, lastUpdated: new Date().toISOString() };
        added++;
      }
    }

    // ── Step 3.5: Process images → Vercel Blob ────────────────
    // Build a flat queue of ALL individual images needing processing
    // across all listings. Each entry = { ireID, index, url }
    // index 0 = main image (blobUrl), index 1+ = gallery (blobImages)
    let imagesProcessed = 0;
    let imagesSkipped   = 0;
    let imagesFailed    = 0;
    const imageErrors   = [];

    const queue = [];
    for (const l of Object.values(master)) {
      const allSrcs = l.images?.length > 0 ? l.images : (l.image ? [l.image] : []);
      allSrcs.forEach((url, idx) => {
        const alreadyDone = idx === 0
          ? (l.blobUrl && l.sourceImageUrl === url)
          : (l.blobImages?.[idx] && l.sourceImages?.[idx] === url);
        if (!alreadyDone) queue.push({ ireID: l.ireID, index: idx, url });
      });
    }

    const toProcess = queue.slice(0, MAX_IMAGES_PER_RUN);
    imagesSkipped   = queue.length - toProcess.length;
    console.log(`Image queue: ${queue.length} pending, processing ${toProcess.length} this run`);

    for (const { ireID, index, url } of toProcess) {
      const blobKey = index === 0 ? `properties/${ireID}.webp` : `properties/${ireID}-${index}.webp`;
      const result  = await processImage(url, blobKey.replace('properties/','').replace('.webp',''));

      if (result && result.blobUrl) {
        const l = master[ireID];
        if (index === 0) {
          l.blobUrl        = result.blobUrl;
          l.blurDataURL    = result.blurDataURL;
          l.sourceImageUrl = url;
        } else {
          l.blobImages           = l.blobImages || [];
          l.sourceImages         = l.sourceImages || [];
          l.blobImages[index]    = result.blobUrl;
          l.sourceImages[index]  = url;
        }
        imagesProcessed++;
      } else {
        imagesFailed++;
        imageErrors.push({ id: ireID, index, error: result?.error || 'unknown' });
      }
    }

    // ── Step 4: Trim old leased/sold ──────────────────────────
    let removed = 0;

    const sortByDate = l => Math.max(
      l.lastUpdated ? new Date(l.lastUpdated).getTime() : 0,
      l.soldDate    ? new Date(l.soldDate).getTime()    : 0,
      l.available   ? new Date(l.available).getTime()   : 0,
    );

    for (const status of ['leased', 'sold']) {
      const max    = status === 'leased' ? MAX_LEASED : MAX_SOLD;
      const bucket = Object.values(master)
        .filter(l => l.status === status)
        .sort((a, b) => sortByDate(b) - sortByDate(a));

      bucket.slice(max).forEach(l => {
        delete master[l.ireID];
        removed++;
      });
    }

    // ── Step 5: Save back to Hetzner ─────────────────────────
    const masterJson = JSON.stringify(Object.values(master), null, 2);
    await sftp.put(Buffer.from(masterJson), MASTER_FILE);
    await sftp.put(Buffer.from(String(Date.now())), LAST_SYNC);

    console.log(`Sync complete — added:${added} updated:${updated} withdrawn:${withdrawn} aged-out:${removed} images-processed:${imagesProcessed} images-skipped:${imagesSkipped} images-failed:${imagesFailed} total:${Object.keys(master).length}`);

    // ── Step 6: Return result ─────────────────────────────────
    return res.status(200).json({
      added,
      updated,
      withdrawn,
      agedOut: removed,
      total: Object.keys(master).length,
      images: { processed: imagesProcessed, skipped: imagesSkipped, failed: imagesFailed, errors: imageErrors },
    });

  } catch (error) {
    console.error('Cron sync error:', error.message);
    return res.status(500).json({ error: error.message });
  } finally {
    await sftp.end().catch(() => {});
  }
}
