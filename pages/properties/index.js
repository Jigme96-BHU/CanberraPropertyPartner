import { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PropertyCard from '../../components/PropertyCard';
import { properties } from '../../data';

export default function Properties() {
  const router = useRouter();
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (router.query.status) setStatus(router.query.status);
  }, [router.query.status]);

  const filtered = properties.filter(p => {
    const okStatus = status === 'all' || p.status === status;
    const okSearch = !search || p.address.toLowerCase().includes(search.toLowerCase()) || p.suburb.toLowerCase().includes(search.toLowerCase());
    return okStatus && okSearch;
  });

  const tabs = [
    { key:'all',    label:'All Properties' },
    { key:'rent',   label:'For Rent' },
    { key:'sale',   label:'For Sale' },
    { key:'leased', label:'Sold & Leased' },
  ];

  return (
    <>
      <SEO
        title="Properties For Rent and For Sale Canberra ACT | CPP"
        description="Browse available rental properties and homes for sale across Canberra and the ACT. Gungahlin, O Connor, Watson, Nicholls and more suburbs."
        url="/properties"
      />
      <Navbar />

      {/* Page header */}
      <section style={{ paddingTop:'160px', paddingBottom:'80px', background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=60)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.12 }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <p className="eyebrow" style={{ marginBottom:'16px' }}>Browse</p>
          <h1 style={{ fontSize:'clamp(44px,6vw,80px)', color:'#fff', fontFamily:'Playfair Display, serif', fontWeight:400 }}>Our Properties</h1>
        </div>
      </section>

      {/* Sticky filters */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(10,10,10,0.08)' }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px', padding:'0 48px' }}>
          <div style={{ display:'flex' }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setStatus(t.key)} style={{
                padding:'18px 24px', background:'none', border:'none',
                fontSize:'13px', fontWeight:500, letterSpacing:'0.04em',
                color: status === t.key ? '#0A0A0A' : 'rgba(10,10,10,0.4)',
                borderBottom: status === t.key ? '2px solid #C9A84C' : '2px solid transparent',
                transition:'all 0.2s', whiteSpace:'nowrap', cursor:'pointer',
              }}>{t.label}</button>
            ))}
          </div>
          <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
            <span style={{ position:'absolute', left:'14px', fontSize:'14px', color:'rgba(10,10,10,0.3)' }}>⌕</span>
            <input type="text" placeholder="Search suburb or street..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft:'36px', paddingRight:'16px', paddingTop:'10px', paddingBottom:'10px', border:'1px solid rgba(10,10,10,0.12)', borderRadius:'100px', fontFamily:'Outfit, sans-serif', fontSize:'13px', outline:'none', width:'240px', background:'#F8F5F0' }}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <section style={{ padding:'80px 0 120px', background:'#F8F5F0', minHeight:'60vh' }}>
        <div className="container">
          <p style={{ fontSize:'13px', color:'rgba(10,10,10,0.4)', marginBottom:'40px', letterSpacing:'0.04em' }}>
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
          </p>
          {filtered.length > 0 ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'28px' }}>
              {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'100px 0' }}>
              <p style={{ fontSize:'48px', fontFamily:'Playfair Display, serif', color:'rgba(10,10,10,0.15)', marginBottom:'16px' }}>No results</p>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.4)' }}>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
