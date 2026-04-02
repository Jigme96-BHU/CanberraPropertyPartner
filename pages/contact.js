import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const iBase = {
  width:'100%', padding:'14px 18px',
  background:'rgba(255,255,255,0.06)',
  border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:'8px',
  fontFamily:'Outfit,sans-serif', fontSize:'15px',
  color:'#fff', outline:'none',
  transition:'border-color 0.2s',
};

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'appraisal', message:'' });
  const [sent, setSent] = useState(false);
  const F = (k) => ({ value:form[k], onChange:e => setForm({...form,[k]:e.target.value}) });

  const contactDetails = [
    { label:'Office', value:'2/18 Winchcombe Court\nMitchell ACT 2911', icon:'📍' },
    { label:'Phone',  value:'02 6103 0843', href:'tel:0261030843', icon:'📞' },
    { label:'Email',  value:'sales@canberrapropertypartners.com.au', href:'mailto:sales@canberrapropertypartners.com.au', icon:'✉️' },
    { label:'Hours',  value:'Mon–Fri  8:30am–5:30pm\nSat  9:00am–1:00pm', icon:'🕐' },
  ];

  return (
    <>
      <Head>
        <title>Contact — Canberra Property Partners</title>
        <meta name="description" content="Book a free property appraisal or get in touch with the CPP team. We respond within 2 business hours." />
      </Head>
      <Navbar />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'100vh' }} className="contact-layout">

        {/* ── LEFT: Dark info panel ── */}
        <div style={{ background:'#0A0A0A', padding:'160px 80px 80px', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 20% 60%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />

          <div style={{ position:'relative', zIndex:2 }}>
            <p className="eyebrow" style={{ marginBottom:'20px' }}>Get In Touch</p>
            <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(40px,5vw,64px)', color:'#fff', lineHeight:1.05, marginBottom:'32px', fontWeight:400 }}>
              Let's talk<br /><em style={{ color:'#C9A84C', fontStyle:'italic' }}>property.</em>
            </h1>
            <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.45)', lineHeight:1.85, marginBottom:'64px', maxWidth:'380px' }}>
              Whether you're thinking of selling, want to rent out your investment, or just have questions about the Canberra market — we're here for a no-pressure conversation.
            </p>

            {/* Contact details */}
            <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
              {contactDetails.map((d, i) => (
                <div key={i} style={{ display:'flex', gap:'20px', padding:'24px 0', borderBottom: i < contactDetails.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <span style={{ fontSize:'18px', marginTop:'2px' }}>{d.icon}</span>
                  <div>
                    <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.14em', color:'#C9A84C', marginBottom:'6px' }}>{d.label.toUpperCase()}</p>
                    {d.href
                      ? <a href={d.href} style={{ fontSize:'15px', color:'rgba(255,255,255,0.75)', whiteSpace:'pre-line', lineHeight:1.7, transition:'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color='#fff'}
                          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}
                        >{d.value}</a>
                      : <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.45)', whiteSpace:'pre-line', lineHeight:1.7 }}>{d.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Map link */}
            <div style={{ marginTop:'48px', padding:'24px 28px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', display:'flex', alignItems:'center', gap:'16px' }}>
              <span style={{ fontSize:'24px' }}>🗺️</span>
              <div>
                <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'4px' }}>2/18 Winchcombe Court, Mitchell ACT 2911</p>
                <a href="https://maps.google.com/?q=2/18+Winchcombe+Court+Mitchell+ACT+2911" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:'13px', fontWeight:600, color:'#C9A84C', letterSpacing:'0.06em', transition:'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity='0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity='1'}
                >Get Directions →</a>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form panel ── */}
        <div style={{ background:'#0F0F0F', padding:'160px 80px 80px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'36px', color:'#fff', marginBottom:'8px', fontWeight:400 }}>Book a free appraisal</h2>
          <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.35)', marginBottom:'48px' }}>No obligation. No pressure. Just honest advice.</p>

          {sent ? (
            <div style={{ textAlign:'center', padding:'60px 40px' }}>
              <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'#C9A84C', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', fontSize:'28px', color:'#0A0A0A' }}>✓</div>
              <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'32px', color:'#fff', marginBottom:'12px' }}>
                Thank you, {form.name.split(' ')[0] || 'there'}!
              </h3>
              <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.4)', lineHeight:1.75 }}>
                We've received your enquiry and will be in touch within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                <div>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', marginBottom:'8px' }}>FULL NAME *</label>
                  <input type="text" required {...F('name')} style={iBase}
                    onFocus={e => e.target.style.borderColor='#C9A84C'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', marginBottom:'8px' }}>PHONE</label>
                  <input type="tel" {...F('phone')} style={iBase}
                    onFocus={e => e.target.style.borderColor='#C9A84C'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                </div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', marginBottom:'8px' }}>EMAIL ADDRESS *</label>
                <input type="email" required {...F('email')} style={iBase}
                  onFocus={e => e.target.style.borderColor='#C9A84C'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'} />
              </div>

              <div>
                <label style={{ display:'block', fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', marginBottom:'8px' }}>I'M INTERESTED IN</label>
                <select {...F('service')} style={{ ...iBase, cursor:'pointer', appearance:'none' }}>
                  <option value="appraisal">Free Property Appraisal</option>
                  <option value="selling">Selling my property</option>
                  <option value="renting">Renting out my property</option>
                  <option value="management">Property management</option>
                  <option value="buying">Buying a property</option>
                  <option value="other">General enquiry</option>
                </select>
              </div>

              <div>
                <label style={{ display:'block', fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', marginBottom:'8px' }}>MESSAGE</label>
                <textarea rows={5} {...F('message')} placeholder="Tell us about your property or situation..."
                  style={{ ...iBase, resize:'vertical', lineHeight:1.65 }}
                  onFocus={e => e.target.style.borderColor='#C9A84C'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'} />
              </div>

              <button type="submit" style={{
                marginTop:'8px', padding:'18px',
                background:'#C9A84C', color:'#0A0A0A',
                border:'none', borderRadius:'8px',
                fontFamily:'Outfit,sans-serif', fontSize:'14px', fontWeight:700,
                letterSpacing:'0.1em', cursor:'pointer',
                transition:'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='#E8C97A'; e.currentTarget.style.transform='scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.transform='scale(1)'; }}
              >SEND ENQUIRY →</button>

              <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.25)', textAlign:'center', marginTop:'8px' }}>
                Or call us directly: <a href="tel:0261030843" style={{ color:'#C9A84C' }}>02 6103 0843</a>
              </p>
            </form>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @media(max-width:900px){
          .contact-layout{grid-template-columns:1fr!important;}
          .contact-layout > div{padding:100px 32px 60px!important;}
        }
      `}</style>
    </>
  );
}
