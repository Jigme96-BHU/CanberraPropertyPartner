import Client from 'ssh2-sftp-client';
import { parseREAXML } from '../../../lib/parseListings';

const FILE_PREFIX  = 'inspectre_IRE-CANBERRAPP';
const MASTER_FILE  = '/master-listings.json';
const LAST_SYNC    = '/last-sync.txt';
const SIX_MONTHS   = 6 * 30 * 24 * 60 * 60 * 1000;

const SFTP_CONFIG = {
  host:         process.env.HETZNER_HOST,
  port:         22,
  username:     process.env.HETZNER_USERNAME,
  password:     process.env.HETZNER_PASSWORD,
  readyTimeout: 10000,
};

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
    } catch {
      // no master yet — start fresh
    }

    let added   = 0;
    let updated = 0;

    for (const listing of parsed) {
      if (master[listing.ireID]) {
        master[listing.ireID] = { ...listing, lastUpdated: new Date().toISOString() };
        updated++;
      } else {
        master[listing.ireID] = { ...listing, lastUpdated: new Date().toISOString() };
        added++;
      }
    }

    // Remove sold/leased entries older than 6 months; keep rent/sale always
    const cutoff = Date.now() - SIX_MONTHS;
    let removed  = 0;

    for (const ireID of Object.keys(master)) {
      const l = master[ireID];
      if (l.status !== 'sold' && l.status !== 'leased') continue;

      const lastUpdated = l.lastUpdated ? new Date(l.lastUpdated).getTime() : 0;
      const available   = l.available  ? new Date(l.available).getTime()   : 0;
      const age         = Math.max(lastUpdated, available);

      if (age > 0 && age < cutoff) {
        delete master[ireID];
        removed++;
      }
    }

    // ── Step 4: Save back to Hetzner ─────────────────────────
    const masterJson = JSON.stringify(Object.values(master), null, 2);
    await sftp.put(Buffer.from(masterJson), MASTER_FILE);

    await sftp.put(Buffer.from(String(Date.now())), LAST_SYNC);

    console.log(`Sync complete — added:${added} updated:${updated} removed:${removed} total:${Object.keys(master).length}`);

    // ── Step 5: Return result ─────────────────────────────────
    return res.status(200).json({
      added,
      updated,
      removed,
      total: Object.keys(master).length,
    });

  } catch (error) {
    console.error('Cron sync error:', error.message);
    return res.status(500).json({ error: error.message });
  } finally {
    await sftp.end().catch(() => {});
  }
}
