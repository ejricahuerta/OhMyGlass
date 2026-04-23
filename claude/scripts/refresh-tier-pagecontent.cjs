/**
 * Rewrites legacy typed-tier pagecontent (meta "see other hub" blurbs) to on-page overviews.
 * Run from repo root: node claude/scripts/refresh-tier-pagecontent.cjs
 * Safe to re-run; only matches known legacy strings.
 */
const fs = require("fs");
const path = require("path");

const pagesPath = path.join(__dirname, "..", "pages.json");
const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));

let commercial = 0;
let residential = 0;

for (const p of pages) {
  const c = p.pagecontent;
  if (!c || typeof c !== "string") continue;

  if (c.includes("For the general local hub that also mentions homes")) {
    const m = c.match(
      /^OhMyGlass delivers (.+?) for offices, retail, and active commercial buildings in ([^.]+)\./
    );
    if (m) {
      const [, serviceLower, city] = m;
      p.pagecontent =
        `OhMyGlass provides ${serviceLower} for offices, retail, and other commercial occupancies in ${city}. ` +
        "Work is scoped to commercial priorities: repair-first assessments, code-appropriate tempered and laminated safety glass where required, " +
        "after-hours or weekend scheduling when corridors need to stay quiet, and clear quotes before glass is ordered.";
      commercial++;
    }
  }

  if (c.includes("this page narrows scope to residential priorities")) {
    const m = c.match(
      /^OhMyGlass focuses (.+?) on houses, condos, and townhomes in ([^.]+)\./
    );
    if (m) {
      const [, servicePhrase, city] = m;
      p.pagecontent =
        `OhMyGlass provides ${servicePhrase} for houses, condos, and townhomes in ${city}. ` +
        "Expect repair-first guidance when frames and hardware are sound, careful on-site measurements so replacements match existing openings, " +
        "written quotes before we order glass, and appointment timing that respects occupied homes and building supers.";
      residential++;
    }
  }
}

fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2) + "\n", "utf8");
console.log("Updated commercial:", commercial, "residential:", residential);
