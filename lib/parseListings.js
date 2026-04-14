/**
 * lib/parseListings.js
 * Converts REAXML from Reapit into clean property objects.
 * Field names confirmed from real CPP XML file.
 */

import { parseStringPromise } from 'xml2js';

export async function parseREAXML(xmlString) {
  if (!xmlString) return [];

  try {
    const parsed = await parseStringPromise(xmlString, {
      explicitArray: false,
      mergeAttrs:    true,
      trim:          true,
    });

    const propertyList = parsed?.propertyList;
    if (!propertyList) {
      console.log('No propertyList found in XML');
      return [];
    }

    console.log('XML root elements found:', Object.keys(propertyList));

    const listings = [];

    // <rental> — confirmed Reapit format for rental listings
    if (propertyList.rental) {
      const items = normaliseToArray(propertyList.rental);
      items.forEach(item => {
        const listing = parseRental(item);
        if (listing) listings.push(listing);
      });
    }

    // <residential> — fallback for other providers
    if (propertyList.residential) {
      const items = normaliseToArray(propertyList.residential);
      items.forEach(item => {
        const listing = parseResidential(item);
        if (listing) listings.push(listing);
      });
    }

    // <land>
    if (propertyList.land) {
      const items = normaliseToArray(propertyList.land);
      items.forEach(item => {
        const listing = parseLand(item);
        if (listing) listings.push(listing);
      });
    }

    // <rural>
    if (propertyList.rural) {
      const items = normaliseToArray(propertyList.rural);
      items.forEach(item => {
        const listing = parseRural(item);
        if (listing) listings.push(listing);
      });
    }

    // <commercial>
    if (propertyList.commercial) {
      const items = normaliseToArray(propertyList.commercial);
      items.forEach(item => {
        const listing = parseCommercial(item);
        if (listing) listings.push(listing);
      });
    }

    console.log(`Parsed ${listings.length} listings from REAXML`);
    return listings;

  } catch (error) {
    console.error('REAXML parse error:', error.message);
    return [];
  }
}

// ── Helpers ──────────────────────────────────────────────────

function normaliseToArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

// xml2js with mergeAttrs:true returns attribute-bearing nodes as objects
// e.g. <rent period="weekly">900</rent> → { _: "900", period: "weekly" }
// This helper safely extracts the text content regardless of shape.
function extractValue(val) {
  if (!val) return null;
  if (typeof val === 'object') return val._ || null;
  return String(val);
}

function buildAddress(address) {
  if (!address) return 'Address not available';
  const streetNumber = typeof address.streetNumber === 'object'
    ? address.streetNumber._
    : address.streetNumber;
  const street = typeof address.street === 'object'
    ? address.street._
    : address.street;
  const parts = [streetNumber, street].filter(Boolean);
  return parts.join(' ') || 'Address not available';
}

function buildSuburb(address) {
  if (!address) return '';
  return [address.suburb, address.state, address.postcode].filter(Boolean).join(' ');
}

// Confirmed from XML: images are in <objects><img url="...">
// The main image has id="m", others are id="a","b","c" etc.
// Some img tags have no url (empty placeholders) — we skip those
function getFirstImage(objects) {
  const fallback = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80';
  if (!objects) return fallback;

  const imgArray = normaliseToArray(objects.img);

  // First try to find the main image (id="m")
  const mainImg = imgArray.find(i => i.id === 'm' && i.url);
  if (mainImg) return mainImg.url;

  // Otherwise grab first image with a valid URL
  const firstImg = imgArray.find(i => i.url && i.url.startsWith('http'));
  return firstImg ? firstImg.url : fallback;
}

// Get all images with valid URLs for the detail page gallery
export function getAllImages(objects) {
  if (!objects) return [];
  const imgArray = normaliseToArray(objects.img);
  return imgArray
    .filter(i => i.url && i.url.startsWith('http'))
    .map(i => i.url);
}

// Confirmed from XML: <rent period="weekly">900</rent>
// xml2js with mergeAttrs gives us { period: "weekly", _: "900" }
function formatRentPrice(rentObj) {
  if (!rentObj) return 'Price on application';
  const amount = extractValue(rentObj);
  if (!amount || isNaN(parseInt(amount))) return 'Price on application';
  return `$${parseInt(amount).toLocaleString()} /wk`;
}

function formatSalePrice(priceValue) {
  if (!priceValue) return 'Price on application';
  const val = extractValue(priceValue) || String(priceValue);
  const num = parseInt(val);
  if (isNaN(num)) return val;
  return `$${num.toLocaleString()}`;
}

function getPropertyType(category) {
  if (!category) return 'House';
  const name = typeof category.name === 'object' ? category.name._ : category.name;
  return name || 'House';
}

