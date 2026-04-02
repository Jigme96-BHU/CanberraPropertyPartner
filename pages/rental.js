import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ASSETS, services } from '../data';

export default function Rental() {
  return (
    <>
      <Head>
        <title>Rental Management — Canberra Property Partners</title>
        <meta name="description" content="Concierge-style property management across the ACT. Tenant vetting, maintenance, rent collection, 3D condition reports and more." />
      </Head>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop:'200px', paddingBottom:'120px', background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1600&q=70)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.15 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 100%)' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />

        <div className="container hero-inner" style={{ position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom:'20px' }}>Our Services</p>
            <h1 style={{ fontSize:'clamp(48px,6vw,80px)', fontFamily:'Playfair Display,serif', color:'#fff', lineHeight:1.0, fontWeight:400, marginBottom:'28px' }}>
              Rental<br /><em style={{ color:'#C9A84C', fontStyle:'italic' }}>Management</em>
            </h1>
            <p style={{ fontSize:'18px', fontWeight:300, color:'rgba(255,255,255,0.6)', lineHeight:1.8, maxWidth:'480px', marginBottom:'48px' }}>
              A concierge-style property management service that takes care of every aspect of your asset — from bills and compliance to insurance and tenant vetting. We stay on top of it all so you don't have to.
            </p>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/contact" className="btn-primary">Enquire Now →</Link>
              <Link href="/awards" className="btn-ghost-white">See Our Awards</Link>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }}>
            {[
              { v:'98%',  l:'Occupancy rate',      icon:'◈' },
              { v:'14d',  l:'Avg. days to lease',  icon:'◉' },
              { v:'3D',   l:'Property walkthroughs', icon:'◎' },
              { v:'24/7', l:'Online owner portal',  icon:'◇' },
            ].map((s, i) => (
              <div key={i} style={{
                padding:'36px 28px',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(201,168,76,0.07)',
                border:'1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize:'40px', fontFamily:'Playfair Display,serif', color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>{s.v}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', letterSpacing:'0.08em', lineHeight:1.5 }}>{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.hero-inner{@media(max-width:900px){grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── THREE PILLARS ── */}
      <section style={{ background:'#C9A84C', padding:'0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }} className="pillars">
            {[
              { title:'Best-in-business tools', desc:"We've built systems to automate manual processes so we can focus entirely on outstanding personal service. Our model has won industry awards." },
              { title:'Straightforward service', desc:"Property legislation changes constantly. Our calm, considered approach cuts through the complexity — minimising your risk and maximising your return." },
              { title:'Friction-free experience', desc:"From digitised inspection bookings to electronic rent transfers — every step of the process is designed to save you time, money and effort." },
            ].map((p, i) => (
              <div key={i} style={{ padding:'52px 44px', borderRight: i < 2 ? '1px solid rgba(10,10,10,0.12)' : 'none' }}>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'24px', color:'#0A0A0A', marginBottom:'14px' }}>{p.title}</h3>
                <p style={{ fontSize:'14px', color:'rgba(10,10,10,0.65)', lineHeight:1.8 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.pillars{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── SERVICES GRID with real CPP icons ── */}
      <section style={{ padding:'120px 0', background:'#F8F5F0' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'72px', flexWrap:'wrap', gap:'24px' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom:'16px' }}>Everything Covered</p>
              <h2 style={{ fontSize:'clamp(34px,4vw,52px)', lineHeight:1.1 }}>
                Friction-Free<br />Service
              </h2>
            </div>
            <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.45)', maxWidth:'360px', lineHeight:1.75 }}>
              Twelve distinct services working together to make your investment as effortless and profitable as possible.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'16px' }}>
            {services.map((s, i) => (
              <div key={i} style={{
                background:'#fff',
                borderRadius:'12px',
                padding:'32px 28px',
                display:'flex', gap:'20px', alignItems:'flex-start',
                boxShadow:'0 2px 12px rgba(0,0,0,0.04)',
                border:'1px solid rgba(10,10,10,0.05)',
                transition:'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 12px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ width:'48px', height:'48px', minWidth:'48px', background:'#F8F5F0', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <img src={ASSETS.icons[s.icon]} alt={s.title} style={{ width:'28px', height:'28px', objectFit:'contain' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:'18px', marginBottom:'8px', lineHeight:1.2 }}>{s.title}</h4>
                  <p style={{ fontSize:'13px', color:'rgba(10,10,10,0.5)', lineHeight:1.75 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFOGRAPHIC ── */}
      <section style={{ padding:'120px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }} className="infograph-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom:'16px' }}>The Process</p>
              <h2 style={{ fontSize:'clamp(32px,3.5vw,48px)', lineHeight:1.1, marginBottom:'28px' }}>
                How we manage<br />your asset
              </h2>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.55)', lineHeight:1.85, marginBottom:'24px' }}>
                Our management process is built around your investment's lifecycle — from the moment a tenant moves in to the day you decide to sell. Every step is tracked, documented and reported in real time.
              </p>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.55)', lineHeight:1.85, marginBottom:'48px' }}>
                Our PropertyMe portal gives you live visibility into your asset's performance, finances and condition at any time of day.
              </p>
              <Link href="/contact" className="btn-primary">Start the Conversation →</Link>
            </div>
            <div style={{ background:'#F8F5F0', borderRadius:'12px', padding:'48px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <img src={ASSETS.infographic} alt="CPP property management process" style={{ width:'100%', maxWidth:'480px' }} />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.infograph-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── SELL PROMPT ── */}
      <section style={{ padding:'120px 0', background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div className="container sell-grid" style={{ position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom:'20px' }}>Full-Circle Service</p>
            <h2 style={{ fontSize:'clamp(34px,4vw,52px)', color:'#fff', lineHeight:1.1, marginBottom:'24px' }}>
              Want to sell?<br />
              <span style={{ color:'#C9A84C', fontStyle:'italic', fontFamily:'Playfair Display,serif' }}>We've got you.</span>
            </h2>
            <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', lineHeight:1.85, marginBottom:'40px' }}>
              We manage and sell — so when it's time to go to market, nobody knows your property better. Our 3D condition scans and photography are already done. Your campaign can launch immediately.
            </p>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/sales" className="btn-primary">See Sales Process →</Link>
              <Link href="/contact" className="btn-ghost-white">Enquire Now</Link>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {[
              { n:'84+', l:'Properties sold' },
              { n:'$42k', l:'Avg. above asking' },
              { n:'100%', l:'Client retention' },
              { n:'2017', l:'Founded in Canberra' },
            ].map((s, i) => (
              <div key={i} style={{ padding:'32px 24px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px' }}>
                <div style={{ fontFamily:'Playfair Display,serif', fontSize:'40px', color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>{s.n}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em' }}>{s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.sell-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      <Footer />
    </>
  );
}
