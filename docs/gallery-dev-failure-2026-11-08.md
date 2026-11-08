# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> projects >> gallery lightbox opens, browses with arrows and closes with Escape
- Location: tests\e2e\site.spec.ts:121:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Open image 2 of 4/ })

```

# Page snapshot

```yaml
- generic:
  - generic [active]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - navigation [ref=e6]:
          - button [disabled] [ref=e7]:
            - img "previous" [ref=e8]
          - generic [ref=e10]:
            - generic [ref=e11]: 1/
            - generic [ref=e12]: "1"
          - button [disabled] [ref=e13]:
            - img "next" [ref=e14]
        - generic [ref=e17]:
          - generic "Latest available version is detected (16.4.5)." [ref=e20]: Next.js 16.4.5
          - generic [ref=e21]: Turbopack
      - dialog "Runtime SyntaxError" [ref=e23]:
        - generic [ref=e26]:
          - generic [ref=e28]:
            - generic [ref=e29]:
              - generic [ref=e30]: Runtime SyntaxError
              - generic [ref=e32]:
                - button "Copy Error Info" [ref=e33] [cursor=pointer]
                - button "No related documentation found" [disabled] [ref=e36]
                - button "Attach Node.js inspector" [ref=e39] [cursor=pointer]
            - generic [ref=e48]: Unexpected end of JSON input
          - generic [ref=e51]:
            - generic [ref=e52]:
              - paragraph [ref=e53]:
                - text: Call Stack
                - generic [ref=e54]: "15"
              - button "Show 14 ignore-listed frame(s)" [ref=e55] [cursor=pointer]
            - generic [ref=e58]:
              - generic [ref=e59]: JSON.parse
              - text: <anonymous>
    - generic [ref=e64] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e65]
      - generic [ref=e69]:
        - button "Open issues overlay" [ref=e70]:
          - generic [ref=e71]:
            - generic [aria-hidden] [ref=e72]: "0"
            - generic [ref=e73]: "1"
          - generic [ref=e74]: Issue
        - button "Collapse issues badge" [ref=e75]
  - alert [ref=e78]
