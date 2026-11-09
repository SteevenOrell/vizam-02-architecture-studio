import { expect, test, type Locator, type Page } from '@playwright/test';

type Box = { top: number; bottom: number; left: number; right: number; width: number; height: number };
const box = (l: Locator): Promise<Box> =>
  l.first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height };
  });
const apart = (a: Box, b: Box) => a.bottom <= b.top + 0.5 || b.bottom <= a.top + 0.5 || a.right <= b.left + 0.5 || b.right <= a.left + 0.5;
const noHScroll = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);

const VIEWPORTS = [{ width: 390, height: 844 }, { width: 1440, height: 900 }];

for (const vp of VIEWPORTS) {
  test.describe(`home project panels at ${vp.width}px`, () => {
    test.use({ viewport: vp });

    test('three full-bleed cover panels with the same composition, no overlap with the header', async ({ page }) => {
      await page.goto('/');
      const panels = page.locator('[data-selected-project]');
      await expect(panels).toHaveCount(3);
      await expect(page.locator('#showcase-title')).toBeVisible();
      for (let i = 0; i < 3; i++) {
        const panel = panels.nth(i);
        await panel.scrollIntoViewIfNeeded();
        // Panel top flush with the viewport top: its top text must sit below the fixed header bar.
        await panel.evaluate((el) => window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top));
        await expect(panel.locator('[data-panel-title]')).toBeVisible();
        await expect(panel.locator('[data-panel-desc]')).toBeVisible();
        await page.waitForTimeout(1000); // let the one-time entrance finish
        const header = await box(page.locator('header.is-fixed'));
        const pb = await box(panel);
        expect(pb.height, 'panel is at least ~85svh').toBeGreaterThanOrEqual(vp.height * 0.85 - 1);
        expect(Math.round(pb.left)).toBe(0);
        expect(Math.round(pb.right)).toBe(vp.width);
        const img = panel.locator('img').first();
        await expect(img).toHaveCSS('object-fit', 'cover');
        const ib = await box(img);
        expect(ib.width).toBeGreaterThanOrEqual(vp.width - 1);
        const parts = {
          coords: await box(panel.locator('[data-panel-coords]')),
          place: await box(panel.locator('[data-panel-place]')),
          title: await box(panel.locator('[data-panel-title]')),
          desc: await box(panel.locator('[data-panel-desc]')),
          chip: await box(panel.locator('[data-panel-chip]')),
        };
        for (const key of ['coords', 'place', 'title'] as const) expect(parts[key].top, `${key} below header`).toBeGreaterThanOrEqual(header.bottom);
        const names = Object.keys(parts) as (keyof typeof parts)[];
        for (let a = 0; a < names.length; a++) {
          for (let b = a + 1; b < names.length; b++) {
            expect(apart(parts[names[a]], parts[names[b]]), `${names[a]} / ${names[b]} overlap (panel ${i + 1})`).toBe(true);
          }
        }
        for (const k of names) {
          expect(parts[k].left, `${k} inside left edge`).toBeGreaterThanOrEqual(0);
          expect(parts[k].right, `${k} inside right edge`).toBeLessThanOrEqual(vp.width + 0.5);
        }
      }
      expect(await noHScroll(page)).toBe(true);
    });

    test('each panel has one clear, keyboard-reachable Explore link and a monogram chip without a photo', async ({ page }) => {
      await page.goto('/');
      const panels = page.locator('[data-selected-project]');
      for (let i = 0; i < 3; i++) {
        const panel = panels.nth(i);
        const slug = await panel.getAttribute('data-selected-project');
        await expect(panel.getByRole('link')).toHaveCount(1);
        await expect(panel.getByRole('link')).toHaveAttribute('href', `/projects/${slug}`);
        await expect(panel.getByRole('link')).toContainText('Explore');
        await expect(panel.locator('[data-panel-chip]')).toContainText('Designed by');
        await expect(panel.locator('[data-panel-chip] img')).toHaveCount(0);
        await panel.getByRole('link').focus();
        await expect(panel.getByRole('link')).toBeFocused();
      }
    });

    test('project panels are equal in size', async ({ page }) => {
      await page.goto('/');
      const heights = await page.locator('[data-selected-project]').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
      expect(new Set(heights).size, `panel heights ${heights.join(', ')}`).toBe(1);
    });
  });

  test.describe(`project page sections at ${vp.width}px`, () => {
    test.use({ viewport: vp });

    for (const slug of ['halden-house', 'mar-de-cal', 'mire-apartment']) {
      test(`spec hero: ${slug}`, async ({ page }) => {
        await page.goto(`/projects/${slug}`);
        await page.evaluate(() => document.fonts.ready);
        const header = await box(page.locator('header.is-fixed'));
        const hero = page.locator('article > header');
        const h = await box(hero);
        expect(Math.round(h.left)).toBe(0);
        expect(Math.round(h.right)).toBe(vp.width);
        await expect(hero.locator('img').first()).toHaveCSS('object-fit', 'cover');
        const parts = {
          back: await box(hero.getByRole('link', { name: /All projects/ })),
          meta: await box(hero.locator('[data-hero-meta]')),
          tags: await box(hero.locator('[data-hero-tags]')),
          title: await box(hero.locator('h1')),
          card: await box(hero.locator('[data-spec-card]')),
          desc: await box(hero.locator('[data-hero-desc]')),
        };
        for (const [k, b] of Object.entries(parts)) expect(b.top, `${k} below header`).toBeGreaterThanOrEqual(header.bottom);
        const names = Object.keys(parts) as (keyof typeof parts)[];
        for (let a = 0; a < names.length; a++) for (let b = a + 1; b < names.length; b++) expect(apart(parts[names[a]], parts[names[b]]), `${names[a]} / ${names[b]} overlap`).toBe(true);
        for (const k of names) {
          expect(parts[k].left, `${k} left`).toBeGreaterThanOrEqual(0);
          expect(parts[k].right, `${k} right`).toBeLessThanOrEqual(vp.width + 0.5);
        }
        const labels = await hero.locator('[data-spec-card] dt').allTextContents();
        expect(labels).toEqual(['Studio', 'Architects', 'Location', 'Area', 'Year', 'Category']);
        await expect(hero.locator('[data-hero-tags] li')).toHaveCount(3);
        await expect(hero.locator('[data-hero-desc] p')).toHaveCount(2);
        // The card is overlaid on the photo (inside the hero box).
        expect(parts.card.bottom).toBeLessThanOrEqual(h.bottom);
        expect(await noHScroll(page)).toBe(true);
      });
    }

    test('two-word title sets the second word in serif italic', async ({ page }) => {
      await page.goto('/projects/halden-house');
      await expect(page.locator('article > header h1 span')).toHaveText('House');
      await expect(page.locator('article > header h1 span')).toHaveCSS('font-style', 'italic');
    });

    test('context section: lead, 3 stats, 3 numbered rows, labelled as fictional', async ({ page }) => {
      for (const slug of ['halden-house', 'mire-apartment']) {
        await page.goto(`/projects/${slug}`);
        const ctx = page.locator('[data-project-context]');
        await ctx.scrollIntoViewIfNeeded();
        await expect(ctx.locator('[data-context-lead]')).toBeVisible();
        await expect(ctx.locator('[data-context-stats] > li')).toHaveCount(3);
        const rows = ctx.locator('[data-context-rows] > li');
        await expect(rows).toHaveCount(3);
        await expect(rows.nth(0)).toContainText('/01');
        await expect(rows.nth(2)).toContainText('/03');
        await expect(ctx).toContainText('Fictional concept data');
        const stats = await ctx.locator('[data-context-stats] > li').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.right)]; }));
        expect(new Set(stats.map((s) => s[0])).size, 'equal stat widths').toBe(1);
        expect(stats[2][1]).toBeLessThanOrEqual(vp.width);
        expect(await noHScroll(page)).toBe(true);
      }
    });

    test('drawings strip: two equal sheets on residential projects with a gallery only', async ({ page }) => {
      await page.goto('/projects/halden-house');
      const strip = page.locator('[data-drawings-strip]');
      await strip.scrollIntoViewIfNeeded();
      await expect(strip.getByRole('img')).toHaveCount(2);
      const sheets = await strip.locator('figure > div').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; }));
      expect(sheets[0]).toEqual(sheets[1]);
      await expect(strip).toContainText('not drawings of this project');
      await page.goto('/projects/lumen-rooms');
      await expect(page.locator('[data-drawings-strip]')).toHaveCount(0);
      await page.goto('/projects/olive-court-house');
      await expect(page.locator('[data-drawings-strip]')).toHaveCount(0);
    });
  });
}
