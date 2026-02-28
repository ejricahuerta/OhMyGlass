/** @type {Array<{ label: string; href: string }>} */
export const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Resources', href: '/resources' },
  { label: 'Our Works', href: '/#our-works' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/contact' }
];

/** Footer service links - index page order (Emergency first, etc.) */
/** @type {Array<{ label: string; href: string }>} */
export const footerServicesIndexOrder = [
  { label: 'Emergency Glass Repair', href: '/emergency-glass-repair' },
  { label: 'Broken Window Repair', href: '/broken-window-repair' },
  { label: 'Residential Window Repair', href: '/residential-window-repair' },
  { label: 'Commercial Glass Repair', href: '/commercial-glass-repair' },
  { label: 'Foggy Window Repair', href: '/foggy-window-repair' },
  { label: 'Storefront Glass Repair', href: '/storefront-glass-repair' },
  { label: 'Window & Door Hardware', href: '/window-and-door-hardware-repairs' },
  { label: 'Window Glass Replacement', href: '/window-glass-replacement' },
  { label: 'Double Pane Replacement', href: '/double-pane-window-replacement' }
];

/** Footer service links - contact/free-quote order (Window Glass Replacement first) */
/** @type {Array<{ label: string; href: string }>} */
export const footerServicesDefaultOrder = [
  { label: 'Window Glass Replacement', href: '/window-glass-replacement' },
  { label: 'Emergency Glass Repair', href: '/emergency-glass-repair' },
  { label: 'Residential Window Repair', href: '/residential-window-repair' },
  { label: 'Commercial Glass Repair', href: '/commercial-glass-repair' },
  { label: 'Foggy Window Repair', href: '/foggy-window-repair' },
  { label: 'Broken Window Repair', href: '/broken-window-repair' },
  { label: 'Double Pane Replacement', href: '/double-pane-window-replacement' },
  { label: 'Storefront Glass Repair', href: '/storefront-glass-repair' },
  { label: 'Window & Door Hardware', href: '/window-and-door-hardware-repairs' }
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
  serviceAreasHref: '/service-areas',
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
