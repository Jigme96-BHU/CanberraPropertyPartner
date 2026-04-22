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
  index.js          # Homepage
  rental.js         # Property management / rentals
  sales.js          # Property sales
  contact.js        # Contact + appraisal request
  about.js          # About the team
  awards.js         # Awards and recognition
  properties/       # Individual property listings
  suburbs/          # Suburb-specific landing pages

components/
  Navbar.js         # Site-wide navigation
  Footer.js         # Site-wide footer
  PropertyCard.js   # Listing card used on properties pages
  SEO.js            # Per-page meta tags (title, description, OG)
  StructuredData.js # JSON-LD schemas for search engines
```

## How It Works

**Framework:** Next.js with static generation where possible. Suburb pages (`/suburbs/[suburb].js`) are pre-rendered at build time via `getStaticPaths` + `getStaticProps`, so they load as static HTML.

**Listings:** Property listings live under `/pages/properties/`. Each listing is a standalone page. The `PropertyCard` component renders the preview card used in listing grids.

**Navigation:** `Navbar.js` and `Footer.js` are loaded globally through `_app.js`, so they appear on every page without being imported per-file.

**Analytics:** Vercel Analytics is wired in via `_app.js` to track page views in the Vercel dashboard.

**Sitemap:** Auto-generated on every `npm run build` via `next-sitemap.config.js`. Output files are `sitemap.xml` and `robots.txt` in the public directory.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. For production, add the same variables in Vercel → Project → Settings → Environment Variables.

| Variable | Description |
|---|---|
| `HETZNER_HOST` | Hetzner Storage Box hostname (Reapit drops REAXML files here via SFTP) |
| `HETZNER_USERNAME` | Hetzner SFTP username |
| `HETZNER_PASSWORD` | Hetzner SFTP password |
| `RESEND_API_KEY` | Resend API key — used by the contact form to send emails |

## Deployment

The site is deployed on Vercel. Pushing to `master` triggers an automatic production deployment. Environment variables must be set in the Vercel dashboard before deploying.

---

CanberraPropertyPartners@26
