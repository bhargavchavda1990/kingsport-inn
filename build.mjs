// Static site generator: shared header/footer + page bodies -> /site/*.html
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'site');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'src/assets'), join(OUT, 'assets'), { recursive: true });

const BOOK = 'https://hotels.cloudbeds.com/reservation/W1V6ap';
const IMG = 'https://irp.cdn-website.com/731de917/dms3rep/multi/opt/';
const HERO = IMG + '318135925_655693882921466_4861542897009323347_n-1920w.jpg';
const EXTERIOR = IMG + 'New-Kings-Port-Inn-+Front-1-1920w.jpg';
const SITE = {
  name: "King's Port Inn",
  addr1: '18 Western Ave',
  addr2: 'Kennebunk, Maine 04043',
  phone: '207-967-4340',
  email: 'info@kingsportinn.com',
  facebook: 'https://facebook.com/kingsportinn',
  instagram: 'https://instagram.com/explore/locations/542848369/kings-port-inn/',
  newsletter: 'https://www.kingsportinn.com/newsletter-registration',
  terms: 'https://www.kingsportinn.com/terms-and-conditions',
  privacy: 'https://www.kingsportinn.com/privacy',
};

/* ---------- icons ---------- */
const ic = {
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
  tv: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  fridge: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 6v1M9 14v2"/>',
  bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2"/>',
  bed: '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/>',
  car: '<path d="M5 16l1.5-5.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 16M3 16h18v3H3zM7 19v2M17 19v2"/><circle cx="7.5" cy="16" r=".6"/><circle cx="16.5" cy="16" r=".6"/>',
  coffee: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 10h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3"/>',
  walk: '<circle cx="13" cy="4" r="1.6"/><path d="M9 21l2-6-2-3 2-4 3 2 2 3M11 15l3 2 1 4M8 10l-2 3"/>',
  fire: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
  pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  tag: '<path d="M3 12V3h9l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  heart: '<path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  wave: '<path d="M2 9c3-3 5 3 8 0s5 3 8 0 3 0 4-1M2 15c3-3 5 3 8 0s5 3 8 0 3 0 4-1"/>',
};
const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ic[n]}</svg>`;

/* ---------- layout ---------- */
const nav = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'rooms.html', label: 'Rooms', key: 'rooms' },
  {
    label: 'Offers & Packages', key: 'offers', sub: [
      { href: 'offers.html', label: 'All Offers', key: 'offers' },
      { href: 'stay-longer-offer.html', label: 'Stay Longer Offer', key: 'stay' },
      { href: 'fall-midweek-escape.html', label: 'Fall Midweek Escape', key: 'fall' },
      { href: 'christmas-prelude.html', label: 'Christmas Prelude', key: 'xmas' },
    ],
  },
  { href: 'local-area-activities.html', label: 'Things To Do', key: 'area' },
  { href: 'contact.html', label: 'Contact', key: 'contact' },
];

function navHtml(current) {
  return nav.map((n) => {
    if (n.sub) {
      const active = n.sub.some((s) => s.key === current);
      return `<li class="has-sub${active ? ' is-current' : ''}">
        <button type="button" aria-expanded="false" aria-haspopup="true">${n.label}<span class="caret"></span></button>
        <ul class="sub">${n.sub.map((s) => `<li><a href="${s.href}"${s.key === current ? ' aria-current="page"' : ''}>${s.label}</a></li>`).join('')}</ul>
      </li>`;
    }
    return `<li><a href="${n.href}"${n.key === current ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
  }).join('');
}

function layout({ file, title, desc, current, hero, body, image }) {
  const url = file === 'index.html' ? '' : file;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${image || HERO}">
<meta name="theme-color" content="#0f2438">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230f2438'/%3E%3Ctext x='32' y='43' font-family='Georgia,serif' font-size='34' font-weight='700' text-anchor='middle' fill='%23c99d5c'%3EK%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Hotel', name: SITE.name,
    address: { '@type': 'PostalAddress', streetAddress: SITE.addr1, addressLocality: 'Kennebunk', addressRegion: 'ME', postalCode: '04043', addressCountry: 'US' },
    telephone: SITE.phone, email: SITE.email, image: HERO, url: 'https://www.kingsportinn.com/' + url,
  })}</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="topbar"><div class="container">
    <div class="topbar-contact">
      <a href="tel:${SITE.phone}">${SITE.phone}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
    </div>
    <span class="topbar-note">Family owned · ${SITE.addr1}, Kennebunk, Maine</span>
  </div></div>
  <div class="container header-main">
    <a class="brand" href="index.html" aria-label="${SITE.name} home">
      <span class="brand-name">King’s Port Inn</span>
      <span class="brand-sub">Kennebunkport · Maine</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu"><span></span></button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul class="nav-list">${navHtml(current)}</ul>
      <a class="btn nav-cta-mobile" href="${BOOK}">Book Now</a>
    </nav>
    <a class="btn header-cta header-cta--desktop" href="${BOOK}">Book Now</a>
  </div>
</header>
<main id="main">
${hero}
${body}
</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <span class="brand-name">King’s Port Inn</span>
      <p>An intimate, family-owned hotel in Lower Village Kennebunk — steps from Dock Square, one mile from Kennebunk Beach.</p>
      <div class="social">
        <a href="${SITE.facebook}" aria-label="Facebook">${icon('fb')}</a>
        <a href="${SITE.instagram}" aria-label="Instagram">${icon('ig')}</a>
        <a href="mailto:${SITE.email}" aria-label="Email">${icon('mail')}</a>
      </div>
    </div>
    <div>
      <h4>Explore</h4>
      <ul>
        <li><a href="about.html">About the Inn</a></li>
        <li><a href="rooms.html">Rooms</a></li>
        <li><a href="offers.html">Offers &amp; Packages</a></li>
        <li><a href="local-area-activities.html">Things To Do</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Offers</h4>
      <ul>
        <li><a href="stay-longer-offer.html">Stay Longer · Save 15%</a></li>
        <li><a href="fall-midweek-escape.html">Fall Midweek Escape</a></li>
        <li><a href="christmas-prelude.html">Christmas Prelude</a></li>
        <li><a href="${SITE.newsletter}">Join our newsletter</a></li>
      </ul>
    </div>
    <div>
      <h4>Visit</h4>
      <ul>
        <li>${SITE.addr1}<br>${SITE.addr2}</li>
        <li><a href="tel:${SITE.phone}">${SITE.phone}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li>Hours: 7am to close<br>Closed Thanksgiving &amp; Christmas Day</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom"><div class="container">
    <span>© <span data-year>2026</span> The King’s Port Inn · All rights reserved</span>
    <span><a href="${SITE.terms}">Terms &amp; Conditions</a> · <a href="${SITE.privacy}">Privacy &amp; Cookie Statement</a></span>
  </div></div>
