import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const STATUS = { rent:'For Rent', sale:'For Sale', leased:'Leased', sold:'Sold' };
const STATUS_COLOR = { rent:'#C9A84C', sale:'#0A0A0A', leased:'#7A8C7E', sold:'#8B3A3A' };

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBBEFEiExQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aly7bYq6FmNXQxpKQ4FJdUCQD3Gc4HtTlxp1bi1uLUpalEqUo5JPuaUqkPJH/2Q==";

function PropertyCard({ p, index = 0 }) {
  if (!p || !p.id) return null;

  const isHoverDevice = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  return (
    <Link href={`/properties/${p.id}`} prefetch={false} style={{ display:'block', textDecoration:'none', color:'inherit' }}>
      <div style={{
        position:'relative', overflow:'hidden',
        borderRadius:'8px',
        background:'#fff',
        filter:'drop-shadow(0 2px 16px rgba(0,0,0,0.06))',
        willChange:'transform',
        contain:'layout',
        transition:'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s',
        cursor:'pointer',
      }}
        onMouseEnter={e => {
          if (!isHoverDevice()) return;
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.filter    = 'drop-shadow(0 20px 48px rgba(0,0,0,0.13))';
          const img = e.currentTarget.querySelector('.card-img');
          if (img) img.style.transform = 'scale(1.06)';
        }}
        onMouseLeave={e => {
          if (!isHoverDevice()) return;
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.filter    = 'drop-shadow(0 2px 16px rgba(0,0,0,0.06))';
          const img = e.currentTarget.querySelector('.card-img');
          if (img) img.style.transform = 'scale(1)';
        }}
      >
        {/* Image */}
        <div style={{ position:'relative', paddingTop:'62%', overflow:'hidden', background:'#E8E4DF' }}>
          <Image
            className="card-img"
            src={p.blobUrl || p.image || '/images/prop.jpeg'}
            alt={p.address || ''}
            fill
            priority={index < 3}
            placeholder="blur"
            blurDataURL={p.blurDataURL || BLUR_PLACEHOLDER}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            style={{ objectFit:'cover', transition:'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
          />

          {/* Status pill */}
          <div style={{
            position:'absolute', top:'16px', left:'16px',
            padding:'5px 14px',
            background: STATUS_COLOR[p.status],
            color: (p.status==='sale' || p.status==='sold') ? '#fff' : '#0A0A0A',
            fontSize:'10px', fontWeight:600, letterSpacing:'0.1em',
            borderRadius:'100px',
          }}>{STATUS[p.status]}</div>

          {p.featured && (
            <div style={{
              position:'absolute', top:'16px', right:'16px',
              padding:'5px 14px',
              background:'rgba(10,10,10,0.82)',
              color:'#C9A84C',
              fontSize:'10px', fontWeight:600, letterSpacing:'0.1em',
              borderRadius:'100px',
            }}>Featured</div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding:'24px' }}>
          <p style={{ fontSize:'22px', fontFamily:'Playfair Display, serif', marginBottom:'4px', lineHeight:1.2 }}>{p.address || '—'}</p>
          <p style={{ fontSize:'13px', color:'#7A8C7E', marginBottom:'16px' }}>{p.suburb || ''}</p>

          <div style={{ display:'flex', gap:'20px', marginBottom:'20px' }}>
            {[
              { v:p.beds,  l:'bed'  },
              { v:p.baths, l:'bath' },
              { v:p.cars,  l:'car'  },
            ].map(f => (
              <div key={f.l} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'15px', fontWeight:600 }}>{f.v}</span>
                <span style={{ fontSize:'12px', color:'rgba(10,10,10,0.4)', letterSpacing:'0.06em' }}>{f.l.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'16px', borderTop:'1px solid rgba(10,10,10,0.07)' }}>
            <p style={{ fontSize:'20px', fontFamily:'Playfair Display, serif', fontWeight:500 }}>{p.price}{(p.status === 'sale' || p.status === 'sold') && p.price?.startsWith('$') ? '+' : ''}</p>
            <div style={{
              width:'36px', height:'36px', borderRadius:'50%',
              background:'#0A0A0A',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontSize:'16px',
              transition:'background 0.2s',
            }}>→</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(PropertyCard);
