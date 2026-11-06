import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = ['/', '/projects', '/projects/mire-apartment', '/studio', '/services', '/philosophy', '/journal', '/journal/notes-on-lime', '/contact'];

test.describe('navigation', () => {
  test('menu panel opens, traps focus, closes on Escape and returns focus', async ({ page }) => {
    await page.goto('/studio');
    const menuButton = page.getByRole('button', { name: 'Menu' });
    await menuButton.click();
    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
    await expect(page.locator('#main')).toHaveAttribute('inert', '');
    for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test('menu closes with the Close button and with the backdrop', async ({ page }) => {
    await page.goto('/studio');
    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(dialog).toBeVisible();
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.locator('#main')).not.toHaveAttribute('inert', '');
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(dialog).toBeVisible();
    await page.getByRole('button', { name: 'Close menu' }).click({ position: { x: 5, y: 300 } });
    await expect(dialog).toBeHidden();
  });

  test('menu links navigate and mark the current page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('dialog').getByRole('link', { name: /Journal/ }).click();
    await expect(page).toHaveURL(/\/journal$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Notes from the bench');
  });

  test('unknown routes show the 404 page', async ({ page }) => {
    // Next streams not-found for unprerendered slugs: the status can be 200 on a first hit (documented), so the
    // contract checked here is the 404 page plus the injected noindex robots tag.
    const res = await page.goto('/projects/does-not-exist');
    expect([200, 404]).toContain(res?.status());
    expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBeGreaterThan(0);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('never built');
  });
});

test.describe('hero carousel', () => {
  test('controls, keyboard and pause work', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: 'Featured projects' });
    const slide = carousel.locator('[aria-roledescription="slide"]');
    await expect(slide).toHaveAttribute('aria-label', '1 of 5');
    await page.getByRole('button', { name: 'Next project' }).click();
    await expect(slide).toHaveAttribute('aria-label', '2 of 5');
    await page.getByRole('button', { name: 'Previous project' }).click();
    await expect(slide).toHaveAttribute('aria-label', '1 of 5');
    // Arrow keys while focus is inside the carousel
    await page.getByRole('button', { name: 'Next project' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(slide).toHaveAttribute('aria-label', '2 of 5');
    // Title rail picks a slide
    await page.getByRole('button', { name: /^Casa Velo/ }).click();
    await expect(slide).toHaveAttribute('aria-label', '4 of 5');
    await expect(page.getByRole('button', { name: /^Casa Velo/ })).toHaveAttribute('aria-current', 'true');
    // Pause / play
    await page.getByRole('button', { name: 'Pause automatic slideshow' }).click();
    await expect(page.getByRole('button', { name: 'Play automatic slideshow' })).toBeVisible();
  });

  test('autoplay advances when not hovered or focused', async ({ page }) => {
    await page.goto('/');
    await page.mouse.move(5, 5);
    const slide = page.locator('[aria-roledescription="slide"]');
    await expect(slide).toHaveAttribute('aria-label', '2 of 5', { timeout: 10_000 });
  });

  test('does not autoplay with reduced motion', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.waitForTimeout(8000);
    await expect(page.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', '1 of 5');
    await expect(page.getByRole('button', { name: 'Play automatic slideshow' })).toBeVisible();
    await ctx.close();
  });
});

test.describe('projects', () => {
  test('filtering updates the grid, count and URL', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByTestId('result-count')).toHaveText('Showing 8 of 8 projects');
    await page.getByRole('button', { name: /^Interiors/ }).click();
    await expect(page.getByTestId('result-count')).toHaveText('Showing 2 of 8 projects');
    await expect(page).toHaveURL(/type=interiors/);
    await expect(page.getByRole('button', { name: /^Interiors/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('project-card')).toHaveCount(2);
    await page.getByRole('button', { name: /^All/ }).click();
    await expect(page.getByTestId('project-card')).toHaveCount(8);
  });

  test('filter is read from the URL', async ({ page }) => {
    await page.goto('/projects?type=hospitality');
    await expect(page.getByTestId('result-count')).toHaveText('Showing 1 of 8 projects');
  });

  test('cards in the grid are the same size', async ({ page }) => {
    await page.goto('/projects');
    const sizes = await page.getByTestId('project-card').evaluateAll((els) =>
      [...new Set(els.map((e) => { const r = (e.firstElementChild as HTMLElement).getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }))]);
    expect(sizes).toHaveLength(1);
  });

  test('gallery lightbox opens, browses with arrows and closes with Escape', async ({ page }) => {
    await page.goto('/projects/halden-house');
    const opener = page.getByRole('button', { name: /Open image 2 of 4/ });
    await opener.click();
    const dialog = page.getByRole('dialog', { name: /image viewer/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/02 \/ 04/)).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(dialog.getByText(/03 \/ 04/)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test('before/after slider works with the keyboard', async ({ page }) => {
    await page.goto('/projects/mire-apartment');
    const slider = page.getByRole('slider', { name: /Before and after comparison/ });
    await slider.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(slider).toHaveAttribute('aria-valuenow', '48');
    await page.keyboard.press('PageUp');
    await expect(slider).toHaveAttribute('aria-valuenow', '58');
    await page.keyboard.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow', '100');
  });
});

test.describe('inquiry form (demo)', () => {
  test('shows validation errors, then a clearly labelled demo success', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByTestId('demo-notice')).toContainText('Nothing is sent, stored or logged');
    await page.getByRole('button', { name: 'Send brief (demo)' }).click();
    await expect(page.getByText('Please tell us your name.')).toBeVisible();
    await expect(page.getByText('Choose at least one service.')).toBeVisible();

    await page.getByLabel('Name').fill('Jane Doe');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Interiors', { exact: true }).check();
    await page.getByLabel('Renovation & reuse').check();
    await page.getByLabel(/Site location/).fill('Lisbon');
    await page.getByLabel('Approximate size').selectOption('100-300');
    await page.getByLabel('Budget').selectOption('undisclosed');
    await page.getByLabel('Timeline').selectOption('exploring');
    await page.getByLabel(/Tell us about the site/).fill('An apartment with tall windows that needs a calmer plan.');
    await page.getByLabel(/I understand this is a demo/).check();
    await page.waitForTimeout(1300); // minimum fill time used as a bot signal
    await page.getByRole('button', { name: 'Send brief (demo)' }).click();
    const status = page.getByTestId('form-status');
    await expect(status).toContainText('Demo submission received (not delivered)');
    await expect(status).toContainText(/DEMO-[0-9A-F]{6}/);
  });
});

test.describe('reduced motion', () => {
  test('scroll sections render as static, readable content', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.waitForTimeout(500);
    expect(await page.locator('[data-enhanced="true"]').count()).toBe(0);
    await expect(page.getByRole('heading', { name: 'Halden House', level: 3 }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Light before form' })).toBeVisible();
    await ctx.close();
  });

  test('scroll sections are enhanced (pinned) when motion is allowed', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-enhanced="true"]')).toHaveCount(2);
  });
});

