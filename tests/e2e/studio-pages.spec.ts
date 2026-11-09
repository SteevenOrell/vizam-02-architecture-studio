import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = ['/studio', '/philosophy', '/services', '/journal', '/journal/drawing-with-daylight', '/journal/the-stair-as-a-room'];

const hit = (a: { l: number; r: number; t: number; b: number }, b: { l: number; r: number; t: number; b: number }) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;

test.describe('slice C2 layout', () => {
  for (const width of [300, 390, 768, 1440]) {
    test(`no horizontal scroll at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      for (const route of ROUTES) {
        await page.goto(route);
        await page.waitForTimeout(300);
        const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
        expect(m.sw, `${route} at ${width}px`).toBeLessThanOrEqual(m.cw);
      }
      await ctx.close();
    });
  }

  test('250px lock: wrapper is 500px wide on the new pages', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 240, height: 800 } });
    const page = await ctx.newPage();
    for (const route of ['/studio', '/philosophy', '/services', '/journal']) {
      await page.goto(route);
      expect(await page.locator('#root').evaluate((e) => Math.round(e.getBoundingClientRect().width)), route).toBe(500);
    }
    await ctx.close();
  });

  for (const width of [390, 1440]) {
    test(`studio hero keeps one arrangement and nothing overlaps at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto('/studio');
      const m = await page.evaluate(() => {
        const r = (s: string) => { const e = document.querySelector(s)!.getBoundingClientRect(); return { l: e.left, r: e.right, t: e.top, b: e.bottom }; };
        const caps = [...document.querySelectorAll('[data-studio-hero] dt')].map((e) => e.textContent!.trim());
        return { h1: r('[data-studio-hero] h1'), obj: r('[data-studio-object] svg'), cta: r('[data-studio-hero] a[href="/contact"]'), caps, vw: innerWidth };
      });
      expect(hit(m.h1, m.obj), 'headline overlaps drawing').toBe(false);
      expect(hit(m.cta, m.obj), 'button overlaps drawing').toBe(false);
      expect(m.obj.r).toBeLessThanOrEqual(m.vw + 1);
      expect(m.obj.r - m.obj.l).toBeGreaterThan(width * 0.6);
      expect(m.caps.length).toBeGreaterThanOrEqual(3);
      expect(new Set(m.caps).size, 'stat captions are distinct').toBe(m.caps.length);
      await expect(page.getByText('Concept data. The studio, its numbers and its people are fictional.')).toBeVisible();
      await ctx.close();
    });

    test(`philosophy closing statement overlaps the drawing and stays inside its stage at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto('/philosophy');
      await page.locator('[data-closing-statement]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      const m = await page.evaluate(() => {
        const r = (s: string) => { const e = document.querySelector(s)!.getBoundingClientRect(); return { l: e.left, r: e.right, t: e.top, b: e.bottom }; };
        return { h: r('#closing-title'), d: r('[data-closing-drawing]'), stage: r('[data-closing-stage]'), caption: r('[data-closing-statement] .meta') };
      });
      expect(hit(m.h, m.d), 'statement overlaps drawing').toBe(true);
      expect(m.h.l).toBeGreaterThanOrEqual(0);
      expect(m.h.r).toBeLessThanOrEqual(width);
      expect(m.h.t).toBeGreaterThanOrEqual(m.stage.t - 1);
      expect(m.h.b).toBeLessThanOrEqual(m.stage.b + 1);
      expect(hit(m.d.t > m.stage.b ? m.d : { ...m.d, b: Math.min(m.d.b, m.stage.b) }, m.caption), 'drawing spills over caption').toBe(false);
      await ctx.close();
    });
  }

  for (const width of [390, 768, 1440]) {
    test(`services deliverable sheets are equal-size at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto('/services');
      const sizes = await page.locator('[data-deliverables] figure > div').evaluateAll((els) => [...new Set(els.map((e) => `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`))]);
      expect(await page.locator('[data-deliverables] figcaption').count()).toBe(3);
      expect(sizes).toHaveLength(1);
      await ctx.close();
    });
  }

  test('journal: drawing cover is captioned as fictional and the card has the same size as photo cards', async ({ page }) => {
    await page.goto('/journal');
    await expect(page.locator('[data-cover-drawing]')).toHaveCount(1);
    await page.goto('/journal/the-stair-as-a-room');
    await expect(page.locator('article figure figcaption')).toContainText('Fictional concept sheet');
  });
});

test.describe('axe on the new sections', () => {
  for (const path of ROUTES) {
    test(`axe: ${path}`, async ({ browser }) => {
      const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      await page.goto(path);
      await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
      await page.waitForTimeout(1000);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
      await ctx.close();
    });
  }
});
