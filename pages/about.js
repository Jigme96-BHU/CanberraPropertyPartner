import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ASSETS, stats } from '../data';

export default function About() {
  return (
    <>
      <SEO
        title="About Us - Brett Russell and the CPP Team | Canberra Property Partners"
        description="Meet Brett Russell and the CPP team. REIA Innovation Award winners building Canberra most personal real estate service since 2017."
        url="/about"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop:'180px', paddingBottom:'120px', background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <p className="eyebrow" style={{ marginBottom:'20px' }}>Our Story</p>
          <h1 style={{ fontSize:'clamp(52px,7vw,96px)', fontFamily:'Playfair Display,serif', color:'#fff', lineHeight:1.0, fontWeight:400, maxWidth:'700px' }}>
            Personable.<br />Attentive.<br /><em style={{ color:'#C9A84C', fontStyle:'italic' }}>Responsive.</em>
          </h1>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.5)', lineHeight:1.8, maxWidth:'520px', marginTop:'32px' }}>
            We formed CPP to bring a revolution to real estate — built on the promise of treating you and your property the right way, with respect and genuine care.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:'#C9A84C', padding:'0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }} className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} style={{ padding:'48px 32px', textAlign:'center', borderRight: i < 3 ? '1px solid rgba(10,10,10,0.12)' : 'none' }}>
                <div style={{ fontSize:'52px', fontFamily:'Playfair Display,serif', color:'#0A0A0A', lineHeight:1, marginBottom:'8px' }}>{s.value}</div>
                <div style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.5)' }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
      </section>

      {/* ── STORY ── */}
      <section style={{ padding:'120px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'100px', alignItems:'center' }} className="story-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom:'20px' }}>Who We Are</p>
              <h2 style={{ fontSize:'clamp(34px,4vw,52px)', lineHeight:1.1, marginBottom:'32px' }}>
                Built different,<br />by design
              </h2>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'20px' }}>
                Having been through the buying and selling process ourselves many times, we'd wearied of the poor experiences we'd had with selling agents. We felt there was a better way — so in 2017 we launched Canberra Property Partners.
              </p>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'20px' }}>
                Such is our commitment to giving you our full focus, we even created award-winning digital business tools never before seen in our industry. Automating our behind-the-scenes processes gives us more time to invest our attention where it counts — on you and your property.
              </p>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'48px' }}>
                It's just one of the many reasons why sellers, investors and industry bodies continue to give us glowing testimonials, awards and accolades.
              </p>
              <div style={{ padding:'28px 32px', background:'#F8F5F0', borderLeft:'4px solid #C9A84C', borderRadius:'0 8px 8px 0' }}>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontStyle:'italic', lineHeight:1.6, color:'#0A0A0A' }}>
                  "The best thing about CPP is their unique business model — you will always get prompt answers and nothing is missed."
                </p>
                <p style={{ fontSize:'13px', fontWeight:600, letterSpacing:'0.08em', color:'#C9A84C', marginTop:'16px' }}>— RONY, CLIENT</p>
              </div>
            </div>
            <div style={{ position:'relative' }}>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85" alt="CPP Office"
                style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', borderRadius:'8px' }} />
              <div style={{ position:'absolute', bottom:'-24px', right:'-24px', background:'#0A0A0A', padding:'28px 32px', borderRadius:'8px' }}>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'36px', color:'#C9A84C', lineHeight:1 }}>2017</p>
                <p style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(255,255,255,0.5)', marginTop:'6px' }}>FOUNDED</p>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.story-grid{grid-template-columns:1fr!important;gap:60px!important;}}`}</style>
      </section>

      {/* ── BRETT ── */}
      <section style={{ padding:'120px 0', background:'#F8F5F0' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign:'center', marginBottom:'16px' }}>The Team</p>
          <h2 style={{ fontSize:'clamp(36px,4vw,56px)', textAlign:'center', marginBottom:'80px' }}>Meet the Partners</h2>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px', maxWidth:'960px', margin:'0 auto', borderRadius:'12px', overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.12)' }} className="brett-card">
            <div style={{ overflow:'hidden', background:'#111' }}>
              <img src={ASSETS.brett} alt="Brett Russell"
                style={{ width:'100%', height:'100%', minHeight:'500px', objectFit:'cover', objectPosition:'top', display:'block' }} />
            </div>
            <div style={{ background:'#0A0A0A', padding:'64px 56px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.18em', color:'#C9A84C', marginBottom:'16px' }}>PARTNER</p>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'44px', color:'#fff', marginBottom:'8px', fontWeight:400 }}>Brett Russell</h3>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.06em', marginBottom:'32px' }}>Co-Founder · Canberra Property Partners</p>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.85, marginBottom:'20px' }}>
                His track record as a successful private property investor combined with experience leading government department business teams meant Brett was highly sought after by major franchises — yet he chose a different path.
              </p>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.85, marginBottom:'40px' }}>
                In 2017, convinced the sector was still missing truly premium customer service, Brett co-founded CPP. Today his focus on helping vendors present properties in tip-top shape has seen him set multiple suburb sales records.
              </p>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <a href="tel:0409882375" style={{ padding:'12px 24px', background:'#C9A84C', color:'#0A0A0A', fontSize:'13px', fontWeight:600, letterSpacing:'0.06em', borderRadius:'100px', transition:'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#E8C97A'}
                  onMouseLeave={e => e.currentTarget.style.background='#C9A84C'}
                >0409 882 375</a>
                <a href="mailto:cpp@email.propertyme.com" style={{ padding:'12px 24px', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.7)', fontSize:'13px', fontWeight:500, letterSpacing:'0.06em', borderRadius:'100px', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#fff'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='rgba(255,255,255,0.7)'; }}
                >Email Brett</a>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.brett-card{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'120px 0', background:'#0A0A0A', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        <div className="container" style={{ position:'relative', zIndex:2, maxWidth:'600px', margin:'0 auto' }}>
          <p className="eyebrow" style={{ marginBottom:'20px' }}>Work With Us</p>
          <h2 style={{ fontSize:'clamp(36px,4vw,56px)', color:'#fff', marginBottom:'20px' }}>Let's work together</h2>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', lineHeight:1.8, marginBottom:'48px' }}>
            Ready to experience a different kind of real estate service? The conversation is always free.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn-primary">Book Free Appraisal →</Link>
            <Link href="/awards" className="btn-ghost-white">Our Awards</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
