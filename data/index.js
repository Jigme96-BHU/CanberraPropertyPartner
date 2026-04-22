// ── Self-hosted assets (all files in /public) ────────────────────
export const ASSETS = {
  logoLight:   '/images/logo-light.svg',
  logoDark:    '/images/logo-dark.svg',
  logoFooter:  '/images/logo-footer.png',
  videoHero:   '/videos/hero-home.mp4',
  videoAwards: '/videos/hero-awards.mp4',
  brett:       '/images/brett.jpeg',
  reia2021:    '/awards/reiact-2021.jpeg',
  reia2022:    '/awards/reia-2022.jpeg',
  reiaBadge:   '/awards/reia-badge.png',
  excellence21:'/awards/excellence-2021.svg',
  award21:     '/awards/laf-2021.svg',
  award20:     '/awards/laf-2020.svg',
  award19:     '/awards/laf-2019.svg',
  infographic: '/images/infographic.svg',
  icons: {
    photography:'/icons/photography.svg',
    inspection: '/icons/inspection.svg',
    vetting:    '/icons/vetting.svg',
    maintenance:'/icons/maintenance.svg',
    insurance:  '/icons/insurance.svg',
    portal:     '/icons/portal.svg',
    report:     '/icons/report.svg',
    utilities:  '/icons/utilities.svg',
    collection: '/icons/collection.svg',
    statement:  '/icons/statement.svg',
    appraise:   '/icons/appraise.svg',
    issues:     '/icons/issues.svg',
    advise:     '/icons/advise.svg',
    communicate:'/icons/communicate.svg',
    market:     '/icons/market.svg',
  }
};

