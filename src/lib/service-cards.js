/**
 * Service cards for the /services page. Order and styling match services.html.
 * hrefs use clean URLs (no .html).
 */

/** @type {Array<{ href: string; badge?: string; title: string; description: string; priority?: boolean }>} */
export const serviceCards = [
  {
    href: '/emergency-glass-repair',
    badge: '24/7',
    title: 'Emergency Glass Repair',
    description:
      '24/7 emergency service for broken or shattered glass. Fast response, professional repair, and cost-effective solutions. Don\'t replace when we can repair!',
    priority: true
  },
  {
    href: '/broken-window-repair',
    badge: 'FAST',
    title: 'Broken Window Repair',
    description:
      'Fast and safe repair of broken windows. Save 60-80% compared to replacement. Professional assessment to determine the best solution for your damage.',
    priority: true
  },
  {
    href: '/residential-window-repair',
    badge: 'REPAIR',
    title: 'Residential Window Repair',
    description:
      'Complete repair services for all types of residential windows. Save 60-80% vs replacement with professional repair techniques.',
    priority: true
  },
  {
    href: '/commercial-glass-repair',
    badge: 'REPAIR',
    title: 'Commercial Glass Repair',
    description:
      'Reliable glass repair for storefronts, offices, and other commercial properties. Professional repair saves 60-80% vs replacement.',
    priority: true
  },
  {
    href: '/foggy-window-repair',
    badge: 'REPAIR',
    title: 'Foggy Window Repair',
    description:
      'Restore clarity to your insulated windows with our professional defogging and seal repair services. Save 60-80% vs replacement.',
    priority: true
  },
  {
    href: '/storefront-glass-repair',
    badge: 'REPAIR',
    title: 'Storefront Glass Repair',
    description:
      'Professional storefront glass repair services. Keep your business looking its best with cost-effective repair solutions.',
    priority: true
  },
  {
    href: '/aluminum-storefront',
    title: 'Aluminum Storefront',
    description:
      'Aluminum storefront glass repair and installation for commercial spaces. Durable frames, tempered glass, and professional installation across the GTA.'
  },
  {
    href: '/window-and-door-hardware-repairs',
    badge: 'REPAIR',
    title: 'Window & Door Hardware Repair',
    description:
      'Expert repair for handles, locks, hinges, and more for all types of windows and doors. Professional repair saves money.',
    priority: true
  },
  {
    href: '/door-repairs',
    title: 'Door Repairs',
    description:
      'Door glass repair and replacement for patio doors, entry doors, and sliding glass doors. Save 60-80% with repair when possible.'
  },
  {
    href: '/window-glass-replacement',
    title: 'Window Glass Replacement',
    description:
      'Upgrade your home or business with our high-quality window glass replacement services.'
  },
  {
    href: '/double-pane-window-replacement',
    title: 'Double Pane Window Replacement',
    description:
      'Improve energy efficiency and comfort with our expert double-pane window replacements.'
  },
  {
    href: '/custom-mirror',
    title: 'Custom Mirror',
    description:
      'Custom mirror installation and repair. Cut to size for bathrooms, closets, and commercial spaces. Professional finish across the GTA.'
  },
  {
    href: '/glass-repair-vs-replacement',
    title: 'Glass Repair vs Window Glass Replacement',
    description:
      'Replace just the glass (~$200) or full window (~$2k). We replace panes and IGUs—no crack-filling. Expert assessment across the GTA.'
  }
];
