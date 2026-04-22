/**
 * NEXT-SITEMAP CONFIG
 * ─────────────────────────────────────────────────────────────
 * WHY A SITEMAP EXISTS:
 * Imagine Google is a person who's never visited your website.
 * A sitemap is like handing them a complete map of every room
 * (page) in your house (website). Without it, they might wander
 * around and miss rooms entirely — especially new pages.
 *
 * HOW IT WORKS:
 * After running "npm run build", next-sitemap automatically:
 * 1. Finds every page in your /pages folder
 * 2. Generates /public/sitemap.xml listing all URLs
 * 3. Generates /public/robots.txt telling bots what to crawl
 *
 * AFTER SETUP:
 * Go to Google Search Console → Sitemaps → submit:
 * https://canberra-property-partner.vercel.app/sitemap.xml
 * Google will then crawl and index every page within days.
 */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // The live domain — CHANGE THIS when client connects their real domain
  siteUrl: process.env.SITE_URL || 'https://canberra-property-partner.vercel.app',

  // Auto-generate robots.txt (see below for what that is)
  generateRobotsTxt: true,

  // How often Google should re-check each page for changes
  // 'daily' for pages that change often (properties listing)
  // 'weekly' for pages that rarely change (about, contact)
  // 'monthly' for very static pages
  changefreq: 'weekly',

  // Priority 0.0 to 1.0 — tells Google which pages matter most
  // 1.0 = homepage (most important)
  // 0.8 = main section pages
  // 0.5 = individual property pages
  priority: 0.7,

  // Pages to exclude from the sitemap
  // WHY: 404 page doesn't need to be indexed
  exclude: ['/404'],

  // Custom priority per page — overrides the default above
  // WHY: Homepage and properties are most important for CPP's
  // business, so we tell Google to prioritise them.
  additionalPaths: async (config) => [
    {
      loc: '/',           // homepage
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/properties',
      changefreq: 'daily', // listings change frequently
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/rental',
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: '/sales',
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: '/contact',
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: '/about',
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: '/awards',
      changefreq: 'monthly',
      priority: 0.6,
    },
  ],

  // robots.txt configuration
  // WHY ROBOTS.TXT EXISTS:
  // Before crawling your site, Google's bot (Googlebot) reads
  // robots.txt first. It's like a sign on your front door saying
  // "you're welcome to come in everywhere EXCEPT the back room."
  // For CPP we want Google to crawl everything — so we allow all.
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',   // applies to all bots (Google, Bing, etc.)
        allow: '/',       // allow crawling everything
      },
    ],
    // Additional sitemap references in robots.txt
    additionalSitemaps: [
      'https://canberra-property-partner.vercel.app/sitemap.xml',
    ],
  },
};