// ── Mock property listings ───────────────────────────────────────
// NOTE: ireID is the uniqueID from Reapit's REAXML feed.
// This is what gets passed to the Book Inspection and Apply Now buttons.
// Currently using the real IRE IDs provided by Reapit for testing:
//   - IRE5931787 = G17-17 Summerfield Close, DENMAN PROSPECT (rental)
//   - IRE5890924 = 11 Winton Place, Holder (sale)
// When REAXML via FTP is connected, every property will have its real ireID
// automatically from the XML feed — these placeholder ones won't be needed.
export const properties = [
  {
    id: 1, status: 'rent', price: '$620 /wk',
    address: '14 Rosewood Circuit', suburb: 'Gungahlin ACT 2912',
    beds: 4, baths: 2, cars: 2, type: 'House', featured: true,
    // Real IRE ID from Reapit (rental test listing)
    ireID: 'IRE5931787',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    desc: 'Spacious family home in the heart of Gungahlin with modern finishes throughout and a large entertaining area.',
  },
  {
    id: 2, status: 'rent', price: '$480 /wk',
    address: '7/32 Allara Street', suburb: 'City ACT 2601',
    beds: 2, baths: 1, cars: 1, type: 'Apartment', featured: false,
    ireID: 'IRE5931787', // using same test ID until real feed is connected
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    desc: 'Stylish inner-city apartment with stunning views over the city skyline and premium building amenities.',
  },
  {
    id: 3, status: 'sale', price: '$1,150,000',
    address: '22 Wattle Street', suburb: "O'Connor ACT 2602",
    beds: 4, baths: 2, cars: 2, type: 'House', featured: true,
    // Real IRE ID from Reapit (sale test listing)
    ireID: 'IRE5890924',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    desc: "Classic O'Connor character home on a generous 780sqm block with original features and a north-facing garden.",
  },
  {
    id: 4, status: 'rent', price: '$550 /wk',
    address: '3 Brigalow Street', suburb: 'Watson ACT 2602',
    beds: 3, baths: 1, cars: 1, type: 'House', featured: false,
    ireID: 'IRE5931787',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    desc: 'Charming Watson cottage with mature gardens, original hardwood floors and a sun-filled rear deck.',
  },
  {
    id: 5, status: 'sale', price: '$895,000',
    address: '15 Pindari Crescent', suburb: 'Nicholls ACT 2913',
    beds: 4, baths: 2, cars: 2, type: 'House', featured: false,
    ireID: 'IRE5890924',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    desc: 'Beautifully presented family home in sought-after Nicholls, moments from Gungahlin Town Centre.',
  },
  // ── Leased (real properties from REAXML feed) ─────────────────
  {
    id: 6, status: 'leased', price: '$680 /wk', available: '2025-11-10',
    address: '6 Elia Ware Crescent', suburb: 'Bonner ACT 2914',
    beds: 3, baths: 2, cars: 2, type: 'House', featured: false, ireID: 'IRE1964032',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/f88646ab%2D33f9%2D4583%2D9a1f%2D54123fe1de25.jpg',
    desc: 'Stunning family home in Bonner with large open-plan living, alfresco entertaining area, solar panels and alarm system.',
  },
  {
    id: 7, status: 'leased', price: '$1,300 /wk', available: '2025-12-05',
    address: '30 Chipp Street', suburb: 'Coombs ACT 2611',
    beds: 5, baths: 3, cars: 2, type: 'House', featured: false, ireID: 'IRE1973499',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/ff55777f%2D0ea4%2Dcd9c%2D694d%2Dae86cae8c35b.jpg',
    desc: 'Expansive executive family home in Coombs with premium finishes, multiple living areas and a large entertainer\'s yard.',
  },
  {
    id: 8, status: 'leased', price: '$780 /wk', available: '2026-01-18',
    address: '76 Bellhouse Crescent', suburb: 'Moncrieff ACT 2914',
    beds: 4, baths: 2, cars: 2, type: 'House', featured: false, ireID: 'IRE2169582',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/5f31ff92%2D1f5c%2D60ae%2D236f%2Dd2aae156a2cb.jpg',
    desc: 'Generous family home in Moncrieff with four bedrooms, double garage and easy access to schools and Gungahlin Town Centre.',
  },
  {
    id: 9, status: 'leased', price: '$850 /wk', available: '2026-02-03',
    address: '2 Finn Street', suburb: "O'Connor ACT 2602",
    beds: 3, baths: 1, cars: 2, type: 'House', featured: false, ireID: 'IRE1995787',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/1ea9e611%2Dbd02%2D486d%2D9e95%2D94764c045a3d.jpg',
    desc: "Classic O'Connor character home with original period features, mature gardens and a sought-after inner-north location.",
  },
  {
    id: 10, status: 'leased', price: '$1,100 /wk', available: '2026-03-14',
    address: '48 Printers Way', suburb: 'Kingston ACT 2604',
    beds: 3, baths: 2, cars: 2, type: 'Townhouse', featured: false, ireID: 'IRE4791701',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/da1b003c%2D5f81%2Da153%2Df7d9%2D4d01a8ce3113.jpg',
    desc: 'Premium Kingston townhouse walking distance to the foreshore, cafes and restaurants. High-end finishes throughout.',
  },
  {
    id: 11, status: 'leased', price: '$760 /wk', available: '2026-04-01',
    address: '94 Summerville Crescent', suburb: 'Florey ACT 2615',
    beds: 4, baths: 2, cars: 2, type: 'House', featured: false, ireID: 'IRE4776419',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/0c6643d3%2Decc7%2D81c7%2D6202%2D693ffc04c320.jpg',
    desc: 'Well-presented family home in Florey on a large block with established gardens, dual living and ample parking.',
  },
  // ── Sold (real properties from REAXML feed) ───────────────────
  {
    id: 12, status: 'sold', price: '$995,000', available: '2025-11-22',
    address: '14 Carmody Street', suburb: 'Casey ACT 2913',
    beds: 4, baths: 2, cars: 2, type: 'House', featured: false, ireID: 'IRE4043411',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/3423151b%2Daa62%2Daaef%2D6a1d%2D36cf77cb1bef.jpg',
    desc: 'Beautifully presented family home in Casey with four bedrooms, open-plan living and premium inclusions throughout.',
  },
  {
    id: 13, status: 'sold', price: '$1,199,000', available: '2025-12-08',
    address: '41 Pokana Circuit', suburb: 'Kaleen ACT 2617',
    beds: 5, baths: 2, cars: 4, type: 'House', featured: false, ireID: 'IRE3839934',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/b458b85c%2Daab3%2D5e03%2De2f1%2D12b5a6100f1f.jpg',
    desc: 'Impressive executive home on a corner block in Kaleen with five bedrooms, multiple living areas and four-car garage.',
  },
  {
    id: 14, status: 'sold', price: '$899,000', available: '2026-01-29',
    address: '11 McGlinn Place', suburb: 'Gowrie ACT 2904',
    beds: 3, baths: 2, cars: 2, type: 'House', featured: false, ireID: 'IRE3748491',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/35dd6279%2Dfdbd%2D32ca%2D74f4%2Dd362e49dd08d.jpg',
    desc: 'Immaculate family home in quiet Gowrie cul-de-sac with modern kitchen, alfresco entertaining and double garage.',
  },
  {
    id: 15, status: 'sold', price: '$1,029,000', available: '2026-02-17',
    address: '50 Louisa Briggs Circuit', suburb: 'Bonner ACT 2914',
    beds: 4, baths: 2, cars: 2, type: 'House', featured: false, ireID: 'IRE4584495',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/02748c38%2D06b8%2Dab6f%2D61cd%2Dc7f93a1ad1fc.jpg',
    desc: 'Stunning Bonner family home sold above reserve — spacious open-plan design, quality finishes and landscaped gardens.',
  },
  {
    id: 16, status: 'sold', price: '$749,000', available: '2026-03-05',
    address: '128/217 Northbourne Avenue', suburb: 'Turner ACT 2612',
    beds: 3, baths: 3, cars: 2, type: 'Apartment', featured: false, ireID: 'IRE3633570',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/28322fe9%2Dcf55%2D01dc%2Dec00%2Da95c2d5b2f9e.jpg',
    desc: 'Generous 3-bedroom apartment in the sought-after Turner precinct with dual bathrooms and secure parking for two.',
  },
  {
    id: 17, status: 'sold', price: '$819,000', available: '2026-04-10',
    address: '66 Plimsoll Drive', suburb: 'Casey ACT 2913',
    beds: 4, baths: 2, cars: 2, type: 'Townhouse', featured: false, ireID: 'IRE5327390',
    image: 'https://inspectre.blob.core.windows.net/xmluploadedfiles/6fb7e2f1-6240-4680-a0ce-b0d0edc7d362/8538af1b%2D5258%2D4ad6%2Dbe28%2D3ff131ec87ec.jpg',
    desc: 'Contemporary 4-bedroom townhouse in Casey sold at auction — modern finishes, great light and low-maintenance courtyard.',
  },
];

