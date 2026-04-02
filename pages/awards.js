import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ASSETS, awards, testimonials } from '../data';

export default function Awards() {
  const [active, setActive] = useState(0);

  return (
    <>
      <Head>
        <title>Awards & Testimonials — Canberra Property Partners</title>
        <meta name="description" content="REIA Innovation Award winners 2021 & 2022. See what Canberra clients say about CPP." />
      </Head>
      <Navbar />

      {/* ── HERO with real awards video ── */}
      <section style={{ position:'relative', height:'75vh', minHeight:'560px', display:'flex', alignItems:'flex-end', background:'#0A0A0A', overflow:'hidden' }}>
        <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.35 }}>
          <source src={ASSETS.videoAwards} type="video/mp4" />
        </video>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position:'relative', zIndex:2, paddingBottom:'88px' }}>
          <p className="eyebrow" style={{ marginBottom:'20px' }}>Recognition</p>
          <h1 style={{ fontSize:'clamp(48px,7vw,88px)', fontFamily:'Playfair Display,serif', color:'#fff', fontWeight:400, lineHeight:1.0 }}>
            Awards &<br /><em style={{ color:'#C9A84C', fontStyle:'italic' }}>Testimonials</em>
          </h1>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.55)', maxWidth:'520px', lineHeight:1.75, marginTop:'24px' }}>
            As true partners in real estate, we give everything to each relationship. Our real measure of success is the trust our clients place in us.
          </p>
        </div>
      </section>

      {/* ── INNOVATION STORY ── */}
      <section style={{ padding:'120px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'88px', alignItems:'center' }} className="inno-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom:'20px' }}>REIA Award for Excellence</p>
              <h2 style={{ fontSize:'clamp(34px,4vw,52px)', lineHeight:1.1, marginBottom:'32px' }}>
                Winner —<br />Innovation
              </h2>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'20px' }}>
                When we couldn't find a technical solution to digitise our back-of-house operations, we built one ourselves — customising an off-the-shelf marketing platform in a way the manufacturer told us had never been done anywhere in the world.
              </p>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'20px' }}>
                We're now consulting to them so they can enhance their own product. In addition, we developed high-detail 3D walkthroughs of all tenancy properties so owners and tenants can inspect every detail — including paintwork, carpet condition and light fixtures — without setting foot on site.
              </p>
              <div style={{ display:'flex', gap:'16px', marginTop:'40px', flexWrap:'wrap' }}>
                <Link href="/contact" className="btn-primary">Work with us →</Link>
                <Link href="/about" className="btn-outline">About CPP</Link>
              </div>
            </div>

            {/* Real award photos */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              <img src={ASSETS.reia2021} alt="REIACT Awards 2021"
                style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', borderRadius:'8px' }} />
              <img src={ASSETS.reia2022} alt="REIA National Awards 2022"
                style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', borderRadius:'8px', marginTop:'40px' }} />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.inno-grid{grid-template-columns:1fr!important;gap:60px!important;}}`}</style>
      </section>

      {/* ── AWARD BADGES ── */}
      <section style={{ padding:'100px 0', background:'#F8F5F0' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign:'center', marginBottom:'16px' }}>Our Honours</p>
          <h2 style={{ fontSize:'clamp(34px,4vw,52px)', textAlign:'center', marginBottom:'72px' }}>Award Shelf</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'20px' }}>
            {awards.map((a, i) => (
              <div key={i} style={{
                background:'#fff', borderRadius:'12px', padding:'40px 24px', textAlign:'center',
                boxShadow:'0 4px 24px rgba(0,0,0,0.06)',
                transition:'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.06)'; }}
              >
                <img src={ASSETS[a.img]} alt={a.title}
                  style={{ height:'96px', width:'auto', maxWidth:'140px', objectFit:'contain', margin:'0 auto 20px' }} />
                <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'#C9A84C', marginBottom:'6px' }}>{a.title.toUpperCase()}</p>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'18px', lineHeight:1.3 }}>{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — interactive ── */}
      <section style={{ padding:'120px 0', background:'#0A0A0A', overflow:'hidden' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign:'center', marginBottom:'16px' }}>Client Voices</p>
          <h2 style={{ fontSize:'clamp(34px,4vw,52px)', color:'#fff', textAlign:'center', marginBottom:'80px' }}>What they say</h2>

          {/* Big featured quote */}
          <div style={{ maxWidth:'860px', margin:'0 auto 64px', textAlign:'center' }}>
            <div style={{ fontSize:'80px', fontFamily:'Playfair Display,serif', color:'#C9A84C', lineHeight:0.5, marginBottom:'32px', opacity:0.4 }}>"</div>
            <p style={{ fontSize:'clamp(22px,3vw,32px)', fontFamily:'Playfair Display,serif', fontStyle:'italic', color:'#fff', lineHeight:1.55, transition:'all 0.5s' }}>
              {testimonials[active].text}
            </p>
            <p style={{ fontSize:'14px', fontWeight:600, letterSpacing:'0.12em', color:'#C9A84C', marginTop:'32px' }}>
              — {testimonials[active].name}
            </p>
          </div>

          {/* Selector dots */}
          <div style={{ display:'flex', justifyContent:'center', gap:'10px', marginBottom:'80px' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? '32px' : '10px', height:'10px',
                borderRadius:'5px', border:'none',
                background: i === active ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                transition:'all 0.35s', cursor:'pointer',
              }} />
            ))}
          </div>

          {/* All cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'16px' }}>
            {testimonials.map((t, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                padding:'32px 28px', borderRadius:'8px', cursor:'pointer',
                background: i === active ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                border: i === active ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(255,255,255,0.07)',
                transition:'all 0.3s',
              }}>
                <div style={{ display:'flex', gap:'2px', marginBottom:'16px' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color:'#C9A84C', fontSize:'13px' }}>★</span>)}
                </div>
                <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', lineHeight:1.75, marginBottom:'20px', fontStyle:'italic' }}>
                  "{t.text.length > 120 ? t.text.slice(0, 120) + '…' : t.text}"
                </p>
                <p style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.08em', color: i === active ? '#C9A84C' : 'rgba(255,255,255,0.3)' }}>
                  — {t.name}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:'64px' }}>
            <a href="https://www.google.com/maps/search/Canberra+Property+Partners" target="_blank" rel="noopener noreferrer"
              className="btn-ghost-white"
            >View Google Reviews →</a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'100px 0', background:'#F8F5F0', textAlign:'center' }}>
        <div className="container" style={{ maxWidth:'600px', margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(34px,4vw,52px)', marginBottom:'20px' }}>Experience the difference</h2>
          <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.5)', lineHeight:1.8, marginBottom:'48px' }}>
            Join Canberra investors who trust CPP to manage, sell and maximise their property returns.
          </p>
          <Link href="/contact" className="btn-primary" style={{ fontSize:'15px', padding:'18px 44px' }}>Book Free Appraisal →</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
