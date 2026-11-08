import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`hero and selected-work composition at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const hero = page.getByRole('region', { name: 'Featured projects' });
    await expect(hero).toBeVisible();
    await hero.getByRole('button', { name: 'Pause automatic slideshow' }).click();
    await hero.getByRole('button', { name: /^Halden House/ }).click();
    await expect(hero.locator('img')).toHaveCount(1);
    await expect(hero.locator('[aria-roledescription="slide"] > div')).toHaveCSS('opacity', '1');
    await hero.locator('img').first().evaluate(async (el: HTMLImageElement) => { await el.decode(); });
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth)).toBe('none');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `docs/screenshots/refined-${width}-hero.png` });

    const stage = page.locator('[data-enhanced="true"]').filter({ has: page.locator('[data-frame]') });
    await expect(stage).toHaveCount(1);
    const top = await stage.evaluate(el => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate(y => window.scrollTo(0, y), top + 80);
    const frame = stage.locator('[data-frame]').first();
    await expect(frame).toHaveCSS('clip-path', 'inset(0%)');
    await expect(stage.locator('[data-caption]').first()).toBeVisible();
    expect(await frame.locator('img').evaluate(el => getComputedStyle(el).objectFit)).toBe('cover');
    await frame.locator('img').evaluate(async (el: HTMLImageElement) => { await el.decode(); });
    await page.screenshot({ path: `docs/screenshots/refined-${width}-showcase.png` });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.getByRole('region', { name: 'Contact us', exact: true })).toBeVisible();
    await page.screenshot({ path: `docs/screenshots/refined-${width}-footer.png` });
  });
}
