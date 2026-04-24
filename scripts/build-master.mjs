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

const THREE_MONTHS_AGO = new Date();
THREE_MONTHS_AGO.setMonth(THREE_MONTHS_AGO.getMonth() - 3);

const MAX_SOLD = 6;

function parseDate(str) {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
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

  const master  = {};   // current rent + sale (keyed by ireID)
  const leased  = {};   // leased rentals within 3 months
  const soldAll = [];   // all sold residential (will trim to MAX_SOLD)

  for (const file of files) {
    console.log('Processing:', file);
    const xml    = readFileSync(path.join(XML_FOLDER, file), 'utf8');
    const parsed = await parseStringPromise(xml, { explicitArray: false, mergeAttrs: true, trim: true });
    const pl     = parsed?.propertyList;
    if (!pl) { console.log('  Skipped — no propertyList'); continue; }

    // ── Rentals ──────────────────────────────────────────────
    normalise(pl.rental).forEach(item => {
      if (item.status === 'current') {
        const l = parseListing(item, 'rent');
        if (l?.ireID) master[l.ireID] = l;

      } else if (item.status === 'leased') {
        const date = parseDate(item.dateAvailable);
        if (date && date >= THREE_MONTHS_AGO) {
          const l = parseListing(item, 'leased');
          if (l?.ireID) leased[l.ireID] = l;
        }
      }
    });

    // ── Residential ──────────────────────────────────────────
    normalise(pl.residential).forEach(item => {
      if (item.status === 'current') {
        const l = parseListing(item, 'sale');
        if (l?.ireID) master[l.ireID] = l;

      } else if (item.status === 'sold') {
        const soldDate = parseDate(item.soldDetails?.date);
        const l = parseListing(item, 'sold');
        if (l?.ireID) {
          soldAll.push({ ...l, soldDate: soldDate || new Date(0) });
        }
      }
    });
  }

  // ── Keep only the MAX_SOLD most recent sold listings ──────
  const soldDeduped = Object.values(
    soldAll.reduce((acc, l) => {
      if (!acc[l.ireID] || l.soldDate > acc[l.ireID].soldDate) acc[l.ireID] = l;
      return acc;
    }, {})
  );
  soldDeduped.sort((a, b) => b.soldDate - a.soldDate);
  const topSold = soldDeduped.slice(0, MAX_SOLD).map(({ soldDate, ...l }) => l);

  const result = [
    ...Object.values(master),
    ...Object.values(leased),
    ...topSold,
  ];

  writeFileSync(OUTPUT, JSON.stringify(result, null, 2));

  console.log('\n✅ master-listings.json created:');
  console.log('   Current (rent/sale):', Object.keys(master).length);
  console.log('   Leased (last 3 months):', Object.keys(leased).length);
  console.log('   Sold (most recent ' + MAX_SOLD + '):', topSold.length);
  console.log('   Total:', result.length);
  console.log('\nNext steps:');
  console.log('1. Open FileZilla');
  console.log('2. Connect to Hetzner');
  console.log('3. Upload master-listings.json to /');
  console.log('4. Run npm run build');
}

main().catch(console.error);
