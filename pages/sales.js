import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ASSETS, salesSteps } from '../data';

export default function Sales() {
  return (
    <>
      <SEO
        title="Sell Your Property Canberra | Real Estate Sales ACT | CPP"
        description="Selling your Canberra investment property? CPP offers expert property sales advice, free appraisals, and a full-circle approach for tenanted or vacant properties."
        url="/sales"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop:'200px', paddingBottom:'120px', background:'#0A0A0A', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1582407947304-fd86f28f886e?w=1600&q=70)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.18 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.5) 100%)' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <p className="eyebrow" style={{ marginBottom:'20px' }}>Our Services</p>
          <h1 style={{ fontSize:'clamp(48px,6vw,88px)', fontFamily:'Playfair Display,serif', color:'#fff', lineHeight:1.0, fontWeight:400, marginBottom:'28px', maxWidth:'700px' }}>
            Your property.<br />
            <em style={{ color:'#C9A84C', fontStyle:'italic' }}>Sold right.</em>
          </h1>
          <p style={{ fontSize:'18px', fontWeight:300, color:'rgba(255,255,255,0.55)', lineHeight:1.8, maxWidth:'520px', marginBottom:'52px' }}>
            At CPP, your property portfolio requires careful balancing. Our sales division is perfectly placed to make the process smooth — whether selling tenanted or vacant, you'll never be just a number.
          </p>
          <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn-primary">Enquire Now →</Link>
            <Link href="/rental" className="btn-ghost-white">Rental Services</Link>
          </div>
        </div>
      </section>

      {/* ── TAILORED SUPPORT ── */}
      <section style={{ padding:'120px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'100px', alignItems:'center' }} className="support-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom:'20px' }}>Your Local Experts</p>
              <h2 style={{ fontSize:'clamp(34px,4vw,52px)', lineHeight:1.1, marginBottom:'32px' }}>
                Tailored Support.<br />
                <em style={{ fontStyle:'italic', fontFamily:'Playfair Display,serif', color:'rgba(10,10,10,0.4)' }}>Always.</em>
              </h2>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'24px' }}>
                Unlike agencies that take a volumetric approach to property sales, with us you'll never be a number. Our personalised service takes your particular situation into account and we work closely with you to secure the best result.
              </p>
              <p style={{ fontSize:'16px', color:'rgba(10,10,10,0.6)', lineHeight:1.9, marginBottom:'40px' }}>
                It makes financial sense to have the agency that manages your property also sell it. We already know your asset inside and out — your campaign starts with a head start no other agency can match.
              </p>
              <div style={{ padding:'28px 32px', background:'#F8F5F0', borderLeft:'4px solid #C9A84C', borderRadius:'0 8px 8px 0', marginBottom:'40px' }}>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'19px', fontStyle:'italic', lineHeight:1.6, color:'#0A0A0A' }}>
                  "It makes financial sense to have the agency that manages your property sell your property."
                </p>
              </div>
              <Link href="/contact" className="btn-primary">Get a Free Appraisal →</Link>
            </div>

            {/* Tenanted / Untenanted */}
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              {[
                {
                  label:'Selling Tenanted',
                  desc:"As specialists in property portfolio divestments, we advise on whether it's best to sell with a tenant in place. We take extra steps to keep tenants on side — your transaction stays profitable and hassle-free.",
                  icon:'⊡',
                },
                {
                  label:'Selling Untenanted',
                  desc:"We're fully across the legal requirements around selling a vacant rented property. We coordinate any refreshes needed and use our existing 3D scans and photography to launch your campaign immediately.",
                  icon:'⊞',
                },
                {
                  label:'Two Sides of One Coin',
                  desc:"Navigating both ends of the investment spectrum is rife with potential potholes. Pairing up with expert property managers can smooth the way and keep your yields firmly on track.",
                  icon:'◎',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  padding:'32px 28px',
                  background: i === 0 ? '#0A0A0A' : '#F8F5F0',
                  borderRadius:'12px',
                  display:'flex', gap:'20px', alignItems:'flex-start',
                  transition:'transform 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateX(6px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}
                >
                  <div style={{ fontSize:'24px', color: i === 0 ? '#C9A84C' : '#C9A84C', marginTop:'2px', minWidth:'28px' }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', color: i === 0 ? '#fff' : '#0A0A0A', marginBottom:'10px' }}>{item.label}</h4>
                    <p style={{ fontSize:'14px', color: i === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.55)', lineHeight:1.75 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.support-grid{grid-template-columns:1fr!important;gap:60px!important;}}`}</style>
      </section>

      {/* ── SALES STEPS — dramatic numbered layout ── */}
      <section style={{ padding:'120px 0', background:'#F8F5F0' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign:'center', marginBottom:'16px' }}>How It Works</p>
          <h2 style={{ fontSize:'clamp(34px,4vw,52px)', textAlign:'center', marginBottom:'80px', lineHeight:1.1 }}>
            The Sales Process
          </h2>

          <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {salesSteps.map((step, i) => (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'80px 1fr 200px',
                gap:'48px', alignItems:'center',
                padding:'48px 56px',
                background:'#fff',
                borderRadius: i === 0 ? '12px 12px 0 0' : i === salesSteps.length - 1 ? '0 0 12px 12px' : '0',
                border:'1px solid rgba(10,10,10,0.05)',
                transition:'background 0.3s',
              }} className="step-row"
                onMouseEnter={e => e.currentTarget.style.background='#0A0A0A'}
                onMouseLeave={e => e.currentTarget.style.background='#fff'}
                ref={el => {
                  if (el) {
                    el.addEventListener('mouseenter', () => {
                      el.querySelectorAll('.step-num,.step-title,.step-desc').forEach(x => {
                        if (x.classList.contains('step-num')) x.style.color = '#C9A84C';
                        if (x.classList.contains('step-title')) x.style.color = '#fff';
                        if (x.classList.contains('step-desc')) x.style.color = 'rgba(255,255,255,0.5)';
                      });
                    });
                    el.addEventListener('mouseleave', () => {
                      el.querySelectorAll('.step-num,.step-title,.step-desc').forEach(x => {
                        if (x.classList.contains('step-num')) x.style.color = 'rgba(10,10,10,0.12)';
                        if (x.classList.contains('step-title')) x.style.color = '#0A0A0A';
                        if (x.classList.contains('step-desc')) x.style.color = 'rgba(10,10,10,0.5)';
                      });
                    });
                  }
                }}
              >
                <div className="step-num" style={{ fontFamily:'Playfair Display,serif', fontSize:'72px', fontWeight:700, color:'rgba(10,10,10,0.12)', lineHeight:1, transition:'color 0.3s' }}>{step.num}</div>
                <div>
                  <h3 className="step-title" style={{ fontFamily:'Playfair Display,serif', fontSize:'28px', color:'#0A0A0A', marginBottom:'12px', transition:'color 0.3s' }}>{step.title}</h3>
                  <p className="step-desc" style={{ fontSize:'15px', color:'rgba(10,10,10,0.5)', lineHeight:1.8, transition:'color 0.3s' }}>{step.desc}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <img src={ASSETS.icons[step.icon]} alt={step.title} style={{ width:'56px', height:'56px', objectFit:'contain', opacity:0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.step-row{grid-template-columns:1fr!important;padding:36px 28px!important;}}`}</style>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'120px 0', background:'#0A0A0A', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        <div className="container" style={{ position:'relative', zIndex:2, maxWidth:'640px', margin:'0 auto' }}>
          <p className="eyebrow" style={{ marginBottom:'20px' }}>Ready to Sell?</p>
          <h2 style={{ fontSize:'clamp(36px,5vw,64px)', color:'#fff', lineHeight:1.05, marginBottom:'24px' }}>
            Let's get<br />your property sold.
          </h2>
          <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.5)', lineHeight:1.8, marginBottom:'52px' }}>
            Our appraisals are always free. No obligation, no pressure — just honest, expert advice from Canberra's most personal real estate team.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize:'15px', padding:'18px 48px' }}>Book Free Appraisal →</Link>
            <a href="tel:0409882375" className="btn-ghost-white" style={{ fontSize:'15px', padding:'18px 48px' }}>Call 0409 882 375</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