</footer>
<script src="main.js" defer></script>
</body>
</html>
`;
}

/* ---------- hero helpers ---------- */
const pageHero = ({ crumb, h1, lead, img = HERO }) => `
<section class="page-hero" style="--hero-img:url('${img}')">
  <div class="container">
    <p class="crumbs"><a href="index.html">Home</a> / ${crumb}</p>
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

const ctaBand = (h = 'Your Kennebunkport getaway starts here', p = 'Book directly with the inn and save 10% — no booking-site middleman.') => `
<section class="cta-band">
  <div class="container reveal">
    <p class="eyebrow eyebrow--light">Book direct</p>
    <h2>${h}</h2>
    <p>${p}</p>
    <div class="btn-row">
      <a class="btn" href="${BOOK}">Check availability</a>
      <a class="btn btn--ghost" href="tel:${SITE.phone}">Call ${SITE.phone}</a>
    </div>
  </div>
</section>`;

/* ---------- data ---------- */
const rooms = [
  { id: 'premium-king', name: 'Premium King', floor: '1st & 2nd floor', beds: 'One King bed · one twin pull-out sleep sofa', extra: ['Non-smoking'], tags: ['King bed', 'Sleeps 3'], imgs: ['Premium+King+2-1920w.jpg', 'pk+pq-1920w.jpg', 'pk4+%282%29-1920w.jpg', '061517_KingsportInn4055_preview-1920w.jpeg'], blurb: 'A comfortable, well-priced base for a Kennebunkport stay, with a king bed and a twin pull-out sofa for an extra guest.' },
  { id: 'premium-queen', name: 'Premium Queen', floor: '1st & 2nd floor', beds: 'Two Queen beds', extra: ['Non-smoking'], tags: ['Two queens', 'Friends & family'], imgs: ['Premium+Queen+1-1920w.jpg', 'Premium+Queen-1920w.jpg', 'Premium+Rooms-1920w.jpg', '061517_KingsportInn4055_preview-ec8919b8-1920w.jpeg'], blurb: 'Two queen beds make this an easy fit for friends, family or a longer stay.' },
  { id: 'premium-king-custom-shower', name: 'Premium King with Custom Shower', floor: 'First floor', beds: 'One King bed', extra: ['Non-smoking', 'Walk-in shower'], tags: ['King bed', 'Walk-in shower', 'Ground floor'], imgs: ['IMG_4678.jpg+rs.jpg2-1920w.jpg', 'IMG_4681-1920w.jpg'], blurb: 'A first-floor king room with a custom walk-in shower — no stairs between you and the parking lot.' },
  { id: 'deluxe-king', name: 'Deluxe King', floor: 'See availability', beds: 'One King bed · one Queen sleep sofa', extra: ['Non-smoking', 'Walk-in shower'], tags: ['King bed', 'Sleeps 4', 'Walk-in shower'], imgs: ['IMG_5887.HEICdeluxe_king-1920w.jpg', 'IMG_4738-1920w.jpg'], blurb: 'More room to spread out, with a king bed, a queen sleep sofa and a walk-in shower.' },
  { id: 'royal-king-jacuzzi', name: 'Royal King Jacuzzi', floor: '2nd & 3rd floor (walk-up)', beds: 'One King bed', extra: ['Non-smoking', '2-person Jacuzzi', 'Dual showers'], tags: ['Jacuzzi', 'Dual showers', 'Romantic'], imgs: ['IMG_4727.jpg+rks-1920w.jpg', 'IMG_2803.jpg+white-1920w.jpg'], blurb: 'A romantic upgrade: king bed, two-person Jacuzzi and dual showers.' },
  { id: 'grand-king-jacuzzi-3', name: 'Grand King Jacuzzi', sub: '3rd floor', floor: '3rd floor (walk-up)', beds: 'One King bed', extra: ['Non-smoking', 'Corner Jacuzzi tub', 'Separate shower'], tags: ['Corner Jacuzzi', 'Top floor'], imgs: ['20240709_101747.jpgrss-1920w.jpg', '20240709_101929-1920w.jpg', '20240709_101940-1920w.jpg'], blurb: 'A top-floor king room with a corner Jacuzzi tub and a separate shower.' },
  { id: 'grand-king-jacuzzi-1', name: 'Grand King Jacuzzi', sub: '1st floor', floor: 'First floor · private entrance', beds: 'One King bed · one twin pull-out sleep sofa', extra: ['Non-smoking', '2-person Jacuzzi', 'Dual showers'], tags: ['Jacuzzi', 'Private entrance', 'Ground floor'], imgs: ['grand+king+100-1920w.jpg', 'gkj+bathroom-1920w.jpg', 'gkj+bathroom+2-1920w.jpg'], blurb: 'Ground-floor Jacuzzi suite with its own private entrance and dual showers.' },
  { id: 'luxury-king-jacuzzi', name: 'Luxury King Jacuzzi', floor: 'First floor · private entrance', beds: 'One King bed · twin pull-out sleep sofa', extra: ['Non-smoking', '2-person Jacuzzi', 'Dual showers'], tags: ['Jacuzzi', 'Private entrance', 'Ground floor'], imgs: ['IMG_4720-1920w.jpg', 'IMG_2803.jpg+white-0f506ecc-1920w.jpg'], blurb: 'A first-floor luxury room with a private entrance, two-person Jacuzzi and dual showers.' },
  { id: 'luxury-king-jacuzzi-fireplace', name: 'Luxury King Jacuzzi with Fireplace', floor: 'First floor · private entrance', beds: 'One King bed · one twin pull-out sleep sofa', extra: ['Non-smoking', '2-person Jacuzzi', 'Dual showers', 'Gas fireplace'], tags: ['Fireplace', 'Jacuzzi', 'Private entrance'], imgs: ['20220613_122837.jpgrs-1920w.jpg', 'IMG_4718-1920w.jpg', 'IMG_4716-1920w.jpg', 'IMG_2803.jpg+white-a6fe741e-1920w.jpg'], blurb: 'Our most romantic room: gas fireplace, two-person Jacuzzi and a private ground-floor entrance.' },
];
const roomName = (r) => r.name + (r.sub ? ` (${r.sub})` : '');

const features = [
  ['coffee', 'Extended continental breakfast', 'Served 7:30–10:00am in the parlor, with made-to-order Belgian waffles and house-made Maine blueberry topping.'],
  ['walk', 'Walk to everything', 'Dock Square is a four-minute stroll. Shops, galleries, restaurants, whale watching and the in-town trolley are all close.'],
  ['car', 'Free on-site parking', 'Registered guests can park at the inn and leave the car all weekend.'],
  ['bath', 'Jacuzzi & fireplace rooms', 'Upgrade to a two-person Jacuzzi, and in select rooms a gas fireplace, for a romantic stay.'],
];

/* ---------- pages ---------- */
const pages = [];

