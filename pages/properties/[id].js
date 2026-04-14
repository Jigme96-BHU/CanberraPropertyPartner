import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { fetchREAXML } from '../../lib/hetzner';
import { parseREAXML } from '../../lib/parseListings';
import { properties as mockProperties } from '../../data';

const STATUS_LABEL = { rent: 'For Rent', sale: 'For Sale', leased: 'Leased' };
const AGENT_ID = 'CanberraPP';

function buildBookingURL(p) {
  const type     = p.status === 'rent' ? 'rental' : 'sale';
  const imgURL   = encodeURIComponent(p.image);
  const uniqueID = p.ireID || p.id;
  return `https://book.inspectrealestate.com.au/Register?agentid=${AGENT_ID}&uniqueID=${uniqueID}&imgURL=${imgURL}&Type=${type}`;
}

function buildApplyURL(p) {
  return `https://www.2apply.com.au/Form?agentid=${AGENT_ID}&uniqueID=${p.ireID || p.id}`;
}


// ── PropertyDescription ──────────────────────────────────────
// Parses the REAXML description text into clean formatted sections.
// Handles:
// - HTML entities (&quot; &#39; &amp;)
// - Bullet point lines starting with -
// - Numbered lists starting with 1. 2. 3.
// - Section headers ending with : (e.g. "Features include:")
// - Regular paragraphs
function PropertyDescription({ text }) {
  if (!text) return null;

  // Decode HTML entities
  const decoded = text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

  // Split into lines and clean up
  const lines = decoded
    .split(/\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  // Group lines into blocks
  const blocks = [];
  let currentBullets = [];
  let currentNumbered = [];

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      blocks.push({ type: 'bullets', items: [...currentBullets] });
      currentBullets = [];
    }
  };
  const flushNumbered = () => {
    if (currentNumbered.length > 0) {
      blocks.push({ type: 'numbered', items: [...currentNumbered] });
      currentNumbered = [];
    }
  };

  lines.forEach(line => {
    // Bullet point — starts with - or •
    if (/^[-•]\s+/.test(line)) {
      flushNumbered();
      currentBullets.push(line.replace(/^[-•]\s+/, ''));
    }
    // Numbered list — starts with 1. 2. etc
    else if (/^\d+\.\s+/.test(line)) {
      flushBullets();
      currentNumbered.push(line.replace(/^\d+\.\s+/, ''));
    }
    // Section header — short line ending with :
    else if (line.endsWith(':') && line.length < 60) {
      flushBullets();
      flushNumbered();
      blocks.push({ type: 'heading', text: line });
    }
    // Regular paragraph
    else {
      flushBullets();
      flushNumbered();
      blocks.push({ type: 'paragraph', text: line });
    }
  });

  flushBullets();
  flushNumbered();

  return (
    <div style={{ marginBottom: '40px' }}>
      {blocks.map((block, i) => {
        if (block.type === 'paragraph') {
          return (
            <p key={i} style={{
              fontSize: '15px', color: 'rgba(10,10,10,0.65)',
              lineHeight: 1.85, marginBottom: '16px',
            }}>
              {block.text}
            </p>
          );
        }

        if (block.type === 'heading') {
          return (
            <h4 key={i} style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '18px', color: '#0A0A0A',
              marginTop: '32px', marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid rgba(10,10,10,0.08)',
            }}>
              {block.text}
            </h4>
          );
        }

        if (block.type === 'bullets') {
          return (
            <ul key={i} style={{
              listStyle: 'none', padding: 0, margin: '0 0 20px 0',
            }}>
              {block.items.map((item, j) => (
                <li key={j} style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                  fontSize: '15px', color: 'rgba(10,10,10,0.65)',
                  lineHeight: 1.7, paddingBottom: '8px',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#C9A84C', flexShrink: 0, marginTop: '8px',
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'numbered') {
          return (
            <ol key={i} style={{
              listStyle: 'none', padding: 0, margin: '0 0 20px 0', counterReset: 'item',
            }}>
              {block.items.map((item, j) => (
                <li key={j} style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  fontSize: '15px', color: 'rgba(10,10,10,0.65)',
                  lineHeight: 1.7, paddingBottom: '8px',
                }}>
                  <span style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: '#F8F5F0', border: '1px solid rgba(10,10,10,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 600, color: '#0A0A0A',
                    flexShrink: 0, marginTop: '3px',
                  }}>
                    {j + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function PropertyDetail({ properties }) {
  const router = useRouter();
  const { id } = router.query;
  const p = properties?.find(x =>
    String(x.id) === String(id) ||
    String(x.ireID) === String(id)
  );

  // All images — use images array if available, fall back to single image
  const allImages = (p?.images?.length > 0 ? p.images : [p?.image]).filter(Boolean);
  // ── infinite scroll carousel ─────────────────────────────────
  const CLONES = 3;
  const n      = allImages.length;
  // Build cloned array: last-3 + real images + first-3 (loops cleanly)
  const cloned = n > 0 ? [
    ...Array.from({ length: CLONES }, (_, i) => allImages[(n - CLONES + i + n) % n]),
    ...allImages,
    ...Array.from({ length: CLONES }, (_, i) => allImages[i % n]),
  ] : [];

  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const idxRef       = useRef(CLONES);  // start at real index 0 (after prepended clones)
  const stepRef      = useRef(0);       // px to move per slide

  const [slotW,      setSlotW]      = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [busy,       setBusy]       = useState(false);
  const [ready,      setReady]      = useState(false);

  // Compute slot width + step from current container size
  const computeLayout = () => {
    if (!containerRef.current) return;
    const w   = containerRef.current.offsetWidth;
    const mob = w <= 768;
    const sw  = mob ? w : (w - 8) / 3;
    stepRef.current = mob ? w : sw + 4;
    setSlotW(sw);
  };

  // Apply transform directly on the DOM node (avoids React re-render lag)
  const applyTransform = (idx, animate) => {
    if (!trackRef.current || !stepRef.current) return;
    trackRef.current.style.transition = animate
      ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'none';
    trackRef.current.style.transform = `translateX(${-(idx * stepRef.current)}px)`;
  };

  useEffect(() => {
    if (!n) return;
    const onResize = () => { computeLayout(); applyTransform(idxRef.current, false); };
    const raf = requestAnimationFrame(() => {
      computeLayout();
      applyTransform(idxRef.current, false);
      setReady(true);
    });
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const move = (dir) => {
    if (busy || !n || !stepRef.current) return;
    setBusy(true);
    const newIdx = idxRef.current + dir;
    idxRef.current = newIdx;
    applyTransform(newIdx, true);
    setDisplayIdx(((newIdx - CLONES) % n + n) % n);
  };

  const onTransitionEnd = () => {
    const idx = idxRef.current;
    let snap  = null;
    if (idx >= n + CLONES) snap = idx - n;
    else if (idx < CLONES) snap = idx + n;
    if (snap !== null) {
      idxRef.current = snap;
      applyTransform(snap, false);
    }
    setBusy(false);
  };

  if (!p && router.isReady) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight:'100vh', background:'#0A0A0A', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px' }}>
          <p style={{ fontFamily:'Playfair Display,serif', fontSize:'32px', color:'#fff' }}>Property not found</p>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'15px' }}>This listing may have been removed or is no longer available.</p>
          <Link href="/properties" style={{ color:'#C9A84C', fontSize:'14px', marginTop:'8px' }}>← Back to all properties</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!p) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <p style={{ color:'rgba(255,255,255,0.4)', fontFamily:'Outfit,sans-serif' }}>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  const isRental = p.status === 'rent';

  return (
    <>
      <SEO
        title={`${p.address}, ${p.suburb} — ${STATUS_LABEL[p.status]}`}
        description={`${p.type} ${STATUS_LABEL[p.status]?.toLowerCase()} in ${p.suburb}. ${p.beds} bed, ${p.baths} bath, ${p.cars} car. ${p.price}.`}
        image={allImages[0]}
        url={`/properties/${p.id}`}
      />

      <Navbar />

      {/* ── GALLERY ─────────────────────────────────────────────
          Clean full-width gallery — no dark overlay crushing the photos.
          Main image takes full width at a generous height.
          Thumbnail strip below for navigation.
      ── */}
      <div style={{ background:'#0A0A0A', paddingTop:'72px' }}>

        {/* Back button */}
        <div className="container" style={{ paddingTop:'24px', paddingBottom:'16px' }}>
          <Link href="/properties" style={{
            display:'inline-flex', alignItems:'center', gap:'6px',
            color:'rgba(255,255,255,0.5)', fontSize:'13px', fontWeight:500,
            letterSpacing:'0.04em', transition:'color 0.2s', textDecoration:'none',
          }}
            onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}
          >
            ← All Properties
          </Link>
        </div>

        {/* ── INFINITE SCROLL CAROUSEL ── */}
        {n > 0 && (
          <div
            ref={containerRef}
            style={{ position:'relative', overflow:'hidden', opacity: ready ? 1 : 0, transition:'opacity 0.3s' }}
          >
            {/* Track — all cloned + real images in one row */}
            <div
              ref={trackRef}
              style={{ display:'flex', gap:'4px', willChange:'transform' }}
              onTransitionEnd={onTransitionEnd}
            >
              {cloned.map((src, i) => (
                <div key={i} style={{ position:'relative', flex:`0 0 ${slotW}px`, height:'380px', overflow:'hidden', flexShrink:0, background:'#E8E4DF' }}>
                  <Image
                    src={src}
                    alt={`${p.address} — photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={i <= CLONES + 2}
                    style={{ objectFit:'cover' }}
                  />
                </div>
              ))}
            </div>

            {/* Image counter */}
            <div style={{
              position:'absolute', bottom:'12px', right:'12px',
              background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)',
              color:'#fff', fontSize:'12px', fontWeight:500,
              padding:'5px 12px', borderRadius:'100px', letterSpacing:'0.06em',
              pointerEvents:'none',
            }}>
              {displayIdx + 1} / {n}
            </div>

            {/* Prev arrow */}
            <button
              onClick={() => move(-1)}
              disabled={busy}
              style={{
                position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)',
                background:'rgba(10,10,10,0.55)', backdropFilter:'blur(8px)',
                border:'none', color:'#fff', width:'48px', height:'48px',
                borderRadius:'50%', fontSize:'22px', cursor: busy ? 'default' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'background 0.2s, color 0.2s',
                opacity: busy ? 0.5 : 1,
              }}
              onMouseEnter={e => { if (!busy) { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#0A0A0A'; }}}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(10,10,10,0.55)'; e.currentTarget.style.color='#fff'; }}
            >‹</button>

            {/* Next arrow */}
            <button
              onClick={() => move(1)}
              disabled={busy}
              style={{
                position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
                background:'rgba(10,10,10,0.55)', backdropFilter:'blur(8px)',
                border:'none', color:'#fff', width:'48px', height:'48px',
                borderRadius:'50%', fontSize:'22px', cursor: busy ? 'default' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'background 0.2s, color 0.2s',
                opacity: busy ? 0.5 : 1,
              }}
              onMouseEnter={e => { if (!busy) { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#0A0A0A'; }}}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(10,10,10,0.55)'; e.currentTarget.style.color='#fff'; }}
            >›</button>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <section style={{ background:'#F8F5F0', padding:'48px 0 100px' }}>
        <div className="container">

          {/* Address + status badge */}
          <div style={{ marginBottom:'40px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px', flexWrap:'wrap' }}>
              <span style={{
                padding:'4px 14px', borderRadius:'100px', fontSize:'11px', fontWeight:600,
                letterSpacing:'0.1em', background: isRental ? '#C9A84C' : '#0A0A0A', color:'#fff',
              }}>
                {STATUS_LABEL[p.status].toUpperCase()}
              </span>
              <span style={{ fontSize:'13px', color:'rgba(10,10,10,0.4)' }}>{p.type}</span>
            </div>
            <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,48px)', color:'#0A0A0A', fontWeight:400, lineHeight:1.1, marginBottom:'8px' }}>
              {p.address}
            </h1>
            <p style={{ fontSize:'17px', color:'rgba(10,10,10,0.5)' }}>{p.suburb}</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:'48px', alignItems:'start' }} className="detail-grid">

            {/* ── LEFT ── */}
            <div>

              {/* Stats bar */}
              <div style={{
                display:'grid', gridTemplateColumns:'repeat(4,1fr)',
                background:'#fff', border:'1px solid rgba(10,10,10,0.08)',
                borderRadius:'12px', overflow:'hidden', marginBottom:'40px',
              }}>
                {[
                  { v: p.beds,  l: 'Bedrooms',   icon: '🛏' },
                  { v: p.baths, l: 'Bathrooms',  icon: '🚿' },
                  { v: p.cars,  l: 'Car spaces',  icon: '🚗' },
                  { v: p.type,  l: 'Type',        icon: '🏠' },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding:'24px 16px', textAlign:'center',
                    borderRight: i < 3 ? '1px solid rgba(10,10,10,0.08)' : 'none',
                  }}>
                    <div style={{ fontSize:'20px', marginBottom:'6px' }}>{s.icon}</div>
                    <div style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', color:'#0A0A0A', lineHeight:1, marginBottom:'4px' }}>{s.v}</div>
                    <div style={{ fontSize:'10px', color:'rgba(10,10,10,0.35)', letterSpacing:'0.08em' }}>{s.l.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              {/* Description — smart renderer */}
              <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'26px', marginBottom:'24px' }}>About this property</h2>
              <PropertyDescription text={p.desc} />

              {/* Property details grid */}
              <div style={{ background:'#fff', borderRadius:'12px', padding:'32px', border:'1px solid rgba(10,10,10,0.07)' }}>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', marginBottom:'24px' }}>Property details</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }}>
                  {[
                    { l:'Address',    v: p.address },
                    { l:'Suburb',     v: p.suburb },
                    { l:'Type',       v: p.type },
                    { l:'Status',     v: STATUS_LABEL[p.status] },
                    { l:'Price',      v: p.price },
                    { l:'Bedrooms',   v: p.beds },
                    { l:'Bathrooms',  v: p.baths },
                    { l:'Car spaces', v: p.cars },
                    ...(p.bond ? [{ l:'Bond', v: `$${parseFloat(p.bond).toLocaleString()}` }] : []),
                    ...(p.available ? [{ l:'Available', v: p.available }] : []),
                  ].map((d, i) => (
                    <div key={i} style={{ padding:'14px 0', borderBottom:'1px solid rgba(10,10,10,0.06)' }}>
                      <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.35)', marginBottom:'4px' }}>{d.l.toUpperCase()}</p>
                      <p style={{ fontSize:'15px', color:'#0A0A0A' }}>{d.v}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── RIGHT: Sticky sidebar ── */}
            <div style={{ position:'sticky', top:'100px' }}>

              {/* Price + action buttons */}
              <div style={{ background:'#0A0A0A', borderRadius:'12px', padding:'32px', marginBottom:'16px' }}>
                <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', marginBottom:'6px' }}>
                  {isRental ? 'WEEKLY RENT' : 'ASKING PRICE'}
                </p>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'40px', color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>
                  {p.price}
                </p>
                {p.priceView && p.priceView !== p.price && (
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.3)', marginBottom:'28px' }}>{p.priceView}</p>
                )}

                <div style={{ height:'1px', background:'rgba(255,255,255,0.08)', marginBottom:'28px' }} />

                {/* Book Inspection */}
                <a href={buildBookingURL(p)} target="_blank" rel="noopener noreferrer" style={{
                  display:'block', width:'100%', padding:'16px',
                  background:'#C9A84C', color:'#0A0A0A',
                  textAlign:'center', fontFamily:'Outfit,sans-serif',
                  fontWeight:700, fontSize:'13px', letterSpacing:'0.08em',
                  borderRadius:'8px', marginBottom:'10px',
                  transition:'all 0.2s', textDecoration:'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background='#E8C97A'; e.currentTarget.style.transform='translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.transform='none'; }}
                >
                  Book Inspection
                </a>

                {/* Apply Now — rentals only */}
                {isRental && (
                  <a href={buildApplyURL(p)} target="_blank" rel="noopener noreferrer" style={{
                    display:'block', width:'100%', padding:'16px',
                    background:'transparent', border:'1px solid rgba(255,255,255,0.2)',
                    color:'#fff', textAlign:'center', fontFamily:'Outfit,sans-serif',
                    fontWeight:600, fontSize:'13px', letterSpacing:'0.08em',
                    borderRadius:'8px', marginBottom:'10px',
                    transition:'all 0.2s', textDecoration:'none',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.color='#C9A84C'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='#fff'; }}
                  >
                    Apply Now
                  </a>
                )}

                {/* General enquiry */}
                <Link href="/contact" style={{
                  display:'block', width:'100%', padding:'16px',
                  background:'transparent', border:'1px solid rgba(255,255,255,0.08)',
                  color:'rgba(255,255,255,0.45)', textAlign:'center',
                  fontFamily:'Outfit,sans-serif', fontWeight:500, fontSize:'13px',
                  borderRadius:'8px', transition:'all 0.2s', textDecoration:'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.45)'; }}
                >
                  General Enquiry
                </Link>
              </div>

              {/* Agency card */}
              <div style={{ background:'#fff', borderRadius:'12px', padding:'24px', border:'1px solid rgba(10,10,10,0.08)' }}>
                <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', color:'rgba(10,10,10,0.35)', marginBottom:'16px' }}>LISTED BY</p>
                <p style={{ fontFamily:'Playfair Display,serif', fontSize:'18px', marginBottom:'4px' }}>Canberra Property Partners</p>
                <p style={{ fontSize:'13px', color:'rgba(10,10,10,0.4)', marginBottom:'20px' }}>Licensed Real Estate Agent ACT</p>
                <a href="tel:0261030843" style={{
                  display:'block', padding:'12px', textAlign:'center',
                  border:'1px solid rgba(10,10,10,0.15)', borderRadius:'8px',
                  fontSize:'13px', fontWeight:600, color:'#0A0A0A',
                  transition:'all 0.2s', textDecoration:'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background='#0A0A0A'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#0A0A0A'; }}
                >
                  02 6103 0843
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .thumbnail-strip::-webkit-scrollbar { display: none; }
        .thumbnail-strip { padding-left: max(24px, calc((100vw - 1280px) / 2)); padding-right: max(24px, calc((100vw - 1280px) / 2)); }
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .detail-grid > div:last-child { position: static !important; }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const xml = await fetchREAXML();
    const liveListings = xml ? await parseREAXML(xml) : [];
    const paths = liveListings.length > 0
      ? liveListings.map(p => ({ params: { id: String(p.id) } }))
      : mockProperties.map(p => ({ params: { id: String(p.id) } }));
    return { paths, fallback: false };
  } catch {
    return {
      paths: mockProperties.map(p => ({ params: { id: String(p.id) } })),
      fallback: false,
    };
  }
}

export async function getStaticProps() {
  try {
    const xml = await fetchREAXML();
    const liveListings = xml ? await parseREAXML(xml) : [];
    return {
      props: { properties: liveListings.length > 0 ? liveListings : mockProperties },
      revalidate: 300,
    };
  } catch {
    return {
      props: { properties: mockProperties },
      revalidate: 300,
    };
  }
}
