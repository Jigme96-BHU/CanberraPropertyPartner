import Client from 'ssh2-sftp-client';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { parseREAXML } from '../../../lib/parseListings';

const FILE_PREFIX = 'inspectre_IRE-CANBERRAPP';
const MASTER_FILE = '/master-listings.json';
const LAST_SYNC   = '/last-sync.txt';
const MAX_LEASED  = 20;
const MAX_SOLD    = 20;

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
  try {
    const res = await fetch(sourceUrl, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Resize to max 800px wide, convert to WebP quality 75
    const webpBuffer = await sharp(inputBuffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    // Generate 10x10 blur placeholder as base64
    const blurBuffer = await sharp(inputBuffer)
      .resize(10, 10, { fit: 'cover' })
      .webp({ quality: 20 })
      .toBuffer();
    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

    // Upload WebP to Vercel Blob
    const { url: blobUrl } = await put(
      `properties/${propertyId}.webp`,
      webpBuffer,
      { access: 'public', contentType: 'image/webp', addRandomSuffix: false }
    );

    console.log(`  Image processed: ${propertyId} → ${blobUrl}`);
    return { blobUrl, blurDataURL };

  } catch (e) {
    console.error(`  Image processing failed for ${propertyId}:`, e.message);
    return null;
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
      await sftp.end();
      return res.status(200).json({ message: 'No new files' });
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
    // Only process listings where:
    //   - blobUrl is missing, OR
    //   - source image URL has changed since last sync
    let imagesProcessed = 0;
    let imagesSkipped   = 0;
    let imagesFailed    = 0;

    const toProcess = Object.values(master).filter(l => {
      if (!l.image) return false;                              // no image to process
      if (!l.blobUrl) return true;                            // never processed before
      if (l.sourceImageUrl !== l.image) return true;          // image changed
      return false;                                            // already up to date
    });

    console.log(`Images to process: ${toProcess.length}`);

    for (const listing of toProcess) {
      const result = await processImage(listing.image, listing.ireID);
      if (result) {
        master[listing.ireID].blobUrl       = result.blobUrl;
        master[listing.ireID].blurDataURL   = result.blurDataURL;
        master[listing.ireID].sourceImageUrl = listing.image;   // track what we processed
        imagesProcessed++;
      } else {
        imagesFailed++;
      }
    }

    imagesSkipped = Object.values(master).filter(l => l.image && l.blobUrl && l.sourceImageUrl === l.image).length - imagesProcessed;

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
      images: { processed: imagesProcessed, skipped: imagesSkipped, failed: imagesFailed },
    });

  } catch (error) {
    console.error('Cron sync error:', error.message);
    return res.status(500).json({ error: error.message });
  } finally {
    await sftp.end().catch(() => {});
  }
}
