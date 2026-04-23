import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import SEO from '../components/SEO';
import { ASSETS, properties as mockProperties, testimonials, stats } from '../data';
import { getListings } from '../lib/hetzner';

export default function Home({ properties }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featured = (() => {
    const active = properties.filter(p => p.status === 'rent' || p.status === 'sale');
    const pinned = active.filter(p => p.featured);
    return pinned.length >= 3 ? pinned.slice(0, 3) : [...pinned, ...active.filter(p => !p.featured)].slice(0, 3);
  })();

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <SEO
        title="Property Management and Real Estate Canberra ACT"
        description="Canberra award-winning real estate agency. Expert property management, sales and rentals across the ACT. REIA Innovation Award winners. Call 0409 882 375."
        url="/"
      />
      <Navbar />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{
        position:'relative', height:'100vh', minHeight:'700px',
        background:'#0A0A0A',
        display:'flex', alignItems:'center', overflow:'hidden',
      }}>
        {/* Real CPP office video */}
        <video autoPlay muted loop playsInline style={{
          position:'absolute', inset:0,
          width:'100%', height:'100%', objectFit:'cover',
          opacity:0.8,
        }}>
          <source src={ASSETS.videoHero} type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.15) 60%, rgba(10,10,10,0.4) 100%)' }} />

        {/* Decorative gold line */}
        <div style={{
          position:'absolute', left:0, top:0, bottom:0, width:'4px',
          background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)',
        }} />

        <div className="container" style={{ position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }} >
          <div>
            <div className="anim-fade-up" style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'32px' }}>
              <div style={{ width:'32px', height:'1px', background:'#C9A84C' }} />
              <span style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.22em', color:'#C9A84C' }}>CANBERRA · EST. 2017</span>
            </div>

            <h1 className="anim-fade-up d1" style={{
              fontSize:'clamp(48px, 6vw, 84px)',
              fontFamily:'Playfair Display, serif',
              fontWeight:400,
              color:'#fff',
              lineHeight:1.05,
              marginBottom:'28px',
            }}>
              Your property goals.<br />
              <em style={{ fontStyle:'italic', color:'#C9A84C' }}>Our full focus.</em>
            </h1>

            <p className="anim-fade-up d2" style={{
              fontSize:'18px', fontWeight:300,
              color:'rgba(255,255,255,0.65)',
              lineHeight:1.75, maxWidth:'480px',
              marginBottom:'48px',
            }}>
              World-first digital tools that cut the admin, freeing us to give you real estate's most personal service. More care and less hype — always.
            </p>

            <div className="anim-fade-up d3" style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/properties" className="btn-primary">View Properties →</Link>
              <Link href="/contact" className="btn-ghost-white">Free Appraisal</Link>
            </div>
          </div>

          {/* Stats panel */}
          <div className="anim-fade-up d2 hero-stats" style={{
            display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding:'36px 32px',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(201,168,76,0.08)',
                border:'1px solid rgba(255,255,255,0.06)',
                backdropFilter:'blur(8px)',
              }}>
                <div style={{ fontSize:'48px', fontFamily:'Playfair Display, serif', color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>{s.value}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', letterSpacing:'0.08em', lineHeight:1.5 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)', animation:'float 2s ease-in-out infinite' }} />
          <span style={{ fontSize:'10px', letterSpacing:'0.2em', color:'rgba(255,255,255,0.3)' }}>SCROLL</span>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━ MARQUEE BAND ━━━━━━━━━━━━━━━━━━ */}
      <div style={{ background:'#C9A84C', padding:'14px 0', overflow:'hidden', whiteSpace:'nowrap' }}>
        <div style={{ display:'inline-flex', gap:'0', animation:'marquee 20s linear infinite' }}>
          {Array.from({length: 6}).map((_, i) => (
            <span key={i} style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.16em', color:'#0A0A0A', padding:'0 40px' }}>
              REIA INNOVATION WINNER 2022 &nbsp;&nbsp;·&nbsp;&nbsp; 98% OCCUPANCY RATE &nbsp;&nbsp;·&nbsp;&nbsp; 200+ PROPERTIES LEASED &nbsp;&nbsp;·&nbsp;&nbsp; 50+ PROPERTIES SOLD &nbsp;&nbsp;·&nbsp;&nbsp; 71 SUBURBS COVERED &nbsp;&nbsp;·&nbsp;&nbsp; EST. 2017
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from {transform:translateX(0)} to {transform:translateX(-50%)} }`}</style>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━ FEATURED PROPERTIES ━━━━━━━━━━━━ */}
      <section style={{ padding:'120px 0', background:'#F8F5F0' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'64px', flexWrap:'wrap', gap:'24px' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom:'16px' }}>Available Now</p>
              <h2 style={{ fontSize:'clamp(36px,4vw,56px)', lineHeight:1.1 }}>
                Featured<br />Properties
              </h2>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'12px' }}>
              <Link href="/properties" style={{ fontSize:'14px', fontWeight:500, color:'#0A0A0A', display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid rgba(10,10,10,0.2)', paddingBottom:'4px' }}>
                View all listings <span>→</span>
              </Link>
              <div style={{ display:'flex', gap:'8px' }}>
                {['rent','sale'].map(s => (
                  <Link key={s} href={`/properties?status=${s}`} style={{ padding:'6px 16px', border:'1px solid rgba(10,10,10,0.15)', borderRadius:'100px', fontSize:'12px', fontWeight:500, color:'rgba(10,10,10,0.6)', transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#0A0A0A'; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(10,10,10,0.6)'; }}
                  >{s === 'rent' ? 'Rentals' : 'For Sale'}</Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'28px' }}>
            {featured.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━ WHY CPP — FULL BLEED ━━━━━━━━━━━━ */}
      <section style={{ position:'relative', padding:'160px 0', background:'#0A0A0A', overflow:'hidden' }}>
        {/* prop.jpeg stretched full bleed */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/images/prop.jpeg)', backgroundSize:'cover', backgroundPosition:'center' }} />
        {/* Dark overlay for readability */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 100%)' }} />
        {/* Subtle gold radial */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        {/* Left gold line */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />

        <div className="container" style={{ position:'relative', zIndex:2, maxWidth:'800px' }}>
          <p className="eyebrow" style={{ marginBottom:'20px' }}>Why Choose CPP</p>
          <h2 style={{ fontSize:'clamp(36px,4vw,56px)', color:'#fff', lineHeight:1.1, marginBottom:'32px' }}>
            More care.<br />
            <span style={{ color:'#C9A84C', fontStyle:'italic' }}>Less hype.</span>
          </h2>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.55)', lineHeight:1.85, marginBottom:'48px', maxWidth:'600px' }}>
            We believe owning a rental property should be a rewarding experience — not just financially, but the process itself. Our world-class technology handles the administration so our team can focus entirely on you: advocating, mediating and negotiating the most carefree and profitable pathway forward.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:'0', maxWidth:'600px' }}>
            {[
              { n:'01', title:'World-first technology', desc:'Award-winning digital tools built in-house. Automation that frees us to focus on you.' },
              { n:'02', title:'Full-circle approach', desc:'We manage and sell. Nobody knows your property better when it comes time to sell.' },
              { n:'03', title:'Personal service always', desc:'You speak to the person who knows your property. No call centres, no runaround.' },
            ].map((item, i) => (
              <div key={i} style={{
                display:'flex', gap:'28px',
                padding:'28px 0',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                transition:'all 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft='8px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft='0'}
              >
                <span style={{ fontSize:'12px', fontWeight:600, color:'#C9A84C', letterSpacing:'0.08em', minWidth:'28px', paddingTop:'4px' }}>{item.n}</span>
                <div>
                  <h4 style={{ fontSize:'18px', color:'#fff', fontFamily:'Playfair Display, serif', marginBottom:'8px' }}>{item.title}</h4>
                  <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', lineHeight:1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', gap:'16px', marginTop:'48px', flexWrap:'wrap' }}>
            <Link href="/rental" className="btn-primary">Rental Process →</Link>
            <Link href="/sales" className="btn-ghost-white">Sales Process</Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━ TESTIMONIALS — CINEMATIC ━━━━━━━━ */}
      <section style={{ background:'#F8F5F0', padding:'120px 0', overflow:'hidden' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'80px', alignItems:'start' }} className="test-grid">
            <div style={{ position:'sticky', top:'120px' }}>
              <p className="eyebrow" style={{ marginBottom:'16px' }}>Client Stories</p>
              <h2 style={{ fontSize:'clamp(32px,3.5vw,48px)', lineHeight:1.1, marginBottom:'32px' }}>
                What our<br />clients say
              </h2>
              <div style={{ display:'flex', gap:'8px' }}>
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                    width: i === activeTestimonial ? '28px' : '8px',
                    height:'8px', borderRadius:'4px',
                    background: i === activeTestimonial ? '#C9A84C' : 'rgba(10,10,10,0.15)',
                    border:'none', transition:'all 0.35s',
                  }} />
                ))}
              </div>
              <div style={{ marginTop:'40px' }}>
                <Link href="/awards" style={{ fontSize:'14px', fontWeight:500, display:'flex', alignItems:'center', gap:'8px', color:'#0A0A0A', borderBottom:'1px solid rgba(10,10,10,0.2)', paddingBottom:'4px', width:'fit-content' }}>
                  See all testimonials <span>→</span>
                </Link>
              </div>
            </div>

            <div>
              {testimonials.map((t, i) => (
                <div key={i} style={{
                  padding:'48px',
                  background: i === activeTestimonial ? '#0A0A0A' : '#fff',
                  borderRadius:'8px',
                  marginBottom:'16px',
                  border:'1px solid rgba(10,10,10,0.06)',
                  transition:'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                  transform: i === activeTestimonial ? 'scale(1)' : 'scale(0.98)',
                  opacity: i === activeTestimonial ? 1 : 0.4,
                  cursor:'pointer',
                }} onClick={() => setActiveTestimonial(i)}>
                  <div style={{ display:'flex', gap:'2px', marginBottom:'24px' }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color:'#C9A84C', fontSize:'14px' }}>★</span>)}
                  </div>
                  <p style={{
                    fontSize:'20px', fontFamily:'Playfair Display, serif', fontStyle:'italic',
                    lineHeight:1.65,
                    color: i === activeTestimonial ? '#fff' : '#0A0A0A',
                    marginBottom:'28px',
                  }}>"{t.text}"</p>
                  <p style={{ fontSize:'13px', fontWeight:600, letterSpacing:'0.08em', color: i === activeTestimonial ? '#C9A84C' : 'rgba(10,10,10,0.4)' }}>
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.test-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━ CTA FULLSCREEN ━━━━━━━━━━━━━━━━━ */}
      <section style={{ position:'relative', padding:'160px 0', background:'#0A0A0A', overflow:'hidden', textAlign:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=70)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.15 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, #0A0A0A 0%, transparent 30%, transparent 70%, #0A0A0A 100%)' }} />
        <div className="container" style={{ position:'relative', zIndex:2, maxWidth:'700px', margin:'0 auto' }}>
          <p className="eyebrow" style={{ marginBottom:'24px' }}>Get Started</p>
          <h2 style={{ fontSize:'clamp(40px,5vw,72px)', color:'#fff', lineHeight:1.05, marginBottom:'24px' }}>
            Ready to make<br />your move?
          </h2>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.55)', lineHeight:1.75, marginBottom:'52px' }}>
            Whether you're selling, looking to rent out your investment, or need expert management — our appraisals are always free and obligation-free.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize:'15px', padding:'18px 44px' }}>
              Book Free Appraisal →
            </Link>
            <a href="tel:0409882375" className="btn-ghost-white" style={{ fontSize:'15px', padding:'18px 44px' }}>
              0409 882 375
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media(max-width:768px){
          .hero-stats{display:none!important;}
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const liveListings = await getListings();
  return {
    props: { properties: liveListings.length > 0 ? liveListings : mockProperties },
    revalidate: 300,
  };
}
