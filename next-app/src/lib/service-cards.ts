import { withInternalUtm } from "./site-data";

export type ServiceCategory = "emergency" | "residential" | "commercial" | "other";

export type ServiceCard = {
  href: string;
  badge?: string;
  title: string;
  description: string;
  priority?: boolean;
  category: ServiceCategory;
  icon?: string;
};

export const serviceCards: ServiceCard[] = [
  {
    href: withInternalUtm("/emergency-glass-repair", "services"),
    badge: "24/7",
    title: "Emergency Glass Repair",
    description:
      "24/7 emergency service for broken or shattered glass. Fast response, professional repair, and cost-effective solutions. Don't replace when we can repair!",
    priority: true,
    category: "emergency",
    icon: "fa-bolt",
  },
  {
    href: withInternalUtm("/broken-window-repair", "services"),
    badge: "FAST",
    title: "Broken Window Repair",
    description:
      "Fast and safe repair of broken windows. Save 60-80% compared to replacement. Professional assessment to determine the best solution for your damage.",
    priority: true,
    category: "residential",
    icon: "fa-window-maximize",
  },
  {
    href: withInternalUtm("/residential-window-repair", "services"),
    badge: "REPAIR",
    title: "Residential Window Repair",
    description:
      "Complete repair services for all types of residential windows. Save 60-80% vs replacement with professional repair techniques.",
    priority: true,
    category: "residential",
    icon: "fa-house",
  },
  {
    href: withInternalUtm("/window-repair-toronto", "services"),
    badge: "TORONTO",
    title: "Window Repair Toronto",
    description:
      "Same-day window repair in Toronto for cracked, broken, and foggy glass. Repair-first service that saves 60-80% vs replacement.",
    priority: true,
    category: "residential",
    icon: "fa-location-dot",
  },
  {
    href: withInternalUtm("/window-repair-north-york", "services"),
    badge: "NORTH YORK",
    title: "Window Repair North York",
    description:
      "Fast and affordable window repair in North York for homes, condos, and businesses. 24/7 emergency response available.",
    priority: true,
    category: "residential",
    icon: "fa-map-pin",
  },
  {
    href: withInternalUtm("/commercial-glass-repair", "services"),
    badge: "REPAIR",
    title: "Commercial Glass Repair",
    description:
      "Reliable glass repair for storefronts, offices, and other commercial properties. Professional repair saves 60-80% vs replacement.",
    priority: true,
    category: "commercial",
    icon: "fa-building",
  },
  {
    href: withInternalUtm("/foggy-window-repair", "services"),
    badge: "REPAIR",
    title: "Foggy Window Repair",
    description:
      "Restore clarity to your insulated windows with our professional defogging and seal repair services. Save 60-80% vs replacement.",
    priority: true,
    category: "residential",
    icon: "fa-droplet",
  },
  {
    href: withInternalUtm("/storefront-glass-repair", "services"),
    badge: "REPAIR",
    title: "Storefront Glass Repair",
    description:
      "Professional storefront glass repair services. Keep your business looking its best with cost-effective repair solutions.",
    priority: true,
    category: "commercial",
    icon: "fa-store",
  },
  {
    href: withInternalUtm("/storefront-glass-repair", "services"),
    title: "Aluminum Storefront",
    description:
      "Aluminum storefront glass repair and installation for commercial spaces. Durable frames, tempered glass, and professional installation across the GTA.",
    category: "commercial",
    icon: "fa-door-open",
  },
  {
    href: withInternalUtm("/window-and-door-hardware-repairs", "services"),
    badge: "REPAIR",
    title: "Window & Door Hardware Repair",
    description:
      "Expert repair for handles, locks, hinges, and more for all types of windows and doors. Professional repair saves money.",
    priority: true,
    category: "other",
    icon: "fa-wrench",
  },
  {
    href: withInternalUtm("/door-repairs", "services"),
    title: "Door Repairs",
    description:
      "Door glass repair and replacement for patio doors, entry doors, and sliding glass doors. Save 60-80% with repair when possible.",
    category: "residential",
    icon: "fa-door-closed",
  },
  {
    href: withInternalUtm("/shower-glass-repair", "services"),
    title: "Shower Glass Repair",
    description:
      "Repair and replacement for frameless enclosures, sliding shower doors, and hinged panels.",
    category: "residential",
    icon: "fa-shower",
  },
  {
    href: withInternalUtm("/patio-door-repair", "services"),
    title: "Patio Door Repair",
    description:
      "Glass panel replacement and hardware repair for sliding and hinged patio doors. Same-day service.",
    category: "residential",
    icon: "fa-door-open",
  },
  {
    href: withInternalUtm("/sliding-door-repair", "services"),
    title: "Sliding Door Repair",
    description:
      "Track, roller, glass, and hardware repair for residential and commercial sliding doors.",
    category: "residential",
    icon: "fa-sliders",
  },
  {
    href: withInternalUtm("/window-glass-replacement", "services"),
    title: "Window Glass Replacement",
    description:
      "Upgrade your home or business with our high-quality window glass replacement services.",
    category: "residential",
    icon: "fa-square",
  },
  {
    href: withInternalUtm("/glass-replacement-toronto", "services"),
    badge: "TORONTO",
    title: "Glass Replacement Toronto",
    description:
      "Expert glass replacement in Toronto for residential and commercial windows with same-day options and clear pricing.",
    priority: true,
    category: "residential",
    icon: "fa-city",
  },
  {
    href: withInternalUtm("/double-pane-window-replacement", "services"),
    title: "Double Pane Window Replacement",
    description:
      "Improve energy efficiency and comfort with our expert double-pane window replacements.",
    category: "residential",
    icon: "fa-layer-group",
  },
  {
    href: withInternalUtm("/custom-mirror", "services"),
    title: "Custom Mirror",
    description:
      "Custom mirror installation and repair. Cut to size for bathrooms, closets, and commercial spaces. Professional finish across the GTA.",
    category: "other",
    icon: "fa-mirror",
  },
  {
    href: withInternalUtm("/glass-repair-vs-replacement", "services"),
    title: "Glass Repair vs Window Glass Replacement",
    description:
      "Replace just the glass (~$200) or full window (~$2k). We replace panes and IGUs; we do not fill or seal cracks. Expert assessment across the GTA.",
    category: "other",
    icon: "fa-scale-balanced",
  },
];

const CATEGORY_ORDER: ServiceCategory[] = ["emergency", "residential", "commercial", "other"];
const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  emergency: "Emergency & urgent",
  residential: "Residential",
  commercial: "Commercial",
  other: "More services",
};

export function getServicesByCategory() {
  const byCat: Record<ServiceCategory, ServiceCard[]> = {
    emergency: [],
    residential: [],
    commercial: [],
    other: [],
  };
  for (const card of serviceCards) {
    const cat = card.category || "other";
    byCat[cat].push(card);
  }
  return CATEGORY_ORDER.map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
    cards: byCat[key] || [],
  })).filter((g) => g.cards.length > 0);
}
