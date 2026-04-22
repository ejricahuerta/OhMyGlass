// Shared data for OhMyGlass, aligned with svelte-app site-data.js + service-cards.js
// Trust copy: confirm response SLA with operations before go-live. (warrantyLine / insuranceLine optional.)

window.OMG_PAGES = [];

var siteUrl = 'https://www.ohmyglass.ca';
var tallyFormSrc = 'https://tally.so/embed/wMl6y0?ref=Tally&hideTitle=1&dynamicHeight=1';

var serviceAreaCitiesList = [
  'Toronto',
  'North York',
  'Vaughan',
  'Richmond Hill',
  'Markham',
  'Mississauga',
  'Scarborough',
  'Etobicoke',
  'Newmarket',
  'Oakville',
  'Ajax',
  'Milton',
  'Pickering',
  'Whitby',
  'Woodbridge',
  'Burlington',
  'Halton Hills',
  'Caledon',
  'Aurora',
  'East Gwillimbury',
  'Georgina',
  'King',
  'Whitchurch-Stouffville',
  'Clarington',
  'Oshawa',
  'Scugog',
  'Uxbridge',
];

/** Kept in sync with content-page location slugs + serviceAreaCitiesList for path matching. */
var SERVICE_AREA_SLUG_LOOKUP = {};
(function buildServiceAreaSlugLookup() {
  function cityNameToPathSlug(name) {
    return String(name || '')
      .trim()
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/\s+/g, '-');
  }
  var i;
  for (i = 0; i < serviceAreaCitiesList.length; i++) {
    var s = cityNameToPathSlug(serviceAreaCitiesList[i]);
    if (s) SERVICE_AREA_SLUG_LOOKUP[s] = true;
  }
  var legacy = ['newmarket', 'etobicoke', 'markham', 'north-york', 'richmond-hill', 'scarborough', 'toronto', 'vaughan', 'mississauga'];
  for (i = 0; i < legacy.length; i++) SERVICE_AREA_SLUG_LOOKUP[legacy[i]] = true;
})();