```

# Test source

```ts
  24  |     const dialog = page.getByRole('dialog', { name: 'Site menu' });
  25  |     await page.getByRole('button', { name: 'Menu' }).click();
  26  |     await expect(dialog).toBeVisible();
  27  |     await page.getByRole('button', { name: 'Close', exact: true }).click();
  28  |     await expect(dialog).toBeHidden();
  29  |     await expect(page.locator('#main')).not.toHaveAttribute('inert', '');
  30  |     await page.getByRole('button', { name: 'Menu' }).click();
  31  |     await expect(dialog).toBeVisible();
  32  |     await page.getByRole('button', { name: 'Close menu' }).click({ position: { x: 5, y: 300 } });
  33  |     await expect(dialog).toBeHidden();
  34  |   });
  35  |
  36  |   test('menu links navigate and mark the current page', async ({ page }) => {
  37  |     await page.goto('/');
  38  |     await page.getByRole('button', { name: 'Menu' }).click();
  39  |     await page.getByRole('dialog').getByRole('link', { name: /Journal/ }).click();
  40  |     await expect(page).toHaveURL(/\/journal$/);
  41  |     await expect(page.getByRole('heading', { level: 1 })).toContainText('Notes from the bench');
  42  |   });
  43  |
  44  |   for (const path of ['/projects/does-not-exist', '/journal/does-not-exist', '/journal/%ZZ']) {
  45  |     test(`unknown route ${path} returns a hard 404`, async ({ page }) => {
  46  |       // proxy.ts rewrites unknown or malformed slugs to a missing route, so they answer 404 on the first hit.
  47  |       const res = await page.goto(path);
  48  |       expect(res?.status()).toBe(404);
  49  |       expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBeGreaterThan(0);
  50  |       await expect(page.getByRole('heading', { level: 1 })).toContainText('never built');
  51  |     });
  52  |   }
  53  | });
  54  |
  55  | test.describe('hero carousel', () => {
  56  |   test('controls, keyboard and pause work', async ({ page }) => {
  57  |     await page.goto('/');
  58  |     const carousel = page.getByRole('region', { name: 'Featured projects' });
  59  |     const slide = carousel.locator('[aria-roledescription="slide"]');
  60  |     await expect(slide).toHaveAttribute('aria-label', '1 of 5');
  61  |     await page.getByRole('button', { name: 'Next project' }).click();
  62  |     await expect(slide).toHaveAttribute('aria-label', '2 of 5');
  63  |     await page.getByRole('button', { name: 'Previous project' }).click();
  64  |     await expect(slide).toHaveAttribute('aria-label', '1 of 5');
  65  |     // Arrow keys while focus is inside the carousel
  66  |     await page.getByRole('button', { name: 'Next project' }).focus();
  67  |     await page.keyboard.press('ArrowRight');
  68  |     await expect(slide).toHaveAttribute('aria-label', '2 of 5');
  69  |     // Title rail picks a slide
  70  |     await page.getByRole('button', { name: /^Casa Velo/ }).click();
  71  |     await expect(slide).toHaveAttribute('aria-label', '4 of 5');
  72  |     await expect(page.getByRole('button', { name: /^Casa Velo/ })).toHaveAttribute('aria-current', 'true');
  73  |     // Pause / play
  74  |     await page.getByRole('button', { name: 'Pause automatic slideshow' }).click();
  75  |     await expect(page.getByRole('button', { name: 'Play automatic slideshow' })).toBeVisible();
  76  |   });
  77  |
  78  |   test('autoplay advances when not hovered or focused', async ({ page }) => {
  79  |     await page.goto('/');
  80  |     await page.mouse.move(5, 5);
  81  |     const slide = page.locator('[aria-roledescription="slide"]');
  82  |     await expect(slide).toHaveAttribute('aria-label', '2 of 5', { timeout: 10_000 });
  83  |   });
  84  |
  85  |   test('does not autoplay with reduced motion', async ({ browser }) => {
  86  |     const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  87  |     const page = await ctx.newPage();
  88  |     await page.goto('/');
  89  |     await page.waitForTimeout(8000);
  90  |     await expect(page.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', '1 of 5');
  91  |     await expect(page.getByRole('button', { name: 'Play automatic slideshow' })).toBeVisible();
  92  |     await ctx.close();
  93  |   });
  94  | });
  95  |
  96  | test.describe('projects', () => {
  97  |   test('filtering updates the grid, count and URL', async ({ page }) => {
  98  |     await page.goto('/projects');
  99  |     await expect(page.getByTestId('result-count')).toHaveText('Showing 8 of 8 projects');
  100 |     await page.getByRole('button', { name: /^Interiors/ }).click();
  101 |     await expect(page.getByTestId('result-count')).toHaveText('Showing 2 of 8 projects');
  102 |     await expect(page).toHaveURL(/type=interiors/);
  103 |     await expect(page.getByRole('button', { name: /^Interiors/ })).toHaveAttribute('aria-pressed', 'true');
  104 |     await expect(page.getByTestId('project-card')).toHaveCount(2);
  105 |     await page.getByRole('button', { name: /^All/ }).click();
  106 |     await expect(page.getByTestId('project-card')).toHaveCount(8);
  107 |   });
  108 |
  109 |   test('filter is read from the URL', async ({ page }) => {
  110 |     await page.goto('/projects?type=hospitality');
  111 |     await expect(page.getByTestId('result-count')).toHaveText('Showing 1 of 8 projects');
  112 |   });
  113 |
  114 |   test('cards in the grid are the same size', async ({ page }) => {
  115 |     await page.goto('/projects');
  116 |     const sizes = await page.getByTestId('project-card').evaluateAll((els) =>
  117 |       [...new Set(els.map((e) => { const r = (e.firstElementChild as HTMLElement).getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }))]);
  118 |     expect(sizes).toHaveLength(1);
  119 |   });
  120 |
  121 |   test('gallery lightbox opens, browses with arrows and closes with Escape', async ({ page }) => {
  122 |     await page.goto('/projects/halden-house');
  123 |     const opener = page.getByRole('button', { name: /Open image 2 of 4/ });
> 124 |     await opener.click();
      |                  ^ Error: locator.click: Test timeout of 60000ms exceeded.
  125 |     const dialog = page.getByRole('dialog', { name: /image viewer/ });
  126 |     await expect(dialog).toBeVisible();
  127 |     await expect(dialog.getByText(/02 \/ 04/)).toBeVisible();
  128 |     await page.keyboard.press('ArrowRight');
  129 |     await expect(dialog.getByText(/03 \/ 04/)).toBeVisible();
  130 |     await page.keyboard.press('Escape');
  131 |     await expect(dialog).toBeHidden();
  132 |     await expect(opener).toBeFocused();
  133 |   });
  134 |
  135 |   test('before/after slider works with the keyboard', async ({ page }) => {
  136 |     await page.goto('/projects/mire-apartment');
  137 |     const slider = page.getByRole('slider', { name: /Before and after comparison/ });
  138 |     await slider.focus();
  139 |     await page.keyboard.press('ArrowLeft');
  140 |     await expect(slider).toHaveAttribute('aria-valuenow', '48');
  141 |     await page.keyboard.press('PageUp');
  142 |     await expect(slider).toHaveAttribute('aria-valuenow', '58');
  143 |     await page.keyboard.press('End');
  144 |     await expect(slider).toHaveAttribute('aria-valuenow', '100');
  145 |   });
  146 | });
  147 |
  148 | test.describe('inquiry form (demo)', () => {
  149 |   test('shows validation errors, then a clearly labelled demo success', async ({ page }) => {
  150 |     await page.goto('/contact');
  151 |     await expect(page.getByTestId('demo-notice')).toContainText('Nothing is sent, stored or logged');
  152 |     await page.getByRole('button', { name: 'Send brief (demo)' }).click();
  153 |     await expect(page.getByText('Please tell us your name.')).toBeVisible();
  154 |     await expect(page.getByText('Choose at least one service.')).toBeVisible();
  155 |
  156 |     await page.getByLabel('Name').fill('Jane Doe');
  157 |     await page.getByLabel('Email').fill('test@example.com');
  158 |     await page.getByLabel('Interiors', { exact: true }).check();
  159 |     await page.getByLabel('Renovation & reuse').check();
  160 |     await page.getByLabel(/Site location/).fill('Lisbon');
  161 |     await page.getByLabel('Approximate size').selectOption('100-300');
  162 |     await page.getByLabel('Budget').selectOption('undisclosed');
  163 |     await page.getByLabel('Timeline').selectOption('exploring');
  164 |     await page.getByLabel(/Tell us about the site/).fill('An apartment with tall windows that needs a calmer plan.');
  165 |     await page.getByLabel(/I understand this is a demo/).check();
  166 |     await page.waitForTimeout(1300); // minimum fill time used as a bot signal
  167 |     await page.getByRole('button', { name: 'Send brief (demo)' }).click();
  168 |     const status = page.getByTestId('form-status');
  169 |     await expect(status).toContainText('Demo submission received (not delivered)');
  170 |     await expect(status).toContainText(/DEMO-[0-9A-F]{6}/);
  171 |   });
  172 | });
  173 |
  174 | test.describe('footer contact card', () => {
  175 |   test('shows contact details without editable fields or form actions', async ({ page }) => {
  176 |     await page.goto('/studio');
  177 |     await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  178 |     const card = page.getByRole('region', { name: 'Contact us', exact: true });
  179 |     await expect(card).toBeVisible();
  180 |     await expect(card).toContainText('hello@ostrel.example');
  181 |     await expect(card).toContainText('Contact details are illustrative');
  182 |     await expect(card.locator('form, input, textarea, button')).toHaveCount(0);
  183 |   });
  184 | });
  185 |
  186 | test.describe('reduced motion', () => {
  187 |   test('scroll sections render as static, readable content', async ({ browser }) => {
  188 |     const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  189 |     const page = await ctx.newPage();
  190 |     await page.goto('/');
  191 |     await page.waitForTimeout(500);
  192 |     expect(await page.locator('[data-enhanced="true"]').count()).toBe(0);
  193 |     await expect(page.getByRole('heading', { name: 'Halden House', level: 3 }).first()).toBeVisible();
  194 |     await expect(page.getByRole('heading', { name: 'Light before form' })).toBeVisible();
  195 |     await ctx.close();
  196 |   });
  197 |
  198 |   test('scroll sections are enhanced (pinned) when motion is allowed', async ({ page }) => {
  199 |     await page.goto('/');
  200 |     await expect(page.locator('[data-enhanced="true"]')).toHaveCount(2);
  201 |   });
  202 | });
  203 |
  204 | test.describe('layout', () => {
  205 |   for (const width of [300, 390, 768, 1440]) {
  206 |     test(`no horizontal scroll at ${width}px`, async ({ browser }) => {
  207 |       const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  208 |       const page = await ctx.newPage();
  209 |       for (const path of PAGES) {
  210 |         await page.goto(path);
  211 |         const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  212 |         expect(sw, `${path} at ${width}px`).toBeLessThanOrEqual(cw);
  213 |       }
  214 |       await ctx.close();
  215 |     });
  216 |   }
  217 |
  218 |   test('below 250px the layout locks at 500px and can be panned', async ({ browser }) => {
  219 |     const ctx = await browser.newContext({ viewport: { width: 240, height: 800 } });
  220 |     const page = await ctx.newPage();
  221 |     for (const path of ['/', '/projects', '/contact']) {
  222 |       await page.goto(path);
  223 |       const m = await page.evaluate(() => {
  224 |         const fixed = [...document.querySelectorAll('body *')].filter((e) => getComputedStyle(e).position === 'fixed');
```
