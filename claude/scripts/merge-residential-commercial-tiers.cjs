/**
 * One-off / repeatable: adds residential-{core} and commercial-{core} hub + city pages
 * for neutral matrix cores, plus residential-commercial-glass-repair* for commercial-glass-repair.
 * Reads/writes ../pages.json and writes ../typed-tier-meta.json (bases + labels for JSX/JS sync).
 *
 * City typed pages use `../pages.json` template `{core}-{city}` when present; otherwise the GTA-wide `{core}` page.
 *
 * After running, sync artifacts into the apps (from repo root):
 *   copy claude\\pages.json next-app\\src\\data\\pages.json
 *   copy claude\\pages.json svelte-app\\src\\lib\\pages.json
 *   copy claude\\typed-tier-meta.json next-app\\src\\data\\typed-tier-meta.json
 *   copy claude\\typed-tier-meta.json svelte-app\\src\\lib\\typed-tier-meta.json
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pagesPath = path.join(root, "pages.json");
const metaOut = path.join(root, "typed-tier-meta.json");

const LOCATION_SUFFIXES = [
  "newmarket",
  "etobicoke",
  "markham",
  "north-york",
  "richmond-hill",
  "scarborough",
  "toronto",
  "vaughan",
  "mississauga",
  "brampton",
];

const LOCATION_DISPLAY_NAMES = {
  newmarket: "Newmarket",
  etobicoke: "Etobicoke",
  markham: "Markham",
  "north-york": "North York",
  "richmond-hill": "Richmond Hill",
  scarborough: "Scarborough",
  toronto: "Toronto",
  vaughan: "Vaughan",
  mississauga: "Mississauga",
  brampton: "Brampton",
};

/** Same short labels as content-page.jsx SERVICE_LABELS for core services */
const CORE_LABELS = {
  "window-and-door-hardware-repairs": "Window & door hardware repairs",
  "double-pane-window-replacement": "Double-pane window replacement",
  "window-glass-replacement": "Window glass replacement",
  "commercial-glass-repair": "Commercial glass repair",
  "emergency-glass-repair": "Emergency glass repair",
  "storefront-glass-repair": "Storefront glass repair",
  "broken-window-repair": "Broken window repair",
  "foggy-window-repair": "Foggy window repair",
  "sliding-door-repair": "Sliding door repair",
  "shower-glass-repair": "Shower glass repair",
  "patio-door-repair": "Patio door repair",
  "window-repair": "Window repair",
  "door-repairs": "Door repairs",
  "custom-mirror": "Custom mirror installation",
  "residential-window-repair": "Residential window repair",
  "commercial-window-repair": "Commercial window repair",
};

/** Cores that receive BOTH residential- and commercial- tiers */
const NEUTRAL_CORES = [
  "window-and-door-hardware-repairs",
  "double-pane-window-replacement",
  "window-glass-replacement",
  "emergency-glass-repair",
  "storefront-glass-repair",
  "broken-window-repair",
  "foggy-window-repair",
  "sliding-door-repair",
  "shower-glass-repair",
  "patio-door-repair",
  "door-repairs",
  "custom-mirror",
];

/** Only add residential-* mirror (homes / mixed) for this commercial-named core */
const RESIDENTIAL_ONLY_CORES = ["commercial-glass-repair"];

const LEGACY_BASES = [
  "window-and-door-hardware-repairs",
  "double-pane-window-replacement",
  "window-glass-replacement",
  "commercial-window-repair",
  "residential-window-repair",
  "commercial-glass-repair",
  "emergency-glass-repair",
  "storefront-glass-repair",
  "broken-window-repair",
  "foggy-window-repair",
  "sliding-door-repair",
  "shower-glass-repair",
  "patio-door-repair",
  "window-repair",
  "door-repairs",
  "custom-mirror",
];

function typedLabel(audience, core) {
  const coreLabel = CORE_LABELS[core] || core.replace(/-/g, " ");
  if (audience === "residential") return `Residential ${coreLabel.charAt(0).toLowerCase() + coreLabel.slice(1)}`;
  return `Commercial ${coreLabel.charAt(0).toLowerCase() + coreLabel.slice(1)}`;
}

