/**
 * Reads docs/bogus-urls-before-cleanup.txt and writes bogus-paths.json
 * (array of paths) for use by Vercel Edge middleware.
 * Run: node scripts/generate-bogus-paths.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'docs', 'bogus-urls-before-cleanup.txt');
const outputPath = join(root, 'bogus-paths.json');

const text = readFileSync(inputPath, 'utf-8');
const paths = text
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.startsWith('/'));

writeFileSync(outputPath, JSON.stringify(paths, null, 0) + '\n', 'utf-8');
console.log(`Wrote ${paths.length} paths to bogus-paths.json`);
