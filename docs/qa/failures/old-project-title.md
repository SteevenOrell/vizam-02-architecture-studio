# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> reduced motion >> scroll sections render as static, readable content
- Location: tests\e2e\site.spec.ts:187:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Halden House', level: 3 }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Halden House', level: 3 }).first() with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Halden House', level: 3 }).first()

```

```yaml
- link "Skip to content":
  - /url: "#main"
- banner:
  - link "Ostrel Atelier, home":
    - /url: /
    - text: Atelier
  - navigation "Primary":
    - list:
      - listitem:
        - link "01 Projects":
          - /url: /projects
      - listitem:
        - link "02 Studio":
          - /url: /studio
      - listitem:
        - link "03 Services":
          - /url: /services
      - listitem:
        - link "04 Philosophy":
          - /url: /philosophy
      - listitem:
        - link "05 Journal":
          - /url: /journal
  - link "Start a project":
    - /url: /contact
  - button "Menu"
- main:
  - region "Featured projects":
    - group "1 of 5":
      - paragraph: "Slide 1 of 5: Halden House, Residential, 2025"
      - heading "Ostrel Atelier — architecture and interiors (fictional studio)" [level=1]
      - paragraph: 01 — Residential · Sintra hills, Portugal
      - paragraph: Halden House
      - paragraph: A family house of stacked concrete volumes that opens to a single sheltered lawn.
      - link "View Halden House":
        - /url: /projects/halden-house
    - list "Choose a project":
      - listitem:
        - button "Halden House 2025 | Residential"
      - listitem:
        - button "Lumen Rooms 2024 | Hospitality"
      - listitem:
        - button "Saline Pavilion 2026 | Cultural"
      - listitem:
        - button "Casa Velo 2023 | Residential"
      - listitem:
        - button "Northfold Works 2024 | Workplace"
    - button "Previous project"
    - button "Next project"
    - button "Play automatic slideshow"
  - region "Quiet buildings, carefully made.":
    - paragraph: (01) The studio
    - heading "Quiet buildings, carefully made." [level=2]
    - paragraph: Ostrel is a small practice for architecture and interiors. We work slowly, with models and daylight, on houses, hotels and rooms for culture and work.
    - term: Founded
    - definition: 2014 (fictional)
    - term: Studios
    - definition: Lisbon · Copenhagen
    - term: Disciplines
    - definition: Architecture, interiors, reuse, objects
    - term: People
    - definition: 14 architects, designers and makers
    - link "About the studio":
      - /url: /studio
  - region "Places to belong.":
    - paragraph: (02) Selected work
    - heading "Places to belong." [level=2]
    - paragraph: Two houses and a city residence. Three fictional studies in shelter, light and the spaces between.
    - list:
      - listitem:
        - img "Pale travertine garden villa with oak-framed glazing among olive trees"
        - paragraph: 01 — Residential · Fictional concept
        - heading "Olive Court House" [level=3]
        - paragraph: A quiet garden villa in pale travertine, arranged around shade and olive trees.
        - link "Explore Olive Court House":
          - /url: /projects/olive-court-house
      - listitem:
        - img "Curved ivory coastal villa with an arched passage and a sea-facing limestone terrace"
        - paragraph: 02 — Residential · Fictional concept
        - heading "Mar de Cal" [level=3]
        - paragraph: Curved lime-plaster walls frame the sea from a sheltered stone terrace.
        - link "Explore Mar de Cal":
          - /url: /projects/mar-de-cal
      - listitem:
        - img "Contemporary limestone apartment building with deep planted balconies and timber screens"
        - paragraph: 03 — Residential · Fictional concept
        - heading "Mira Residence" [level=3]
        - paragraph: A limestone apartment building with deep planted balconies and generous shared thresholds.
        - link "Explore Mira Residence":
          - /url: /projects/mira-residence
  - region "What we draw":
    - paragraph: (03) Services
    - heading "What we draw" [level=2]
    - link "All services":
      - /url: /services
    - list:
      - listitem:
        - link "01 Architecture New buildings and extensions, from feasibility to the last site visit.":
          - /url: /services#architecture
      - listitem:
        - 'link "02 Interior architecture Rooms planned from the inside out: joinery, lighting, surfaces and the way you move."':
          - /url: /services#interiors
      - listitem:
        - 'link "03 Renovation & reuse Careful work with existing buildings: keep what is good, repair what is honest."':
          - /url: /services#renovation
      - listitem:
        - link "04 Hospitality Small hotels and restaurants where architecture is part of the welcome.":
          - /url: /services#hospitality
      - listitem:
        - link "05 Furniture & objects One-off pieces designed with makers when nothing on the market fits the room.":
          - /url: /services#objects
  - region "From landscape to living.":
    - paragraph: Anatomy of a home · Fictional design study
    - heading "From landscape to living." [level=2]
    - paragraph: Begin with the home. Scroll to explore the layers that give it shape.
    - img "Low plaster home with oak screens and a stone terrace in an olive grove"
    - paragraph: 01 / 07 · Schematic concept
    - heading "The complete home" [level=3]
    - paragraph: A sheltered terrace, an olive grove, and rooms drawn around the light.
    - list:
      - listitem:
        - heading "Ground" [level=3]
        - paragraph: A stone platform establishes the threshold between landscape and home.
      - listitem:
        - heading "Walls" [level=3]
        - paragraph: Solid planes define shelter while keeping the garden in view.
      - listitem:
        - heading "Openings" [level=3]
        - paragraph: Deep reveals temper daylight and frame the long horizon.
      - listitem:
        - heading "Roof" [level=3]
        - paragraph: A light horizontal canopy shades the terrace and the glazing.
      - listitem:
        - heading "Structure" [level=3]
        - paragraph: The parts separate to show how mass, span and light work together.
      - listitem:
        - heading "A place to live" [level=3]
        - paragraph: "The layers return to one whole: a quiet home, carefully made."
  - region "We begin with light, then weight, then time. Everything else is a consequence.":
    - img "Empty room opening onto a misty landscape through a full-height window"
    - paragraph: (04) Philosophy
    - heading "We begin with light, then weight, then time. Everything else is a consequence." [level=2]
    - list:
      - listitem:
        - img "Sunlight falling through a tall window grid onto a curved white wall"
        - paragraph: Principle 01
        - heading "Light before form" [level=3]
        - paragraph: We decide where the light falls before we decide what the building looks like.
      - listitem:
        - img "Deep masonry window reveal and stone window seat catching daylight"
        - paragraph: Principle 02
        - heading "Weight is a comfort" [level=3]
        - paragraph: Thick walls, deep reveals and heavy materials make rooms that feel safe and stay cool.
      - listitem:
        - img "Oak stair landing with a generous built-in window seat"
        - paragraph: Principle 03
        - heading "Thresholds are rooms" [level=3]
        - paragraph: Stairs, porches and window seats are where life happens. We give them space.
      - listitem:
        - img "Paper screen with a dark timber grid"
        - paragraph: Principle 04
        - heading "Made to age" [level=3]
        - paragraph: Materials that patinate, wear and can be repaired. A building should look better in twenty years.
  - region "More from the studio (3)":
    - paragraph: (05) Index
    - heading "More from the studio (3)" [level=2]:
      - text: More from the studio
      - superscript: (3)
    - link "See all projects":
      - /url: /projects
    - list:
      - listitem:
        - link "Light living room with a low sofa, a round coffee table and soft daylight 01 Mire Apartment 148 m² Interiors · Lisbon, Portugal · 2025":
          - /url: /projects/mire-apartment
          - img "Light living room with a low sofa, a round coffee table and soft daylight"
          - text: "01"
          - heading "Mire Apartment" [level=3]
          - text: 148 m²
          - paragraph: Interiors · Lisbon, Portugal · 2025
      - listitem:
        - link "Concrete bedroom with a low bed and a large dark photograph on the wall 02 Ombra Townhouse 210 m² Interiors · Copenhagen, Denmark · 2026":
          - /url: /projects/ombra-townhouse
          - img "Concrete bedroom with a low bed and a large dark photograph on the wall"
          - text: "02"
          - heading "Ombra Townhouse" [level=3]
          - text: 210 m²
          - paragraph: Interiors · Copenhagen, Denmark · 2026
      - listitem:
        - link "Loft with exposed brick, a steel stair, a living wall and low seating 03 Kiln Yard Studios 640 m² Workplace · Braga, Portugal · 2022":
          - /url: /projects/kiln-yard-studios
          - img "Loft with exposed brick, a steel stair, a living wall and low seating"
          - text: "03"
          - heading "Kiln Yard Studios" [level=3]
          - text: 640 m²
          - paragraph: Workplace · Braga, Portugal · 2022
  - region "Notes from the bench":
    - paragraph: (06) Journal
    - heading "Notes from the bench" [level=2]
    - link "All entries":
      - /url: /journal
    - list:
      - listitem:
        - link "Spiral staircase in black and white with a single light at the top Essay 18 Sept 2026 The stair as a room Why we draw staircases first, and why the best ones are wide enough to sit on.":
          - /url: /journal/the-stair-as-a-room
          - img "Spiral staircase in black and white with a single light at the top"
          - paragraph:
            - text: Essay
            - time: 18 Sept 2026
          - heading "The stair as a room" [level=3]
          - paragraph: Why we draw staircases first, and why the best ones are wide enough to sit on.
      - listitem:
        - link "Two cast spheres resting on a smooth mineral floor Material 02 Jul 2026 Notes on lime Lime plaster breathes, repairs itself and ages with grace. A short field guide from our sites.":
          - /url: /journal/notes-on-lime
          - img "Two cast spheres resting on a smooth mineral floor"
          - paragraph:
            - text: Material
            - time: 02 Jul 2026
          - heading "Notes on lime" [level=3]
          - paragraph: Lime plaster breathes, repairs itself and ages with grace. A short field guide from our sites.
      - listitem:
        - link "Blinds filtering sunlight into a long corridor Process 21 Apr 2026 Drawing with daylight How a year of sun studies decides where a single window goes.":
          - /url: /journal/drawing-with-daylight
          - img "Blinds filtering sunlight into a long corridor"
          - paragraph:
            - text: Process
            - time: 21 Apr 2026
          - heading "Drawing with daylight" [level=3]
          - paragraph: How a year of sun studies decides where a single window goes.
