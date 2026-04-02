# Canberra Property Partners — v2.0

A complete ground-up redesign of the CPP website. Dark luxury editorial aesthetic built with Next.js 14.

## Design Direction

**Aesthetic:** Dark luxury editorial — think high-end architectural magazine meets modern real estate portal.

**Fonts:**
- Display: Playfair Display (serif, elegant, authoritative)
- Body: Outfit (clean, modern, legible)

**Colour Palette:**
- Ink: `#0A0A0A` — near-black backgrounds, text
- Paper: `#F8F5F0` — warm off-white sections
- Gold: `#C9A84C` — brand accent throughout
- Sage: `#7A8C7E` — secondary text

---

## Pages

| Page | Route | Highlights |
|------|--------|------------|
| Homepage | `/` | Real CPP video hero, marquee stats, interactive testimonials |
| Properties | `/properties` | Live filter tabs, real-time search |
| Property Detail | `/properties/[id]` | Full-bleed image hero, sticky enquiry form |
| About | `/about` | Real Brett Russell photo, stats bar |
| Awards | `/awards` | Real award photos + badges, interactive testimonial carousel |
| Rental | `/rental` | Real CPP service icons, infographic, stats |
| Sales | `/sales` | Dramatic hover-animated step rows with real icons |
| Contact | `/contact` | Dramatic full-split dark layout with gold-focus form |
| 404 | `/404` | Giant ghost number, on-brand |

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Run development server
npm run dev

# 3. Open browser
open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

---

## Real CPP Assets Used

All assets are pulled directly from the live CPP HubSpot CDN:

| Asset | Source |
|-------|--------|
| Logo (light/dark) | `/hubfs/raw_assets/public/2022-Site/assets/images/` |
| Hero video (homepage) | `/hubfs/CPP_office_C_v2 wipes.mp4` |
| Awards video | `/hubfs/2022File/Video/test trim_loop.mp4` |
| Brett Russell photo | `/hs-fs/hubfs/2022File/images/image-png.png` |
| Award photos (2021, 2022) | `/hubfs/2022File/` |
| Award badges (REIA, LAF) | `/hubfs/Excellence2021.svg`, `/hubfs/2021.svg` etc. |
| Service icons (×12) | `/hubfs/2022File/Box/` |
| Sales step icons (×4) | `/hubfs/advise.svg`, `/hubfs/communicate.svg` etc. |
| Property management infographic | `/hubfs/raw_assets/.../Infographic1.svg` |

### To self-host all assets (recommended before go-live):

```bash
chmod +x download-assets.sh && ./download-assets.sh
```

---

## Next Steps for Client Handover

1. **IRE API** — Connect Inspect Real Estate API for live listings (`GET /v1/listings?key=&accountNames=`)
2. **Form emails** — Wire contact/enquiry forms to Resend or Formspree
3. **Google Reviews** — Embed live reviews via Google Places API
4. **Analytics** — Add Vercel Analytics or GA4
5. **Deploy** — Push to GitHub → connect to Vercel (one click)

---

Built for Canberra Property Partners · 2025
