import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';


async function toStageTop(page: Page, intro = true) {
  await page.goto('/');
  await expect(page.locator('.hs[data-enhanced="true"]')).toHaveCount(1);
  await page.evaluate(() => {
    const s = document.querySelector('.hs-stage')!;
    window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY);
  });
  if (intro) {
    // Past the intro, where the HUD and the chapter dots have faded in.
    await page.evaluate(() => window.scrollBy(0, (1.8 / 16) * 9 * window.innerHeight));
    await expect(page.locator('.hs-ui')).toBeVisible();
    await page.waitForTimeout(1200);
  }
}

async function goToChapter(page: Page, n: number, title: string) {
  await page.getByRole('button', { name: new RegExp(`^Chapter ${n}:`) }).click();
  await expect(page.locator('[data-hud-title]')).toHaveText(title);
  await page.waitForTimeout(1600); // let the scrubbed timeline catch up
}

const titles = ['The home', 'Site plan', 'Ground-floor plan', 'Elevation', 'Section', 'Exploded axonometric', 'A place to live'];

test('starts on the photograph, with a scroll prompt', async ({ page }) => {
  await toStageTop(page, false);
  const img =page.locator('[data-photo] img');
  await expect(img).toBeVisible();
  await img.evaluate(async (el: HTMLImageElement) => { await el.decode(); });
  await expect(page.locator('[data-prompt]')).toBeVisible();
  await expect(page.locator('[data-prompt]')).toHaveText('Scroll to explore');
  await expect(page.locator('[data-photo]')).toHaveCSS('clip-path', /inset\(\d+(\.\d+)?px/);
});

test('chapter dots go to their chapter and the title and live region change', async ({ page }) => {
  await toStageTop(page);
  for (const n of [3, 5, 2, 7, 1]) {
    await goToChapter(page, n, titles[n - 1]);
    await expect(page.getByRole('status')).toContainText(`Chapter ${n} of 7: ${titles[n - 1]}`);
    await expect(page.getByRole('button', { name: new RegExp(`^Chapter ${n}:`) })).toHaveAttribute('aria-current', 'step');
  }
});

test('the pin never traps keyboard focus: dots are buttons and a skip link exists', async ({ page }) => {
  await toStageTop(page);
  await expect(page.locator('.hs-skip')).toHaveAttribute('href', '#after-home-study');
  const dots = page.locator('.hs-dot');
  await expect(dots).toHaveCount(7);
  await dots.nth(2).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-hud-title]')).toHaveText('Ground-floor plan');
});

for (const [width, height] of [[1440, 900], [390, 844]]) {
  test(`no horizontal scroll and nothing overlaps at ${width}px`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    await toStageTop(page);
    for (const n of [1, 2, 3, 4, 5, 6, 7]) {
      await goToChapter(page, n, titles[n - 1]);
      const m = await page.evaluate(() => {
        const r = (sel: string) => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom }; };
        const sheetSvgs = [...document.querySelectorAll('[data-sheet] svg')].map((e) => { const b = e.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom, w: b.width }; });
        return {
          sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
          text: r('.hs-hud-text'), counter: r('.hs-counter'), rail: r('.hs-rail'), bar: r('.hs-bar'), vw: innerWidth, vh: innerHeight,
          sheets: sheetSvgs,
        };
      });
      expect(m.sw).toBeLessThanOrEqual(m.cw);
      const hit = (a: { l: number; r: number; t: number; b: number }, b: { l: number; r: number; t: number; b: number }) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;
      expect(hit(m.text!, m.counter!), `HUD text overlaps counter, chapter ${n}`).toBe(false);
      expect(hit(m.text!, m.rail!), `HUD text overlaps rail, chapter ${n}`).toBe(false);
      expect(hit(m.counter!, m.rail!), `counter overlaps rail, chapter ${n}`).toBe(false);
      expect(m.text!.r).toBeLessThanOrEqual(m.vw);
      if (n >= 2 && n <= 6) {
        const s = m.sheets[n - 2];
        expect(s.l, `sheet ${n} clipped left`).toBeGreaterThanOrEqual(0);
        expect(s.r, `sheet ${n} clipped right`).toBeLessThanOrEqual(m.vw);
        expect(hit(s, m.text!), `sheet overlaps HUD text, chapter ${n}`).toBe(false);
        expect(hit(s, m.rail!), `sheet overlaps rail, chapter ${n}`).toBe(false);
        expect(hit(s, m.counter!), `sheet overlaps counter, chapter ${n}`).toBe(false);
        await page.screenshot({ path: `docs/screenshots/home-study-${width}-ch${n}.png` });
      }
    }
    await ctx.close();
  });
}

test('reduced motion shows the photograph and every drawing as a static, captioned sequence', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('/');
  await page.waitForTimeout(400);
  await expect(page.locator('.hs[data-enhanced="true"]')).toHaveCount(0);
  await expect(page.locator('[data-photo] img')).toBeVisible();
  await expect(page.locator('[data-sheet] svg[role="img"]')).toHaveCount(5);
  for (const svg of await page.locator('[data-sheet] svg').all()) await expect(svg).toBeVisible();
  await expect(page.locator('.hs-fig figcaption').first()).toBeVisible();
  await expect(page.locator('.hs-ui')).toBeHidden();
  await expect(page.locator('.hs-final').getByRole('link', { name: 'See the projects' })).toBeVisible();
  await ctx.close();
});

test('no pinning at 240px: the locked layout shows the static sequence', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 240, height: 700 } });
  const page = await ctx.newPage();
  await page.goto('/');
  await page.waitForTimeout(400);
  await expect(page.locator('.hs[data-enhanced="true"]')).toHaveCount(0);
  await expect(page.locator('[data-sheet] svg')).toHaveCount(5);
  await ctx.close();
});

test.describe('axe', () => {
  test('pinned section at chapter 3', async ({ page }) => {
    await toStageTop(page);
    await goToChapter(page, 3, 'Ground-floor plan');
    const r = await new AxeBuilder({ page }).include('.hs').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual([]);
  });
  test('static sequence', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('/');
    const r = await new AxeBuilder({ page }).include('.hs').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual([]);
    await ctx.close();
  });
});