- contentinfo:
  - paragraph: (Next) — A conversation
  - paragraph: Have a site, a room or a question? Start with a brief.
  - link "Start a project":
    - /url: /contact
  - navigation "Footer":
    - heading "Index" [level=2]
    - list:
      - listitem:
        - link "Home":
          - /url: /
      - listitem:
        - link "Projects":
          - /url: /projects
      - listitem:
        - link "Studio":
          - /url: /studio
      - listitem:
        - link "Services":
          - /url: /services
      - listitem:
        - link "Philosophy":
          - /url: /philosophy
      - listitem:
        - link "Journal":
          - /url: /journal
      - listitem:
        - link "Start a project":
          - /url: /contact
  - heading "Studio" [level=2]
  - text: Studio 4, Pátio da Cal (fictional) Lisbon, Portugal
  - link "hello@ostrel.example":
    - /url: mailto:hello@ostrel.example
  - paragraph: Mon–Fri, 09:00–18:00 · Visits by appointment
  - complementary "Contact card":
    - region "Contact us":
      - paragraph: A conversation starts here
      - paragraph: No. 02
      - heading "Contact us" [level=2]
      - paragraph: A site, a room, an idea. Every project begins with a few words.
      - paragraph: Email
      - paragraph: hello@ostrel.example
      - paragraph: Find the studio
      - paragraph: Lisbon · Copenhagen
      - paragraph: Monday–Friday, 09:00–18:00 Visits by appointment
      - paragraph: Ostrel Atelier is a fictional studio — a VIZAM concept project. Contact details are illustrative; this card does not send or collect messages. Imagery includes stock and AI-generated concepts.
      - text: OA / VZM Let’s talk 2026
  - paragraph: © 2026 Ostrel Atelier
  - paragraph: VIZAM concept project — fictional studio
  - paragraph: Not a real practice · Demo forms only
