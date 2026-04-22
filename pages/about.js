import Link from 'next/link';
import Image from 'next/image';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ASSETS } from '../data';

const awards = [
  { title: 'Roomr No.1 Agency in ACT', sub: '3 Consecutive Years 2019, 2020, 2021' },
  { title: '2022 Australia REIACT Winner', sub: 'Innovation Award' },
  { title: '2021 ACT REIACT Winner', sub: 'Innovation Award' },
  { title: '2025 REIACT Finalist', sub: 'Property Management Team of the Year' },
];

const services = [
  { title: 'Tenant Management', desc: 'Thorough tenant screening, lease negotiations and tenant issue resolution, we ensure your tenants are well managed.' },
  { title: 'Financial Management', desc: 'Rental collection, disbursement and comprehensive financial reporting, ensuring transparency and ease of management for landlords.' },
  { title: 'Property Maintenance', desc: 'Utilising the latest technology for reports and repairs, ensuring your property remains in optimal condition.' },
  { title: 'Legal Compliance', desc: 'Tenancy agreements, bond lodgements and all legal documents managed professionally, keeping you compliant with all regulations.' },
  { title: 'Marketing & Leasing', desc: 'Professional photography, strategic advertising and innovative 3D walkthroughs enhance property visibility and ensure quick tenant placement.' },
];