/* HOME */
pages.push({
  file: 'index.html', current: 'home',
  title: 'King’s Port Inn | Kennebunkport’s Charming Hotel',
  desc: 'Cozy, family-owned hotel in Kennebunk, Maine — steps from Dock Square and one mile from the beach. Book direct and save 10%.',
  hero: `
<section class="hero" style="--hero-img:url('${HERO}')">
  <div class="container hero-inner">
    <p class="eyebrow eyebrow--light">Family owned · Lower Village Kennebunk</p>
    <h1>A charming hotel steps from Dock Square</h1>
    <p class="lead">Classic New England comfort at an honest price — in a resort town known for expensive hotels.</p>
    <div class="btn-row">
      <a class="btn" href="${BOOK}">Check availability</a>
      <a class="btn btn--ghost" href="rooms.html">Explore rooms</a>
    </div>
  </div>
  <ul class="hero-facts">
    <li><strong>35</strong>comfortable rooms</li>
    <li><strong>4 min</strong>walk to Dock Square</li>
    <li><strong>1 mile</strong>to Kennebunk Beach</li>
    <li><strong>Free</strong>breakfast &amp; parking</li>
  </ul>
</section>`,
  body: `
<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Welcome</p>
      <h2>Park the car. Walk to the whole village.</h2>
      <hr class="rule">
      <p class="lead">King’s Port Inn is an intimate, classically appointed hotel in the heart of Lower Village Kennebunk. Surrounded by boutique shops, local restaurants, art galleries and historic attractions, you can explore the seaside village on foot or by trolley — or head offshore on a lobster boat or kayak.</p>
      <p>We’re family owned and we appreciate our guests. Expect traditional New England ambiance, friendly service and exceptionally affordable rates.</p>
      <div class="btn-row"><a class="btn btn--dark" href="about.html">About the inn</a><a class="link-arrow" href="local-area-activities.html" style="align-self:center">Things to do nearby</a></div>
    </div>
    <div class="frame reveal"><img src="${EXTERIOR}" alt="King’s Port Inn exterior" loading="lazy"></div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Our rooms</p>
      <h2>Simple comfort, tastefully designed</h2>
      <p class="lead">Every room includes wireless internet, a flat-screen fiber optic cable TV, a mini-refrigerator, a granite and marble bathroom and a large, soft bed.</p>
    </div>
    <div class="grid grid--3">
      ${[rooms[0], rooms[1], rooms[4], rooms[8], rooms[3], rooms[6]].map((r) => `
      <article class="card reveal">
        <div class="card-img"><img src="${IMG}${r.imgs[0]}" alt="${roomName(r)} guest room" loading="lazy"></div>
        <div class="card-body">
          <ul class="tag-row">${r.tags.slice(0, 3).map((t) => `<li class="tag">${t}</li>`).join('')}</ul>
          <h3>${roomName(r)}</h3>
          <p>${r.blurb}</p>
          <a class="link-arrow" href="rooms.html#${r.id}">View room</a>
        </div>
      </article>`).join('')}
    </div>
    <div class="center btn-row reveal"><a class="btn btn--outline" href="rooms.html">See all 9 room types</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Why guests choose us</p>
      <h2>Everything you need, close at hand</h2>
    </div>
    <div class="grid grid--4">
      ${features.map(([i, t, d]) => `<div class="feature reveal"><div class="ico">${icon(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--navy">
  <div class="container">
    <div class="section-head reveal">
      <p class="eyebrow">Offers &amp; packages</p>
      <h2>More ways to save on your Maine escape</h2>
    </div>
    <div class="grid grid--3">
      <article class="offer reveal"><div class="offer-badge">10<small>% off</small></div><h3>Book Direct</h3><p>Skip third-party sites and save 10% when you book directly with the inn.</p><a class="link-arrow" href="offers.html">All offers</a></article>
      <article class="offer offer--featured reveal"><div class="offer-badge">15<small>% off</small></div><h3>Stay Longer</h3><p>Stay 2 or more weekday nights and save 15% — direct bookings only.</p><a class="link-arrow" href="stay-longer-offer.html">View offer</a></article>
      <article class="offer reveal"><div class="offer-badge">10–15<small>% off</small></div><h3>Fall Midweek Escape</h3><p>Select Sunday–Thursday stays while the coast is quiet and the foliage is out.</p><a class="link-arrow" href="fall-midweek-escape.html">View offer</a></article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">What our guests say</p>
      <h2>Rated five stars, stay after stay</h2>
    </div>
    <div class="grid grid--3">
      <figure class="quote reveal" style="margin:0"><div class="stars" aria-label="5 stars">★★★★★</div><blockquote>We had a fireplace jacuzzi suite and it was spacious and very nice. Location is terrific — we walked all over town and left our car in the parking lot.</blockquote><cite><strong>Nancy Au</strong>Google Local Guide · 3 nights in August</cite></figure>
      <figure class="quote reveal" style="margin:0"><div class="stars" aria-label="5 stars">★★★★★</div><blockquote>We chose the jacuzzi room on the third floor for our anniversary. Clean, nicely decorated, and a complimentary breakfast with waffles made to order.</blockquote><cite><strong>Joe M.</strong>Google Local Guide · Anniversary stay</cite></figure>
      <figure class="quote reveal" style="margin:0"><div class="stars" aria-label="5 stars">★★★★★</div><blockquote>Comfy beds, good-quality linen, seamless check-in and friendly staff. The free continental breakfast was excellent and the price was reasonable.</blockquote><cite><strong>Chris McCluskey</strong>Guest review</cite></figure>
    </div>
  </div>
</section>
${ctaBand()}`,
});

/* ABOUT */
const galleryImgs = [
  [EXTERIOR, 'King’s Port Inn exterior'],
  [IMG + 'Dock+Square-1920w.jpg', 'Dock Square, a four-minute walk from the inn'],
  [IMG + 'Premium+King+2-1920w.jpg', 'Premium King room'],
  [IMG + 'Kennebunk+Beach-1920w.jpg', 'Kennebunk Beach'],
  [IMG + 'IMG_4716-1920w.jpg', 'Room with gas fireplace'],
  [IMG + 'gkj+bathroom-1920w.jpg', 'Jacuzzi bathroom'],
  [IMG + 'Goat+Island+Light-1920w.jpg', 'Goat Island Lighthouse'],
  [IMG + 'Premium+Queen+1-1920w.jpg', 'Premium Queen room with two beds'],
  [IMG + 'pk4+%282%29-1920w.jpg', 'Premium King with sofa'],
  [IMG + 'IMG_2803.jpg+white-1920w.jpg', 'Two-person Jacuzzi tub'],
  [IMG + 'IMG_4720-1920w.jpg', 'Luxury King Jacuzzi room'],
  [IMG + 'IMG_5887.HEICdeluxe_king-1920w.jpg', 'Deluxe King room'],
];
pages.push({
  file: 'about.html', current: 'about',
  title: 'About us | History & Hospitality in Kennebunkport',
  desc: 'King’s Port Inn is family-owned and centrally located in Lower Village Kennebunk, Maine — traditional New England charm at exceptionally affordable rates.',
  hero: pageHero({ crumb: 'About', h1: 'Family owned. Warm in spirit.', lead: 'An independently owned hotel in the heart of Lower Village Kennebunk, just steps to everything Kennebunkport has to offer.', img: EXTERIOR }),
  body: `
<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">The hotel</p>
      <h2>Amenities at our Kennebunk hotel</h2>
      <hr class="rule">
      <p class="lead">King’s Port Inn offers relaxing, comfortable accommodations with traditional New England ambiance and exceptionally affordable rates — in a resort town known for its expensive hotels.</p>
      <p>After a day exploring, relax in one of our 35 rooms, each with Wi-Fi, a flat-screen fiber optic cable TV, a mini-refrigerator and comfortable bedding. For extra privacy, space and convenience, upgrade to a room with a two-person Jacuzzi tub and gas fireplace.</p>
      <div class="btn-row"><a class="btn" href="${BOOK}">Check availability</a><a class="btn btn--outline" href="rooms.html">View rooms</a></div>
    </div>
    <div class="frame reveal"><img src="${IMG}Premium+King+2-1920w.jpg" alt="Premium King room at King’s Port Inn" loading="lazy"></div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="grid grid--3">
      <div class="feature reveal"><div class="ico">${icon('walk')}</div><h3>Park &amp; walk</h3><p>Park your car and walk to shops, restaurants, First Chance Whale Watch and the in-town trolley tour.</p></div>
      <div class="feature reveal"><div class="ico">${icon('coffee')}</div><h3>Extended breakfast</h3><p>Extended continental breakfast every morning from 7:30am to 10:00am in our parlor.</p></div>
      <div class="feature reveal"><div class="ico">${icon('car')}</div><h3>On-site parking</h3><p>On-site parking is offered to our registered guests.</p></div>
    </div>
  </div>
</section>

<section class="section" id="Gallery">
  <div class="container">
    <div class="section-head center reveal">
      <p class="eyebrow">Gallery</p>
      <h2>A look around</h2>
    </div>
    <div class="gallery reveal">
      ${galleryImgs.map(([src, alt]) => `<a href="${src}"><img src="${src}" alt="${alt}" loading="lazy"></a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="container--narrow container reveal">
    <div class="policy">
      <h3>Cancellation policy</h3>
      <p>A $35 cancellation fee applies to all cancelled reservations. If a reservation is cancelled within 72 hours of arrival, the deposit is nonrefundable.</p>
    </div>
    <p class="center" style="margin-top:2rem"><em>We look forward to welcoming you to King’s Port Inn — an independently owned hotel with a warm, welcoming spirit.</em></p>
  </div>
</section>
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous photo">‹</button><img src="" alt=""><button class="lb-next" aria-label="Next photo">›</button></div>
${ctaBand()}`,
});

/* ROOMS */
pages.push({
  file: 'rooms.html', current: 'rooms',
  title: 'Hotel Rooms | King’s Port Inn Accommodations',
  desc: 'Explore King’s Port Inn’s recently renovated rooms with Wi-Fi, flat-screen TVs and granite bathrooms — from Premium Queen to Jacuzzi suites with fireplaces.',
  hero: pageHero({ crumb: 'Rooms', h1: 'Recently renovated rooms, for every kind of traveler', lead: 'Tastefully designed for simplicity and comfort — an unbeatable price just moments from the beaches, shops and restaurants.', img: IMG + 'Premium+King+2-1920w.jpg' }),
  body: `
<section class="section" style="padding-top:0">
  <div class="container">
    <ul class="amenity-bar reveal">
      <li>${icon('wifi')}Wireless internet</li>
      <li>${icon('tv')}Flat-screen cable TV</li>
      <li>${icon('fridge')}Mini-refrigerator</li>
      <li>${icon('bath')}Granite &amp; marble bath</li>
      <li>${icon('bed')}Large, soft bed</li>
      <li>${icon('coffee')}Breakfast included</li>
    </ul>
    <div class="section-head center" style="margin-top:3.5rem">
      <h2>Choose your room</h2>
      <p class="lead">Enjoy our extended continental breakfast with made-to-order Buttermilk Belgian waffles and house-made Maine blueberry topping. Planning a romantic weekend? Upgrade to a Jacuzzi room, with select rooms adding a gas fireplace.</p>
    </div>
    <nav class="room-nav" aria-label="Jump to a room">${rooms.map((r) => `<a href="#${r.id}">${roomName(r)}</a>`).join('')}</nav>

    ${rooms.map((r) => `
    <article class="room reveal" id="${r.id}">
      <div class="slider" aria-roledescription="carousel" aria-label="${roomName(r)} photos">
        <div class="slides">${r.imgs.map((i, n) => `<img src="${IMG}${i}" alt="${roomName(r)} photo ${n + 1}" loading="lazy">`).join('')}</div>
        <button class="slider-btn slider-btn--prev" type="button" aria-label="Previous photo">‹</button>
        <button class="slider-btn slider-btn--next" type="button" aria-label="Next photo">›</button>
        <span class="slider-count" aria-hidden="true"></span>
      </div>
      <div class="room-info">
        <p class="floor">${r.floor}</p>
        <h3>${roomName(r)}</h3>
        <p>${r.blurb}</p>
        <ul class="spec">
          <li><span>Beds</span><span>${r.beds}</span></li>
          <li><span>Features</span><span>${r.extra.join(' · ')}</span></li>
        </ul>
        <a class="btn" href="${BOOK}">View availability</a>
      </div>
    </article>`).join('')}
  </div>
</section>
${ctaBand('Find the right room for your stay', 'Book direct for 10% off, or stay two or more weekday nights and save 15%.')}`,
});

/* OFFERS HUB */
pages.push({
  file: 'offers.html', current: 'offers',
  title: 'Offers & Packages | King’s Port Inn, Kennebunk Maine',
  desc: 'Book direct and save 10% at King’s Port Inn. Plus extended-stay savings, midweek fall escapes and Christmas Prelude getaways in Kennebunkport.',
  hero: pageHero({ crumb: 'Offers & Packages', h1: 'Maine escapes, made better', lead: 'Enjoy more value when you book your Kennebunk stay directly with King’s Port Inn.', img: IMG + 'Dock+Square-1920w.jpg' }),
  body: `
<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Featured offer</p>
      <h2>Book direct &amp; save 10%</h2>
      <hr class="rule">
      <p class="lead">Skip the third-party booking sites and enjoy 10% off your stay when you book directly with King’s Port Inn.</p>
      <ul class="spec" style="max-width:460px">
        <li><span>Save</span><span>10% on your stay</span></li>
        <li><span>Book</span><span>Directly with the hotel</span></li>
        <li><span>Service</span><span>Personalized service from our team</span></li>
        <li><span>Where</span><span>Convenient Kennebunk location</span></li>
      </ul>
      <div class="btn-row"><a class="btn" href="${BOOK}">Book direct &amp; save 10%</a></div>
      <p class="fine" style="margin-top:1rem">Terms and conditions may apply. Offer subject to availability.</p>
    </div>
    <div class="frame reveal"><img src="${EXTERIOR}" alt="King’s Port Inn front entrance" loading="lazy"></div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">More ways to save</p><h2>Seasonal offers &amp; packages</h2></div>
    <div class="grid grid--3">
      <article class="offer offer--featured reveal"><div class="offer-badge">15<small>% off</small></div><h3>Stay Longer Offer</h3><p>Stay 2 or more weekday nights and save 15% when you book direct.</p><a class="link-arrow" href="stay-longer-offer.html">View offer</a></article>
      <article class="offer reveal"><div class="offer-badge">10–15<small>% off</small></div><h3>Fall Midweek Escape</h3><p>Select Sunday–Thursday stays for a quieter, crisper Maine getaway.</p><a class="link-arrow" href="fall-midweek-escape.html">View offer</a></article>
      <article class="offer reveal"><div class="offer-badge">${icon('heart').replace('<svg', '<svg style="width:48px;height:48px;stroke:currentColor;fill:none;stroke-width:1.5"')}</div><h3>Christmas Prelude</h3><p>Festive lights, shopping and dining with Dock Square a short stroll away.</p><a class="link-arrow" href="christmas-prelude.html">View package</a></article>
    </div>
    <div class="grid grid--3" style="margin-top:2rem">
      <div class="feature reveal"><div class="ico">${icon('clock')}</div><h3>Extended stay</h3><p>Planning to stay a little longer? Ask about available rates and extended-stay options.</p></div>
      <div class="feature reveal"><div class="ico">${icon('tag')}</div><h3>Advance booking</h3><p>Plan ahead and check for available rates when you book your Maine getaway in advance.</p></div>
      <div class="feature reveal"><div class="ico">${icon('heart')}</div><h3>Returning guests</h3><p>Loved your stay? Come back to Kennebunk and enjoy another comfortable coastal getaway.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">Why book direct?</p><h2>Your best stay starts here</h2></div>
    <div class="grid grid--3">
      <div class="feature reveal"><div class="ico">${icon('tag')}</div><h3>10% direct savings</h3><p>Save 10% when you reserve directly with King’s Port Inn.</p></div>
      <div class="feature reveal"><div class="ico">${icon('phone')}</div><h3>Personalized service</h3><p>Connect directly with our team before, during and after your stay.</p></div>
      <div class="feature reveal"><div class="ico">${icon('pin')}</div><h3>Prime Kennebunk location</h3><p>Stay close to Dock Square, beaches, local dining, shopping and coastal attractions.</p></div>
    </div>
  </div>
</section>

<section class="section section--navy">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">There’s always a reason to visit</p><h2>Seasonal getaways</h2></div>
    <div class="grid grid--4">
      <div class="feature reveal"><div class="ico">${icon('sun')}</div><h3>Fall</h3><p>Crisp coastal air, colorful foliage and a quieter Maine escape.</p></div>
      <div class="feature reveal"><div class="ico">${icon('fire')}</div><h3>Winter</h3><p>A cozy getaway to experience the Maine coast in the off-season.</p></div>
      <div class="feature reveal"><div class="ico">${icon('walk')}</div><h3>Spring</h3><p>Coastal trails, local attractions and the return of warmer days.</p></div>
      <div class="feature reveal"><div class="ico">${icon('wave')}</div><h3>Summer</h3><p>Beaches, boating, dining and long summer days.</p></div>
    </div>
    <div class="btn-row"><a class="btn" href="${BOOK}">Plan your getaway</a><a class="btn btn--ghost" href="local-area-activities.html">Explore Kennebunk</a></div>
  </div>
</section>`,
});

/* STAY LONGER */
pages.push({
  file: 'stay-longer-offer.html', current: 'stay',
  title: 'Stay 2+ Nights & Save 15% | King’s Port Inn',
  desc: 'Stay 2 or more weekday nights at King’s Port Inn and save 15% when you book direct. More time to explore Kennebunk and enjoy Maine.',
  hero: pageHero({ crumb: 'Stay Longer Offer', h1: 'Stay 2+ nights. Save 15%.', lead: 'More time to explore. More time to enjoy Maine. Direct bookings only · weekday stays only.', img: IMG + 'Kennebunk+Beach-1920w.jpg' }) + `<div class="container" style="margin-top:-1px"></div>`,
  body: `
<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">More nights. More Maine.</p>
      <h2>Why rush your Maine getaway?</h2>
      <hr class="rule">
      <p class="lead">Stay 2 or more nights and receive 15% off when you book directly with King’s Port Inn.</p>
      <p>Whether you’re exploring Kennebunkport, discovering local beaches, enjoying Maine’s coastal dining or simply slowing down, an extra night gives you more time to experience it all.</p>
      <div class="btn-row"><a class="btn" href="${BOOK}">Book direct &amp; save 15%</a></div>
    </div>
    <ol class="steps reveal" style="grid-template-columns:1fr 1fr">
      <li><h3>15% off</h3><p>On qualifying weekday stays of 2 nights or more.</p></li>
      <li><h3>Minimum stay</h3><p>Stay 2 nights or more.</p></li>
      <li><h3>Booking method</h3><p>Direct bookings only.</p></li>
      <li><h3>Weekends</h3><p>Not included. Subject to availability and applicable restrictions.</p></li>
    </ol>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">Why stay longer?</p><h2>More time to enjoy Maine</h2></div>
    <div class="grid grid--4">
      <div class="feature reveal"><div class="ico">${icon('wave')}</div><h3>More time by the coast</h3><p>Take your time exploring Maine’s beautiful beaches and coastal scenery.</p></div>
      <div class="feature reveal"><div class="ico">${icon('coffee')}</div><h3>More time to taste Maine</h3><p>Discover local restaurants, fresh seafood and classic Maine flavors.</p></div>
      <div class="feature reveal"><div class="ico">${icon('pin')}</div><h3>More time to explore</h3><p>From Kennebunk to Kennebunkport, there’s more to discover when you don’t rush.</p></div>
      <div class="feature reveal"><div class="ico">${icon('heart')}</div><h3>More time for memories</h3><p>Turn a quick getaway into a memorable Maine escape.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">No need to rush</p>
      <h2>Your Maine escape doesn’t have to end yet</h2>
      <ol class="timeline" style="margin-top:2rem">
        <li><strong>Morning</strong><span>Wake up slowly. Grab a coffee.</span></li>
        <li><strong>Day</strong><span>Explore the coast.</span></li>
        <li><strong>Lunch</strong><span>Enjoy a long Maine lunch.</span></li>
        <li><strong>Evening</strong><span>Watch the sunset.</span></li>
        <li><strong>Tomorrow</strong><span>Stay another night.</span></li>
      </ol>
    </div>
    <div class="reveal">
      <p class="eyebrow">Make us your Maine basecamp</p>
      <div class="grid grid--2">
        <div class="place-card"><span class="meta">Beaches</span><p>Spend a day by the water and enjoy Maine’s coastline.</p></div>
        <div class="place-card"><span class="meta">Kennebunkport</span><p>Dock Square, local shops, restaurants and waterfront views.</p></div>
        <div class="place-card"><span class="meta">Coastal adventures</span><p>Whale watching, scenic lobster tours, trolley rides and more.</p></div>
        <div class="place-card"><span class="meta">Explore Kennebunk</span><p>Stay close to the best of coastal Maine.</p></div>
      </div>
      <div class="btn-row"><a class="link-arrow" href="local-area-activities.html">Explore things to do</a></div>
    </div>
  </div>
</section>
${ctaBand('Book direct. Stay longer. Save more.', '15% off qualifying 2+ night weekday stays · Direct booking only · Convenient Kennebunk location.')}`,
});

/* FALL MIDWEEK */
pages.push({
  file: 'fall-midweek-escape.html', current: 'fall',
  title: 'Fall Midweek Escape | King’s Port Inn, Kennebunk Maine',
  desc: 'Save 10–15% on select Sunday–Thursday stays this fall at King’s Port Inn. A quieter Kennebunkport getaway with coastal walks and fall scenery.',
  hero: pageHero({ crumb: 'Fall Midweek Escape', h1: 'Fall feels better midweek.', lead: 'Escape to Kennebunkport when the pace slows, the air turns crisp and coastal Maine feels like it’s all yours.', img: IMG + 'Goat+Island+Light-1920w.jpg' }),
  body: `
<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Sunday–Thursday · Save 10–15%</p>
      <h2>Save on select midweek stays</h2>
      <hr class="rule">
      <p class="lead">Trade busy weekends for peaceful mornings, crisp coastal walks, local dining and colorful fall scenery.</p>
      <ul class="spec">
        <li><span>Save</span><span>10–15% on select Sunday–Thursday stays</span></li>
        <li><span>Stay</span><span>Comfortable accommodations in Kennebunk</span></li>
        <li><span>Access</span><span>Easy access to Kennebunkport and Dock Square</span></li>
        <li><span>Base</span><span>A convenient home base for the Maine coast</span></li>
      </ul>
      <div class="btn-row"><a class="btn" href="${BOOK}">Book your fall escape</a></div>
      <p class="fine" style="margin-top:1rem">Valid on select Sunday–Thursday stays. Subject to availability. Restrictions, blackout dates and minimum-stay requirements may apply.</p>
    </div>
    <div class="frame reveal"><img src="${IMG}Goat+Island+Light-1920w.jpg" alt="Goat Island Lighthouse off Cape Porpoise" loading="lazy"></div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">Why midweek?</p><h2>More Maine. Less rush.</h2><p class="lead">Fall in Kennebunkport has a different rhythm: quieter roads, a calmer coastline and foliage adding color to every drive.</p></div>
    <div class="grid grid--4">
      <div class="feature reveal"><div class="ico">${icon('wave')}</div><h3>Coastal walks</h3><p>A crisp walk along the Maine coast, taking in the changing scenery.</p></div>
      <div class="feature reveal"><div class="ico">${icon('pin')}</div><h3>Kennebunkport</h3><p>An afternoon in Dock Square, local shops, galleries and restaurants.</p></div>
      <div class="feature reveal"><div class="ico">${icon('sun')}</div><h3>Fall scenery</h3><p>A scenic drive through southern Maine and peak-season color.</p></div>
      <div class="feature reveal"><div class="ico">${icon('coffee')}</div><h3>Slow mornings</h3><p>Sleep in, grab your coffee and let the getaway unfold at its own pace.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">Perfect for</p><h2>A fall midweek getaway</h2></div>
    <ol class="steps">
      <li class="reveal"><h3>A couple’s escape</h3><p>A few quiet days together are sometimes all you need.</p></li>
      <li class="reveal"><h3>A friends’ getaway</h3><p>Explore, eat, shop and make the most of a few days away.</p></li>
      <li class="reveal"><h3>A last-minute break</h3><p>Turn an ordinary weekday into a coastal escape.</p></li>
    </ol>
  </div>
</section>

<section class="section section--navy">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Your Kennebunkport basecamp</p>
      <h2>Stay close to the best of the coast</h2>
      <ul class="spec" style="max-width:480px">
        <li><span>Visit</span><span>Dock Square</span></li>
        <li><span>Relax</span><span>Kennebunk Beach</span></li>
        <li><span>Shop</span><span>Kennebunkport shops &amp; restaurants</span></li>
        <li><span>Drive</span><span>Scenic coastal drives &amp; fall foliage</span></li>
        <li><span>Sail</span><span>Whale watching &amp; local excursions</span></li>
      </ul>
      <div class="btn-row"><a class="btn" href="local-area-activities.html">Explore Kennebunkport</a></div>
    </div>
    <div class="reveal">
      <p class="eyebrow">Fall itinerary</p>
      <ol class="timeline">
        <li><strong>Morning</strong><span>Coffee + a slow start</span></li>
        <li><strong>Afternoon</strong><span>Dock Square, local shops and the coast</span></li>
        <li><strong>Golden hour</strong><span>A scenic drive in the fall colors</span></li>
        <li><strong>Evening</strong><span>Dinner and drinks at a local favorite</span></li>
        <li><strong>Next morning</strong><span>Wake up refreshed and do it all again</span></li>
      </ol>
    </div>
  </div>
</section>
${ctaBand('Book your fall midweek escape')}`,
});

/* CHRISTMAS PRELUDE */
const xmasGallery = [
  ['pexels-photo-29926019-1920w.jpeg', 'Festive Christmas lights in town'],
  ['c26866be-f201-4006-aadc-e8b6720c5ad9-1920w.png', 'Shops around Dock Square'],
  ['12a98ea8-7f9d-482f-acaf-1843ea4ea6d3-1920w.png', 'Historic storefronts in Kennebunkport village'],
  ['e61c8432-fb86-4c26-a0d4-0c72dc8d9d9b-1920w.png', 'Rocky coastline of Maine'],
  ['New-Kings-Port-Inn-+Front-1-1920w.jpg', 'King’s Port Inn exterior'],
  ['pk4+%282%29-1920w.jpg', 'Premium King guest room'],
  ['IMG_4716-1920w.jpg', 'Cozy room with fireplace'],
  ['461654ad-a411-4239-9e21-8f0f3c5331b6-1920w.png', 'Local seafood dining in Kennebunkport'],
];
pages.push({
  file: 'christmas-prelude.html', current: 'xmas',
  title: 'Christmas Prelude Getaway | King’s Port Inn, Kennebunkport',
  desc: 'Stay at King’s Port Inn for Christmas Prelude in Kennebunkport — festive lights, shopping and dining with Dock Square a short stroll away.',
  hero: pageHero({ crumb: 'Christmas Prelude', h1: 'Make your Christmas Prelude getaway magical', lead: 'Experience the lights, traditions, shopping, dining and holiday charm of Kennebunkport from a cozy stay at King’s Port Inn.', img: IMG + 'pexels-photo-29926019-1920w.jpeg' }),
  body: `
<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Celebrate the magic</p>
      <h2>Your home for Christmas Prelude</h2>
      <hr class="rule">
      <p class="lead">Christmas Prelude is the perfect time to experience coastal Maine dressed for the holidays — festive lights, seasonal events, local shopping and dining.</p>
      <p>At King’s Port Inn you’ll be staying in Lower Village, just a short stroll from Dock Square, with shops, restaurants and local attractions close at hand.</p>
      <div class="btn-row"><a class="btn" href="${BOOK}">Book your holiday stay</a></div>
    </div>
    <div class="frame reveal"><img src="${IMG}pexels-photo-29926019-1920w.jpeg" alt="Festive Christmas lights in town" loading="lazy"></div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">Why stay with us?</p><h2>Stay in the heart of the holiday season</h2></div>
    <div class="grid grid--3">
      <div class="feature reveal"><div class="ico">${icon('walk')}</div><h3>Walk to holiday fun</h3><p>Stay close to Dock Square, local shops, restaurants and the heart of Kennebunkport.</p></div>
      <div class="feature reveal"><div class="ico">${icon('coffee')}</div><h3>Start your morning right</h3><p>Extended continental breakfast, including Belgian waffles with Maine blueberry topping.</p></div>
      <div class="feature reveal"><div class="ico">${icon('pin')}</div><h3>Prime location</h3><p>18 Western Ave, close to Dock Square and about one mile from Kennebunk Beach.</p></div>
      <div class="feature reveal"><div class="ico">${icon('bed')}</div><h3>Comfortable rooms</h3><p>Choose rooms with Jacuzzi tubs and select rooms with fireplaces.</p></div>
      <div class="feature reveal"><div class="ico">${icon('car')}</div><h3>On-site parking</h3><p>Park at the inn and explore the area on foot.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">Christmas Prelude experience</p><h2>Your holiday weekend starts here</h2></div>
    <ol class="steps">
      <li class="reveal"><h3>Arrive in Kennebunk</h3><p>Check in and settle into your comfortable room.</p></li>
      <li class="reveal"><h3>Explore Dock Square</h3><p>Walk into the heart of Kennebunkport and discover seasonal charm.</p></li>
      <li class="reveal"><h3>Shop local</h3><p>Browse boutiques and pick up gifts and Maine treasures.</p></li>
      <li class="reveal"><h3>Enjoy a holiday meal</h3><p>Discover local restaurants and seasonal dining nearby.</p></li>
      <li class="reveal"><h3>Experience the Prelude</h3><p>Enjoy the festive atmosphere and holiday traditions throughout the area.</p></li>
      <li class="reveal"><h3>Return to the inn</h3><p>End the day with a relaxing night in your room.</p></li>
    </ol>
  </div>
</section>

<section class="section section--navy">
  <div class="container">
    <div class="section-head reveal"><p class="eyebrow">Rooms</p><h2>A cozy place to come back to</h2><p class="lead" style="color:#c5d0db">After a day of festivities, unwind in one of our comfortable accommodations.</p></div>
    <div class="grid grid--4">
      ${[rooms[0], rooms[1], rooms[7], rooms[8]].map((r) => `
      <article class="card reveal"><div class="card-img"><img src="${IMG}${r.imgs[0]}" alt="${roomName(r)}" loading="lazy"></div>
      <div class="card-body"><h3 style="font-size:1.35rem">${roomName(r)}</h3><p>${{ 'premium-king': 'Comfortable accommodation for a relaxing holiday getaway.', 'premium-queen': 'A convenient option for couples, friends or families.', 'luxury-king-jacuzzi': 'Add a little extra relaxation to your Christmas escape.', 'luxury-king-jacuzzi-fireplace': 'A cozy choice for a romantic holiday getaway.' }[r.id]}</p><a class="link-arrow" href="rooms.html#${r.id}">Learn more</a></div></article>`).join('')}
    </div>
    <div class="btn-row"><a class="btn" href="${BOOK}">View rooms &amp; availability</a></div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Stay · Explore · Celebrate</p>
      <h2>Your Christmas Prelude stay includes</h2>
      <ul class="spec">
        <li><span>Rooms</span><span>Comfortable accommodations</span></li>
        <li><span>Location</span><span>Convenient Kennebunkport location &amp; easy access to Dock Square</span></li>
        <li><span>Parking</span><span>On-site parking</span></li>
        <li><span>Breakfast</span><span>Extended continental breakfast</span></li>
        <li><span>Vibe</span><span>A festive Maine getaway</span></li>
      </ul>
      <div class="btn-row"><a class="btn" href="${BOOK}">Book your Prelude stay</a></div>
    </div>
    <div class="reveal">
      <p class="eyebrow">Christmas in coastal Maine</p>
      <div class="grid">
        <div class="place-card"><span class="meta">Dock Square</span><p>Holiday shopping, dining and seasonal atmosphere.</p></div>
        <div class="place-card"><span class="meta">Kennebunk Beach</span><p>Take a winter stroll along the Maine coast.</p></div>
        <div class="place-card"><span class="meta">Kennebunkport Village</span><p>Local boutiques, restaurants and historic surroundings.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">Photo gallery</p><h2>See Kennebunkport in its holiday season</h2></div>
    <div class="gallery reveal">${xmasGallery.map(([f, a]) => `<a href="${IMG}${f}"><img src="${IMG}${f}" alt="${a}" loading="lazy"></a>`).join('')}</div>
  </div>
</section>
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous photo">‹</button><img src="" alt=""><button class="lb-next" aria-label="Next photo">›</button></div>
${ctaBand('Your Christmas Prelude getaway starts here', 'Experience the magic of Kennebunkport, then come home to the comfort of King’s Port Inn. Please note the inn is closed on Christmas Day.')}`,
});

/* LOCAL AREA */
const places = [
  { img: 'Kennebunk+Beach-1920w.jpg', t: 'Kennebunk & Gooserocks Beaches', d: 'Kennebunk Beach is a blissful place to relax — one of the most beautiful beaches in the area, with a playground and a lifeguard on duty. For soft sand and long walks, Gooserocks Beach fits the bill.' },
  { img: 'Dock+Square-1920w.jpg', t: 'Dock Square', d: 'Bargain hunter or seaside browser? Dock Square has a wide variety of shops and chic boutiques, plus whale watching, sailing excursions and fine dining along this scenic stretch of Kennebunkport.' },
  { img: 'Goat+Island+Light-1920w.jpg', t: 'Goat Island Lighthouse', d: 'Established in 1833, Goat Island Lighthouse has been a boating landmark for generations. In summer you can visit by boat and get a personal tour from the lighthouse keepers.' },
];
const more = [
  ['Seasonal', 'Vinegar Hill Music Theatre', 'National, regional and local musical entertainment in an intimate, rustic barn setting throughout the summer and fall seasons.'],
  ['Golf', 'Cape Arundel Golf Club', 'Drawing golf enthusiasts since 1896, with beautiful views and challenging holes for all skill levels.'],
  ['History', 'First Families Museum', 'Two centuries of Kennebunkport history, from sea captains to presidents, with guided tours and a museum store.'],
  ['Museum', 'Seashore Trolley Museum', 'The largest electric railway museum in the world, with vehicles gathered from nearly all of the nation’s major cities.'],
  ['Nature', 'Blowing Cave', 'An opening in the rocks lets water spout up to 30 feet into the air before high tide. Prepare to get wet!'],
  ['Harbor', 'Cape Porpoise Pier', 'See lobstering up close and watch fishermen haul traps in this charming tidal harbor.'],
  ['Landmark', 'The Wedding Cake House', 'Often called the most photographed house in Maine, decorated in an ornate style unlike any other.'],
  ['Drive', 'Walker’s Point', 'Drive Ocean Avenue for the Blow Holes, sweeping ocean vistas and a view of President George Bush’s summer home.'],
  ['Wildlife', 'Rachel Carson National Wildlife Refuge', 'Protects salt marshes and estuaries for migratory birds. Open sunrise to sunset for birdwatching and self-guided tours.'],
];
pages.push({
  file: 'local-area-activities.html', current: 'area',
  title: 'Things to Do in Kennebunkport | King’s Port Inn Guide',
  desc: 'Beaches, restaurants, lighthouses and historic sites near King’s Port Inn. Enjoy Kennebunkport’s vibrant seaside charm.',
  hero: pageHero({ crumb: 'Things To Do', h1: 'Things to do in Kennebunkport', lead: 'Dozens of award-winning restaurants, boutiques and beaches — and Dock Square is a four-minute stroll from our door.', img: IMG + 'Dock+Square-1920w.jpg' }),
  body: `
<section class="section">
  <div class="container--narrow container center reveal">
    <p class="eyebrow">Enjoy Kennebunkport, Maine</p>
    <h2>Something for everyone</h2>
    <p class="lead">From shopping to fine dining to sailing, there’s something for everyone. History buffs can tour the homes of sea captains and shipbuilders, nature lovers can head out on a whale watching or kayaking trip, and antique collectors can find one-of-a-kind treasures in our boutiques.</p>
    <p>Head a few miles up the coast to Cape Porpoise, a classic Maine fishing village with a stunning view of Goat Island Lighthouse, then on to Goose Rocks Beach — voted one of the top beaches in Maine by The Guardian.</p>
  </div>
  <div class="container" style="margin-top:2rem">
    ${places.map((p) => `
    <article class="place reveal"><img src="${IMG}${p.img}" alt="${p.t}" loading="lazy"><div><h3>${p.t}</h3><p>${p.d}</p></div></article>`).join('')}
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head center reveal"><p class="eyebrow">More to discover</p><h2>Attractions near the inn</h2></div>
    <div class="grid grid--3">
      ${more.map(([m, t, d]) => `<article class="place-card reveal"><span class="meta">${m}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
    <p class="center reveal" style="margin-top:2rem"><a class="link-arrow" href="https://kingsportinn.com/2019/02/05/kennebunkport-lighthouses-and-those-close-by/">View more area lighthouses</a></p>
  </div>
</section>
${ctaBand('The best of Kennebunkport, moments away', 'Whether you’re visiting for business or pleasure, the best things to do in Kennebunkport and Wells Beach are just moments from King’s Port Inn.')}`,
});

/* CONTACT */
pages.push({
  file: 'contact.html', current: 'contact',
  title: 'Contact King’s Port Inn | Find Us in Kennebunkport',
  desc: 'Questions or directions? Contact King’s Port Inn by email or phone. We’re at 18 Western Ave, Kennebunk, Maine — near Dock Square.',
  hero: pageHero({ crumb: 'Contact', h1: 'Contact &amp; location', lead: 'Located one mile from Kennebunk Beach and a short stroll from shopping and dining in Dock Square.', img: EXTERIOR }),
  body: `
<section class="section">
  <div class="container contact-grid">
    <div class="reveal">
      <p class="eyebrow">Send us a message</p>
      <h2>How can we help?</h2>
      <p>To make a reservation, <a href="${BOOK}"><strong>check availability and book online</strong></a>. For anything else, use the form.</p>
      <!-- Set data-endpoint to your existing backend URL (POST, multipart form). Without it, the form opens the visitor's mail app. -->
      <form class="form" id="contact-form" data-endpoint="" data-mailto="${SITE.email}" novalidate>
        <div class="form-row">
          <div class="field"><label for="firstName">First name</label><input id="firstName" name="firstName" autocomplete="given-name" required></div>
          <div class="field"><label for="lastName">Last name</label><input id="lastName" name="lastName" autocomplete="family-name" required></div>
        </div>
        <div class="form-row">
          <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field"><label for="message">Message</label><textarea id="message" name="message" required></textarea></div>
        <button class="btn" type="submit">Send message</button>
        <p class="form-status form-status--ok" role="status">Thank you for contacting us. We will get back to you as soon as possible.</p>
        <p class="form-status form-status--err" role="alert">Oops, there was an error sending your message. Please try again later.</p>
      </form>
    </div>
    <aside class="info-card reveal">
      <h3>King’s Port Inn</h3>
      <ul class="info-list">
        <li>${icon('pin')}<span>${SITE.addr1}<br>${SITE.addr2}<br><a href="https://www.google.com/maps/search/?api=1&amp;query=King%27s+Port+Inn+18+Western+Ave+Kennebunk+ME" style="color:var(--brass-hi)">Get directions →</a></span></li>
        <li>${icon('phone')}<a href="tel:${SITE.phone}">${SITE.phone}</a></li>
        <li>${icon('mail')}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li>${icon('clock')}<span>Hours: 7am to close<br>Closed Thanksgiving &amp; Christmas Day</span></li>
        <li>${icon('car')}<span>Free on-site parking for registered guests</span></li>
      </ul>
      <p style="margin-top:1.5rem;font-size:.95rem">We’re at the junction of Beach Avenue (Route 35) and Western Avenue (Route 9).</p>
      <div class="btn-row"><a class="btn" href="${BOOK}">Book now</a></div>
    </aside>
  </div>
  <div class="container">
    <iframe class="map reveal" title="Map of King’s Port Inn" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5514.618916460966!2d-70.480833!3d43.359444!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb2ab8d7031692f%3A0xaef5ee0ee29c388e!2sKing&#39;s%20Port%20Inn!5e1!3m2!1sen!2sus!4v1725975794062!5m2!1sen!2sus"></iframe>
  </div>
</section>`,
});

for (const p of pages) writeFileSync(join(OUT, p.file), layout(p));
console.log('Built', pages.length, 'pages:', pages.map((p) => p.file).join(', '));
