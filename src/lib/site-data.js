/** Append internal UTM params to a path for in-site links (source=website, medium=internal). */
export function withInternalUtm(path, campaign = 'nav') {
  const [pathname, existingQuery] = path.split('?');
  const hash = pathname.includes('#') ? pathname.slice(pathname.indexOf('#')) : '';
  const base = pathname.includes('#') ? pathname.slice(0, pathname.indexOf('#')) : pathname;
  const params = new URLSearchParams(existingQuery || '');
  params.set('utm_source', 'website');
  params.set('utm_medium', 'internal');
  params.set('utm_campaign', campaign);
  const query = params.toString();
  return `${base}${query ? `?${query}` : ''}${hash}`;
}

/** @type {Array<{ label: string; href: string }>} */
export const navLinks = [
  { label: 'Services', href: withInternalUtm('/services', 'nav') },
  { label: 'Service Areas', href: withInternalUtm('/service-areas', 'nav') },
  { label: 'Resources', href: withInternalUtm('/resources', 'nav') },
  { label: 'Our Works', href: withInternalUtm('/#our-works', 'nav') },
  { label: 'Reviews', href: withInternalUtm('/#reviews', 'nav') },
  { label: 'Contact', href: withInternalUtm('/contact', 'nav') }
];

/** Footer service links - index page order (Emergency first, etc.) */
/** @type {Array<{ label: string; href: string }>} */
export const footerServicesIndexOrder = [
  { label: 'Emergency Glass Repair', href: withInternalUtm('/emergency-glass-repair', 'footer') },
  { label: 'Window Repair Toronto', href: withInternalUtm('/window-repair-toronto', 'footer') },
  { label: 'Window Repair North York', href: withInternalUtm('/window-repair-north-york', 'footer') },
  { label: 'Glass Replacement Toronto', href: withInternalUtm('/glass-replacement-toronto', 'footer') },
  { label: 'Broken Window Repair', href: withInternalUtm('/broken-window-repair', 'footer') },
  { label: 'Residential Window Repair', href: withInternalUtm('/residential-window-repair', 'footer') },
  { label: 'Commercial Glass Repair', href: withInternalUtm('/commercial-glass-repair', 'footer') },
  { label: 'Foggy Window Repair', href: withInternalUtm('/foggy-window-repair', 'footer') },
  { label: 'Storefront Glass Repair', href: withInternalUtm('/storefront-glass-repair', 'footer') },
  { label: 'Window & Door Hardware', href: withInternalUtm('/window-and-door-hardware-repairs', 'footer') },
  { label: 'Window Glass Replacement', href: withInternalUtm('/window-glass-replacement', 'footer') },
  { label: 'Double Pane Replacement', href: withInternalUtm('/double-pane-window-replacement', 'footer') }
];

/** Footer service links - contact/free-quote order (Window Glass Replacement first) */
/** @type {Array<{ label: string; href: string }>} */
export const footerServicesDefaultOrder = [
  { label: 'Window Repair Toronto', href: withInternalUtm('/window-repair-toronto', 'footer') },
  { label: 'Window Repair North York', href: withInternalUtm('/window-repair-north-york', 'footer') },
  { label: 'Glass Replacement Toronto', href: withInternalUtm('/glass-replacement-toronto', 'footer') },
  { label: 'Window Glass Replacement', href: withInternalUtm('/window-glass-replacement', 'footer') },
  { label: 'Emergency Glass Repair', href: withInternalUtm('/emergency-glass-repair', 'footer') },
  { label: 'Residential Window Repair', href: withInternalUtm('/residential-window-repair', 'footer') },
  { label: 'Commercial Glass Repair', href: withInternalUtm('/commercial-glass-repair', 'footer') },
  { label: 'Foggy Window Repair', href: withInternalUtm('/foggy-window-repair', 'footer') },
  { label: 'Broken Window Repair', href: withInternalUtm('/broken-window-repair', 'footer') },
  { label: 'Double Pane Replacement', href: withInternalUtm('/double-pane-window-replacement', 'footer') },
  { label: 'Storefront Glass Repair', href: withInternalUtm('/storefront-glass-repair', 'footer') },
  { label: 'Window & Door Hardware', href: withInternalUtm('/window-and-door-hardware-repairs', 'footer') }
];

/** GTA service area cities string (top cities first: Toronto, North York, Vaughan, Richmond Hill, Markham, Mississauga) */
export const serviceAreaCities =
  'Toronto, North York, Vaughan, Richmond Hill, Markham, Mississauga, Scarborough, Etobicoke, Newmarket, Oakville, Ajax, Milton, Pickering, Whitby, Woodbridge, Burlington, Halton Hills, Caledon, Aurora, East Gwillimbury, Georgina, King, Whitchurch-Stouffville, Clarington, Oshawa, Scugog, Uxbridge';

/** Same cities as an array for grid/pill display */
export const serviceAreaCitiesList = [
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
  'Uxbridge'
];

/** NAP (Name, Address, Phone) – must match Google Business Profile exactly */
export const nap = {
  name: 'OhMyGlass',
  telephone: '647-803-2730',
  telephoneSchema: '+16478032730',
  telephoneHref: 'tel:+16478032730',
  address: {
    streetAddress: '7 Benjamin Boake Trail',
    addressLocality: 'North York',
    addressRegion: 'ON',
    postalCode: '',
    addressCountry: 'CA'
  },
  /** Single-line for display (match GBP) */
  addressDisplay: '7 Benjamin Boake Trail, North York, ON, Canada'
};

/** Contact and social (NAP must match Google Business Profile) */
export const contact = {
  phone: nap.telephone,
  phoneHref: nap.telephoneHref,
  addressDisplay: nap.addressDisplay,
  email: 'info@ohmyglass.ca',
  emailHref: 'mailto:info@ohmyglass.ca',
  serviceAreasHref: withInternalUtm('/service-areas', 'footer'),
  googleMaps: 'https://maps.app.goo.gl/asTcvrbx57PsitbD9',
  /** iframe src for embedding the same location in the page */
  googleMapsEmbedSrc:
    'https://www.google.com/maps?q=7+Benjamin+Boake+Trail+North+York+ON+Canada&output=embed',
  /** iframe src for GTA-wide view (zoomed out to show Greater Toronto Area) */
  googleMapsEmbedGtaSrc:
    'https://www.google.com/maps?q=7+Benjamin+Boake+Trail+North+York+ON+Canada&z=9&output=embed',
  facebook: 'https://www.facebook.com/ohmy.glass.to',
  instagram: 'https://www.instagram.com/ohmy.glass/'
};

/** Tally form embed URL (data-tally-src value) */
export const tallyFormSrc = 'https://tally.so/embed/wMl6y0?ref=Tally&hideTitle=1&dynamicHeight=1';

/** Site base URL for canonical/OG */
export const siteUrl = 'https://ohmyglass.ca';

/** OG image path */
export const ogImage = 'https://ohmyglass.ca/images/og-image.jpg';
