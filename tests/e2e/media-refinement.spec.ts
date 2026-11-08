import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`hero and selected-work composition at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const hero = page.getByRole('region', { name: 'Featured projects' });
    await expect(hero).toBeVisible();
    await hero.getByRole('button', { name: 'Pause automatic slideshow' }).click();
    const slide = hero.locator('[aria-roledescription="slide"]');
    for (let i = 0; i < 5; i++) {
      const before = await slide.getAttribute('aria-label');
      if (before === '1 of 5') break;
      await hero.getByRole('button', { name: 'Previous project' }).click();
      await expect(slide).not.toHaveAttribute('aria-label', before!);
    }
    await expect(hero.locator('img')).toHaveCount(1);
    await expect(hero.locator('[aria-roledescription="slide"] > div')).toHaveCSS('opacity', '1');
    await hero.locator('img').first().evaluate(async (el: HTMLImageElement) => { await el.decode(); });
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth)).toBe('none');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `docs/screenshots/refined-${width}-hero.png` });

    const selected = page.locator('[data-selected-project]').first();
    await selected.scrollIntoViewIfNeeded();
    await expect(selected.getByRole('heading')).toContainText('Olive Court House');
    await selected.locator('img').evaluate(async (el: HTMLImageElement) => { await el.decode(); });
    await expect(page.locator('header').first()).toBeInViewport();
    await page.screenshot({ path: `docs/screenshots/refined-${width}-showcase.png` });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.getByRole('region', { name: 'Contact us', exact: true })).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/refined-${width}-footer.png` });
  });
}
