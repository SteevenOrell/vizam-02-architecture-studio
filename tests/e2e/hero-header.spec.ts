import { expect, test, type Page } from '@playwright/test';

type Box = { top: number; bottom: number; left: number; right: number };

async function box(page: Page, selector: string): Promise<Box> {
  return page.locator(selector).first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
  });
}

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 390, height: 568 },
  { width: 844, height: 390 }, // landscape phone
  { width: 768, height: 1000 },
  { width: 1440, height: 900 },
  { width: 1440, height: 1000 },
];

for (const vp of VIEWPORTS) {
  test(`hero text never touches the header or the rail at ${vp.width}x${vp.height}`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto('/');
    const hero = page.getByRole('region', { name: 'Featured projects' });
    await hero.getByRole('button', { name: 'Pause automatic slideshow' }).click();
    const slide = '[aria-roledescription="slide"]';
    // Check every slide: titles differ in length, so wrapping differs.
    for (let i = 0; i < 5; i++) {
      await expect(page.locator(slide)).toHaveAttribute('aria-label', `${i + 1} of 5`);
      await expect(page.locator(`${slide} > div`)).toHaveCSS('opacity', '1');
      await page.evaluate(() => window.scrollTo(0, 0)); // short viewports scroll when buttons below the fold are clicked
      const header = await box(page, 'header.is-fixed');
      const title = await box(page, '[data-hero-title]');
      const content = await box(page, `${slide} > div`);
      const link = await box(page, `${slide} a`);
      const rail = await box(page, '[aria-label="Choose a project"]');
      expect(title.top, 'title below header').toBeGreaterThanOrEqual(header.bottom);
      expect(content.top, 'slide text below header').toBeGreaterThanOrEqual(header.bottom);
      expect(link.bottom, 'link above the title rail').toBeLessThanOrEqual(rail.top);
      expect(title.bottom, 'title above the title rail').toBeLessThanOrEqual(rail.top);
      await page.getByRole('button', { name: 'Next project' }).click();
    }
  });
}

test('hero image is full-bleed and covers the whole section at 390 px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const hero = page.getByRole('region', { name: 'Featured projects' });
  await hero.locator('img').first().evaluate(async (el: HTMLImageElement) => { await el.decode(); });
  const [h, i] = await Promise.all([box(page, '[aria-roledescription="carousel"]'), box(page, '[aria-roledescription="carousel"] img')]);
  expect(Math.round(i.left)).toBe(Math.round(h.left));
  expect(Math.round(i.right)).toBe(Math.round(h.right));
  expect(Math.round(i.top)).toBeLessThanOrEqual(Math.round(h.top));
  expect(Math.round(i.bottom)).toBeGreaterThanOrEqual(Math.round(h.bottom));
  await expect(hero.locator('img').first()).toHaveCSS('object-fit', 'cover');
});

test('header has a legible scrim over the hero and no stray label next to the wordmark', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const header = page.locator('header.is-fixed');
  await expect(header).toHaveAttribute('data-tone', 'light');
  await expect(header.locator('div[aria-hidden].bg-gradient-to-b')).toHaveCount(1);
  await expect(header.getByText('Atelier', { exact: true })).toHaveCount(0);
  // Nav items do not overlap one another.
  const items = await header.locator('nav a').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.left, r.right]; }));
  expect(items).toHaveLength(5);
  for (let k = 1; k < items.length; k++) expect(items[k][0]).toBeGreaterThan(items[k - 1][1]);
});

test('project detail hero title clears the header at 390 and 1440 px', async ({ page }) => {
  for (const vp of [{ width: 390, height: 700 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(vp);
    await page.goto('/projects/mire-apartment');
    const header = await box(page, 'header.is-fixed');
    const back = await box(page, 'article > header a');
    expect(back.top).toBeGreaterThanOrEqual(header.bottom);
  }
});
