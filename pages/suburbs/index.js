import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

/**
 * SUBURBS INDEX PAGE — /suburbs
 * ─────────────────────────────────────────────────────────────
 * WHY THIS PAGE EXISTS:
 * This is called a "hub page" or "pillar page" in SEO.
 *
 * STRUCTURE:
 * /suburbs (this page — links to all suburbs)
 *   ↳ /suburbs/gungahlin
 *   ↳ /suburbs/oconnor
 *   ↳ /suburbs/watson etc.
 *
 * Google LOVES this structure because:
 * 1. The hub page ranks for "property management Canberra suburbs"
 * 2. Each spoke page ranks for its specific suburb
 * 3. Internal links between pages pass "link juice" (SEO authority)
 *    — the hub links to the spokes, spokes link back to hub
 */

const suburbs = [
  { slug:'gungahlin', name:'Gungahlin',  desc:"Canberra's fastest-growing district. Modern homes, light rail access.", rent:'$580/wk', sale:'$750k' },
  { slug:'oconnor',   name:"O'Connor",   desc:'Sought-after inner suburb. Character homes, ANU proximity.',           rent:'$650/wk', sale:'$1.1m' },
  { slug:'watson',    name:'Watson',      desc:'Charming inner-north suburb. Original cottages and renovations.',      rent:'$560/wk', sale:'$820k' },
  { slug:'nicholls',  name:'Nicholls',    desc:'Popular family suburb. Spacious homes and quality schools.',          rent:'$600/wk', sale:'$850k' },
  { slug:'mitchell',  name:'Mitchell',    desc:"CPP's home suburb. Commercial and residential precinct.",             rent:'$480/wk', sale:'$680k' },
];

export default function SuburbsIndex() {
  return (
    <>
      <SEO
        title="Property Management Canberra Suburbs | CPP"
        description="Expert property management across Canberra suburbs. Gungahlin, O'Connor, Watson, Nicholls, Mitchell and more. Free appraisals. Call 0409 882 375."
        url="/suburbs"
      />
      <Navbar />

      <section style={{ paddingTop:'180px', paddingBottom:'80px', background:'#0A0A0A', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <p className="eyebrow" style={{ marginBottom:'16px' }}>Where We Work</p>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(44px,6vw,72px)', color:'#fff', fontWeight:400, lineHeight:1.05 }}>
            Canberra<br /><em style={{ color:'#C9A84C', fontStyle:'italic' }}>Suburbs We Serve</em>
          </h1>
        </div>
      </section>

      <section style={{ padding:'80px 0 120px', background:'#F8F5F0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'20px' }}>
            {suburbs.map(s => (
              <Link key={s.slug} href={`/suburbs/${s.slug}`} style={{ textDecoration:'none', color:'inherit' }}>
                <div style={{
                  background:'#fff', borderRadius:'12px', padding:'32px 28px',
                  border:'1px solid rgba(10,10,10,0.06)',
                  transition:'transform 0.3s, box-shadow 0.3s',
                  cursor:'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
                >
                  <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'28px', marginBottom:'8px' }}>{s.name}</h2>
                  <p style={{ fontSize:'14px', color:'rgba(10,10,10,0.5)', lineHeight:1.7, marginBottom:'20px' }}>{s.desc}</p>
                  <div style={{ display:'flex', gap:'20px', paddingTop:'16px', borderTop:'1px solid rgba(10,10,10,0.07)' }}>
                    <div>
                      <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.35)', marginBottom:'4px' }}>MEDIAN RENT</p>
                      <p style={{ fontFamily:'Playfair Display,serif', fontSize:'20px' }}>{s.rent}</p>
                    </div>
                    <div>
                      <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.35)', marginBottom:'4px' }}>MEDIAN SALE</p>
                      <p style={{ fontFamily:'Playfair Display,serif', fontSize:'20px' }}>{s.sale}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
