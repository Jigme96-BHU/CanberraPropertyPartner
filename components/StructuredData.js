/**
 * STRUCTURED DATA — JSON-LD
 * ─────────────────────────────────────────────────────────────
 * WHY THIS EXISTS:
 * Google is a machine. It can read your visible text, but it
 * can't always tell what TYPE of thing your business is.
 * Structured data is like a hidden label you attach to your
 * page that says: "Hey Google, this is a RealEstateAgent,
 * located here, open these hours, rated this many stars."
 *
 * WHAT IT UNLOCKS:
 * - Star ratings shown directly in Google search results
 * - Business hours shown in search
 * - Phone number shown without clicking
 * - Address shown with a map link
 * - These are called "Rich Results" — they get 30-40% more clicks
 *
 * FORMAT: JSON-LD (JavaScript Object Notation for Linked Data)
 * It goes inside a <script type="application/ld+json"> tag.
 * Google finds it, reads it, and uses it to understand your site.
 * Visitors never see it.
 *
 * SCHEMA TYPES:
 * We use two schemas here:
 * 1. RealEstateAgent — the business itself
 * 2. WebSite — enables the Google sitelinks search box
 */

export default function StructuredData() {

  // ── Schema 1: The Business ────────────────────────────────────
  // This tells Google everything about CPP as a local business.
  // Every field you fill in = more chance of rich results.
  const businessSchema = {
    "@context": "https://schema.org",   // always this URL — it's the standard
    "@type": "RealEstateAgent",          // the specific type of business
    "name": "Canberra Property Partners",
    "alternateName": "CPP",
    "description": "Canberra's most personal real estate service. Award-winning property management, sales and rentals across the ACT.",
    "url": "https://canberrapropertypartners.com.au",
    "logo": "https://www.canberrapropertypartners.com.au/hubfs/raw_assets/public/2022-Site/assets/images/CPP.svg",
    "image": "https://www.canberrapropertypartners.com.au/hubfs/raw_assets/public/2022-Site/assets/images/CPP.svg",
    "telephone": "+61261030843",
    "email": "sales@canberrapropertypartners.com.au",

    // ── Address ────────────────────────────────────────────────
    // WHY: Google uses this for local search ("near me" searches)
    // and to show the address in search results.
    // IMPORTANT: This must match your Google Business Profile exactly.
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2/18 Winchcombe Court",
      "addressLocality": "Mitchell",
      "addressRegion": "ACT",
      "postalCode": "2911",
      "addressCountry": "AU"
    },

    // ── Coordinates ────────────────────────────────────────────
    // WHY: Helps Google Maps and local search pin your exact location.
    // Get these from Google Maps — right-click your address → "What's here?"
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -35.2412,
      "longitude": 149.1300
    },

    // ── Opening Hours ──────────────────────────────────────────
    // WHY: Google shows "Open now" or "Closes at 5:30pm" in results.
    // Format: HH:MM in 24-hour time
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:30",
        "closes": "17:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],

    // ── Price Range ────────────────────────────────────────────
    // WHY: Shows in search results. $ = budget, $$$$ = luxury.
    // This helps filter searchers who are looking for premium service.
    "priceRange": "$$$",

    // ── Area Served ────────────────────────────────────────────
    // WHY: Tells Google which suburbs/areas this business serves.
    // When someone searches "property management Gungahlin",
    // Google knows CPP serves that area.
    "areaServed": [
      { "@type": "City", "name": "Canberra" },
      { "@type": "AdministrativeArea", "name": "Australian Capital Territory" },
      "Gungahlin", "Mitchell", "O'Connor", "Watson", "Nicholls",
      "City", "Braddon", "Turner", "Belconnen", "Woden"
    ],

    // ── Services ──────────────────────────────────────────────
    // WHY: Google uses this to understand what searches to show
    // this business for. Be specific and use real search terms.
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Property Management Canberra" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rental Management ACT" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Property Sales Canberra" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Investment Property Management" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tenant Vetting Canberra" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Property Appraisal Canberra" }}
      ]
    },

    // ── Awards ────────────────────────────────────────────────
    // WHY: Credibility signals that Google factors into trust.
    "award": [
      "REIACT National Awards for Excellence 2022 — Innovation",
      "REIACT Awards for Excellence 2021 — Innovation",
      "Local Agent Finder Best Renter ACT 2021",
      "Local Agent Finder Best Renter ACT 2020"
    ],

    // ── Aggregate Rating ──────────────────────────────────────
    // WHY: This is what shows gold stars in Google search results.
    // Update ratingValue and reviewCount to match real Google reviews.
    // WARNING: Only add this if you actually have reviews — Google
    // will penalise you for fake ratings.
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "47"   // Update this to match real review count
    },

    // ── Social Profiles ───────────────────────────────────────
    // WHY: Connects your website to your social profiles in Google's
    // knowledge graph. Update with real URLs.
    "sameAs": [
      "https://www.facebook.com/canberrapropertypartners",
      "https://www.instagram.com/canberrapropertypartners",
      "https://www.linkedin.com/company/canberra-property-partners"
    ]
  };

  // ── Schema 2: The Website ─────────────────────────────────────
  // WHY: This enables Google to show a search box directly in
  // search results for your site ("sitelinks searchbox").
  // Also helps Google understand the site structure.
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Canberra Property Partners",
    "url": "https://canberrapropertypartners.com.au",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://canberrapropertypartners.com.au/properties?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // ── Schema 3: BreadcrumbList ──────────────────────────────────
  // WHY: Shows breadcrumbs in Google results like:
  // canberrapropertypartners.com.au > Properties > For Rent
  // Helps Google understand your site hierarchy.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",       "item": "https://canberrapropertypartners.com.au" },
      { "@type": "ListItem", "position": 2, "name": "Properties", "item": "https://canberrapropertypartners.com.au/properties" },
      { "@type": "ListItem", "position": 3, "name": "Rental",     "item": "https://canberrapropertypartners.com.au/rental" },
      { "@type": "ListItem", "position": 4, "name": "Sales",      "item": "https://canberrapropertypartners.com.au/sales" },
      { "@type": "ListItem", "position": 5, "name": "About",      "item": "https://canberrapropertypartners.com.au/about" },
      { "@type": "ListItem", "position": 6, "name": "Contact",    "item": "https://canberrapropertypartners.com.au/contact" },
    ]
  };

  return (
    <>
      {/* Each schema goes in its own script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
