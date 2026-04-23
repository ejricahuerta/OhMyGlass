/**
 * Idempotent: SERVICE_LOCATION_BASES x LOCATION_SUFFIXES -> pages.json city rows.
 * node claude/scripts/ensure-service-location-pages.cjs
 * node claude/scripts/ensure-service-location-pages.cjs --check
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const pagesPath = path.join(root, 'pages.json');
const metaPath = path.join(root, 'typed-tier-meta.json');
const LOCATION_SUFFIXES = ['newmarket','etobicoke','markham','north-york','richmond-hill','scarborough','toronto','vaughan','mississauga','brampton'];
const LOCATION_DISPLAY_NAMES = { newmarket:'Newmarket', etobicoke:'Etobicoke', markham:'Markham', 'north-york':'North York', 'richmond-hill':'Richmond Hill', scarborough:'Scarborough', toronto:'Toronto', vaughan:'Vaughan', mississauga:'Mississauga', brampton:'Brampton' };
function tierPairBases(base) {
  if (base === 'residential-commercial-glass-repair') return { res: base, com: 'commercial-glass-repair', neutral: null };
  if (base === 'commercial-glass-repair') return { res: 'residential-commercial-glass-repair', com: base, neutral: null };
  if (base.startsWith('residential-')) { const core = base.slice(12); return { res: base, com: 'commercial-' + core, neutral: core }; }
  if (base.startsWith('commercial-')) { const core = base.slice(11); return { res: 'residential-' + core, com: base, neutral: core }; }
  return { res: 'residential-' + base, com: 'commercial-' + base, neutral: base };
}
function contentMode(targetBase) {
  if (targetBase === 'residential-commercial-glass-repair') return 'residential-commercial';
  const { neutral } = tierPairBases(targetBase);
  if (neutral && targetBase === neutral) return 'neutral';
  if (targetBase.startsWith('residential-')) return 'residential';
  return 'commercial';
}
function findNeighbourhoodSection(sections) {
  if (!Array.isArray(sections)) return null;
  for (let i = 0; i < sections.length; i++) {
    const h = (sections[i].heading || '').toLowerCase();
    if (/neighbourhood|neighborhood|areas we serve|we serve/i.test(h)) return sections[i];
  }
  return sections[1] || null;
}
function findWhySection(sections) {
  if (!Array.isArray(sections)) return null;
  for (let i = 0; i < sections.length; i++) {
    const h = (sections[i].heading || '').toLowerCase();
    if (/why .*choose|customers choose/i.test(h)) return sections[i];
  }
  return null;
}
function findFaqSection(sections) {
  if (!Array.isArray(sections)) return null;
  for (let i = sections.length - 1; i >= 0; i--) {
    const h = (sections[i].heading || '').toLowerCase();
    if (/frequently asked|faq/i.test(h)) return sections[i];
  }
  return null;
}
function residentialBullets(city) {
  return ['Homes, condos, and townhouses across ' + city + '.','Glass-only repairs and sealed-unit swaps when frames and hardware are sound.','Repair-first recommendations before full replacement.','Coordination with property managers for multi-unit residential buildings.','Clear written quotes before we order glass.','Free on-site measurements across the GTA.'];
}
function commercialBullets(city) {
  return ['Offices, retail, and tenant spaces in ' + city + '.','Tempered and laminated safety glass where the Ontario Building Code requires it.','After-hours and weekend scheduling when access needs quieter corridors.','Storefront and entrance priorities paired with our storefront glass city pages when needed.','Free on-site quotes for planned and reactive work.','Minimal operating disruption during repairs.'];
}
function neutralBullets(city) {
  return ['Homes, condos, retail, offices, and mixed-use buildings across ' + city + '.','Glass-only repairs and sealed-unit swaps when frames and hardware are sound.','Repair-first guidance and code-appropriate safety glass where required.','Written quotes before we order glass; after-hours options when corridors need to stay quiet.','Coordination with homeowners, property managers, and supers for multi-unit buildings.','Free on-site measurements across the GTA.'];
}
function residentialCommercialBullets(city) {
  return ['Small business fronts, tenant improvements, and residential-adjacent commercial in ' + city + '.','Repair-first assessments with clear scopes before glass is ordered.','Coordination with landlords and property managers on access and timing.','Tempered and laminated safety glass where the Ontario Building Code requires it.','Written quotes and measured replacements for failed sealed units and impact damage.','Free on-site measurements across the GTA.'];
}
function firstSection(mode, label, city) {
  if (mode === 'neutral') return { heading: label + ' in ' + city, level: 2, content: 'We serve homes and businesses in ' + city + ' with the following:', list: neutralBullets(city) };
  if (mode === 'residential') return { heading: label + ' in ' + city, level: 2, content: 'We provide the following for residential clients in ' + city + ':', list: residentialBullets(city) };
  if (mode === 'residential-commercial') return { heading: label + ' in ' + city, level: 2, content: 'We provide the following in ' + city + ':', list: residentialCommercialBullets(city) };
  return { heading: label + ' in ' + city, level: 2, content: 'We provide the following for commercial clients in ' + city + ':', list: commercialBullets(city) };
}
function metaForMode(mode, label, city) {
  const kw = [label + ' ' + city, label + ' ' + city + ' GTA', 'glass repair ' + city, 'OhMyGlass ' + city];
  if (mode === 'neutral') return { keywords: kw, meta_description: label + ' in ' + city + '. Homes and businesses. Free quote—OhMyGlass.' };
  if (mode === 'residential') return { keywords: kw, meta_description: label + ' in ' + city + '. Homes, condos, and multi-unit residential glass. Free quote—OhMyGlass.' };
  if (mode === 'residential-commercial') return { keywords: kw, meta_description: label + ' in ' + city + '. Mixed residential and light commercial glazing. Free quote—OhMyGlass.' };
  return { keywords: kw, meta_description: label + ' in ' + city + '. Offices, retail, and commercial glazing. Free quote—OhMyGlass.' };
}
function pagecontentForMode(mode, label, city) {
  const l = label.toLowerCase();
  if (mode === 'neutral') return 'OhMyGlass provides ' + l + ' for houses, condos, retail, and offices in ' + city + '. Expect repair-first guidance, on-site measurements so replacements match existing openings, written quotes before we order glass, and scheduling that respects occupied homes and operating businesses.';
  if (mode === 'residential') return 'OhMyGlass provides ' + l + ' for houses, condos, and townhomes in ' + city + '. Expect repair-first guidance when frames and hardware are sound, careful on-site measurements so replacements match existing openings, written quotes before we order glass, and appointment timing that respects occupied homes and building supers.';
  if (mode === 'residential-commercial') return 'OhMyGlass provides ' + l + ' for mixed-use and small commercial occupancies in ' + city + '. We combine residential-careful scheduling with commercial priorities: clear scopes, code-appropriate safety glass where required, and written quotes before glass is ordered.';
  return 'OhMyGlass provides ' + l + ' for offices, retail, and other commercial occupancies in ' + city + '. Work is scoped to commercial priorities: repair-first assessments, code-appropriate tempered and laminated safety glass where required, after-hours or weekend scheduling when corridors need to stay quiet, and clear quotes before glass is ordered.';
}
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function resolveTemplate(byUrl, base, loc) {
  const { res, com, neutral } = tierPairBases(base);
  const tryUrls = [];
  const push = (u) => { if (u && !tryUrls.includes(u)) tryUrls.push(u); };
  if (neutral === base) { push(res + '-' + loc); push(com + '-' + loc); }
  else if (base.startsWith('residential-')) { push(com + '-' + loc); push(res + '-' + loc); if (neutral) push(neutral + '-' + loc); }
  else if (base.startsWith('commercial-')) { push(res + '-' + loc); push(com + '-' + loc); if (neutral) push(neutral + '-' + loc); }
  for (const u of tryUrls) { if (byUrl.has(u)) return { template: byUrl.get(u), kind: 'city', sourceUrl: u }; }
  if (byUrl.has(base)) return { template: byUrl.get(base), kind: 'hub', sourceUrl: base };
  if (neutral && neutral !== base && byUrl.has(neutral)) return { template: byUrl.get(neutral), kind: 'hub', sourceUrl: neutral };
  return null;
}
function buildCityPage(template, targetBase, loc, labels, kind) {
  const city = LOCATION_DISPLAY_NAMES[loc] || loc;
  const label = labels[targetBase] || targetBase.replace(/-/g, ' ');
  const mode = contentMode(targetBase);
  const tpl = clone(template);
  const nb = findNeighbourhoodSection(tpl.sections);
  const why = findWhySection(tpl.sections);
  const faq = findFaqSection(tpl.sections);
  const sections = [firstSection(mode, label, city)];
  const importNeighbourhood = kind === 'city' && nb && Array.isArray(nb.list) && nb.list.length;
  if (importNeighbourhood) sections.push({ heading: nb.heading || (city + ' areas we serve'), level: 2, content: nb.content || ('OhMyGlass dispatches across ' + city + ', including:'), list: nb.list });
  if (why && why.content) sections.push({ heading: why.heading || ('Why ' + city + ' customers choose OhMyGlass'), level: 2, content: why.content });
  if (faq && Array.isArray(faq.list)) sections.push({ heading: faq.heading || ('Frequently asked questions: ' + label + ' in ' + city), level: 2, content: faq.content || ('Common questions from ' + city + ' homeowners and property managers.'), list: faq.list.slice() });
  return { url: targetBase + '-' + loc, type: 'service', title: label + ' ' + city + ' | OhMyGlass', seo: metaForMode(mode, label, city), pagecontent: pagecontentForMode(mode, label, city), sections };
}
function listMissing(byUrl, bases, locs) {
  const out = [];
  for (const base of bases) for (const loc of locs) { const u = base + '-' + loc; if (!byUrl.has(u)) out.push(u); }
  return out;
}
function main() {
  const checkOnly = process.argv.includes('--check');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const bases = meta.SERVICE_LOCATION_BASES;
  const labels = meta.SERVICE_LABELS || {};
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  const byUrl = new Map(pages.map((p) => [p.url, p]));
  const missingBefore = listMissing(byUrl, bases, LOCATION_SUFFIXES);
  console.log('Missing city pages before:', missingBefore.length);
  if (checkOnly) { if (missingBefore.length) console.log(missingBefore.join('\n')); return; }
  let added = 0;
  const errors = [];
  for (const base of bases) for (const loc of LOCATION_SUFFIXES) {
    const u = base + '-' + loc;
    if (byUrl.has(u)) continue;
    const resolved = resolveTemplate(byUrl, base, loc);
    if (!resolved) { errors.push('No template for ' + u); continue; }
    pages.push(buildCityPage(resolved.template, base, loc, labels, resolved.kind));
    byUrl.set(u, pages[pages.length - 1]);
    added++;
  }
  pages.sort((a, b) => a.url.localeCompare(b.url));
  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2) + '\n', 'utf8');
  const missingAfter = listMissing(byUrl, bases, LOCATION_SUFFIXES);
  console.log('Added:', added);
  console.log('Missing after:', missingAfter.length);
  if (errors.length) console.warn('Errors:\n' + errors.join('\n'));
  if (missingAfter.length) console.warn('Still missing:\n' + missingAfter.join('\n'));
}
main();
