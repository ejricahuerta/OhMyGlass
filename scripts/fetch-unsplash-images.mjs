#!/usr/bin/env node
/**
 * Fetch service images from Unsplash and save to static/images/.
 * Set UNSPLASH_ACCESS_KEY for API search; otherwise uses curated fallback URLs.
 * Run: node scripts/fetch-unsplash-images.mjs
 */

import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'static', 'images');

/** Home page top services: slug -> { searchQuery, fallbackUrl } */
const SERVICES = [
  {
    slug: 'glass-repair-toronto',
    searchQuery: 'glass repair window broken',
    fallbackUrl:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80'
  },
  {
    slug: 'window-repair-north-york',
    searchQuery: 'residential window repair',
    fallbackUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
  },
  {
    slug: 'door-repair',
    searchQuery: 'glass door patio door',
    fallbackUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    slug: 'window-installation',
    searchQuery: 'window installation modern',
    fallbackUrl:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
  }
];

async function fetchWithApi(slug, query, accessKey) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` }
  });
  if (!res.ok) throw new Error(`Unsplash API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const photo = data.results?.[0];
  if (!photo?.urls?.regular) throw new Error(`No result for query: ${query}`);
  return photo.urls.regular;
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(filepath, buf);
}

async function main() {
  await mkdir(IMAGES_DIR, { recursive: true });

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const useApi = Boolean(accessKey);

  if (!useApi) {
    console.log('No UNSPLASH_ACCESS_KEY set; using curated fallback URLs.');
  }

  for (const { slug, searchQuery, fallbackUrl } of SERVICES) {
    const filepath = join(IMAGES_DIR, `${slug}.jpg`);
    let imageUrl = fallbackUrl;

    if (useApi) {
      try {
        imageUrl = await fetchWithApi(slug, searchQuery, accessKey);
      } catch (e) {
        console.warn(`API search failed for "${searchQuery}", using fallback:`, e.message);
      }
    }

    await downloadImage(imageUrl, filepath);
    console.log(`Saved ${slug}.jpg`);
  }

  console.log('Done. Images in static/images/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