- alert
```

# Test source

```ts
  93  |   });
  94  | });
  95  |
  96  | test.describe('projects', () => {
  97  |   test('filtering updates the grid, count and URL', async ({ page }) => {
  98  |     await page.goto('/projects');
  99  |     await expect(page.getByTestId('result-count')).toHaveText('Showing 11 of 11 projects');
  100 |     await page.getByRole('button', { name: /^Interiors/ }).click();
  101 |     await expect(page.getByTestId('result-count')).toHaveText('Showing 2 of 11 projects');
  102 |     await expect(page).toHaveURL(/type=interiors/);
  103 |     await expect(page.getByRole('button', { name: /^Interiors/ })).toHaveAttribute('aria-pressed', 'true');
  104 |     await expect(page.getByTestId('project-card')).toHaveCount(2);
  105 |     await page.getByRole('button', { name: /^All/ }).click();
  106 |     await expect(page.getByTestId('project-card')).toHaveCount(11);
  107 |   });
  108 |
  109 |   test('filter is read from the URL', async ({ page }) => {
  110 |     await page.goto('/projects?type=hospitality');
  111 |     await expect(page.getByTestId('result-count')).toHaveText('Showing 1 of 11 projects');
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
  124 |     await opener.click();
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
> 193 |     await expect(page.getByRole('heading', { name: 'Halden House', level: 3 }).first()).toBeVisible();
      |                                                                                         ^ Error: expect(locator).toBeVisible() failed
  194 |     await expect(page.getByRole('heading', { name: 'Light before form' })).toBeVisible();
  195 |     await ctx.close();
  196 |   });
  197 |
  198 |   test('scroll sections are enhanced (pinned) when motion is allowed', async ({ page }) => {
  199 |     await page.goto('/');
  200 |     await expect(page.locator('[data-study-motion="true"]')).toHaveCount(1);
  201 |     await expect(page.locator('[data-enhanced="true"]')).toHaveCount(1);
  202 |   });
  203 | });
  204 |
  205 | test.describe('layout', () => {
  206 |   for (const width of [300, 390, 768, 1440]) {
  207 |     test(`no horizontal scroll at ${width}px`, async ({ browser }) => {
  208 |       const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  209 |       const page = await ctx.newPage();
  210 |       for (const path of PAGES) {
  211 |         await page.goto(path);
  212 |         const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  213 |         expect(sw, `${path} at ${width}px`).toBeLessThanOrEqual(cw);
  214 |       }
  215 |       await ctx.close();
  216 |     });
  217 |   }
  218 |
  219 |   test('below 250px the layout locks at 500px and can be panned', async ({ browser }) => {
  220 |     const ctx = await browser.newContext({ viewport: { width: 240, height: 800 } });
  221 |     const page = await ctx.newPage();
  222 |     for (const path of ['/', '/projects', '/contact']) {
  223 |       await page.goto(path);
  224 |       const m = await page.evaluate(() => {
  225 |         const fixed = [...document.querySelectorAll('body *')].filter((e) => getComputedStyle(e).position === 'fixed');
  226 |         // The computed "right" of a positioned box is its used value, so read the declared value from the stylesheet.
  227 |         let declaredRight = '';
  228 |         for (const sheet of document.styleSheets) {
  229 |           for (const rule of sheet.cssRules) {
  230 |             if (rule instanceof CSSMediaRule && /max-width:\s*250px/.test(rule.conditionText)) {
  231 |               for (const inner of rule.cssRules) {
  232 |                 if (inner instanceof CSSStyleRule && inner.selectorText.includes('.is-fixed') && inner.style.getPropertyValue('right')) declaredRight = inner.style.getPropertyValue('right');
  233 |               }
  234 |             }
  235 |           }
  236 |         }
  237 |         return {
  238 |           root: document.getElementById('root')!.getBoundingClientRect().width,
  239 |           fixed: fixed.map((e) => ({ tag: e.tagName, cls: e.className.toString().includes('is-fixed'), w: Math.round(e.getBoundingClientRect().width), left: Math.round(e.getBoundingClientRect().left) })),
  240 |           declaredRight,
  241 |           htmlOverflow: getComputedStyle(document.documentElement).overflowX,
  242 |           sw: document.documentElement.scrollWidth,
  243 |         };
  244 |       });
  245 |       expect(m.root, path).toBe(500);
  246 |       expect(m.fixed.length, path).toBeGreaterThan(0);
  247 |       for (const f of m.fixed) {
  248 |         expect(f.cls, `${path}: fixed <${f.tag}> must carry .is-fixed`).toBe(true);
  249 |         expect(f.w, path).toBe(500);
  250 |         expect(f.left, path).toBeGreaterThanOrEqual(0);
  251 |       }
  252 |       expect(m.declaredRight).toContain('auto');
  253 |       expect(m.htmlOverflow).toBe('auto');
  254 |       expect(m.sw).toBeGreaterThanOrEqual(500);
  255 |     }
  256 |     await ctx.close();
  257 |   });
  258 |
  259 |   test('the open menu and the gallery lightbox are also locked at 500px', async ({ browser }) => {
  260 |     const ctx = await browser.newContext({ viewport: { width: 240, height: 800 } });
  261 |     const page = await ctx.newPage();
  262 |     await page.goto('/');
  263 |     await page.getByRole('button', { name: 'Menu' }).dispatchEvent('click');
  264 |     const menu = page.getByRole('dialog', { name: 'Site menu' });
  265 |     await expect(menu).toBeVisible();
  266 |     expect(await menu.evaluate((d) => (d.parentElement as HTMLElement).getBoundingClientRect().width)).toBe(500);
  267 |     await page.goto('/projects/halden-house');
  268 |     await page.getByRole('button', { name: /Open image 1 of/ }).dispatchEvent('click');
  269 |     const box = page.getByRole('dialog', { name: /image viewer/ });
  270 |     await expect(box).toBeVisible();
  271 |     expect(await box.evaluate((d) => Math.round(d.getBoundingClientRect().width))).toBe(500);
  272 |     await ctx.close();
  273 |   });
  274 |
  275 |   test('journal cards are the same size', async ({ page }) => {
  276 |     await page.goto('/journal');
  277 |     const sizes = await page.getByTestId('post-card').evaluateAll((els) =>
  278 |       [...new Set(els.map((e) => { const r = (e.firstElementChild as HTMLElement).getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }))]);
  279 |     expect(sizes.length).toBeGreaterThan(0);
  280 |     expect(sizes).toHaveLength(1);
  281 |   });
  282 |
  283 |   for (const width of [390, 768]) {
  284 |     test(`project and journal cards are equal-size at ${width}px`, async ({ browser }) => {
  285 |       const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  286 |       const page = await ctx.newPage();
  287 |       for (const [path, id] of [['/projects', 'project-card'], ['/journal', 'post-card']]) {
  288 |         await page.goto(path);
  289 |         const sizes = await page.getByTestId(id).evaluateAll((els) =>
  290 |           [...new Set(els.map((e) => { const r = (e.firstElementChild as HTMLElement).getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }))]);
  291 |         expect(sizes, `${path} at ${width}px`).toHaveLength(1);
  292 |       }
  293 |       await ctx.close();
```
