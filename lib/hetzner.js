/**
 * lib/hetzner.js
 *
 * ARCHITECTURE:
 * The site reads from master-listings.json on Hetzner.
 * This file is pre-built offline and uploaded once.
 * Incremental XML updates merge into it automatically.
 *
 * BUILD TIME: reads master-listings.json (fast, just JSON)
 * RUNTIME: same, revalidates every 5 minutes
 * NEW LISTINGS: incremental XML → merge into master → site updates
 */

import Client from 'ssh2-sftp-client';

const SFTP_CONFIG = {
  host:         process.env.HETZNER_HOST,
  port:         22,
  username:     process.env.HETZNER_USERNAME,
  password:     process.env.HETZNER_PASSWORD,
  readyTimeout: 8000,
};

const FILE_PREFIX = 'inspectre_IRE-CANBERRAPP';
const MASTER_FILE = '/master-listings.json';

// Build-time cache — Hetzner contacted once per build
let _cache = null;

// Reads master-listings.json from Hetzner — one connect, one file read.
// XML merging happens offline via: node scripts/build-master.mjs
export async function getListings() {
  if (_cache) return _cache;

  const sftp = new Client();
  try {
    await sftp.connect(SFTP_CONFIG);
    const buf    = await sftp.get(MASTER_FILE);
    const all    = JSON.parse(buf.toString('utf8'));
    const active = all.filter(l => l.status === 'rent' || l.status === 'sale');
    console.log(`Loaded ${active.length} active listings from master-listings.json`);
    _cache = active;
    return active;
  } catch (error) {
    console.error('Hetzner getListings error:', error.message);
    return [];
  } finally {
    await sftp.end();
  }
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
