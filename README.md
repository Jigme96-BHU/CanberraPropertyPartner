# Canberra Property Partners — v2.0 + SEO

Complete website rebuild with full SEO implementation.

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Production Build

```bash
npm run build
# Automatically generates sitemap.xml + robots.txt
npm start
```

---

## What Was Added for SEO

### 1. SEO Component (components/SEO.js)
Reusable component injecting title, meta description, Open Graph
and Twitter Card tags into every page head.

Each page has unique keyword-targeted tags:
- Homepage  → "Property management Canberra ACT"
- Rental    → "Property management Canberra ACT"
- Sales     → "Sell property Canberra"
- Contact   → "Free property appraisal Canberra"
- Suburbs   → "Property management [SuburbName]"

### 2. Structured Data (components/StructuredData.js)
Three JSON-LD schemas loaded on every page via _app.js:
- RealEstateAgent (business name, address, phone, hours, ratings)
- WebSite (enables Google sitelinks search box)
- BreadcrumbList (shows breadcrumb path in search results)

Verify at: https://search.google.com/test/rich-results

### 3. Suburb Pages (pages/suburbs/[suburb].js)
One SEO page per suburb — targets long-tail keywords like
"property management Gungahlin" or "rental manager Watson ACT".
Built with getStaticPaths + getStaticProps (static HTML at build time).

Routes: /suburbs/gungahlin, /suburbs/oconnor, /suburbs/watson,
        /suburbs/nicholls, /suburbs/mitchell

### 4. Sitemap + robots.txt (next-sitemap.config.js)
Auto-generated after every npm run build.
Submit sitemap to Google Search Console after deploying.

### 5. Canonical URLs
Every page has canonical link tag to prevent duplicate content penalties.

---

## After Deploying — Action Checklist

1. Go to search.google.com/search-console
   → Add domain, verify ownership
   → Submit sitemap URL

2. Go to business.google.com
   → Claim CPP Google Business Profile
   → Fill in ALL fields (hours, photos, services)
   → This is the #1 local SEO action

3. Ask happy clients to leave Google reviews
   → Update aggregateRating in StructuredData.js to match

4. Submit to directory sites:
   → ratemyagent.com.au
   → realestate.com.au (agent profile)
   → domain.com.au (agent profile)
   → yellowpages.com.au

---

## Top Keywords to Target

| Keyword | Priority |
|---------|----------|
| property management canberra | Must win |
| rental management ACT | Must win |
| property management gungahlin | Quick win |
| property manager oconnor | Quick win |
| sell investment property canberra | Mid term |
| free property appraisal canberra | Quick win |