/** True when path looks like /service-name-city (e.g. /window-repair-toronto), not a generic service slug. */
function pathIsServiceLocationVariant(path) {
  var slug = String(path || '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .toLowerCase();
  if (!slug || slug.indexOf('-') === -1) return false;
  for (var locSlug in SERVICE_AREA_SLUG_LOOKUP) {
    if (!Object.prototype.hasOwnProperty.call(SERVICE_AREA_SLUG_LOOKUP, locSlug)) continue;
    var tail = '-' + locSlug;
    if (slug.length > tail.length && slug.slice(slug.length - tail.length) === tail) return true;
  }
  return false;
}

/** Same order as svelte-app/src/lib/service-cards.js */
var serviceCardDefs = [
  { category: 'emergency', badge: '24/7', title: 'Emergency Glass Repair', path: '/emergency-glass-repair', desc: "24/7 emergency service for broken or shattered glass. Fast response, professional repair, and cost-effective solutions. Don't replace when we can repair!" },
  { category: 'residential', badge: 'FAST', title: 'Broken Window Repair', path: '/broken-window-repair', desc: 'Fast and safe repair of broken windows. Save 60-80% compared to replacement. Professional assessment to determine the best solution for your damage.' },
  { category: 'residential', badge: 'REPAIR', title: 'Residential Window Repair', path: '/residential-window-repair', desc: 'Complete repair services for all types of residential windows. Save 60-80% vs replacement with professional repair techniques.' },
  { category: 'residential', badge: 'TORONTO', title: 'Window Repair Toronto', path: '/window-repair-toronto', desc: 'Same-day window repair in Toronto for cracked, broken, and foggy glass. Repair-first service that saves 60-80% vs replacement.' },
  { category: 'residential', badge: 'NORTH YORK', title: 'Window Repair North York', path: '/window-repair-north-york', desc: 'Fast and affordable window repair in North York for homes, condos, and businesses. 24/7 emergency response available.' },
  { category: 'commercial', badge: 'REPAIR', title: 'Commercial Glass Repair', path: '/commercial-glass-repair', desc: 'Reliable glass repair for storefronts, offices, and other commercial properties. Professional repair saves 60-80% vs replacement.' },
  { category: 'residential', badge: 'REPAIR', title: 'Foggy Window Repair', path: '/foggy-window-repair', desc: 'Restore clarity to your insulated windows with our professional defogging and seal repair services. Save 60-80% vs replacement.' },
  { category: 'commercial', badge: 'REPAIR', title: 'Storefront Glass Repair', path: '/storefront-glass-repair', desc: 'Professional storefront glass repair services. Keep your business looking its best with cost-effective repair solutions.' },
  { category: 'commercial', title: 'Aluminum Storefront', path: '/storefront-glass-repair', desc: 'Aluminum storefront glass repair and installation for commercial spaces. Durable frames, tempered glass, and professional installation across the GTA.' },
  { category: 'other', badge: 'REPAIR', title: 'Window & Door Hardware Repair', path: '/window-and-door-hardware-repairs', desc: 'Expert repair for handles, locks, hinges, and more for all types of windows and doors. Professional repair saves money.' },
  { category: 'residential', title: 'Door Repairs', path: '/door-repairs', desc: 'Door glass repair and replacement for patio doors, entry doors, and sliding glass doors. Save 60-80% with repair when possible.' },
  { category: 'residential', title: 'Shower Glass Repair', path: '/shower-glass-repair', desc: 'Repair and replacement for frameless enclosures, sliding shower doors, and hinged panels.' },
  { category: 'residential', title: 'Patio Door Repair', path: '/patio-door-repair', desc: 'Glass panel replacement and hardware repair for sliding and hinged patio doors. Same-day service.' },
  { category: 'residential', title: 'Sliding Door Repair', path: '/sliding-door-repair', desc: 'Track, roller, glass, and hardware repair for residential and commercial sliding doors.' },
  { category: 'residential', title: 'Window Glass Replacement', path: '/window-glass-replacement', desc: 'Upgrade your home or business with our high-quality window glass replacement services.' },
  { category: 'residential', badge: 'TORONTO', title: 'Glass Replacement Toronto', path: '/glass-replacement-toronto', desc: 'Expert glass replacement in Toronto for residential and commercial windows with same-day options and clear pricing.' },
  { category: 'residential', title: 'Double Pane Window Replacement', path: '/double-pane-window-replacement', desc: 'Improve energy efficiency and comfort with our expert double-pane window replacements.' },
  { category: 'other', title: 'Custom Mirror', path: '/custom-mirror', desc: 'Custom mirror installation and repair. Cut to size for bathrooms, closets, and commercial spaces. Professional finish across the GTA.' },
  { category: 'other', title: 'Glass Repair vs Window Glass Replacement', path: '/glass-repair-vs-replacement', desc: 'Replace just the glass (~$200) or full window (~$2k). We replace panes and IGUs; we do not fill or seal cracks. Expert assessment across the GTA.' },
];

function buildServiceGroups() {
  var out = { emergency: [], residential: [], commercial: [], more: [] };
  for (var i = 0; i < serviceCardDefs.length; i++) {
    var d = serviceCardDefs[i];
    if (pathIsServiceLocationVariant(d.path)) continue;
    var item = {
      badge: d.badge || null,
      title: d.title,
      desc: d.desc,
      link: d.path,
    };
    if (d.category === 'emergency') out.emergency.push(item);
    else if (d.category === 'residential') out.residential.push(item);
    else if (d.category === 'commercial') out.commercial.push(item);
    else out.more.push(item);
  }
  return out;
}

/** footerServicesIndexOrder from site-data.js */
var footerServicePaths = [
  ['/emergency-glass-repair', 'Emergency Glass Repair'],
  ['/window-repair-toronto', 'Window Repair Toronto'],
  ['/window-repair-north-york', 'Window Repair North York'],
  ['/glass-replacement-toronto', 'Glass Replacement Toronto'],
  ['/broken-window-repair', 'Broken Window Repair'],
  ['/residential-window-repair', 'Residential Window Repair'],
  ['/commercial-glass-repair', 'Commercial Glass Repair'],
  ['/foggy-window-repair', 'Foggy Window Repair'],
  ['/storefront-glass-repair', 'Storefront Glass Repair'],
  ['/shower-glass-repair', 'Shower Glass Repair'],
  ['/patio-door-repair', 'Patio Door Repair'],
  ['/sliding-door-repair', 'Sliding Door Repair'],
  ['/window-and-door-hardware-repairs', 'Window & Door Hardware'],
  ['/window-glass-replacement', 'Window Glass Replacement'],
  ['/double-pane-window-replacement', 'Double Pane Replacement'],
];

var servicesForFooter = footerServicePaths
  .filter(function (pair) {
    return !pathIsServiceLocationVariant(pair[0]);
  })
  .map(function (pair) {
    return [pair[1], pair[0]];
  });

window.OMG_DATA = {
  siteUrl: siteUrl,
  ogImage: siteUrl + '/images/og-image.jpg',
  tallyFormSrc: tallyFormSrc,
  serviceAreaCitiesList: serviceAreaCitiesList,
  site: {
    phoneDisplay: '647-803-2730',
    phoneE164: '+16478032730',
    afterHoursDisplay: '437-525-1255',
    afterHoursE164: '+14375251255',
    smsDefaultBody:
      'Hi OhMyGlass. Sending photos of the damage for a quote. Dimensions if I have them: ',
    smsHelper: 'Snap a pic, send dimensions if you have them, and we will quote back in minutes.',
    /** Default home hero subtitle + home meta description (keep in sync with index.html meta). */
    homeHeroSub:
      'Professional glass repair and replacement windows in Toronto, North York, Vaughan, Richmond Hill, Markham, Mississauga & GTA. We repair cracked, broken, and foggy glass – saving you 60-80% vs full replacement. 24/7 emergency glass repair available.',
  },
  contact: {
    phone: '647-803-2730',
    phoneHref: 'tel:+16478032730',
    afterHoursPhone: '437-525-1255',
    afterHoursPhoneHref: 'tel:+14375251255',
    email: 'info@ohmyglass.ca',
    emailHref: 'mailto:info@ohmyglass.ca',
    secondaryEmail: 'ohmy.glass.to@gmail.com',
    secondaryEmailHref: 'mailto:ohmy.glass.to@gmail.com',
    addressDisplay: '7 Benjamin Boake Trail, North York, ON, Canada',
    streetLines: ['7 Benjamin Boake Trail', 'North York, ON, Canada'],
    googleMaps: 'https://maps.app.goo.gl/asTcvrbx57PsitbD9',
    googleMapsEmbedSrc:
      'https://www.google.com/maps?q=7+Benjamin+Boake+Trail+North+York+ON+Canada&output=embed',
    googleMapsEmbedGtaSrc:
      'https://www.google.com/maps?q=7+Benjamin+Boake+Trail+North+York+ON+Canada&z=9&output=embed',
    facebook: 'https://www.facebook.com/ohmy.glass.to',
    instagram: 'https://www.instagram.com/ohmy.glass/',
  },
  trust: {
    responseTimeShort: '~90 min · core GTA',
    responseTimeLine:
      'Typical on-site arrival within 90 minutes in core GTA, 24/7, and your dispatcher confirms a live ETA on every call.',
    responseTimeBar: '24/7 · GTA · ~90 MIN ON-SITE · CORE GTA',
    responseTimeEmergencyBadge: '~90 min on-site · core GTA',
    warrantyLine: '',
    insuranceLine: '',
    licensedBadge: 'Licensed · Insured · WSIB',
  },
  faq: [
    {
      q: 'Do you handle insurance claims?',
      a:
        'We provide itemized invoices and documentation carriers expect, and we coordinate with you (and your adjuster when needed) on scope and paperwork. Coverage decisions are always up to your insurer.',
    },
  ],
  services: buildServiceGroups(),
  areas: [
    { name: 'Toronto', pop: '2.79M', jobs: '1,800+', eta: 'Core zone', desc: 'Full downtown, midtown, east and west end coverage. Our flagship service area with the highest job volume.' },
    { name: 'North York', pop: '869K', jobs: '1,200+', eta: 'HQ zone', desc: 'Home base. HQ at 7 Benjamin Boake Trail. Primary dispatch hub for GTA-wide emergency and scheduled work.' },
    { name: 'Vaughan', pop: '323K', jobs: '420+', eta: 'Metro GTA', desc: 'Full coverage including Maple, Woodbridge, Thornhill, Concord. Residential + commercial.' },
    { name: 'Richmond Hill', pop: '202K', jobs: '280+', eta: 'Metro GTA', desc: 'Oak Ridges, Yonge corridor, Bayview. Same-day residential specialty.' },
    { name: 'Markham', pop: '338K', jobs: '310+', eta: 'Metro GTA', desc: 'Unionville, Cathedraltown, Milliken. Strong commercial & office presence.' },
    { name: 'Mississauga', pop: '717K', jobs: '530+', eta: 'Metro GTA', desc: 'Port Credit to Square One. Storefront and high-rise residential.' },
    { name: 'Scarborough', pop: '632K', jobs: '460+', eta: 'Metro GTA', desc: 'Full east GTA coverage. Agincourt, Rouge, Cliffside.' },
    { name: 'Etobicoke', pop: '365K', jobs: '390+', eta: 'Metro GTA', desc: 'Humber Bay, Kipling, Islington. Commercial strips and single-family homes.' },
    { name: 'Newmarket', pop: '84K', jobs: '150+', eta: 'Extended GTA', desc: 'Northern GTA coverage. Scheduled appointments same-week.' },
  ],
  reviews: [
    { stars: 5, text: 'Called at 11pm after a break-in at my shop. Crew was on-site in 35 minutes, boarded everything up, and had new tempered glass in two days. Charged exactly what was quoted.', name: 'Michael R.', meta: 'Storefront · Queen St W', initials: 'MR' },
    { stars: 5, text: 'My double-pane kitchen window cracked in the cold snap. Three other places quoted me a full window replacement. OhMyGlass repaired just the glass for a quarter of the price.', name: 'Priya S.', meta: 'Residential · North York', initials: 'PS' },
    { stars: 5, text: 'Frameless shower enclosure cracked during installation by another company. OhMyGlass came out same-day, measured everything, and replaced the panel perfectly. Saved my reno timeline.', name: 'Derek K.', meta: 'Homeowner · Vaughan', initials: 'DK' },
  ],
  work: [
    { brand: "Ali Baba's", cat: 'Commercial Storefront', desc: 'Replacing glass in a commercial space. Full tempered storefront panel installed in under 4 hours.', loc: 'Toronto', video: 'videos/ali-babas.mp4' },
    { brand: 'Car Aid Auto Collision', cat: 'Commercial Glass Installation', desc: 'Professional storefront glass installation and repair services across the shop facade.', loc: 'Scarborough', video: 'videos/car-aid-auto collision.mp4' },
    { brand: 'Gracious Living', cat: 'Commercial Replacement', desc: 'Replacing glass in a commercial space. Custom-fabricated IGUs for an office retrofit.', loc: 'Mississauga', video: 'videos/gracious-living.mp4' },
  ],
  processSteps: [
    { n: '01', t: 'Phone assessment', d: 'We ask about the type and size of break, whether anyone is injured, and if the property is secure. Helps us dispatch the right crew with the right materials.' },
    { n: '02', t: 'Rapid dispatch', d: 'Once details are confirmed, the nearest available technician is dispatched and your dispatcher shares an estimated arrival based on distance, traffic, and current call volume.' },
    { n: '03', t: 'On-site securing', d: 'Technician cleans up all broken glass, then secures the opening with a board-up (reinforced plywood or polycarbonate) or temporary glazing.' },
    { n: '04', t: 'Measure for permanent glass', d: 'Precise measurements are taken on-site so the replacement glass can be fabricated or sourced promptly.' },
    { n: '05', t: 'Follow-up installation', d: 'Once the permanent glass is ready, we schedule a return visit at a time convenient for you to complete the replacement.' },
  ],
  checklist: [
    { n: '01', t: 'Clear the area', d: 'Keep children, pets, and anyone without proper footwear away from the broken glass. Shards can scatter several feet from the break point.' },
    { n: '02', t: "Don't touch attached glass", d: 'Glass still attached to the frame can fall without warning and cause deep cuts. Leave loose pieces alone until our technician arrives.' },
    { n: '03', t: 'Wear shoes and gloves', d: 'If you must walk near the area, wear closed-toe shoes and work gloves. Thin slippers or bare feet are a serious hazard.' },
    { n: '04', t: 'Cover the opening', d: 'Use a heavy tarp, thick cardboard, or plastic sheeting secured with tape to block wind, rain, and debris until we arrive.' },
    { n: '05', t: 'Photograph the damage', d: 'Take photos of the damage from both inside and outside. These help our technician prepare the right glass size and type before arriving.' },
    { n: '06', t: 'Call OhMyGlass', d: 'Call 647-803-2730. Our emergency line is staffed 24/7 including nights, weekends, and holidays.' },
  ],
  emTypes: [
    { ic: '01', t: 'Break-ins & vandalism', d: 'Shattered storefront glass, smashed residential windows, broken door glass. We secure and replace.' },
    { ic: '02', t: 'Storm damage', d: 'Windows broken by wind-borne debris, hail, or fallen tree branches. Weather-sealed same day.' },
    { ic: '03', t: 'Accidental impacts', d: 'Sports equipment, vehicle collisions, or objects thrown by lawn equipment. Fast turnaround.' },
    { ic: '04', t: 'Thermal stress cracks', d: 'Cracks that appear without visible impact, caused by extreme temperature differences between surface and edges.' },
    { ic: '05', t: 'Failed sealed units', d: 'A sudden crack in a double-pane window can leave one pane exposed and should be addressed promptly.' },
    { ic: '06', t: 'Commercial door glass', d: 'Broken entrance doors that prevent a business from opening or securing for the night.' },
  ],
  servicesForFooter: servicesForFooter,
};

(function ensureSiteHomeHeroSub() {
  var site = window.OMG_DATA && window.OMG_DATA.site;
  if (!site) return;
  var fallback =
    'Professional glass repair and replacement windows in Toronto, North York, Vaughan, Richmond Hill, Markham, Mississauga & GTA. We repair cracked, broken, and foggy glass – saving you 60-80% vs full replacement. 24/7 emergency glass repair available.';
  if (!site.homeHeroSub || String(site.homeHeroSub).trim() === '') {
    site.homeHeroSub = fallback;
  }
})();

window.OMG_smsHref = function OMG_smsHref() {
  var body = window.OMG_DATA.site.smsDefaultBody;
  var p = window.OMG_DATA.site.phoneE164;
  var smsTarget = p.indexOf('+') === 0 ? p : '+' + String(p).replace(/\D/g, '');
  return 'sms:' + smsTarget + '?body=' + encodeURIComponent(body);
};

window.dataLayer = window.dataLayer || [];

window.OMG_trackEvent = function OMG_trackEvent(eventName, params) {
  var p = params || {};
  if (typeof console !== 'undefined' && console.debug) {
    console.debug('[OMG]', eventName, p);
  }
  if (window.dataLayer && typeof window.dataLayer.push === 'function') {
    var payload = { event: eventName };
    for (var k in p) {
      if (Object.prototype.hasOwnProperty.call(p, k)) payload[k] = p[k];
    }
    window.dataLayer.push(payload);
  }
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, p);
    } catch (e) {}
  }
};

function loadPagesJson() {
  return fetch('pages.json')
    .then(function (r) {
      if (!r.ok) throw new Error('pages.json ' + r.status);
      return r.json();
    })
    .then(function (pages) {
      window.OMG_PAGES = pages;
      window.dispatchEvent(new Event('omg-pages-ready'));
    })
    .catch(function (err) {
      console.error('[OhMyGlass] Failed to load pages.json', err);
      window.OMG_PAGES = [];
      window.dispatchEvent(new Event('omg-pages-ready'));
    });
}

loadPagesJson();
