/**
 * Service cards for the /services page. Order and styling match services.html.
 * hrefs use clean URLs with internal UTM params.
 * category: used for grouping on the services page (emergency, residential, commercial, other).
 */
import { withInternalUtm } from '$lib/site-data.js';

/** @type {Array<{ href: string; badge?: string; title: string; description: string; priority?: boolean; category: 'emergency' | 'residential' | 'commercial' | 'other'; icon?: string }>} */
export const serviceCards = [
  {
    href: withInternalUtm('/emergency-glass-repair', 'services'),
    badge: '24/7',
    title: 'Emergency Glass Repair',
    description:
      '24/7 emergency service for broken or shattered glass. Fast response, professional repair, and cost-effective solutions. Don\'t replace when we can repair!',
    priority: true,
    category: 'emergency',
    icon: 'fa-bolt'
  },
  {
    href: withInternalUtm('/broken-window-repair', 'services'),
    badge: 'FAST',
    title: 'Broken Window Repair',
    description:
      'Fast and safe repair of broken windows. Save 60-80% compared to replacement. Professional assessment to determine the best solution for your damage.',
    priority: true,
    category: 'residential',
    icon: 'fa-window-maximize'
  },
  {
    href: withInternalUtm('/residential-window-repair', 'services'),
    badge: 'REPAIR',
    title: 'Residential Window Repair',
    description:
      'Complete repair services for all types of residential windows. Save 60-80% vs replacement with professional repair techniques.',
    priority: true,
    category: 'residential',
    icon: 'fa-house'
  },
  {
    href: withInternalUtm('/commercial-glass-repair', 'services'),
    badge: 'REPAIR',
    title: 'Commercial Glass Repair',
    description:
      'Reliable glass repair for storefronts, offices, and other commercial properties. Professional repair saves 60-80% vs replacement.',
    priority: true,
    category: 'commercial',
    icon: 'fa-building'
  },
  {
    href: withInternalUtm('/foggy-window-repair', 'services'),
    badge: 'REPAIR',
    title: 'Foggy Window Repair',
    description:
      'Restore clarity to your insulated windows with our professional defogging and seal repair services. Save 60-80% vs replacement.',
    priority: true,
    category: 'residential',
    icon: 'fa-droplet'
  },
  {
    href: withInternalUtm('/storefront-glass-repair', 'services'),
    badge: 'REPAIR',
    title: 'Storefront Glass Repair',
    description:
      'Professional storefront glass repair services. Keep your business looking its best with cost-effective repair solutions.',
    priority: true,
    category: 'commercial',
    icon: 'fa-store'
  },
  {
    href: withInternalUtm('/aluminum-storefront', 'services'),
    title: 'Aluminum Storefront',
    description:
      'Aluminum storefront glass repair and installation for commercial spaces. Durable frames, tempered glass, and professional installation across the GTA.',
    category: 'commercial',
    icon: 'fa-door-open'
  },
  {
    href: withInternalUtm('/window-and-door-hardware-repairs', 'services'),
    badge: 'REPAIR',
    title: 'Window & Door Hardware Repair',
    description:
      'Expert repair for handles, locks, hinges, and more for all types of windows and doors. Professional repair saves money.',
    priority: true,
    category: 'other',
    icon: 'fa-wrench'
  },
  {
    href: withInternalUtm('/door-repairs', 'services'),
    title: 'Door Repairs',
    description:
      'Door glass repair and replacement for patio doors, entry doors, and sliding glass doors. Save 60-80% with repair when possible.',
    category: 'residential',
    icon: 'fa-door-closed'
  },
  {
    href: withInternalUtm('/window-glass-replacement', 'services'),
    title: 'Window Glass Replacement',
    description:
      'Upgrade your home or business with our high-quality window glass replacement services.',
    category: 'residential',
    icon: 'fa-square'
  },
  {
    href: withInternalUtm('/double-pane-window-replacement', 'services'),
    title: 'Double Pane Window Replacement',
    description:
      'Improve energy efficiency and comfort with our expert double-pane window replacements.',
    category: 'residential',
    icon: 'fa-layer-group'
  },
  {
    href: withInternalUtm('/custom-mirror', 'services'),
    title: 'Custom Mirror',
    description:
      'Custom mirror installation and repair. Cut to size for bathrooms, closets, and commercial spaces. Professional finish across the GTA.',
    category: 'other',
    icon: 'fa-mirror'
  },
  {
    href: withInternalUtm('/glass-repair-vs-replacement', 'services'),
    title: 'Glass Repair vs Window Glass Replacement',
    description:
      'Replace just the glass (~$200) or full window (~$2k). We replace panes and IGUs—no crack-filling. Expert assessment across the GTA.',
    category: 'other',
    icon: 'fa-scale-balanced'
  }
];

/** Group service cards by category for the services page. */
const CATEGORY_ORDER = ['emergency', 'residential', 'commercial', 'other'];
const CATEGORY_LABELS = {
  emergency: 'Emergency & urgent',
  residential: 'Residential',
  commercial: 'Commercial',
  other: 'More services'
};

export function getServicesByCategory() {
  const byCat = { emergency: [], residential: [], commercial: [], other: [] };
  for (const card of serviceCards) {
    const cat = card.category || 'other';
    if (byCat[cat]) byCat[cat].push(card);
  }
  return CATEGORY_ORDER.map((key) => ({ key, label: CATEGORY_LABELS[key], cards: byCat[key] || [] })).filter(
    (g) => g.cards.length > 0
  );
}
