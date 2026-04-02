import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { properties } from '../../data';

const iStyle = {
  width:'100%', padding:'12px 16px',
  border:'1px solid rgba(10,10,10,0.12)', borderRadius:'6px',
  fontFamily:'Outfit,sans-serif', fontSize:'14px',
  outline:'none', background:'#F8F5F0', color:'#0A0A0A',
};

export default function PropertyDetail() {
  const { id } = useRouter().query;
  const p = properties.find(x => x.id === parseInt(id));
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);

  if (!p) return (
    <>
      <Navbar />
      <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F8F5F0' }}>
        <div style={{ textAlign:'center' }}>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'48px', marginBottom:'16px' }}>Property not found</h1>
          <Link href="/properties" style={{ color:'#C9A84C', fontSize:'16px' }}>← Back to properties</Link>
        </div>
      </div>
      <Footer />
    </>
  );

  const STATUS_LABEL = { rent:'For Rent', sale:'For Sale', leased:'Leased' };
  const STATUS_COLOR = { rent:'#C9A84C', sale:'#0A0A0A', leased:'#7A8C7E' };

  return (
    <>
      <Head>
        <title>{p.address}, {p.suburb} — CPP</title>
      </Head>
      <Navbar />

      {/* Full-bleed image hero */}
      <div style={{ position:'relative', height:'70vh', minHeight:'480px', background:'#0A0A0A' }}>
        <img src={p.image} alt={p.address} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.75 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }} />
        <div className="container" style={{ position:'absolute', bottom:'56px', left:'50%', transform:'translateX(-50%)', width:'100%' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
            <span style={{ padding:'6px 16px', background:STATUS_COLOR[p.status], color: p.status==='sale'?'#fff':'#0A0A0A', fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', borderRadius:'100px' }}>
              {STATUS_LABEL[p.status]}
            </span>
            <span style={{ padding:'6px 16px', background:'rgba(255,255,255,0.12)', color:'#fff', fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', borderRadius:'100px', backdropFilter:'blur(8px)' }}>
              {p.type}
            </span>
          </div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(32px,5vw,60px)', color:'#fff', fontWeight:400 }}>{p.address}</h1>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.7)', marginTop:'8px' }}>{p.suburb}</p>
        </div>
      </div>

      {/* Content */}
      <section style={{ padding:'80px 0 120px', background:'#F8F5F0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:'64px', alignItems:'start' }} className="detail-layout">

            {/* Left */}
            <div>
              {/* Price + features bar */}
              <div style={{ background:'#fff', borderRadius:'12px', padding:'32px 40px', marginBottom:'32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'24px', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
                <div>
                  <p style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(10,10,10,0.4)', marginBottom:'8px' }}>ASKING PRICE</p>
                  <p style={{ fontFamily:'Playfair Display,serif', fontSize:'40px', fontWeight:500 }}>{p.price}</p>
                </div>
                <div style={{ display:'flex', gap:'40px' }}>
                  {[{v:p.beds,l:'Bed'},{v:p.baths,l:'Bath'},{v:p.cars,l:'Car'}].map(f => (
                    <div key={f.l} style={{ textAlign:'center' }}>
                      <div style={{ fontFamily:'Playfair Display,serif', fontSize:'36px', lineHeight:1 }}>{f.v}</div>
                      <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.35)', marginTop:'4px' }}>{f.l.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div style={{ background:'#fff', borderRadius:'12px', padding:'40px', marginBottom:'24px', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'28px', marginBottom:'16px' }}>About this property</h2>
                <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.85 }}>{p.desc}</p>
                <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.85, marginTop:'16px' }}>
                  Located in {p.suburb}, this {p.type.toLowerCase()} combines lifestyle convenience with quality finishes. Close to schools, parks, shops and public transport links.
                </p>
              </div>

              {/* Details */}
              <div style={{ background:'#fff', borderRadius:'12px', padding:'32px 40px', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'24px' }}>
                {[{l:'Property Type',v:p.type},{l:'Suburb',v:p.suburb.split(' ')[0]},{l:'Status',v:STATUS_LABEL[p.status]}].map(x => (
                  <div key={x.l}>
                    <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.35)', marginBottom:'6px' }}>{x.l.toUpperCase()}</p>
                    <p style={{ fontSize:'16px', fontWeight:500 }}>{x.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Enquiry form */}
            <div style={{ position:'sticky', top:'80px', background:'#0A0A0A', borderRadius:'12px', padding:'40px 36px', color:'#fff' }}>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'28px', marginBottom:'8px' }}>Enquire now</h3>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'32px' }}>We respond within 2 hours during business hours.</p>

              {sent ? (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'#C9A84C', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', color:'#0A0A0A', margin:'0 auto 20px' }}>✓</div>
                  <p style={{ fontFamily:'Playfair Display,serif', fontSize:'24px', marginBottom:'8px' }}>Enquiry sent!</p>
                  <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.4)' }}>We'll be in touch very shortly.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                  {[
                    { k:'name',  l:'Full Name',     t:'text',  r:true },
                    { k:'email', l:'Email Address', t:'email', r:true },
                    { k:'phone', l:'Phone Number',  t:'tel',   r:false },
                  ].map(f => (
                    <div key={f.k}>
                      <label style={{ display:'block', fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(255,255,255,0.4)', marginBottom:'6px' }}>{f.l.toUpperCase()}{f.r&&' *'}</label>
                      <input type={f.t} required={f.r} value={form[f.k]} onChange={e => setForm({...form,[f.k]:e.target.value})}
                        style={{ ...iStyle, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display:'block', fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(255,255,255,0.4)', marginBottom:'6px' }}>MESSAGE</label>
                    <textarea rows={4} value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                      placeholder={`I'm interested in ${p.address}...`}
                      style={{ ...iStyle, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', resize:'vertical', lineHeight:1.6 }} />
                  </div>
                  <button type="submit" style={{ marginTop:'8px', padding:'15px', background:'#C9A84C', color:'#0A0A0A', border:'none', borderRadius:'6px', fontFamily:'Outfit,sans-serif', fontSize:'13px', fontWeight:600, letterSpacing:'0.08em', transition:'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background='#E8C97A'}
                    onMouseLeave={e => e.currentTarget.style.background='#C9A84C'}
                  >SEND ENQUIRY →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){.detail-layout{grid-template-columns:1fr!important;}}`}</style>
      <Footer />
    </>
  );
}
