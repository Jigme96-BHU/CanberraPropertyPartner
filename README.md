# Canberra Property Partners — Website

Marketing and listings website for Canberra Property Partners.

**Live site:** [canberrapropertypartners.com.au](https://canberrapropertypartners.com.au)

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 |
| React | 18 |
| Deployment | Vercel |
| Email (contact form) | Resend |
| Listing data | Reapit → Hetzner SFTP → REAXML |
| Analytics | Vercel Analytics |
| Sitemap | next-sitemap (auto on build) |
| Images | sharp |
| Chat widget | ReHeroes (rental page only) |

## Prerequisites

- Node.js 18+
- npm

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in real values (see Environment Variables)
npm run dev
# Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
pages/
  index.js               # Homepage
  rental.js              # Property management / rentals (ReHeroes chat widget)
  sales.js               # Property sales
  contact.js             # Contact + appraisal request
  about.js               # About the team
  awards.js              # Awards and recognition
  properties/
    index.js             # Listings grid with All / For Rent / For Sale / Sold & Leased tabs
  suburbs/               # Suburb-specific landing pages
  api/
    contact.js           # Contact form email handler (Resend)
    cron/
      sync-listings.js   # Vercel Cron — syncs new Reapit XML files into master-listings.json

components/
  Navbar.js         # Site-wide navigation
  Footer.js         # Site-wide footer
  PropertyCard.js   # Listing card used on properties pages
  SEO.js            # Per-page meta tags (title, description, OG)
  StructuredData.js # JSON-LD schemas for search engines

lib/
  hetzner.js        # SFTP client — fetches listings from Hetzner Storage Box
  parseListings.js  # Parses Reapit REAXML into clean listing objects

public/
  images/
    office.jpeg     # CPP office photo (used as hero background on About page)
    prop.jpeg       # Property photo (used as full-bleed background on homepage)
    brett.jpeg      # Brett Russell headshot
```

## How It Works

**Framework:** Next.js with static generation where possible. Suburb pages (`/suburbs/[suburb].js`) are pre-rendered at build time via `getStaticPaths` + `getStaticProps`, so they load as static HTML.

**Listings:** Fetched from Hetzner Storage Box via SFTP at build time and every 5 minutes via ISR (Incremental Static Regeneration). `lib/hetzner.js` loads `master-listings.json` from Hetzner, merges any new Reapit REAXML files, and returns all listings. Listings with status `rent`, `sale`, `leased`, and `sold` are all stored — the properties page filters by tab.

**Properties page tabs:**
- All Properties → shows `rent` and `sale` only
- For Rent → `rent` only
- For Sale → `sale` only
- Sold & Leased → `leased` and `sold`

**Cron sync (`/api/cron/sync-listings`):** Runs daily at midnight UTC via Vercel Cron. Downloads any new XML files from Hetzner whose `modifyTime` is newer than the timestamp in `last-sync.txt`, parses them, merges into `master-listings.json`, and removes sold/leased listings older than 6 months. Requires `Authorization: Bearer <CRON_SECRET>` header.

**Navigation:** `Navbar.js` and `Footer.js` are imported per-page (not global), giving each page full layout control.

**Analytics:** Vercel Analytics is wired in via `_app.js` to track page views in the Vercel dashboard.

**Sitemap:** Auto-generated on every `npm run build` via `next-sitemap.config.js`. Output files are `sitemap.xml` and `robots.txt` in the public directory.

**Chat widget:** ReHeroes chat widget loads on the rental page only (`pages/rental.js`). Uses the extended embed method (dynamic script insertion on `window load`) with `rh-data-id="2075"`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. For production, add the same variables in Vercel → Project → Settings → Environment Variables.

| Variable | Description |
|---|---|
| `HETZNER_HOST` | Hetzner Storage Box hostname (Reapit drops REAXML files here via SFTP) |
| `HETZNER_USERNAME` | Hetzner SFTP username |
| `HETZNER_PASSWORD` | Hetzner SFTP password |
| `RESEND_API_KEY` | Resend API key — used by the contact form to send emails |
| `CRON_SECRET` | Secret token for the `/api/cron/sync-listings` endpoint (set same value in Vercel dashboard) |

## Cron Job

The listing sync cron is configured in `vercel.json` and runs once daily at midnight UTC. To test it locally:

```bash
curl -X GET http://localhost:3000/api/cron/sync-listings \
  -H "Authorization: Bearer <your-CRON_SECRET>"
```

Returns `{ added, updated, removed, total }` on success or `{ message: 'No new files' }` if nothing is new.

## Deployment

The site is deployed on Vercel. Pushing to `master` triggers an automatic production deployment. Environment variables must be set in the Vercel dashboard before deploying.
