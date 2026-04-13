import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import PropertyCard from '../../components/PropertyCard';
import { fetchREAXML } from '../../lib/hetzner';
import { parseREAXML } from '../../lib/parseListings';
import { properties as mockProperties } from '../../data';

const IRE_RENTALS = 'https://app.inspectrealestate.com.au/External/ROL/QuickWeb.aspx?AgentAccountName=CanberraPP';
const IRE_SALES   = 'https://app.inspectrealestate.com.au/External/ROL/QuickWeb.aspx?AgentAccountName=CanberraPP&Type=s';

export default function Properties({ properties, isLiveData }) {
  const [activeTab, setActiveTab] = useState('all');
  const [search,    setSearch]    = useState('');

  const filtered = properties.filter(p => {
    const matchTab    = activeTab === 'all' || p.status === activeTab;
    const matchSearch = !search ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.suburb.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const tabs = [
    { id: 'all',    label: 'All Properties' },
    { id: 'rent',   label: 'For Rent' },
    { id: 'sale',   label: 'For Sale' },
    { id: 'leased', label: 'Sold & Leased' },
  ];

  return (
    <>
      <SEO
        title="Properties For Rent and For Sale Canberra ACT"
        description="Browse available rental properties and homes for sale across Canberra and the ACT. Gungahlin, O'Connor, Watson, Nicholls and more suburbs."
        url="/properties"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop:'160px', paddingBottom:'80px', background:'#0A0A0A', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <p className="eyebrow" style={{ marginBottom:'16px' }}>Available Now</p>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(40px,5vw,68px)', color:'#fff', fontWeight:400, lineHeight:1.05, marginBottom:'20px' }}>Properties</h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.45)', maxWidth:'480px', lineHeight:1.8 }}>Rental properties and homes for sale across Canberra and the ACT.</p>
        </div>
      </section>

      {/* ── IRE BANNER ── */}
      <section style={{ background:'#C9A84C', padding:'0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }} className="ire-banner">
            <a href={IRE_RENTALS} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'28px 36px', borderRight:'1px solid rgba(10,10,10,0.12)', textDecoration:'none', transition:'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(10,10,10,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              <div>
                <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(10,10,10,0.5)', marginBottom:'4px' }}>BROWSE ALL</p>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', color:'#0A0A0A' }}>Rental Properties →</p>
              </div>
              <span style={{ fontSize:'32px' }}>🏠</span>
            </a>
            <a href={IRE_SALES} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'28px 36px', textDecoration:'none', transition:'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(10,10,10,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              <div>
                <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(10,10,10,0.5)', marginBottom:'4px' }}>BROWSE ALL</p>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', color:'#0A0A0A' }}>Properties For Sale →</p>
              </div>
              <span style={{ fontSize:'32px' }}>🔑</span>
            </a>
          </div>
        </div>
        <style>{`@media(max-width:600px){.ire-banner{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── FILTER + SEARCH ── */}
      <section style={{ background:'#fff', borderBottom:'1px solid rgba(10,10,10,0.08)', position:'sticky', top:0, zIndex:100 }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'16px', padding:'16px 48px' }}>
          <div style={{ display:'flex', gap:'4px' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding:'8px 18px',
                background: activeTab === t.id ? '#0A0A0A' : 'transparent',
                color: activeTab === t.id ? '#fff' : 'rgba(10,10,10,0.5)',
                border: activeTab === t.id ? 'none' : '1px solid rgba(10,10,10,0.12)',
                borderRadius:'100px', fontSize:'13px', fontWeight:500,
                fontFamily:'Outfit,sans-serif', cursor:'pointer', transition:'all 0.2s',
              }}>{t.label}</button>
            ))}
          </div>
          <input type="text" placeholder="Search by address or suburb..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding:'10px 16px', width:'280px', border:'1px solid rgba(10,10,10,0.15)', borderRadius:'100px', fontFamily:'Outfit,sans-serif', fontSize:'13px', outline:'none', transition:'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor='#C9A84C'}
            onBlur={e => e.target.style.borderColor='rgba(10,10,10,0.15)'} />
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section style={{ padding:'60px 0 100px', background:'#F8F5F0' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px', flexWrap:'wrap', gap:'12px' }}>
            <p style={{ fontSize:'13px', color:'rgba(10,10,10,0.4)' }}>{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} shown</p>
            <p style={{ fontSize:'12px', color: isLiveData ? '#1D9E75' : 'rgba(10,10,10,0.35)', fontStyle:'italic' }}>
              {isLiveData ? '✓ Live listings from Reapit' : 'Sample listings — use buttons above to browse all live CPP properties'}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <p style={{ fontFamily:'Playfair Display,serif', fontSize:'24px', marginBottom:'12px' }}>No properties found</p>
              <p style={{ fontSize:'15px', color:'rgba(10,10,10,0.4)', marginBottom:'32px' }}>Try adjusting your search or browse all live listings</p>
              <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                <a href={IRE_RENTALS} target="_blank" rel="noopener noreferrer" className="btn-primary">View All Rentals →</a>
                <a href={IRE_SALES}   target="_blank" rel="noopener noreferrer" className="btn-outline">View All Sales →</a>
              </div>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'24px' }}>
              {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          )}

          <div style={{ marginTop:'64px', padding:'48px', background:'#0A0A0A', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'24px' }}>
            <div>
              <p style={{ fontFamily:'Playfair Display,serif', fontSize:'24px', color:'#fff', marginBottom:'8px' }}>Looking for something specific?</p>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', lineHeight:1.7 }}>Browse all of CPP's live listings directly on Reapit.</p>
            </div>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <a href={IRE_RENTALS} target="_blank" rel="noopener noreferrer" className="btn-primary">All Rentals →</a>
              <a href={IRE_SALES}   target="_blank" rel="noopener noreferrer" className="btn-ghost-white">All Sales →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/**
 * getStaticProps — runs on the server at build time + every 5 mins
 *
 * WHY THIS IS THE KEY PIECE:
 * This is what connects everything together.
 * It fetches the XML from Hetzner, parses it into clean objects,
 * and passes real listings to the page as props.
 *
 * revalidate: 300 = ISR (Incremental Static Regeneration)
 * Next.js rebuilds this page every 5 minutes in the background.
 * So new Reapit listings appear automatically within 5 minutes.
 * No manual deploys needed ever.
 *
 * Falls back to mock data if Hetzner has no file yet.
 */
export async function getStaticProps() {
  try {
    const xml = await fetchREAXML();
    const liveListings = xml ? await parseREAXML(xml) : [];

    if (liveListings.length > 0) {
      return {
        props: { properties: liveListings, isLiveData: true },
        revalidate: 300,
      };
    }

    return {
      props: { properties: mockProperties, isLiveData: false },
      revalidate: 300,
    };

  } catch (error) {
    console.error('getStaticProps error:', error.message);
    return {
      props: { properties: mockProperties, isLiveData: false },
      revalidate: 300,
    };
  }
}
