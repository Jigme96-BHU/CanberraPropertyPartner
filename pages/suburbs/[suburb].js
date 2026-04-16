/**
 * SUBURB PAGES — /suburbs/gungahlin, /suburbs/oconnor etc.
 * ─────────────────────────────────────────────────────────────
 * WHY THESE PAGES EXIST (most important SEO concept here):
 *
 * People don't just search "property management Canberra".
 * They search SPECIFIC things like:
 *   "property management Gungahlin"
 *   "rental property manager O'Connor ACT"
 *   "sell house Watson Canberra"
 *
 * These are called "long-tail keywords" — more specific, lower
 * competition, easier to rank for, and the person searching is
 * more likely to actually become a client.
 *
 * By creating one page per suburb with content mentioning that
 * suburb's name, streets, schools and landmarks — Google starts
 * showing CPP when someone searches anything about property in
 * that suburb.
 *
 * HOW IT WORKS (getStaticPaths + getStaticProps):
 * ─────────────────────────────────────────────
 * getStaticPaths: tells Next.js which suburb pages to build.
 *   → generates /suburbs/gungahlin, /suburbs/oconnor etc.
 *
 * getStaticProps: fetches/provides data for each suburb page.
 *   → receives the suburb slug, returns suburb data as props.
 *
 * Both run at BUILD TIME on the server — the pages are pre-built
 * as static HTML. This is the fastest possible page load and
 * best for SEO because Google gets full HTML instantly.
 */

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../data';

// ── Suburb data ───────────────────────────────────────────────
// Each suburb gets its own SEO-optimised content.
// WHY: Google rewards pages that have specific, relevant content
// about a location. Generic pages rank poorly for local searches.
const SUBURBS = {
  gungahlin: {
    name: 'Gungahlin',
    state: 'ACT 2912',
    description: "Gungahlin is Canberra's fastest-growing district, offering modern apartments, townhouses and family homes close to Gungahlin Town Centre, light rail, schools and parks.",
    highlights: ['Light rail access', 'Gungahlin Town Centre', 'John Paul College', 'Amaroo School', 'Gold Creek area'],
    medianRent: '$580',
    medianSale: '$750,000',
    about: "As specialists in Gungahlin property management, CPP understands the unique rental market in this suburb — from managing modern townhouses near the town centre to large family homes in Amaroo and Ngunnawal.",
  },
  oconnor: {
    name: "O'Connor",
    state: 'ACT 2602',
    description: "O'Connor is one of Canberra's most sought-after inner suburbs, known for its character homes, tree-lined streets and proximity to the ANU and Canberra CBD.",
    highlights: ['Walking distance to ANU', 'Character homes', 'Haig Park', 'Dickson shops', 'Strong rental demand'],
    medianRent: '$650',
    medianSale: '$1,100,000',
    about: "O'Connor's strong rental demand — driven by ANU staff and students — makes it a high-performing investment suburb. CPP manages a significant portfolio of character properties throughout O'Connor.",
  },
  watson: {
    name: 'Watson',
    state: 'ACT 2602',
    description: "Watson is a charming inner-north suburb offering a mix of original 1960s cottages and modern renovations, with easy access to Dickson, the CBD and Canberra Hospital.",
    highlights: ['Original character homes', 'Close to Dickson', 'Canberra Hospital nearby', 'Community feel', 'Capital hill views'],
    medianRent: '$560',
    medianSale: '$820,000',
    about: "Watson's mix of established families and young professionals creates a stable, low-vacancy rental market. CPP has managed Watson investment properties since our founding in 2017.",
  },
  nicholls: {
    name: 'Nicholls',
    state: 'ACT 2913',
    description: "Nicholls is a popular family suburb in north Gungahlin offering spacious homes, quality schools and a quiet suburban lifestyle close to all Gungahlin amenities.",
    highlights: ['Burgmann Anglican School', 'Nicholls shops', 'Family-friendly streets', 'Large blocks', 'Good highway access'],
    medianRent: '$600',
    medianSale: '$850,000',
    about: "Nicholls is consistently one of Canberra's top-performing family rental suburbs. CPP's local expertise ensures Nicholls landlords achieve maximum occupancy and rental returns.",
  },
  mitchell: {
    name: 'Mitchell',
    state: 'ACT 2911',
    description: "Mitchell is Canberra's industrial and commercial hub, home to Canberra Property Partners' office and a growing precinct of modern commercial and residential properties.",
    highlights: ['CPP head office', 'Majura Park shopping', 'Industrial precinct', 'Highway access', 'Close to airport'],
    medianRent: '$480',
    medianSale: '$680,000',
    about: "As the suburb where CPP is based, Mitchell is at the heart of everything we do. We know every street, every block and every development in this precinct.",
  },
};

