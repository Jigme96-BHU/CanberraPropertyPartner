/**
 * lib/hetzner.js
 *
 * READ-ONLY — just fetches master-listings.json from Hetzner.
 * All merging of new XML files is handled exclusively by the cron job:
 *   /api/cron/sync-listings  (runs every 5 minutes via Vercel)
 *
 * FIRST TIME SETUP:
 *   → Run: node scripts/build-master.mjs
 *   → Upload master-listings.json to Hetzner via FileZilla
 *   → After that, everything is automatic forever
 */

import Client from 'ssh2-sftp-client';

const SFTP_CONFIG = {
  host:         process.env.HETZNER_HOST,
  port:         22,
  username:     process.env.HETZNER_USERNAME,
  password:     process.env.HETZNER_PASSWORD,
  readyTimeout: 8000,
};

const MASTER_FILE = '/master-listings.json';
const CACHE_TTL   = 5 * 60 * 1000; // 5 minutes

let _cache     = null;
let _cacheTime = 0;

export async function getListings() {
  if (_cache && Date.now() - _cacheTime < CACHE_TTL) return _cache;

  const sftp = new Client();

  try {
    await sftp.connect(SFTP_CONFIG);

    let master = [];
    try {
      const buf = await sftp.get(MASTER_FILE);
      master = JSON.parse(buf.toString('utf8'));
      console.log(`Master loaded: ${master.length} listings`);
    } catch (e) {
      console.error('CRITICAL: Failed to read master-listings.json from Hetzner:', e.message);
      console.error('Listings will be empty until the file is restored.');
      return [];
    }

    const active = master.filter(l =>
      l.status === 'rent' || l.status === 'sale' ||
      l.status === 'leased' || l.status === 'sold'
    );
    console.log(`Returning ${active.length} active listings`);
    _cache     = active;
    _cacheTime = Date.now();
    return active;

  } catch (error) {
    console.error('Hetzner SFTP connection error:', error.message);
    return [];
  } finally {
    await sftp.end();
  }
}

export async function fetchREAXML() {
  const FILE_PREFIX = 'inspectre_IRE-CANBERRAPP';
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
