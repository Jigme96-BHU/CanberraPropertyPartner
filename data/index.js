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
  {
    id: 6, status: 'leased', price: '$590 /wk',
    address: '12 Hibberson Street', suburb: 'Gungahlin ACT 2912',
    beds: 3, baths: 2, cars: 1, type: 'Townhouse', featured: false,
    ireID: 'IRE5931787',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc: 'Modern townhouse in the Gungahlin town centre precinct, close to all amenities and transport.',
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
  { value: '50+',   label: 'Properties sold' },
  { value: '200+',  label: 'Properties leased' },
  { value: '71', label: 'Suburb covered' },
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