test.describe('layout', () => {
  for (const width of [300, 390, 768, 1440]) {
    test(`no horizontal scroll at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      for (const path of PAGES) {
        await page.goto(path);
        const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
        expect(sw, `${path} at ${width}px`).toBeLessThanOrEqual(cw);
      }
      await ctx.close();
    });
  }

  test('below 250px the layout locks at 500px and can be panned', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 240, height: 800 } });
    const page = await ctx.newPage();
    for (const path of ['/', '/projects', '/contact']) {
      await page.goto(path);
      const m = await page.evaluate(() => {
        const fixed = [...document.querySelectorAll('body *')].filter((e) => getComputedStyle(e).position === 'fixed');
        // The computed "right" of a positioned box is its used value, so read the declared value from the stylesheet.
        let declaredRight = '';
        for (const sheet of document.styleSheets) {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSMediaRule && /max-width:\s*250px/.test(rule.conditionText)) {
              for (const inner of rule.cssRules) {
                if (inner instanceof CSSStyleRule && inner.selectorText.includes('.is-fixed') && inner.style.getPropertyValue('right')) declaredRight = inner.style.getPropertyValue('right');
              }
            }
          }
        }
        return {
          root: document.getElementById('root')!.getBoundingClientRect().width,
          fixed: fixed.map((e) => ({ tag: e.tagName, cls: e.className.toString().includes('is-fixed'), w: Math.round(e.getBoundingClientRect().width), left: Math.round(e.getBoundingClientRect().left) })),
          declaredRight,
          htmlOverflow: getComputedStyle(document.documentElement).overflowX,
          sw: document.documentElement.scrollWidth,
        };
      });
      expect(m.root, path).toBe(500);
      expect(m.fixed.length, path).toBeGreaterThan(0);
      for (const f of m.fixed) {
        expect(f.cls, `${path}: fixed <${f.tag}> must carry .is-fixed`).toBe(true);
        expect(f.w, path).toBe(500);
        expect(f.left, path).toBeGreaterThanOrEqual(0);
      }
      expect(m.declaredRight).toContain('auto');
      expect(m.htmlOverflow).toBe('auto');
      expect(m.sw).toBeGreaterThanOrEqual(500);
    }
    await ctx.close();
  });

  test('the open menu and the gallery lightbox are also locked at 500px', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 240, height: 800 } });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).dispatchEvent('click');
    const menu = page.getByRole('dialog', { name: 'Site menu' });
    await expect(menu).toBeVisible();
    expect(await menu.evaluate((d) => (d.parentElement as HTMLElement).getBoundingClientRect().width)).toBe(500);
    await page.goto('/projects/halden-house');
    await page.getByRole('button', { name: /Open image 1 of/ }).dispatchEvent('click');
    const box = page.getByRole('dialog', { name: /image viewer/ });
    await expect(box).toBeVisible();
    expect(await box.evaluate((d) => Math.round(d.getBoundingClientRect().width))).toBe(500);
    await ctx.close();
  });

  test('journal cards are the same size', async ({ page }) => {
    await page.goto('/journal');
    const sizes = await page.getByTestId('post-card').evaluateAll((els) =>
      [...new Set(els.map((e) => { const r = (e.firstElementChild as HTMLElement).getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }))]);
    expect(sizes.length).toBeGreaterThan(0);
    expect(sizes).toHaveLength(1);
  });

  for (const width of [390, 768]) {
    test(`project and journal cards are equal-size at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      for (const [path, id] of [['/projects', 'project-card'], ['/journal', 'post-card']]) {
        await page.goto(path);
        const sizes = await page.getByTestId(id).evaluateAll((els) =>
          [...new Set(els.map((e) => { const r = (e.firstElementChild as HTMLElement).getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }))]);
        expect(sizes, `${path} at ${width}px`).toHaveLength(1);
      }
      await ctx.close();
    });
  }
});

test.describe('accessibility (axe, WCAG 2.x A/AA)', () => {
  for (const path of PAGES) {
    test(`axe: ${path}`, async ({ browser }) => {
      // Reduced motion so every section is in its final, static state when scanned.
      const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
      });
      await page.waitForTimeout(1200);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
      expect(summary, summary.join('\n')).toEqual([]);
      await ctx.close();
    });
  }
});
