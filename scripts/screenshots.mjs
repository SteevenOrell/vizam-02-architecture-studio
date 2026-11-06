// Screenshot + layout audit at 240 / 390 / 768 / 1440 px against a running server (default http://localhost:3102).
// Usage: node scripts/screenshots.mjs [--base URL] [--raw <dir for PNGs>] [--out docs/screenshots]
// Writes compact WebP files (via sharp) and prints a JSON report: horizontal overflow, #root width, card sizes.
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg('base', 'http://localhost:3102');
const RAW = arg('raw', join(tmpdir(), 'ostrel-shots'));
const OUT = arg('out', 'docs/screenshots');
mkdirSync(RAW, { recursive: true });
mkdirSync(OUT, { recursive: true });

const widths = [240, 390, 768, 1440];
const pages = [
  ['home', '/'], ['projects', '/projects'], ['project', '/projects/mire-apartment'], ['studio', '/studio'],
  ['services', '/services'], ['philosophy', '/philosophy'], ['journal', '/journal'], ['journal-post', '/journal/notes-on-lime'], ['contact', '/contact'],
];
const report = [];

async function toWebp(png, name, width = 720) {
  await sharp(png).resize({ width, withoutEnlargement: true }).webp({ quality: 62 }).toFile(join(OUT, `${name}.webp`));
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += window.innerHeight * 0.7) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 }, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const cards = [...document.querySelectorAll('[data-testid="project-card"] > div:first-child, [data-testid="post-card"] > div:first-child')]
        .map((c) => `${Math.round(c.getBoundingClientRect().width)}x${Math.round(c.getBoundingClientRect().height)}`);
      return {
        scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth,
        rootWidth: Math.round(document.getElementById('root').getBoundingClientRect().width),
        headerWidth: Math.round(document.querySelector('header').getBoundingClientRect().width),
        cardSizes: [...new Set(cards)],
      };
    });
    report.push({ width: w, page: name, overflowX: m.scrollWidth > m.clientWidth, ...m });
    const shot = join(RAW, `${w}-${name}.png`);
    await page.screenshot({ path: shot });
    {
      await toWebp(shot, `${w}-${name}`, w === 1440 ? 960 : Math.min(w, 520));
    }
  }

  if (w === 240) {
    // The layout is locked at 500 px: capture it panned to the right edge to show the whole locked layout.
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(260, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(RAW, '240-lock-panned.png') });
    await toWebp(join(RAW, '240-lock-panned.png'), '240-lock-panned', 240);
  }

  // Interaction states (at 240 px the fixed header is locked at 500 px, so its Menu button sits off-screen)
  if (w >= 390) {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(RAW, `${w}-menu.png`) });
    await toWebp(join(RAW, `${w}-menu.png`), `${w}-menu-open`, w === 1440 ? 960 : 520);
    await page.keyboard.press('Escape');
  }

  if (w >= 390) {
    // Scroll showcase mid-sequence and cinematic section
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    const y = await page.evaluate(() => document.getElementById('showcase-title').getBoundingClientRect().top + window.scrollY);
    await page.evaluate((v) => window.scrollTo(0, v + window.innerHeight * 2.4), y);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: join(RAW, `${w}-showcase.png`) });
    await toWebp(join(RAW, `${w}-showcase.png`), `${w}-showcase`, w === 1440 ? 960 : 520);

    await page.goto(BASE + '/projects?type=interiors', { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await page.screenshot({ path: join(RAW, `${w}-filter.png`) });
    await toWebp(join(RAW, `${w}-filter.png`), `${w}-filter-interiors`, w === 1440 ? 960 : 520);
  }
  await ctx.close();
}

// Full-page overview at 1440 (reduced motion = static versions of the two scroll sections)
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await scrollThrough(page);
await page.screenshot({ path: join(RAW, 'home-full-reduced.png'), fullPage: true });
await toWebp(join(RAW, 'home-full-reduced.png'), '1440-home-full-reduced-motion', 720);
await ctx.close();
await browser.close();

writeFileSync(join(RAW, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.map((r) => [r.width, r.page, r.overflowX ? 'OVERFLOW' : 'ok', `root ${r.rootWidth}`, `header ${r.headerWidth}`, r.cardSizes.join(',')])));
console.log('raw PNGs:', RAW);
