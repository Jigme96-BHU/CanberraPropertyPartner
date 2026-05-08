import Link from 'next/link';
import { ASSETS } from '../data';

export default function Footer() {
  return (
    <footer style={{ background:'#0A0A0A', color:'#fff', padding:'80px 0 40px' }}>
      <div className="container">
        <div style={{
          display:'grid',
          gridTemplateColumns:'2fr 1fr 1fr 1fr',
          gap:'48px',
          paddingBottom:'64px',
          borderBottom:'1px solid rgba(255,255,255,0.08)',
        }} className="footer-grid">

          <div>
            <img src={ASSETS.logoLight} alt="CPP" style={{ height:'40px', marginBottom:'24px', filter:'brightness(10)' }} />
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.5)', lineHeight:1.8, maxWidth:'280px' }}>
              Canberra's most personal real estate service. Award-winning technology, genuine human care.
            </p>
            <div style={{ display:'flex', gap:'12px', marginTop:'28px' }}>
              {[
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/CanberraPropertyPartners',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/canberra_property_partners',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/canberra-property-partners',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                  width:'36px', height:'36px',
                  border:'1px solid rgba(255,255,255,0.15)',
                  borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'rgba(255,255,255,0.5)',
                  transition:'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.color='#C9A84C'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.color='rgba(255,255,255,0.5)'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {[
            { title:'Properties', links:[
              {href:'/properties?status=rent', label:'For Rent'},
              {href:'/properties?status=sale', label:'For Sale'},
              {href:'/properties?status=leased', label:'Sold & Leased'},
            ]},
            { title:'Services', links:[
              {href:'/rental', label:'Rental Management'},
              {href:'/sales', label:'Property Sales'},
              {href:'/about', label:'About Us'},
              {href:'/awards', label:'Awards'},
            ]},
            { title:'Contact', links:[
              {href:'tel:0409882375', label:'0409 882 375'},
              {href:'mailto:cpp@email.propertyme.com', label:'Email Us'},
              {href:'/contact', label:'Book Appraisal'},
            ]},
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.16em', color:'#C9A84C', marginBottom:'20px' }}>{col.title.toUpperCase()}</p>
              {col.links.map(l => (
                <Link key={l.label} href={l.href} style={{ display:'block', fontSize:'14px', color:'rgba(255,255,255,0.5)', marginBottom:'12px', transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}
                >{l.label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ paddingTop:'32px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Canberra Property Partners · Licensed Real Estate Agent ACT
          </p>
          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.2)' }}>10/12 Cheney Place, Mitchell ACT 2911</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </footer>
  );
}
