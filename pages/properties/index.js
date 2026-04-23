import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import PropertyCard from '../../components/PropertyCard';
import { getListings } from '../../lib/hetzner';
import { properties as mockProperties } from '../../data';

export default function Properties({ properties }) {
  const [activeTab, setActiveTab] = useState('all');
  const [search,    setSearch]    = useState('');

  const filtered = properties.filter(p => {
    const matchTab    =
      (activeTab === 'all'    ? (p.status === 'rent' || p.status === 'sale') :
       activeTab === 'leased' ? (p.status === 'leased' || p.status === 'sold') :
       p.status === activeTab);
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
          <p style={{ fontSize:'13px', color:'rgba(10,10,10,0.4)', marginBottom:'32px' }}>
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} available
          </p>

          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <p style={{ fontFamily:'Playfair Display,serif', fontSize:'24px', marginBottom:'12px' }}>No properties found</p>
              <p style={{ fontSize:'15px', color:'rgba(10,10,10,0.4)' }}>Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'24px' }}>
              {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          )}
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
  const liveListings = await getListings();
  return {
    props: { properties: liveListings.length > 0 ? liveListings : mockProperties },
    revalidate: 300,
  };
}
