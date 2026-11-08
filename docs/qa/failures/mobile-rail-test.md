# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: media-refinement.spec.ts >> hero and selected-work composition at 390px
- Location: tests\e2e\media-refinement.spec.ts:4:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('region', { name: 'Featured projects' }).getByRole('button', { name: /^Halden House/ })
    - locator resolved to <button type="button" class="flex flex-col items-center px-2 py-2 text-center transition-opacity duration-500 opacity-60 hover:opacity-90">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    70 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Skip to content" [ref=e3] [cursor=pointer]:
      - /url: "#main"
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "Ostrel Atelier, home" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [aria-hidden] [ref=e7]:
            - generic [ref=e9]: Ostrel
        - button "Menu" [ref=e11]
    - main [ref=e16]:
      - region "Featured projects" [ref=e17]:
        - group "3 of 5" [ref=e20]:
          - paragraph [ref=e21]: "Slide 3 of 5: Saline Pavilion, Cultural, 2026"
          - heading "Ostrel Atelier — architecture and interiors (fictional studio)" [level=1] [ref=e22]
          - generic [ref=e23]:
            - generic [ref=e24]:
              - paragraph [ref=e25]: 03 — Cultural · Aveiro lagoon, Portugal
              - paragraph [ref=e26]: Saline Pavilion
            - generic [ref=e27]:
              - paragraph [ref=e28]: A white exhibition hall that floats above the salt pans like a folded sheet of paper.
              - link "View Saline Pavilion" [ref=e29] [cursor=pointer]:
                - /url: /projects/saline-pavilion
        - generic [ref=e33]:
          - list "Choose a project" [ref=e35]:
            - listitem [ref=e36]:
              - button "Halden House 2025 | Residential" [ref=e37]:
                - generic [ref=e38]: Halden House
                - generic [ref=e39]: 2025 | Residential
            - listitem [ref=e40]:
              - button "Lumen Rooms 2024 | Hospitality" [ref=e41]:
                - generic [ref=e42]: Lumen Rooms
                - generic [ref=e43]: 2024 | Hospitality
            - listitem [ref=e44]:
              - button "Saline Pavilion 2026 | Cultural" [ref=e45]:
                - generic [ref=e46]: Saline Pavilion
                - generic [ref=e47]: 2026 | Cultural
            - listitem [ref=e48]:
              - button "Casa Velo 2023 | Residential" [ref=e49]:
                - generic [ref=e50]: Casa Velo
                - generic [ref=e51]: 2023 | Residential
            - listitem [ref=e52]:
              - button "Northfold Works 2024 | Workplace" [ref=e53]:
                - generic [ref=e54]: Northfold Works
                - generic [ref=e55]: 2024 | Workplace
          - generic [ref=e56]:
            - generic [aria-hidden] [ref=e57]: 03 / 05
            - generic [ref=e59]:
              - button "Previous project" [ref=e60]
              - button "Next project" [ref=e63]
              - button "Play automatic slideshow" [active] [ref=e66]
      - region [ref=e69]:
        - generic [ref=e70]:
          - paragraph [ref=e71]:
            - generic [ref=e72]: (01)
            - generic [ref=e73]: The studio
          - generic [ref=e74]:
            - heading "Quiet buildings, carefully made." [level=2] [ref=e76]
            - generic [ref=e77]:
              - paragraph [ref=e79]: Ostrel is a small practice for architecture and interiors. We work slowly, with models and daylight, on houses, hotels and rooms for culture and work.
              - generic [ref=e80]:
                - generic [ref=e81]:
                  - generic [ref=e82]:
                    - term [ref=e83]: Founded
                    - definition [ref=e84]: 2014 (fictional)
                  - generic [ref=e85]:
                    - term [ref=e86]: Studios
                    - definition [ref=e87]: Lisbon · Copenhagen
                  - generic [ref=e88]:
                    - term [ref=e89]: Disciplines
                    - definition [ref=e90]: Architecture, interiors, reuse, objects
                  - generic [ref=e91]:
                    - term [ref=e92]: People
                    - definition [ref=e93]: 14 architects, designers and makers
                - link "About the studio" [ref=e94] [cursor=pointer]:
                  - /url: /studio
      - region [ref=e98]:
        - generic [ref=e99]:
          - paragraph [ref=e100]: (02) Selected work
          - heading "Places to belong." [level=2] [ref=e101]
          - paragraph [ref=e102]: Two houses and a city residence. Three fictional studies in shelter, light and the spaces between.
          - list [ref=e103]:
            - listitem [ref=e104]:
              - generic [ref=e105]:
                - img "Pale travertine garden villa with oak-framed glazing among olive trees" [ref=e107]
                - generic [ref=e108]:
                  - generic [ref=e109]:
                    - paragraph [ref=e110]: 01 — Residential · Fictional concept
                    - heading "Olive Court House" [level=3] [ref=e111]
                  - generic [ref=e112]:
                    - paragraph [ref=e113]: A quiet garden villa in pale travertine, arranged around shade and olive trees.
                    - link "Explore Olive Court House" [ref=e114] [cursor=pointer]:
                      - /url: /projects/olive-court-house
            - listitem [ref=e118]:
              - generic [ref=e119]:
                - img "Curved ivory coastal villa with an arched passage and a sea-facing limestone terrace" [ref=e121]
                - generic [ref=e122]:
                  - generic [ref=e123]:
                    - paragraph [ref=e124]: 02 — Residential · Fictional concept
                    - heading "Mar de Cal" [level=3] [ref=e125]
                  - generic [ref=e126]:
                    - paragraph [ref=e127]: Curved lime-plaster walls frame the sea from a sheltered stone terrace.
                    - link "Explore Mar de Cal" [ref=e128] [cursor=pointer]:
                      - /url: /projects/mar-de-cal
            - listitem [ref=e132]:
              - generic [ref=e133]:
                - img "Contemporary limestone apartment building with deep planted balconies and timber screens" [ref=e135]
                - generic [ref=e136]:
                  - generic [ref=e137]:
                    - paragraph [ref=e138]: 03 — Residential · Fictional concept
                    - heading "Mira Residence" [level=3] [ref=e139]
                  - generic [ref=e140]:
                    - paragraph [ref=e141]: A limestone apartment building with deep planted balconies and generous shared thresholds.
                    - link "Explore Mira Residence" [ref=e142] [cursor=pointer]:
                      - /url: /projects/mira-residence
      - region [ref=e146]:
        - generic [ref=e147]:
          - generic [ref=e148]:
            - paragraph [ref=e149]:
              - generic [ref=e150]: (03)
              - generic [ref=e151]: Services
            - heading "What we draw" [level=2] [ref=e152]
          - link "All services" [ref=e153] [cursor=pointer]:
            - /url: /services
        - list [ref=e157]:
          - listitem [ref=e158]:
            - link "01 Architecture" [ref=e159] [cursor=pointer]:
              - /url: /services#architecture
              - generic [ref=e160]: "01"
              - generic [ref=e161]: Architecture
          - listitem [ref=e165]:
            - link "02 Interior architecture" [ref=e166] [cursor=pointer]:
              - /url: /services#interiors
              - generic [ref=e167]: "02"
              - generic [ref=e168]: Interior architecture
          - listitem [ref=e172]:
            - link "03 Renovation & reuse" [ref=e173] [cursor=pointer]:
              - /url: /services#renovation
              - generic [ref=e174]: "03"
              - generic [ref=e175]: Renovation & reuse
          - listitem [ref=e179]:
            - link "04 Hospitality" [ref=e180] [cursor=pointer]:
              - /url: /services#hospitality
              - generic [ref=e181]: "04"
              - generic [ref=e182]: Hospitality
          - listitem [ref=e186]:
            - link "05 Furniture & objects" [ref=e187] [cursor=pointer]:
              - /url: /services#objects
              - generic [ref=e188]: "05"
              - generic [ref=e189]: Furniture & objects
      - region [ref=e194]:
        - generic [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]:
              - paragraph [ref=e198]: Anatomy of a home · Fictional design study
              - heading "From landscape to living." [level=2] [ref=e199]
            - paragraph [ref=e200]: Begin with the home. Scroll to explore the layers that give it shape.
          - img "Low plaster home with oak screens and a stone terrace in an olive grove" [ref=e203]
          - generic [ref=e204]:
            - generic [ref=e205]:
              - paragraph [ref=e206]: 01 / 07 · Schematic concept
              - heading "The complete home" [level=3] [ref=e207]
              - paragraph [ref=e208]: A sheltered terrace, an olive grove, and rooms drawn around the light.
            - navigation "Home study chapters" [ref=e209]:
              - button "The complete home" [ref=e210]: "1"
              - button "Ground" [ref=e211]: "2"
              - button "Walls" [ref=e212]: "3"
              - button "Openings" [ref=e213]: "4"
              - button "Roof" [ref=e214]: "5"
              - button "Structure" [ref=e215]: "6"
              - button "A place to live" [ref=e216]: "7"
      - region [ref=e217]:
        - generic [ref=e220]:
          - img "Empty room opening onto a misty landscape through a full-height window" [ref=e223]
          - generic [ref=e227]:
            - paragraph [ref=e228]: (04) Philosophy
            - heading "We begin with light, then weight, then time. Everything else is a consequence." [level=2] [ref=e229]:
              - generic [ref=e230]: We
              - generic [ref=e231]: begin
              - generic [ref=e232]: with
              - generic [ref=e233]: light,
              - generic [ref=e234]: then
              - generic [ref=e235]: weight,
              - generic [ref=e236]: then
              - generic [ref=e237]: time.
              - generic [ref=e238]: Everything
              - generic [ref=e239]: else
              - generic [ref=e240]: is
              - generic [ref=e241]: a
              - generic [ref=e242]: consequence.
          - list
      - region [ref=e243]:
        - generic [ref=e244]:
          - generic [ref=e245]:
            - paragraph [ref=e246]:
              - generic [ref=e247]: (05)
              - generic [ref=e248]: Index
            - heading [level=2] [ref=e249]:
              - text: More from the studio
              - superscript [ref=e250]: (3)
          - link "See all projects" [ref=e251] [cursor=pointer]:
            - /url: /projects
        - list [ref=e255]:
          - listitem [ref=e256]:
            - link "Light living room with a low sofa, a round coffee table and soft daylight 01 Mire Apartment 148 m² Interiors · Lisbon, Portugal · 2025" [ref=e257] [cursor=pointer]:
              - /url: /projects/mire-apartment
              - generic [ref=e258]:
                - img "Light living room with a low sofa, a round coffee table and soft daylight" [ref=e259]
                - generic [ref=e260]: "01"
              - generic [ref=e261]:
                - heading "Mire Apartment" [level=3] [ref=e262]
                - generic [ref=e263]: 148 m²
              - paragraph [ref=e264]: Interiors · Lisbon, Portugal · 2025
          - listitem [ref=e265]:
            - link "Concrete bedroom with a low bed and a large dark photograph on the wall 02 Ombra Townhouse 210 m² Interiors · Copenhagen, Denmark · 2026" [ref=e266] [cursor=pointer]:
              - /url: /projects/ombra-townhouse
              - generic [ref=e267]:
                - img "Concrete bedroom with a low bed and a large dark photograph on the wall" [ref=e268]
                - generic [ref=e269]: "02"
              - generic [ref=e270]:
                - heading "Ombra Townhouse" [level=3] [ref=e271]
                - generic [ref=e272]: 210 m²
              - paragraph [ref=e273]: Interiors · Copenhagen, Denmark · 2026
          - listitem [ref=e274]:
            - link "Loft with exposed brick, a steel stair, a living wall and low seating 03 Kiln Yard Studios 640 m² Workplace · Braga, Portugal · 2022" [ref=e275] [cursor=pointer]:
              - /url: /projects/kiln-yard-studios
              - generic [ref=e276]:
                - img "Loft with exposed brick, a steel stair, a living wall and low seating" [ref=e277]
                - generic [ref=e278]: "03"
              - generic [ref=e279]:
                - heading "Kiln Yard Studios" [level=3] [ref=e280]
                - generic [ref=e281]: 640 m²
              - paragraph [ref=e282]: Workplace · Braga, Portugal · 2022
      - region [ref=e283]:
        - generic [ref=e284]:
          - generic [ref=e285]:
            - paragraph [ref=e286]:
              - generic [ref=e287]: (06)
              - generic [ref=e288]: Journal
            - heading "Notes from the bench" [level=2] [ref=e289]
          - link "All entries" [ref=e290] [cursor=pointer]:
            - /url: /journal
        - list [ref=e294]:
          - listitem [ref=e295]:
            - link "Spiral staircase in black and white with a single light at the top Essay 18 Sept 2026 The stair as a room Why we draw staircases first, and why the best ones are wide enough to sit on." [ref=e296] [cursor=pointer]:
              - /url: /journal/the-stair-as-a-room
              - img "Spiral staircase in black and white with a single light at the top" [ref=e298]
              - paragraph [ref=e299]:
                - generic [ref=e300]: Essay
                - time [ref=e301]: 18 Sept 2026
              - heading "The stair as a room" [level=3] [ref=e302]
              - paragraph [ref=e303]: Why we draw staircases first, and why the best ones are wide enough to sit on.
          - listitem [ref=e304]:
            - link "Two cast spheres resting on a smooth mineral floor Material 02 Jul 2026 Notes on lime Lime plaster breathes, repairs itself and ages with grace. A short field guide from our sites." [ref=e305] [cursor=pointer]:
              - /url: /journal/notes-on-lime
              - img "Two cast spheres resting on a smooth mineral floor" [ref=e307]
              - paragraph [ref=e308]:
                - generic [ref=e309]: Material
                - time [ref=e310]: 02 Jul 2026
              - heading "Notes on lime" [level=3] [ref=e311]
              - paragraph [ref=e312]: Lime plaster breathes, repairs itself and ages with grace. A short field guide from our sites.
          - listitem [ref=e313]:
            - link "Blinds filtering sunlight into a long corridor Process 21 Apr 2026 Drawing with daylight How a year of sun studies decides where a single window goes." [ref=e314] [cursor=pointer]:
              - /url: /journal/drawing-with-daylight
              - img "Blinds filtering sunlight into a long corridor" [ref=e316]
              - paragraph [ref=e317]:
                - generic [ref=e318]: Process
                - time [ref=e319]: 21 Apr 2026
              - heading "Drawing with daylight" [level=3] [ref=e320]
              - paragraph [ref=e321]: How a year of sun studies decides where a single window goes.
    - contentinfo [ref=e322]:
      - generic [ref=e323]:
        - generic [ref=e324]:
          - paragraph [ref=e325]: (Next) — A conversation
          - generic [ref=e326]:
            - paragraph [ref=e327]: Have a site, a room or a question? Start with a brief.
            - link "Start a project" [ref=e328] [cursor=pointer]:
              - /url: /contact
        - generic [ref=e332]:
          - navigation "Footer" [ref=e333]:
            - heading "Index" [level=2] [ref=e334]
            - list [ref=e335]:
              - listitem [ref=e336]:
                - link "Home" [ref=e337] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e338]:
                - link "Projects" [ref=e339] [cursor=pointer]:
                  - /url: /projects
              - listitem [ref=e340]:
                - link "Studio" [ref=e341] [cursor=pointer]:
                  - /url: /studio
              - listitem [ref=e342]:
                - link "Services" [ref=e343] [cursor=pointer]:
                  - /url: /services
              - listitem [ref=e344]:
                - link "Philosophy" [ref=e345] [cursor=pointer]:
                  - /url: /philosophy
              - listitem [ref=e346]:
                - link "Journal" [ref=e347] [cursor=pointer]:
                  - /url: /journal
              - listitem [ref=e348]:
                - link "Start a project" [ref=e349] [cursor=pointer]:
                  - /url: /contact
          - generic [ref=e350]:
            - heading "Studio" [level=2] [ref=e351]
            - generic [ref=e352]:
              - generic [ref=e353]: Studio 4, Pátio da Cal (fictional)
              - generic [ref=e354]: Lisbon, Portugal
              - link "hello@ostrel.example" [ref=e355] [cursor=pointer]:
                - /url: mailto:hello@ostrel.example
            - paragraph [ref=e356]: Mon–Fri, 09:00–18:00 · Visits by appointment
          - complementary "Contact card" [ref=e357]:
            - region [ref=e358]:
              - generic [ref=e364]:
                - paragraph [ref=e365]: A conversation starts here
                - paragraph [ref=e366]: No. 02
              - heading "Contact us" [level=2] [ref=e367]
              - paragraph [ref=e368]: A site, a room, an idea. Every project begins with a few words.
              - generic [ref=e369]:
                - paragraph [ref=e370]: Email
                - paragraph [ref=e371]: hello@ostrel.example
                - paragraph [ref=e372]: Find the studio
                - paragraph [ref=e373]: Lisbon · Copenhagen
                - paragraph [ref=e374]: Monday–Friday, 09:00–18:00Visits by appointment
              - paragraph [ref=e376]: Ostrel Atelier is a fictional studio — a VIZAM concept project. Contact details are illustrative; this card does not send or collect messages. Imagery includes stock and AI-generated concepts.
              - generic [ref=e377]:
                - generic [ref=e378]: OA / VZM
                - generic [ref=e379]: Let’s talk
                - generic [ref=e380]: "2026"
        - paragraph [aria-hidden] [ref=e381]: Ostrel
        - generic [ref=e382]:
          - paragraph [ref=e383]: © 2026 Ostrel Atelier
          - paragraph [ref=e384]: VIZAM concept project — fictional studio
          - paragraph [ref=e385]: Not a real practice · Demo forms only
  - alert [ref=e386]
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
> 10 |     await hero.getByRole('button', { name: /^Halden House/ }).click();
     |                                                               ^ Error: locator.click: Test timeout of 60000ms exceeded.
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
  23 |     await expect(page.locator('header').first()).toBeInViewport();
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
