/**
 * Regenerate sitemap.xml files from src/lib/pages.json (single source of truth).
 * Excludes noindex utility routes (e.g. /404) and redirect-only slugs (index, free-quote).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const HOST = 'https://www.ohmyglass.ca';
const LASTMOD = new Date().toISOString().slice(0, 10);

const skipSlugs = new Set(['index', 'free-quote']);

const pages = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/pages.json'), 'utf8'));

/** @type {Map<string, { type?: string }>} */
const byPath = new Map();
byPath.set('/', {});
byPath.set('/resources', {});

for (const p of pages) {
  const slug = p.url.replace(/\.html$/, '');
  if (skipSlugs.has(slug)) continue;
  byPath.set('/' + slug, p);
}

const paths = [...byPath.keys()].sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  return a.localeCompare(b);
});

/** @param {string} pathname @param {{ type?: string } | undefined} page */
function priorityFor(pathname, page) {
  if (pathname === '/') return '1.0';
  if (pathname === '/services') return '0.9';
  if (pathname === '/resources') return '0.7';
  if (page?.type === 'resource') return '0.6';
  return '0.8';
}

/** @param {string} pathname */
function urlBlock(pathname) {
  const page = byPath.get(pathname);
  const pri = priorityFor(pathname, page);
  const loc = pathname === '/' ? `${HOST}/` : `${HOST}${pathname}`;
  return `   <url>
      <loc>${loc}</loc>
      <lastmod>${LASTMOD}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${pri}</priority>
   </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(urlBlock).join('\n')}
</urlset>
`;

for (const rel of ['static/sitemap.xml', 'static/sitemap-no-html.xml', 'sitemap.xml']) {
  fs.writeFileSync(path.join(root, rel), xml);
}

console.log(`Sitemap: ${paths.length} URLs, lastmod ${LASTMOD}`);