function collectNewSpecs() {
  /** @type {{ typed: string, audience: 'residential'|'commercial', core: string }[]} */
  const specs = [];
  for (const core of NEUTRAL_CORES) {
    specs.push({ typed: `residential-${core}`, audience: "residential", core });
    specs.push({ typed: `commercial-${core}`, audience: "commercial", core });
  }
  for (const core of RESIDENTIAL_ONLY_CORES) {
    specs.push({ typed: `residential-${core}`, audience: "residential", core });
  }
  return specs;
}

/** Prefer core–city page; else GTA-wide core page so tier city pages can still be generated. */
function resolveTierTemplate(byUrl, core, loc) {
  const exact = `${core}-${loc}`;
  if (byUrl.has(exact)) return { template: byUrl.get(exact), skipImportedNeighbourhood: false };
  if (byUrl.has(core)) return { template: byUrl.get(core), skipImportedNeighbourhood: true };
  return { template: null, skipImportedNeighbourhood: false };
}

function findNeighbourhoodSection(sections) {
  if (!Array.isArray(sections)) return null;
  for (let i = 0; i < sections.length; i++) {
    const h = (sections[i].heading || "").toLowerCase();
    if (/neighbourhood|neighborhood|areas we serve|we serve/i.test(h)) return sections[i];
  }
  return sections[1] || null;
}

function findWhySection(sections) {
  if (!Array.isArray(sections)) return null;
  for (let i = 0; i < sections.length; i++) {
    const h = (sections[i].heading || "").toLowerCase();
    if (/why .*choose|customers choose/i.test(h)) return sections[i];
  }
  return null;
}

function findFaqSection(sections) {
  if (!Array.isArray(sections)) return null;
  for (let i = sections.length - 1; i >= 0; i--) {
    const h = (sections[i].heading || "").toLowerCase();
    if (/frequently asked|faq/i.test(h)) return sections[i];
  }
  return null;
}

function residentialBullets(city) {
  return [
    `Homes, condos, and townhouses across ${city}.`,
    "Glass-only repairs and sealed-unit swaps when frames and hardware are sound.",
    "Repair-first recommendations before full replacement.",
    "Coordination with property managers for multi-unit residential buildings.",
    "Clear written quotes before we order glass.",
    "Free on-site measurements across the GTA.",
  ];
}

function commercialBullets(city) {
  return [
    `Offices, retail, and tenant spaces in ${city}.`,
    "Tempered and laminated safety glass where the Ontario Building Code requires it.",
    "After-hours and weekend scheduling when access needs quieter corridors.",
    "Storefront and entrance priorities paired with our storefront glass city pages when needed.",
    "Free on-site quotes for planned and reactive work.",
    "Minimal operating disruption during repairs.",
  ];
}

function buildTypedCityPage(template, spec, loc, skipImportedNeighbourhood) {
  const city = LOCATION_DISPLAY_NAMES[loc] || loc;
  const label = typedLabel(spec.audience, spec.core);
  const url = `${spec.typed}-${loc}`;
  const nb = findNeighbourhoodSection(template.sections);
  const why = findWhySection(template.sections);
  const faq = findFaqSection(template.sections);

  const sections = [
    {
      heading: `${label} in ${city}`,
      level: 2,
      content: `We provide the following for ${spec.audience === "residential" ? "residential clients" : "commercial clients"} in ${city}:`,
      list: spec.audience === "residential" ? residentialBullets(city) : commercialBullets(city),
    },
  ];
  if (!skipImportedNeighbourhood && nb && Array.isArray(nb.list) && nb.list.length) {
    sections.push({
      heading: nb.heading || `${city} areas we serve`,
      level: 2,
      content: nb.content || `OhMyGlass dispatches across ${city}, including:`,
      list: nb.list,
    });
  }
  if (why && why.content) {
    sections.push({
      heading: why.heading || `Why ${city} customers choose OhMyGlass`,
      level: 2,
      content: why.content,
    });
  }
  if (faq && Array.isArray(faq.list)) {
    sections.push({
      heading: `Frequently asked questions: ${label} in ${city}`,
      level: 2,
      content: faq.content || `Common questions from ${city} homeowners and property managers.`,
      list: faq.list.slice(),
    });
  }

  const metaDesc =
    spec.audience === "residential"
      ? `${label} in ${city}. Homes, condos, and multi-unit residential glass. Free quote—OhMyGlass.`
      : `${label} in ${city}. Offices, retail, and commercial glazing. Free quote—OhMyGlass.`;

  return {
    url,
    type: "service",
    title: `${label} ${city} | OhMyGlass`,
    seo: {
      keywords: [`${label} ${city}`, `${label} ${city} GTA`, `glass repair ${city}`, `OhMyGlass ${city}`],
      meta_description: metaDesc,
    },
    pagecontent:
      spec.audience === "residential"
        ? `OhMyGlass provides ${label.toLowerCase()} for houses, condos, and townhomes in ${city}. Expect repair-first guidance when frames and hardware are sound, careful on-site measurements so replacements match existing openings, written quotes before we order glass, and appointment timing that respects occupied homes and building supers.`
        : `OhMyGlass provides ${label.toLowerCase()} for offices, retail, and other commercial occupancies in ${city}. Work is scoped to commercial priorities: repair-first assessments, code-appropriate tempered and laminated safety glass where required, after-hours or weekend scheduling when corridors need to stay quiet, and clear quotes before glass is ordered.`,
    sections,
  };
}

