import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ASSETS } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);


  const links = [
    { href: '/',           label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/rental',     label: 'Rental' },
    { href: '/sales',      label: 'Sales' },
    { href: '/about',      label: 'About' },
    { href: '/awards',     label: 'Awards' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? '10px 0' : '20px 0',
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center' }}>
            <img src={ASSETS.logoLight} alt="Canberra Property Partners"
              style={{ height: scrolled ? '24px' : '28px', width:'auto', transition:'height 0.3s', filter:'brightness(10)' }} />
          </Link>

          {/* Desktop links */}
          <div className="nav-links" style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding:'8px 16px',
                fontSize:'13px', fontWeight:500, letterSpacing:'0.04em',
                color:'rgba(255,255,255,0.8)',
                borderRadius:'100px',
                transition:'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.8)'; e.currentTarget.style.background='transparent'; }}
              >{l.label}</Link>
            ))}
            <Link href="/contact" style={{
              marginLeft:'8px',
              padding:'10px 24px',
              background:'#C9A84C',
              color:'#0A0A0A',
              fontSize:'13px', fontWeight:600, letterSpacing:'0.04em',
              borderRadius:'100px',
              transition:'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='#E8C97A'; e.currentTarget.style.transform='scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.transform='scale(1)'; }}
            >Free Appraisal</Link>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setOpen(!open)} style={{
            display:'none', background:'none', border:'none',
            flexDirection:'column', gap:'5px', padding:'4px',
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:'block', width:'22px', height:'2px', background:'#fff',
                borderRadius:'2px', transition:'all 0.3s',
                transform: open ? (i===0?'rotate(45deg) translate(5px,5px)':i===2?'rotate(-45deg) translate(5px,-5px)':'scaleX(0)') : 'none',
                opacity: open && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', inset:0, zIndex:190,
          background:'rgba(10,10,10,0.98)',
          backdropFilter:'blur(24px)',
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          gap:'8px',
        }}>
          <img src={ASSETS.logoLight} alt="CPP" style={{ height:'48px', marginBottom:'32px', filter:'brightness(10)' }} />
          {[...links, { href:'/contact', label:'Free Appraisal' }].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontSize:'32px', fontFamily:'Playfair Display, serif',
              color:'rgba(255,255,255,0.85)', padding:'8px 0',
              transition:'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.85)'}
            >{l.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