// ── Real testimonials from CPP ───────────────────────────────────
export const testimonials = [
  { name: 'D. Lai',      text: 'CPP introduced me to the concept of a 3D walkthrough on my new investment property. Three days after listing, multiple applications were received at full asking price.' },
  { name: 'B. Chapman',  text: 'The level of communication was excellent, including the written summary with each open house. The property sold within a month for the exact target price I had set.' },
  { name: 'G. McPhee',   text: 'Brett did a wonderful job selling our home. I felt we were a team throughout — he was available for advice and help at all times.' },
  { name: 'V. Perry',    text: 'Paul was a delight to deal with. This was not only a professional venture but a well-developed friendship.' },
  { name: 'J. Aubertine',text: 'It was a pleasure to deal with someone who made the property available for viewing that fit our schedule. The house was beautifully presented and spotless when we moved in.' },
  { name: 'Rony',        text: 'The best thing about CPP is their unique business model leading to consistency — you will always get prompt answers and nothing is missed.' },
];

// ── Stats ────────────────────────────────────────────────────────
export const stats = [
  { value: '98%',  label: 'Occupancy rate' },
  { value: '200+', label: 'Properties leased' },
  { value: '50+',  label: 'Properties sold' },
  { value: '71',   label: 'Suburbs covered' },
];

