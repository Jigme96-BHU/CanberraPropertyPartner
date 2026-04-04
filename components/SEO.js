/**
 * SEO COMPONENT
 * ─────────────────────────────────────────────────────────────
 * WHY THIS EXISTS:
 * Every page needs <title>, <meta description> and Open Graph tags.
 * Rather than copy-pasting the same 20 lines into every page file,
 * we build this once and pass different props per page.
 *
 * HOW IT WORKS:
 * - We import Next.js's built-in <Head> component
 * - Anything inside <Head> gets injected into the <head> of the HTML
 * - Google reads the <head> before it reads the visible page content
 * - So this is one of the most important files for SEO
 *
 * USAGE:
 * <SEO
 *   title="Property Management Canberra"
 *   description="Award-winning property management..."
 *   image="/og-home.jpg"
 *   url="https://canberrapropertypartners.com.au"
 * />
 */

import Head from 'next/head';

// These are the DEFAULT values — used when a page doesn't pass its own
const SITE_NAME    = 'Canberra Property Partners';
const SITE_URL     = 'https://canberrapropertypartners.com.au';
const DEFAULT_DESC = 'Canberra\'s award-winning real estate agency. Expert property management, sales and rentals across the ACT. REIA Innovation Award winners 2021 & 2022.';
const DEFAULT_IMG  = '/og-image.jpg'; // We'll create this in public/
const PHONE        = '+61261030843';

export default function SEO({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMG,
  url = SITE_URL,
  type = 'website',         // 'website' for pages, 'article' for blog posts
  noindex = false,          // set to true for pages you DON'T want Google to index
}) {

  // ── Build the full title ──────────────────────────────────────
  // WHY: Google shows ~60 chars in search results
  // FORMAT: "Page Name | Site Name" is the industry standard
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Property Management & Real Estate Canberra`;

  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const fullUrl   = url.startsWith('http')   ? url   : `${SITE_URL}${url}`;

  return (
    <Head>
      {/* ── BASIC META ────────────────────────────────────────────
          These are what Google shows in search results.
          Title: the blue clickable link
          Description: the grey text underneath it
          Keywords: less important now but still used by some search engines
      */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords"    content="property management Canberra, real estate Canberra, rental management ACT, property sales Canberra, investment property ACT, Gungahlin property, O'Connor real estate, Canberra property partners" />
      <meta name="author"      content={SITE_NAME} />
      <meta name="robots"      content={noindex ? 'noindex,nofollow' : 'index,follow'} />

      {/* ── CANONICAL URL ─────────────────────────────────────────
          WHY: If your page can be accessed via multiple URLs
          (e.g. with/without trailing slash, http vs https),
          Google might think they're duplicate pages and penalise you.
          The canonical tag says "THIS is the real URL, ignore the others."
          Always set this to the clean, correct URL of the page.
      */}
      <link rel="canonical" href={fullUrl} />

      {/* ── OPEN GRAPH TAGS ───────────────────────────────────────
          WHY: When someone shares your link on Facebook, LinkedIn,
          WhatsApp or iMessage, these tags control what the preview
          looks like — the image, title and description shown.
          Without these, social shares look blank and unprofessional.
          "og:" stands for Open Graph — a standard created by Facebook.
      */}
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={fullImage} />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_AU" />

      {/* ── TWITTER CARD TAGS ─────────────────────────────────────
          WHY: Same idea as Open Graph but specifically for Twitter/X.
          "summary_large_image" shows a big image preview.
          Even if CPP isn't on Twitter, these tags also affect
          how links look in Slack, Discord and other apps.
      */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={fullImage} />

      {/* ── FAVICON ───────────────────────────────────────────────
          WHY: The little icon in the browser tab.
          We reference multiple sizes because different devices
          need different sizes — Apple phones need apple-touch-icon,
          modern browsers prefer SVG, older ones need .ico
      */}
      <link rel="icon"             href="/favicon.ico" />
      <link rel="icon"             href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* ── THEME COLOR ───────────────────────────────────────────
          WHY: On Android Chrome, this colours the browser toolbar
          to match your brand. Small detail, looks very polished.
      */}
      <meta name="theme-color" content="#0A0A0A" />

      {/* ── VIEWPORT ──────────────────────────────────────────────
          WHY: This is what makes the site work on mobile.
          Without it, mobile browsers zoom out to show the
          full desktop version. "width=device-width" means
          "use the actual screen width". Google penalises
          sites that aren't mobile-friendly.
      */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