const vipPoints = [
  'Personal Involvement',
  'Dedicated Property Manager',
  'Priority Access',
  'Exclusive Services & Comprehensive Communication',
  'Innovative Technology',
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us — Canberra Property Partners"
        description="Meet Brett Russell, Director of Canberra Property Partners. Award winning property management in Canberra ACT with a personal touch."
        url="/about"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: '180px', paddingBottom: '120px', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow" style={{ marginBottom: '20px' }}>About Canberra Property Partners</p>
          <h1 style={{ fontSize: 'clamp(48px,7vw,88px)', fontFamily: 'Playfair Display,serif', color: '#fff', lineHeight: 1.05, fontWeight: 400, maxWidth: '760px' }}>
            Where your property is<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>our priority</em>
          </h1>
        </div>
      </section>

      {/* ── BRETT'S BIO ── */}
      <section style={{ padding: '120px 0', background: '#F8F5F0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="brett-bio-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom: '16px' }}>Director &amp; Principal</p>
              <h2 style={{ fontSize: 'clamp(34px,4vw,52px)', lineHeight: 1.1, marginBottom: '8px' }}>Brett Russell</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <a href="tel:0409882375" style={{ fontSize: '14px', color: '#C9A84C', fontWeight: 600, letterSpacing: '0.04em', textDecoration: 'none' }}>0409 882 375</a>
                <a href="mailto:brett@canberrapropertypartners.com.au" style={{ fontSize: '14px', color: 'rgba(10,10,10,0.5)', textDecoration: 'none' }}>brett@canberrapropertypartners.com.au</a>
              </div>
              <p style={{ fontSize: '16px', color: 'rgba(10,10,10,0.65)', lineHeight: 1.9, marginBottom: '20px' }}>
                With over eight years leading Canberra Property Partners, Brett Russell is a trusted figure in Canberra&apos;s real estate market. His exceptional market knowledge, personalised approach, and commitment to client success have guided many buyers, sellers, and investors through their journeys.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(10,10,10,0.65)', lineHeight: 1.9, marginBottom: '20px' }}>
                As the owner of Canberra Property Partners, Brett combines a keen understanding of local trends with a passion for client success. His expertise covers residential, commercial, and investment properties, ensuring every transaction is precise and careful.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(10,10,10,0.65)', lineHeight: 1.9, marginBottom: '20px' }}>
                Brett&apos;s service dedication goes beyond deals. He fosters lasting relationships, offers expert advice, and tailors strategies to each client&apos;s needs. Whether handling negotiations or providing market insights, his professionalism and integrity are evident in every interaction. Outside of work, Brett enjoys exploring Canberra, supporting local initiatives, and spending time with his family.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(10,10,10,0.65)', lineHeight: 1.9, marginBottom: '40px' }}>
                With Brett Russell and Canberra Property Partners, you&apos;re not just getting a real estate expert — you&apos;re gaining a partner committed to your success.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="tel:0409882375"
                  style={{ padding: '13px 28px', background: '#C9A84C', color: '#0A0A0A', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', borderRadius: '100px', textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#E8C97A'}
                  onMouseLeave={e => e.currentTarget.style.background = '#C9A84C'}
                >0409 882 375</a>
                <a href="https://mail.google.com/mail/?view=cm&to=brett@canberrapropertypartners.com.au" target="_blank" rel="noopener noreferrer"
                  style={{ padding: '13px 28px', border: '1px solid rgba(10,10,10,0.2)', color: 'rgba(10,10,10,0.7)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', borderRadius: '100px', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A0A0A'; e.currentTarget.style.color = '#0A0A0A'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.2)'; e.currentTarget.style.color = 'rgba(10,10,10,0.7)'; }}
                >Email</a>
              </div>
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.14)' }}>
              <Image src={ASSETS.brett} alt="Brett Russell, Director & Principal"
                fill sizes="(max-width:900px) 100vw, 50vw" priority
                style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.brett-bio-grid{grid-template-columns:1fr!important;gap:48px!important;} .brett-bio-grid>div:first-child{order:2;} .brett-bio-grid>div:last-child{order:1;}}`}</style>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section style={{ padding: '120px 0', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Heading + split layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '72px' }} className="team-intro-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom: '16px' }}>The People Behind CPP</p>
              <h2 style={{ fontSize: 'clamp(34px,4vw,52px)', color: '#fff', lineHeight: 1.1, marginBottom: '32px' }}>
                Meet the <em style={{ color: '#C9A84C', fontStyle: 'italic', fontFamily: 'Playfair Display,serif' }}>Team</em>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: '20px' }}>
                At Canberra Property Partners, we're more than just a team — we're a community of professionals united by a shared passion for delivering exceptional property management services. Each member brings a unique set of skills and a commitment to excellence, ensuring that every property we manage receives the care and attention it truly deserves.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: '20px' }}>
                Our collective expertise in property management, coupled with a deep understanding of the local Canberra market, enables us to provide a level of service that truly stands out. With Brett's leadership and serving as the primary point of contact, we've built a culture focused on adding that personal touch — something we felt was missing in the real estate sector.
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9 }}>
                Since our inception in 2017, it's been our mission to ensure that every property not only looks its best but is also managed with the utmost efficiency and care. At CPP, we're not just managing properties — we're raising the standard of property management, together as a team.
              </p>
            </div>
            {/* Team photo */}
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85"
                alt="Canberra Property Partners team"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)',
                padding: '32px 28px',
              }}>
                <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', color: '#C9A84C' }}>CANBERRA PROPERTY PARTNERS</p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>Your dedicated local team</p>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:900px){.team-intro-grid{grid-template-columns:1fr!important;}}`}</style>

          {/* Team cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Mel',      role: 'Maintenance Specialist' },
              { name: 'Amy',      role: 'Senior Property Manager' },
              { name: 'Mark',     role: 'Head of Property Management' },
              { name: 'Kyra',     role: 'Trust Account Specialist' },
              { name: 'Courtney', role: 'Operations Manager' },
            ].map((member, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '12px',
                padding: '40px 24px',
                textAlign: 'center',
                transition: 'transform 0.3s, border-color 0.3s, background 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                {/* Avatar with initials */}
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C9A84C, #e8c97a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '28px', fontFamily: 'Playfair Display,serif',
                  color: '#0A0A0A', fontWeight: 600,
                }}>
                  {member.name[0]}
                </div>
                <h3 style={{ fontSize: '20px', fontFamily: 'Playfair Display,serif', color: '#fff', marginBottom: '8px', fontWeight: 400 }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#C9A84C', fontWeight: 600, letterSpacing: '0.1em', lineHeight: 1.5 }}>
                  {member.role.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '16px' }}>Recognition</p>
          <h2 style={{ fontSize: 'clamp(34px,4vw,52px)', textAlign: 'center', marginBottom: '64px' }}>Our Awards</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px' }}>
            {awards.map((a, i) => (
              <div key={i} style={{
                background: '#F8F5F0', borderRadius: '12px', padding: '40px 28px', textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.11)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ fontSize: '36px', marginBottom: '20px' }}>🏆</div>
                <p style={{ fontFamily: 'Playfair Display,serif', fontSize: '17px', color: '#0A0A0A', lineHeight: 1.35, marginBottom: '8px' }}>{a.title}</p>
                <p style={{ fontSize: '13px', color: '#C9A84C', fontWeight: 600, letterSpacing: '0.04em' }}>{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES ── */}
      <section style={{ padding: '80px 0 80px', background: '#F8F5F0' }}>
        <div className="container">
          <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '16px' }}>What We Do</p>
          <h2 style={{ fontSize: 'clamp(34px,4vw,52px)', textAlign: 'center', marginBottom: '64px' }}>Our Services</h2>
          {services.map((s, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: '1px', background: 'rgba(201,168,76,0.35)' }} />}
              <div className="svc-list-row" style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '40px', padding: '32px 0', alignItems: 'start' }}>
                <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(48px,6vw,80px)', color: '#C9A84C', opacity: 0.4, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: '24px', color: '#0A0A0A', fontWeight: 400, marginBottom: '10px' }}>{s.title}</h3>
                  <p style={{ fontSize: '15px', color: 'rgba(10,10,10,0.6)', lineHeight: 1.8 }}>{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.svc-list-row{grid-template-columns:60px 1fr!important;gap:24px!important;} .svc-list-row>div:first-child{font-size:40px!important;}}`}</style>
      </section>



      {/* ── VIP TREATMENT ── */}
      <section style={{ padding: '120px 0', background: '#111', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="vip-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom: '20px' }}>Personalised Service</p>
              <h2 style={{ fontSize: 'clamp(36px,4.5vw,60px)', fontFamily: 'Playfair Display,serif', color: '#fff', fontWeight: 400, lineHeight: 1.1, marginBottom: '32px' }}>
                The VIP<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Treatment</em>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: '48px' }}>
                At Canberra Property Partners we deeply understand the value of your investment. The VIP treatment means you get Brett personally, ensuring your property receives the bespoke treatment it deserves.
              </p>
              <Link href="/contact" className="btn-primary">Book Free Appraisal →</Link>
            </div>
            <div>
              {vipPoints.map((pt, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '20px',
                  padding: '24px 0',
                  borderBottom: i < vipPoints.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }} />
                  <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Playfair Display,serif', fontWeight: 400 }}>{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.vip-grid{grid-template-columns:1fr!important;gap:56px!important;}}`}</style>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ padding: '120px 0', background: '#F8F5F0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '48px' }}>Client Voice</p>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '64px 56px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.08)',
            borderLeft: '4px solid #C9A84C',
            position: 'relative',
          }}>
            <div style={{ fontSize: '72px', fontFamily: 'Playfair Display,serif', color: '#C9A84C', lineHeight: 0.6, marginBottom: '28px', opacity: 0.35 }}>"</div>
            <p style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(18px,2.5vw,24px)', fontStyle: 'italic', color: '#0A0A0A', lineHeight: 1.75, marginBottom: '32px' }}>
              During the process of discussing, marketing and renting of my property it was a pleasure dealing with Brett throughout. The level of communication was excellent. The property rented within a week for the target price I had set which is surely the most important measure of an excellent property manager.
            </p>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', color: '#C9A84C' }}>— BRETT CHAPMAN</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: '15px', padding: '18px 44px' }}>Work with Brett →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
