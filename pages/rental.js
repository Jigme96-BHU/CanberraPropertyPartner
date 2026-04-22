import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ASSETS, services } from '../data';

export default function Rental() {
  return (
    <>
      <SEO
        title="Property Management Canberra ACT | Canberra Property Partners"
        description="Expert rental property management across Canberra and the ACT. Tenant vetting, maintenance, 3D condition reports, rent collection. Free appraisal."
        url="/rental"
      />
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
              { v:'98%',  l:'Occupancy rate',       icon:'◈' },
              { v:'200+', l:'Properties leased',    icon:'◉' },
              { v:'71',   l:'Suburbs covered',      icon:'◎' },
              { v:'2017', l:'Est. in Canberra',     icon:'◇' },
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
        <style>{`@media(max-width:900px){.hero-inner{grid-template-columns:1fr!important;}}`}</style>
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

      {/* ── TECHNOLOGY ── */}
      <section style={{ padding:'120px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'100px', alignItems:'start' }} className="tech-grid">

            {/* Left: sticky label */}
            <div style={{ position:'sticky', top:'120px' }}>
              <p className="eyebrow" style={{ marginBottom:'16px' }}>Built for You</p>
              <h2 style={{ fontSize:'clamp(34px,4vw,52px)', lineHeight:1.1, marginBottom:'24px' }}>
                Our<br />
                <em style={{ fontStyle:'italic', fontFamily:'Playfair Display,serif', color:'#C9A84C' }}>Technology</em>
              </h2>
              <p style={{ fontSize:'15px', color:'rgba(10,10,10,0.5)', lineHeight:1.85 }}>
                World-first digital tools that cut the admin — freeing our team to focus entirely on you.
              </p>
            </div>

            {/* Right: timeline items */}
            <div style={{ position:'relative' }}>
              {/* Vertical line */}
              <div style={{
                position:'absolute', left:0, top:'16px', bottom:'16px', width:'1px',
                background:'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.1))',
              }} />

              {[
                {
                  title: 'Online Booking System',
                  desc: 'Allows prospective tenants to book inspections 24/7, accommodating over 40% of tenants who prefer after-hours scheduling. This system ensures higher visibility and accessibility for your property.',
                },
                {
                  title: 'PropertyMe Portal',
                  desc: 'Offers on-demand access for landlords and tenants, facilitating seamless communication and access to important information — enhancing the management experience around the clock.',
                },
                {
                  title: '3D Scanning Technology',
                  desc: 'Used for Ingoing Condition Reports, providing a detailed and interactive view of your property. Sets a new standard in property documentation and gives your marketing campaign an immediate edge.',
                },
                {
                  title: 'Advanced Maintenance Systems',
                  desc: 'Keeps you informed at every step — from lease renewals to property upkeep — ensuring your investment is well-maintained and your returns are maximised.',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  paddingLeft:'48px',
                  paddingBottom: i < 3 ? '56px' : '0',
                  position:'relative',
                }}>
                  {/* Circle on the line */}
                  <div style={{
                    position:'absolute', left:'-8px', top:'10px',
                    width:'17px', height:'17px', borderRadius:'50%',
                    background:'#fff', border:'2px solid #C9A84C',
                  }} />

                  <div style={{
                    background:'#F8F5F0',
                    borderRadius:'12px',
                    padding:'32px 36px',
                    border:'1px solid rgba(10,10,10,0.05)',
                    transition:'transform 0.3s, box-shadow 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateX(6px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
                  >
                    <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', color:'#0A0A0A', marginBottom:'12px', fontWeight:400 }}>{item.title}</h3>
                    <p style={{ fontSize:'14px', color:'rgba(10,10,10,0.55)', lineHeight:1.85 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.tech-grid{grid-template-columns:1fr!important;} .tech-grid>div:first-child{position:static!important;}}`}</style>
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

      {/* ── TENANT MAINTENANCE SUPPORT ── */}
      <section style={{ padding:'80px 0', background:'#0A0A0A' }}>
        <div className="container">
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center',
            background:'rgba(255,255,255,0.03)',
            border:'1px solid rgba(201,168,76,0.2)',
            borderRadius:'16px',
            padding:'56px 64px',
          }} className="maint-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom:'16px' }}>Tenant Support</p>
              <h2 style={{ fontSize:'clamp(28px,3.5vw,44px)', color:'#fff', lineHeight:1.15, marginBottom:'20px' }}>
                Having a maintenance<br />
                <span style={{ color:'#C9A84C', fontStyle:'italic', fontFamily:'Playfair Display,serif' }}>issue at home?</span>
              </h2>
              <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', lineHeight:1.85, marginBottom:'12px' }}>
                Our AI maintenance assistant is available 24/7 to help you troubleshoot common property issues — from plumbing and electrical to heating and appliances.
              </p>
              <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', lineHeight:1.85, marginBottom:'40px' }}>
                Describe your problem and the chatbot will walk you through practical steps and recommendations. For urgent or serious issues, always contact us directly.
              </p>
              <a
                href="https://www.reheroes.ai/aft/?rh-chat-window-start-state=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontSize:'15px' }}
              >
                Chat with Maintenance Assistant →
              </a>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              {[
                { icon:'🔧', title:'Plumbing & Leaks', desc:'Blocked drains, dripping taps, water pressure issues.' },
                { icon:'⚡', title:'Electrical & Heating', desc:'Power points, heating faults, smoke alarms.' },
                { icon:'🏠', title:'General Repairs', desc:'Doors, windows, locks, appliances and more.' },
              ].map((item, i) => (
                <div key={i} style={{
                  display:'flex', gap:'16px', alignItems:'flex-start',
                  padding:'20px 24px',
                  background:'rgba(255,255,255,0.04)',
                  borderRadius:'10px',
                  border:'1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize:'24px', lineHeight:1 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ fontSize:'15px', color:'#fff', fontWeight:600, marginBottom:'4px' }}>{item.title}</h4>
                    <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', lineHeight:1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.maint-grid{grid-template-columns:1fr!important; padding:36px 28px!important;}}`}</style>
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
              { n:'50+',  l:'Properties sold' },
              { n:'200+', l:'Properties leased' },
              { n:'71',   l:'Suburbs covered' },
              { n:'2017', l:'Est. in Canberra' },
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
