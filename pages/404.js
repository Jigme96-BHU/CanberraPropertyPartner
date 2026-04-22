import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight:'100vh', background:'#0A0A0A',
        display:'flex', alignItems:'center', justifyContent:'center',
        flexDirection:'column', textAlign:'center',
        padding:'120px 24px 80px', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(120px,20vw,200px)', fontWeight:700, color:'rgba(255,255,255,0.04)', lineHeight:1, marginBottom:'-20px', userSelect:'none' }}>404</div>
          <p className="eyebrow" style={{ marginBottom:'16px' }}>Page Not Found</p>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(36px,5vw,60px)', color:'#fff', fontWeight:400, marginBottom:'20px', lineHeight:1.1 }}>
            Lost in the<br />property market?
          </h1>
          <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.4)', marginBottom:'52px', lineHeight:1.7, maxWidth:'400px', margin:'0 auto 52px' }}>
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/" className="btn-primary">Back to Home →</Link>
            <Link href="/properties" className="btn-ghost-white">Browse Properties</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
