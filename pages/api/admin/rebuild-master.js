import Client from 'ssh2-sftp-client';
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
  readyTimeout: 15000,
};

export default async function handler(req, res) {
  const auth = req.headers['authorization'] || '';
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sftp = new Client();

  try {
    await sftp.connect(SFTP_CONFIG);

    // ── Step 1: List all XML files on Hetzner ─────────────────
    const files = await sftp.list('/');
    const xmlFiles = files
      .filter(f => f.name.startsWith(FILE_PREFIX) && f.name.endsWith('.xml'))
      .sort((a, b) => a.modifyTime - b.modifyTime);

    if (xmlFiles.length === 0) {
      await sftp.end();
      return res.status(200).json({ message: 'No XML files found on Hetzner' });
    }

    console.log(`Rebuild: found ${xmlFiles.length} XML files`);

    // ── Step 2: Parse every XML file ─────────────────────────
    const master = {};
    let filesProcessed = 0;
    let parseErrors    = 0;

    for (const file of xmlFiles) {
      try {
        const xml      = (await sftp.get(`/${file.name}`)).toString('utf8');
        const listings = await parseREAXML(xml);

        for (const l of listings) {
          if (!l?.ireID) continue;

          if (l.status === 'withdrawn') {
            delete master[l.ireID];
          } else {
            master[l.ireID] = { ...l, lastUpdated: new Date().toISOString() };
          }
        }

        filesProcessed++;
        console.log(`Processed ${file.name}: ${listings.length} listings`);
      } catch (e) {
        console.error(`Error processing ${file.name}:`, e.message);
        parseErrors++;
      }
    }

    // ── Step 3: Trim leased and sold to top 20 each ──────────
    const sortByDate = l => Math.max(
      l.lastUpdated ? new Date(l.lastUpdated).getTime() : 0,
      l.soldDate    ? new Date(l.soldDate).getTime()    : 0,
      l.available   ? new Date(l.available).getTime()   : 0,
    );

    let trimmed = 0;
    for (const status of ['leased', 'sold']) {
      const max    = status === 'leased' ? MAX_LEASED : MAX_SOLD;
      const bucket = Object.values(master)
        .filter(l => l.status === status)
        .sort((a, b) => sortByDate(b) - sortByDate(a));

      bucket.slice(max).forEach(l => {
        delete master[l.ireID];
        trimmed++;
      });
    }

    // ── Step 4: Validate before saving ───────────────────────
    const masterArray = Object.values(master);
    const masterJson  = JSON.stringify(masterArray, null, 2);

    // Sanity check — make sure JSON is valid before writing
    JSON.parse(masterJson);

    // ── Step 5: Save back to Hetzner ─────────────────────────
    await sftp.put(Buffer.from(masterJson), MASTER_FILE);
    await sftp.put(Buffer.from(String(Date.now())), LAST_SYNC);

    const counts = masterArray.reduce((acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1;
      return acc;
    }, {});

    console.log(`Rebuild complete — total: ${masterArray.length}`, counts);

    return res.status(200).json({
      success:        true,
      filesProcessed,
      parseErrors,
      trimmed,
      total:          masterArray.length,
      breakdown:      counts,
    });

  } catch (error) {
    console.error('Rebuild error:', error.message);
    return res.status(500).json({ error: error.message });
  } finally {
    await sftp.end().catch(() => {});
  }
}
