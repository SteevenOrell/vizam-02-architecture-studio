// Compact WebP shots of key sections for docs/screenshots (PNG intermediates stay in memory).
// Usage: node scripts/section-shots.mjs [--base http://localhost:3103]
import { createRequire } from 'node:module';
import { statSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('@playwright/test');
const sharp = require('sharp');
const base = process.argv.includes('--base') ? process.argv[process.argv.indexOf('--base') + 1] : 'http://localhost:3102';
const targets = [
  ['home-study', '/', '.hs'],
  ['home-panels', '/', '[data-selected-project]'],
  ['studio-hero', '/studio', '[data-studio-hero]'],
  ['philosophy-closing', '/philosophy', '[data-closing-statement]'],
  ['services-sheets', '/services', '[data-deliverables]'],
  ['journal-grid', '/journal', 'ul.grid'],
  ['project-spec-hero', '/projects/halden-house', '[data-hero-title] >> xpath=ancestor::*[self::section or self::header][1]'],
];
const browser = await chromium.launch();
for (const w of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [name, path, sel] of targets) {
    await page.goto(base + path);
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const png = await el.screenshot();
    const out = `docs/screenshots/${name}-${w}.webp`;
    await sharp(png).resize({ width: w === 1440 ? 960 : 390, withoutEnlargement: true }).webp({ quality: 70 }).toFile(out);
    console.log(out, statSync(out).size);
  }
  await ctx.close();
}
await browser.close();