function buildTypedHub(spec) {
  const label = typedLabel(spec.audience, spec.core);
  const list = LOCATION_SUFFIXES.map((loc) => {
    const name = LOCATION_DISPLAY_NAMES[loc] || loc;
    return `${name} — /${spec.typed}-${loc}`;
  });
  return {
    url: spec.typed,
    type: "service",
    title: `${label} Toronto & GTA | OhMyGlass`,
    seo: {
      keywords: [`${label} GTA`, `${label} Toronto`, "OhMyGlass", "glass repair GTA"],
      meta_description: `${label} by GTA city. For every property type at once, use the general /${spec.core}-[your-city] pages. Free quotes—OhMyGlass.`,
    },
    pagecontent: `This hub is the GTA-wide entry for ${label.toLowerCase()}. Choose your city below for local context and quoting. For homes and businesses together on one page, use the neutral /${spec.core} hub and its city listings.`,
    sections: [
      {
        heading: `${label} by city`,
        level: 2,
        content: `Local dispatch, neighbourhood context, and FAQs for each GTA community we serve.`,
        list,
      },
      {
        heading: "All property types",
        level: 2,
        content: `When a building mixes residential and commercial—or you want every property type in one place—use the general ${CORE_LABELS[spec.core] || spec.core.replace(/-/g, " ")} hub (/${spec.core}) and open the matching city page there.`,
      },
    ],
  };
}

function main() {
  const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
  const byUrl = new Map(pages.map((p) => [p.url, p]));
  const specs = collectNewSpecs();

  let added = 0;
  for (const spec of specs) {
    if (!byUrl.has(spec.typed)) {
      const hub = buildTypedHub(spec);
      pages.push(hub);
      byUrl.set(spec.typed, hub);
      added++;
    }
    for (const loc of LOCATION_SUFFIXES) {
      const u = `${spec.typed}-${loc}`;
      if (byUrl.has(u)) continue;
      const { template, skipImportedNeighbourhood } = resolveTierTemplate(byUrl, spec.core, loc);
      if (!template) {
        console.warn("Missing template: no", `${spec.core}-${loc}`, "or base", spec.core, "for", u);
        continue;
      }
      pages.push(buildTypedCityPage(template, spec, loc, skipImportedNeighbourhood));
      byUrl.set(u, pages[pages.length - 1]);
      added++;
    }
  }

  const allLabels = { ...CORE_LABELS };
  for (const spec of specs) {
    allLabels[spec.typed] = typedLabel(spec.audience, spec.core);
  }

  const allBasesSet = new Set([...LEGACY_BASES, ...specs.map((s) => s.typed)]);
  const allBases = [...allBasesSet].sort((a, b) => b.length - a.length || a.localeCompare(b));

  /** Keep typed GTA hub copy/sections in sync with buildTypedHub (list format + prose). */
  for (const spec of specs) {
    const page = byUrl.get(spec.typed);
    if (!page) continue;
    const fresh = buildTypedHub(spec);
    page.title = fresh.title;
    page.seo = fresh.seo;
    page.pagecontent = fresh.pagecontent;
    page.sections = fresh.sections;
  }

  pages.sort((a, b) => a.url.localeCompare(b.url));
  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2) + "\n", "utf8");

  fs.writeFileSync(
    metaOut,
    JSON.stringify({ SERVICE_LOCATION_BASES: allBases, SERVICE_LABELS: allLabels, addedCount: added }, null, 2) + "\n",
    "utf8"
  );

  console.log("Done. Added records:", added);
  console.log("Wrote", metaOut);
  console.log("Total bases:", allBases.length);
}

main();
