/**
 * _app.js — THE ROOT WRAPPER
 * ─────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS:
 * Every page in Next.js passes through _app.js before rendering.
 * Think of it as the frame around every picture.
 *
 * WHAT WE PUT HERE:
 * - Global CSS (styles that apply to every page)
 * - StructuredData (JSON-LD that Google reads on every page)
 * - Analytics (loads once, tracks every page visit)
 * - Global context providers (if you add auth or a cart later)
 *
 * WHAT WE DON'T PUT HERE:
 * - Page-specific content (that goes in each page file)
 * - Navbar/Footer (those go inside each page so we can control them)
 */

import '../styles/globals.css';
import StructuredData from '../components/StructuredData';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/*
        StructuredData injects 3 <script type="application/ld+json"> tags
        into every page's <head>. Google reads these to understand the
        business, enable rich results, and show star ratings in search.
        Putting it here = loads on every page automatically.
      */}
      <StructuredData />

      {/*
        Component = whichever page is currently being shown
        pageProps = data passed to that page (from getStaticProps etc.)
        This is how Next.js renders the right page for each URL.
      */}
      <Component {...pageProps} />
      <Analytics />
      <Script
        src="https://script.reheroes.ai/chat-bundle.js"
        data-rh-id="2075"
        strategy="afterInteractive"
      />
    </>
  );
}