// ── Awards ───────────────────────────────────────────────────────
export const awards = [
  { img: 'reiaBadge',    title: 'REIACT National Awards for Excellence 2022', sub: 'Winner — Innovation' },
  { img: 'excellence21', title: 'REIACT Awards for Excellence 2021',          sub: 'Winner — Innovation' },
  { img: 'award21',      title: 'Local Agent Finder',                         sub: 'Best Renter ACT' },
  { img: 'award20',      title: 'Local Agent Finder',                         sub: 'Best Renter ACT' },
  { img: 'award19',      title: 'Local Agent Finder',                         sub: 'National Top 5' },
];

// ── Services ─────────────────────────────────────────────────────
export const services = [
  { icon: 'photography',  title: 'Marketing & Photography',      desc: "Tap into our Principal's commercial photography expertise and make your property emotionally resonate with potential renters." },
  { icon: 'inspection',   title: 'Digitised Inspections',        desc: 'Limit no-shows with our online booking system — prospective tenants receive automated SMS and email reminders.' },
  { icon: 'vetting',      title: 'Tenant Vetting',               desc: 'Thorough checks on income, references, ID, and bill payment history give you total peace of mind.' },
  { icon: 'maintenance',  title: 'Maintenance & Repairs',        desc: 'Licensed tradespeople on standby to execute quality, timely work at a fair price.' },
  { icon: 'insurance',    title: 'Insurance & Depreciation',     desc: 'Partnerships with Terri Scheer landlord insurance and Washington Brown depreciation experts.' },
  { icon: 'portal',       title: 'Property Portal',              desc: 'Real-time access to your rental agreement, receipts, invoices and property status via PropertyMe.' },
  { icon: 'report',       title: 'Condition Reports',            desc: 'Cutting-edge 3D interactive models so you can see every detail of your property at any time.' },
  { icon: 'collection',   title: 'Rent Collection',              desc: 'Electronic transfers to your nominated bank account on the 1st and 15th of every month.' },
  { icon: 'statement',    title: 'Ownership Statements',         desc: 'Detailed income and expenditure reports that eliminate tax headaches — accessible at any time.' },
  { icon: 'utilities',    title: 'Utilities Management',         desc: 'We handle bill payments, putting rent collected toward running costs so you never have to.' },
  { icon: 'appraise',     title: 'Regular Inspections',          desc: 'Routine inspections conducted in full compliance with ACT legislation on viewing frequency.' },
  { icon: 'issues',       title: 'Issue Resolution',             desc: 'Practical, workable solutions delivered promptly — we bring answers, not just problems.' },
];

// ── Sales steps ──────────────────────────────────────────────────
export const salesSteps = [
  { icon: 'appraise',    num: '01', title: 'Appraise',     desc: "Expert valuation, recent comparable sales, suburb demographic data and trends, plus suggested improvements to maximise your property's price." },
  { icon: 'advise',      num: '02', title: 'Advise',       desc: 'We propose the optimal sales method — auction, private sale or tender — explaining the pros and cons of each so you are fully informed.' },
  { icon: 'communicate', num: '03', title: 'Communicate',  desc: "We honour tenant legal rights, give adequate notice, and negotiate inspections that cause minimal disruption — keeping everyone on side." },
  { icon: 'market',      num: '04', title: 'Market',       desc: 'Premium 3D Matterport scans and photography already captured as part of our management process. Ready to power your campaign from day one.' },
];