export default function SuburbPage({ suburb }) {
  // Filter properties in this suburb
  const suburbProperties = properties.filter(p =>
    p.suburb.toLowerCase().includes(suburb.name.toLowerCase())
  );

  return (
    <>
      {/*
        WHY SUBURB-SPECIFIC SEO TITLE:
        "Property Management Gungahlin" is a specific search term.
        By putting it in the <title> tag, Google knows this page
        is THE answer to that search query. Generic titles don't rank
        for specific suburb searches.
      */}
      <SEO
        title={`Property Management ${suburb.name} ACT | Rental & Sales | CPP`}
        description={`Expert property management and real estate sales in ${suburb.name}, ${suburb.state}. Tenant vetting, maintenance, free appraisals. ${suburb.medianRent}/wk median rent. Call CPP today.`}
        url={`/suburbs/${suburb.name.toLowerCase().replace(/[^a-z]/g, '')}`}
      />

      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop:'180px', paddingBottom:'100px', background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=60)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.1 }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          {/*
            BREADCRUMB — WHY:
            Shows Google the hierarchy: Home > Suburbs > Gungahlin
            Also shown in search results as a navigation path.
            Helps Google understand site structure AND helps users
            know where they are.
          */}
          <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'20px', fontSize:'13px' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.4)', transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.4)'}
            >Home</Link>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
            <Link href="/properties" style={{ color:'rgba(255,255,255,0.4)', transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.4)'}
            >Properties</Link>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color:'#C9A84C' }}>{suburb.name}</span>
          </div>

          <p className="eyebrow" style={{ marginBottom:'16px' }}>Property Management</p>
          {/*
            H1 CONTAINS THE KEYWORD:
            "Property Management [Suburb]" is exactly what people search.
            Having it in the H1 — the most important heading on the page —
            is one of the strongest on-page SEO signals.
          */}
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(44px,6vw,80px)', color:'#fff', fontWeight:400, lineHeight:1.05, marginBottom:'20px' }}>
            Property Management<br />
            <em style={{ color:'#C9A84C', fontStyle:'italic' }}>{suburb.name}</em>
          </h1>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.55)', maxWidth:'560px', lineHeight:1.8 }}>
            {suburb.description}
          </p>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section style={{ background:'#C9A84C', padding:'0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))' }}>
            {[
              { v: suburb.medianRent + '/wk', l: 'Median rent' },
              { v: suburb.medianSale,          l: 'Median sale price' },
              { v: '98%',                      l: 'CPP occupancy rate' },
              { v: '14 days',                  l: 'Avg. days to lease' },
            ].map((s, i) => (
              <div key={i} style={{ padding:'36px 28px', textAlign:'center', borderRight: i < 3 ? '1px solid rgba(10,10,10,0.12)' : 'none' }}>
                <div style={{ fontFamily:'Playfair Display,serif', fontSize:'36px', color:'#0A0A0A', lineHeight:1, marginBottom:'6px' }}>{s.v}</div>
                <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.5)' }}>{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THIS SUBURB ── */}
      <section style={{ padding:'100px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }} className="suburb-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom:'16px' }}>Our Local Expertise</p>
              {/*
                H2 ALSO CONTAINS KEYWORD:
                "Property Management in [Suburb]" in H2 reinforces
                the page's topic for Google. Use the suburb name
                naturally throughout the content — not spammy,
                just relevant.
              */}
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(32px,3.5vw,48px)', lineHeight:1.1, marginBottom:'24px' }}>
                Property Management<br />in {suburb.name}
              </h2>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'20px' }}>
                {suburb.about}
              </p>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'40px' }}>
                Whether you own a single investment property or a portfolio in {suburb.name}, CPP's award-winning management approach delivers consistent results — maximum occupancy, qualified tenants and hassle-free ownership.
              </p>
              <Link href="/contact" className="btn-primary">Get a Free {suburb.name} Appraisal →</Link>
            </div>

            <div>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'24px', marginBottom:'24px' }}>
                Why investors choose {suburb.name}
              </h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {suburb.highlights.map((h, i) => (
                  <div key={i} style={{ display:'flex', gap:'16px', alignItems:'center', padding:'16px 20px', background:'#F8F5F0', borderRadius:'8px' }}>
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#C9A84C', flexShrink:0 }} />
                    <p style={{ fontSize:'15px', color:'#0A0A0A' }}>{h}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop:'32px', padding:'28px', background:'#0A0A0A', borderRadius:'8px' }}>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'18px', color:'#fff', marginBottom:'8px' }}>
                  Managing properties in {suburb.name} since 2017
                </p>
                <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', lineHeight:1.7, marginBottom:'20px' }}>
                  Deep local knowledge of {suburb.name}'s rental market, tenant pool and property values.
                </p>
                <a href="tel:0409882375" style={{ fontSize:'13px', fontWeight:600, color:'#C9A84C', letterSpacing:'0.06em' }}>
                  Call 0409 882 375 →
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.suburb-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── PROPERTIES IN THIS SUBURB ── */}
      {suburbProperties.length > 0 && (
        <section style={{ padding:'80px 0 100px', background:'#F8F5F0' }}>
          <div className="container">
            <p className="eyebrow" style={{ marginBottom:'12px' }}>Available Now</p>
            <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(32px,3.5vw,48px)', marginBottom:'48px' }}>
              Properties in {suburb.name}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'24px' }}>
              {suburbProperties.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding:'100px 0', background:'#0A0A0A', textAlign:'center' }}>
        <div className="container" style={{ maxWidth:'600px', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(32px,4vw,52px)', color:'#fff', marginBottom:'20px' }}>
            Own property in {suburb.name}?
          </h2>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', lineHeight:1.8, marginBottom:'48px' }}>
            Get a free, no-obligation rental appraisal from Canberra's most personal property management team.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn-primary">Free {suburb.name} Appraisal →</Link>
            <a href="tel:0409882375" className="btn-ghost-white">0409 882 375</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/**
 * getStaticPaths — RUNS AT BUILD TIME
 * ─────────────────────────────────────────────────────────────
 * WHY: Next.js needs to know in advance which suburb pages to build.
 * This function returns the list of slugs (URL segments).
 *
 * RESULT: Builds these pages at build time:
 *   /suburbs/gungahlin
 *   /suburbs/oconnor
 *   /suburbs/watson
 *   /suburbs/nicholls
 *   /suburbs/mitchell
 *
 * fallback: false = if someone visits /suburbs/zzz (not in our list)
 *           show a 404 page. If 'blocking', Next.js would try to
 *           generate it on the fly. False is fine for a known list.
 */
export async function getStaticPaths() {
  const paths = Object.keys(SUBURBS).map(slug => ({
    params: { suburb: slug }
  }));

  return { paths, fallback: false };
}

/**
 * getStaticProps — RUNS AT BUILD TIME FOR EACH SUBURB
 * ─────────────────────────────────────────────────────────────
 * WHY: Fetches/provides the data for each specific suburb page.
 * Receives the slug from the URL (e.g. "gungahlin") and
 * returns the matching suburb data as props.
 *
 * LATER: You could fetch real suburb data here from an API
 * like the ABS (Australian Bureau of Statistics) for real
 * median prices, or Domain API for recent sales data.
 */
export async function getStaticProps({ params }) {
  const suburb = SUBURBS[params.suburb];

  if (!suburb) {
    return { notFound: true }; // triggers 404 page
  }

  return {
    props: { suburb },
    revalidate: 604800, // re-generate page once per week (in seconds)
  };
}
