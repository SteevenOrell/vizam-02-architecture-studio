# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: media-refinement.spec.ts >> hero and selected-work composition at 390px
- Location: tests\e2e\media-refinement.spec.ts:4:7

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('header').first()
Expected: "matrix(1, 0, 0, 1, 0, 0)"
Received: "none"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" locator('header').first() with timeout 5000ms
  - waiting for locator('header').first()
    13 × locator resolved to <header data-tone="dark" class="is-fixed fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-[var(--ease-arch)] text-graphite bg-plaster/85 backdrop-blur-md translate-y-0">…</header>
       - unexpected value "none"

```

```yaml
- banner:
  - link "Ostrel Atelier, home":
    - /url: /
  - button "Menu"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  |
  3  | for (const width of [390, 1440]) {
  4  |   test(`hero and selected-work composition at ${width}px`, async ({ page }) => {
  5  |     await page.setViewportSize({ width, height: 900 });
  6  |     await page.goto('/');
  7  |     const hero = page.getByRole('region', { name: 'Featured projects' });
  8  |     await expect(hero).toBeVisible();
  9  |     await hero.getByRole('button', { name: 'Pause automatic slideshow' }).click();
  10 |     await hero.getByRole('button', { name: /^Halden House/ }).click();
  11 |     await expect(hero.locator('img')).toHaveCount(1);
  12 |     await expect(hero.locator('[aria-roledescription="slide"] > div')).toHaveCSS('opacity', '1');
  13 |     await hero.locator('img').first().evaluate(async (el: HTMLImageElement) => { await el.decode(); });
  14 |     await page.evaluate(() => document.fonts.ready);
  15 |     expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth)).toBe('none');
  16 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  17 |     await page.screenshot({ path: `docs/screenshots/refined-${width}-hero.png` });
  18 |
  19 |     const selected = page.locator('[data-selected-project]').first();
  20 |     await selected.scrollIntoViewIfNeeded();
  21 |     await expect(selected.getByRole('heading')).toContainText('Olive Court House');
  22 |     await selected.locator('img').evaluate(async (el: HTMLImageElement) => { await el.decode(); });
> 23 |     await expect(page.locator('header').first()).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
     |                                                  ^ Error: expect(locator).toHaveCSS(expected) failed
  24 |     await page.screenshot({ path: `docs/screenshots/refined-${width}-showcase.png` });
  25 |     await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  26 |     await expect(page.getByRole('region', { name: 'Contact us', exact: true })).toBeVisible();
  27 |     await page.screenshot({ path: `docs/screenshots/refined-${width}-footer.png` });
  28 |   });
  29 | }
  30 |
  31 | test('home study begins with the home and reveals structure only while scrolling', async ({ page }) => {
  32 |   await page.goto('/');
  33 |   const study = page.locator('[data-study-motion="true"]');
  34 |   await expect(study).toHaveCount(1);
  35 |   const top = await study.evaluate(el => el.getBoundingClientRect().top + window.scrollY - 72);
  36 |   await page.evaluate(y => window.scrollTo(0, y), top);
  37 |   await expect(study.locator('[data-study-photo]')).toHaveCSS('opacity', '1');
  38 |   await study.getByRole('button', { name: 'Structure', exact: true }).click();
  39 |   await expect(study.locator('[data-study-diagram]')).toHaveCSS('visibility', 'visible');
  40 |   await expect(study.locator('[data-study-photo]')).toHaveCSS('opacity', '0');
  41 |   await expect(page.locator('header').first()).toBeInViewport();
  42 |   await page.screenshot({ path: 'docs/screenshots/refined-structure.png' });
  43 |   await study.getByRole('button', { name: 'A place to live', exact: true }).click();
  44 |   await expect(study.getByRole('heading', { name: 'A place to live', exact: true })).toBeVisible();
  45 | });
  46 |
```
