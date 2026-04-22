/**
 * lib/hetzner.js
 *
 * HOW IT WORKS:
 *
 * BUILD TIME (npm run build / Vercel deploy):
 *   → Reads master-listings.json from Hetzner (fast, one file)
 *   → Falls back to mock data if master doesn't exist yet
 *   → No XML processing during builds (avoids timeouts)
 *
 * RUNTIME / ISR (every 5 minutes automatically):
 *   → Checks Hetzner for any new XML files from Reapit
 *   → Merges new listings into master-listings.json automatically
 *   → New listings appear on the site within 5 minutes — zero manual work
 *
 * FIRST TIME SETUP:
 *   → Run: node scripts/build-master.mjs
 *   → Upload master-listings.json to Hetzner via FileZilla
 *   → After that, everything is automatic forever
 */

import Client from 'ssh2-sftp-client';
import { parseREAXML } from './parseListings';

const SFTP_CONFIG = {
  host:         process.env.HETZNER_HOST,
  port:         22,
  username:     process.env.HETZNER_USERNAME,
  password:     process.env.HETZNER_PASSWORD,
  readyTimeout: 8000,
};

const FILE_PREFIX    = 'inspectre_IRE-CANBERRAPP';
const MASTER_FILE    = '/master-listings.json';
const PROCESSED_FILE = '/processed-files.json';

// Module-level cache — prevents multiple SFTP calls within the same
// serverless function invocation or build worker
let _cache = null;

async function _fetchListings() {
  const sftp       = new Client();
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

  try {
    await sftp.connect(SFTP_CONFIG);

    // ── Step 1: Load existing master listings ─────────────────
    let master = {};
    try {
      const buf = await sftp.get(MASTER_FILE);
      JSON.parse(buf.toString('utf8')).forEach(l => { master[l.ireID] = l; });
      console.log(`Master loaded: ${Object.keys(master).length} listings`);
    } catch {
      console.log('No master-listings.json yet — run: node scripts/build-master.mjs');
    }

    // ── Step 2: Merge new XML files (runtime/ISR only) ────────
    // Skipped during builds to avoid timeouts from parallel workers.
    // During ISR (every 5 min), new Reapit XML files are auto-merged.
    if (!isBuildTime) {
      let processed = [];
      try {
        const buf = await sftp.get(PROCESSED_FILE);
        processed = JSON.parse(buf.toString('utf8'));
      } catch { /* first run */ }

      const files  = await sftp.list('/');
      const newXml = files
        .filter(f => f.name.startsWith(FILE_PREFIX) && f.name.endsWith('.xml') && !processed.includes(f.name))
        .sort((a, b) => a.modifyTime - b.modifyTime);

      if (newXml.length > 0) {
        console.log(`Processing ${newXml.length} new XML file(s)...`);

        for (const file of newXml) {
          try {
            const xml      = (await sftp.get(`/${file.name}`)).toString('utf8');
            const listings = await parseREAXML(xml, { currentOnly: false });

            listings.forEach(l => {
              if (l?.ireID) {
                master[l.ireID] = { ...l, lastUpdated: new Date().toISOString() };
                console.log(`  Merged: ${l.ireID} — ${l.address}`);
              }
            });

            processed.push(file.name);
          } catch (e) {
            console.error(`  Error processing ${file.name}:`, e.message);
          }
        }

        // Save updated master and processed list back to Hetzner
        await sftp.put(
          Buffer.from(JSON.stringify(Object.values(master), null, 2)),
          MASTER_FILE
        );
        await sftp.put(
          Buffer.from(JSON.stringify(processed, null, 2)),
          PROCESSED_FILE
        );
        console.log(`Master saved — ${Object.keys(master).length} total listings`);
      }
    }

    // ── Step 3: Return all listings (active + sold/leased for credibility section) ──
    const all = Object.values(master);
    console.log(`Returning ${all.length} listings`);
    _cache = all;
    return all;

  } catch (error) {
    console.error('Hetzner error:', error.message);
    return [];
  } finally {
    await sftp.end();
  }
}

export async function getListings() {
  if (_cache) return _cache;
  const timeout = new Promise(resolve => setTimeout(() => resolve([]), 10000));
  const result  = await Promise.race([_fetchListings(), timeout]);
  if (result.length > 0) _cache = result;
  return result;
}

export async function fetchREAXML() {
  const sftp = new Client();
  try {
    await sftp.connect(SFTP_CONFIG);
    const files = await sftp.list('/');
    const xmlFiles = files
      .filter(f => f.name.startsWith(FILE_PREFIX) && f.name.endsWith('.xml'))
      .sort((a, b) => b.modifyTime - a.modifyTime);
    if (xmlFiles.length === 0) return null;
    const buffer = await sftp.get(`/${xmlFiles[0].name}`);
    return buffer.toString('utf8');
  } catch (error) {
    console.error('Hetzner SFTP error:', error.message);
    return null;
  } finally {
    await sftp.end();
  }
}
