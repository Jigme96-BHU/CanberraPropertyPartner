/**
 * scripts/build-master.mjs
 * Run with: node scripts/build-master.mjs
 * Then upload master-listings.json to Hetzner via FileZilla.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { parseStringPromise } from 'xml2js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const XML_FOLDER = path.join(__dirname, '../xml-files');
const OUTPUT     = path.join(__dirname, '../master-listings.json');

function extractValue(val) {
  if (!val) return null;
  if (typeof val === 'object') return val._ || null;
  return String(val);
}

function buildAddress(address) {
  if (!address) return 'Address not available';
  const num    = typeof address.streetNumber === 'object' ? address.streetNumber._ : address.streetNumber;
  const street = typeof address.street === 'object' ? address.street._ : address.street;
  return [num, street].filter(Boolean).join(' ') || 'Address not available';
}

function buildSuburb(address) {
  if (!address) return '';
  return [address.suburb, address.state, address.postcode].filter(Boolean).join(' ');
}

function getImages(objects) {
  if (!objects) return [];
  const imgs = Array.isArray(objects.img) ? objects.img : [objects.img].filter(Boolean);
  return imgs.filter(i => i?.url?.startsWith('http')).map(i => i.url);
}

function formatRent(rentObj) {
  const amount = extractValue(rentObj);
  if (!amount || isNaN(parseInt(amount))) return 'Price on application';
  return '$' + parseInt(amount).toLocaleString() + ' /wk';
}

function formatPrice(val) {
  const v = extractValue(val) || String(val || '');
  const n = parseInt(v);
  if (isNaN(n)) return 'Price on application';
  return '$' + n.toLocaleString();
}

function getType(category) {
  if (!category) return 'House';
  return (typeof category.name === 'object' ? category.name._ : category.name) || 'House';
}

function normalise(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function parseListing(item, status) {
  const address  = item.address;
  const features = item.features || {};
  const imgs     = getImages(item.objects);
  return {
    ireID:      item.uniqueID,
    id:         item.uniqueID,
    status,
    address:    buildAddress(address),
    suburb:     buildSuburb(address),
    price:      status === 'rent' ? formatRent(item.rent) : formatPrice(item.price),
    beds:       parseInt(features.bedrooms)  || 0,
    baths:      parseInt(features.bathrooms) || 0,
    cars:       parseInt(features.garages)   || parseInt(features.carports) || 0,
    type:       getType(item.category),
    featured:   false,
    image:      imgs[0] || '',
    images:     imgs,
    desc:       extractValue(item.description) || extractValue(item.headline) || '',
    headline:   extractValue(item.headline) || '',
    agent:      item.listingAgent?.n || '',
    available:  item.dateAvailable || '',
    bond:       item.bond || '',
    priceView:  extractValue(item.priceView) || '',
    lastUpdated: new Date().toISOString(),
  };
}

async function main() {
  console.log('Reading XML files from:', XML_FOLDER);

  let files;
  try {
    files = readdirSync(XML_FOLDER).filter(f => f.endsWith('.xml')).sort();
  } catch {
    console.error('\nFolder not found! Create a folder called "xml-files" in your project root');
    console.error('and put all your Reapit XML files in it.\n');
    process.exit(1);
  }

  console.log('Found', files.length, 'XML files\n');

  const master = {};

  for (const file of files) {
    console.log('Processing:', file);
    const xml    = readFileSync(path.join(XML_FOLDER, file), 'utf8');
    const parsed = await parseStringPromise(xml, { explicitArray: false, mergeAttrs: true, trim: true });
    const pl     = parsed?.propertyList;
    if (!pl) { console.log('  Skipped — no propertyList'); continue; }

    let count = 0;

    normalise(pl.rental).forEach(item => {
      if (item.status !== 'current') return;
      const l = parseListing(item, 'rent');
      if (l?.ireID) { master[l.ireID] = l; count++; }
    });

    normalise(pl.residential).forEach(item => {
      if (item.status !== 'current') return;
      const l = parseListing(item, 'sale');
      if (l?.ireID) { master[l.ireID] = l; count++; }
    });

    console.log(' ', count, 'current listings added/updated');
  }

  const result = Object.values(master);
  writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
  console.log('\n✅ master-listings.json created with', result.length, 'listings');
  console.log('\nNext steps:');
  console.log('1. Open FileZilla');
  console.log('2. Connect to Hetzner');
  console.log('3. Upload master-listings.json to /');
  console.log('4. Run npm run build');
}

main().catch(console.error);
