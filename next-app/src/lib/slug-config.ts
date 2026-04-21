import { withInternalUtm } from "./site-data";

export const CUSTOM_RESOURCE_FAQ_QUESTIONS: Record<
  string,
  Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>
> = {
  "how-to-tell-if-window-seal-is-broken": [
    {
      "@type": "Question",
      name: "What is actually happening when my window looks foggy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern windows have two or three layers of glass with a sealed gap between them for insulation. When the seal fails, outside air gets in and moisture settles permanently between the panes, creating a hazy look that cleaning will not fix.",
      },
    },
    {
      "@type": "Question",
      name: "How do I tell if it is a seal failure or just condensation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If fog wipes away from the inside or outside, it is normal condensation. If it stays after cleaning both surfaces, the seal is broken and the moisture is inside the glass unit.",
      },
    },
    {
      "@type": "Question",
      name: "Can I fix a broken window seal without replacing the whole window?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OhMyGlass replaces only the failed glass unit while keeping your existing frame, trim, and hardware. This usually costs much less than a full window replacement.",
      },
    },
    {
      "@type": "Question",
      name: "When do I actually need a full window replacement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full replacement is usually needed only when the frame is damaged, such as severe rot or warping that prevents proper window operation.",
      },
    },
  ],
  "window-glass-replacement-cost-gta": [
    {
      "@type": "Question",
      name: "What is the difference between glass repair and full window replacement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A glass repair replaces only the glass unit while keeping your existing frame, trim, and hardware. Full replacement is a full tear-out and is usually needed only when the frame is rotted, warped, or structurally compromised.",
      },
    },
    {
      "@type": "Question",
      name: "What affects the cost of window glass repair in Toronto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Main factors include job type and complexity, glass type, floor level and access, frame condition, and whether the work is scheduled or emergency.",
      },
    },
    {
      "@type": "Question",
      name: "Why do you not give quotes over the phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each window is different. Dimensions, glass configuration, frame condition, and access all affect the final quote. We provide free, no-obligation on-site quotes so there are no surprises.",
      },
    },
    {
      "@type": "Question",
      name: "Do you charge for quotes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We provide free quotes for glass repair and replacement jobs across Toronto and the GTA.",
      },
    },
  ],
};

export const RESOURCE_SERVICE_LINKS: Record<string, { href: string; label: string }> = {
  "how-to-tell-if-window-seal-is-broken": {
    href: withInternalUtm("/foggy-window-repair", "content"),
    label: "Foggy window repair",
  },
  "foggy-double-pane-windows-repair-vs-replace": {
    href: withInternalUtm("/foggy-window-repair", "content"),
    label: "Foggy window repair",
  },
  "emergency-glass-repair-toronto-what-to-expect": {
    href: withInternalUtm("/emergency-glass-repair", "content"),
    label: "Emergency glass repair",
  },
  "window-glass-replacement-cost-gta": {
    href: withInternalUtm("/window-glass-replacement", "content"),
    label: "Window glass replacement",
  },
  "storefront-glass-repair-toronto-business-owners": {
    href: withInternalUtm("/storefront-glass-repair", "content"),
    label: "Storefront glass repair",
  },
  "glass-repair-vs-replacement": {
    href: withInternalUtm("/window-glass-replacement", "content"),
    label: "Window glass replacement",
  },
};

export const RELATED_PAGE_LINKS: Record<string, { href: string; label: string }[]> = {
  "shower-glass-repair": [
    { href: "/patio-door-repair", label: "Patio Door Repair" },
    { href: "/door-repairs", label: "Door Repairs" },
    { href: "/broken-window-repair", label: "Broken Window Repair" },
  ],
  "patio-door-repair": [{ href: "/sliding-door-repair", label: "Sliding Door Repair" }],
  "sliding-door-repair": [{ href: "/patio-door-repair", label: "Patio Door Repair" }],
  "door-repairs": [
    { href: "/shower-glass-repair", label: "Shower Glass Repair" },
    { href: "/patio-door-repair", label: "Patio Door Repair" },
    { href: "/sliding-door-repair", label: "Sliding Door Repair" },
  ],
  "residential-window-repair": [{ href: "/window-repair-cost", label: "Window Repair Cost Guide" }],
  "foggy-window-repair": [{ href: "/window-repair-cost", label: "Window Repair Cost Guide" }],
  "broken-window-repair": [{ href: "/window-repair-cost", label: "Window Repair Cost Guide" }],
  "how-to-tell-if-window-seal-is-broken": [
    { href: "/foggy-window-repair", label: "Foggy window repair" },
    { href: "/residential-window-repair", label: "Residential window repair" },
    { href: "/window-repair-cost", label: "Window repair cost" },
  ],
  "window-glass-replacement-cost-gta": [
    { href: "/broken-window-repair", label: "Broken window repair" },
    { href: "/foggy-window-repair", label: "Foggy window repair" },
    { href: "/emergency-glass-repair", label: "Emergency glass repair" },
  ],
};

export const LOCATION_SUFFIXES = [
  "newmarket",
  "etobicoke",
  "markham",
  "north-york",
  "richmond-hill",
  "scarborough",
  "toronto",
  "vaughan",
  "mississauga",
];

export const SERVICE_BASES = [
  "emergency-glass-repair",
  "storefront-glass-repair",
  "window-glass-replacement",
];

export const LOCATION_DISPLAY_NAMES: Record<string, string> = {
  newmarket: "Newmarket",
  etobicoke: "Etobicoke",
  markham: "Markham",
  "north-york": "North York",
  "richmond-hill": "Richmond Hill",
  scarborough: "Scarborough",
  toronto: "Toronto",
  vaughan: "Vaughan",
  mississauga: "Mississauga",
};

export const SERVICE_LABELS: Record<string, string> = {
  "emergency-glass-repair": "Emergency glass repair",
  "storefront-glass-repair": "Storefront glass repair",
  "window-glass-replacement": "Window glass replacement",
};

export const SERVICE_AREA_SECTION_SLUGS = new Set([
  "broken-window-repair",
  "residential-window-repair",
  "foggy-window-repair",
  "commercial-glass-repair",
  "storefront-glass-repair",
]);