// ── Parsers ──────────────────────────────────────────────────

// Confirmed field names from real CPP XML:
// uniqueID, rent, address, description, features, objects, category
function parseRental(item) {
  try {
    const address  = item.address;
    const features = item.features || {};

    return {
      ireID:    item.uniqueID,
      id:       item.uniqueID,
      status:   'rent',
      address:  buildAddress(address),
      suburb:   buildSuburb(address),
      price:    formatRentPrice(item.rent),
      beds:     parseInt(features.bedrooms)  || 0,
      baths:    parseInt(features.bathrooms) || 0,
      cars:     parseInt(features.garages)   || parseInt(features.carports) || 0,
      type:     getPropertyType(item.category),
      featured: false,
      image:    getFirstImage(item.objects),   // confirmed: <objects><img>
      images:   getAllImages(item.objects),     // all photos for detail page
      desc:     extractValue(item.description) || extractValue(item.headline) || '',
      headline: extractValue(item.headline) || '',
      agent:    item.listingAgent?.n || '',     // confirmed: <listingAgent><n>
      available: item.dateAvailable || '',
      bond:     item.bond || '',
      priceView: item.priceView || '',
    };
  } catch (e) {
    console.error('Error parsing rental listing:', e.message);
    return null;
  }
}

function parseResidential(item) {
  try {
    const status   = item.status === 'rent' ? 'rent' : 'sale';
    const address  = item.address;
    const features = item.features || {};
    return {
      ireID:    item.uniqueID,
      id:       item.uniqueID,
      status,
      address:  buildAddress(address),
      suburb:   buildSuburb(address),
      price:    status === 'rent' ? formatRentPrice(item.rent) : formatSalePrice(item.price),
      beds:     parseInt(features.bedrooms)  || 0,
      baths:    parseInt(features.bathrooms) || 0,
      cars:     parseInt(features.garages)   || 0,
      type:     getPropertyType(item.category),
      featured: false,
      image:    getFirstImage(item.objects),
      images:   getAllImages(item.objects),
      desc:     extractValue(item.description) || extractValue(item.headline) || '',
      headline: extractValue(item.headline) || '',
    };
  } catch (e) {
    console.error('Error parsing residential listing:', e.message);
    return null;
  }
}

function parseLand(item) {
  try {
    const address = item.address;
    return {
      ireID:    item.uniqueID,
      id:       item.uniqueID,
      status:   'sale',
      address:  buildAddress(address),
      suburb:   buildSuburb(address),
      price:    formatSalePrice(item.price),
      beds: 0, baths: 0, cars: 0,
      type:     'Land',
      featured: false,
      image:    getFirstImage(item.objects),
      images:   getAllImages(item.objects),
      desc:     extractValue(item.description) || extractValue(item.headline) || '',
      headline: extractValue(item.headline) || '',
    };
  } catch (e) {
    console.error('Error parsing land listing:', e.message);
    return null;
  }
}

function parseRural(item) {
  try {
    const address  = item.address;
    const features = item.features || {};
    return {
      ireID:    item.uniqueID,
      id:       item.uniqueID,
      status:   'sale',
      address:  buildAddress(address),
      suburb:   buildSuburb(address),
      price:    formatSalePrice(item.price),
      beds:     parseInt(features.bedrooms)  || 0,
      baths:    parseInt(features.bathrooms) || 0,
      cars:     parseInt(features.garages)   || 0,
      type:     'Rural',
      featured: false,
      image:    getFirstImage(item.objects),
      images:   getAllImages(item.objects),
      desc:     extractValue(item.description) || extractValue(item.headline) || '',
      headline: extractValue(item.headline) || '',
    };
  } catch (e) {
    console.error('Error parsing rural listing:', e.message);
    return null;
  }
}

function parseCommercial(item) {
  try {
    const status  = item.status === 'rent' ? 'rent' : 'sale';
    const address = item.address;
    return {
      ireID:    item.uniqueID,
      id:       item.uniqueID,
      status,
      address:  buildAddress(address),
      suburb:   buildSuburb(address),
      price:    status === 'rent' ? formatRentPrice(item.rent) : formatSalePrice(item.price),
      beds: 0, baths: 0,
      cars:     parseInt(item.features?.garages) || 0,
      type:     'Commercial',
      featured: false,
      image:    getFirstImage(item.objects),
      images:   getAllImages(item.objects),
      desc:     extractValue(item.description) || extractValue(item.headline) || '',
      headline: extractValue(item.headline) || '',
    };
  } catch (e) {
    console.error('Error parsing commercial listing:', e.message);
    return null;
  }
}
