# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> accessibility (axe, WCAG 2.x A/AA) >> axe: /
- Location: tests\e2e\site.spec.ts:300:9

# Error details

```
Error: color-contrast (serious): .items-start.gap-1[href$="projects"] > .mt-\[-0\.15rem\].text-\[0\.5625rem\].opacity-60 | .items-start.gap-1[href$="studio"] > .mt-\[-0\.15rem\].text-\[0\.5625rem\].opacity-60 | .items-start.gap-1[href$="services"] > .mt-\[-0\.15rem\].text-\[0\.5625rem\].opacity-60

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "color-contrast (serious): .items-start.gap-1[href$=\"projects\"] > .mt-\\[-0\\.15rem\\].text-\\[0\\.5625rem\\].opacity-60 | .items-start.gap-1[href$=\"studio\"] > .mt-\\[-0\\.15rem\\].text-\\[0\\.5625rem\\].opacity-60 | .items-start.gap-1[href$=\"services\"] > .mt-\\[-0\\.15rem\\].text-\\[0\\.5625rem\\].opacity-60",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "Skip to content" [ref=e3] [cursor=pointer]:
      - /url: "#main"
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "Ostrel Atelier, home" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [aria-hidden] [ref=e7]:
            - generic [ref=e9]: Ostrel
          - generic [ref=e10]: Atelier
        - navigation "Primary" [ref=e11]:
          - list [ref=e12]:
            - listitem [ref=e13]:
              - link "01 Projects" [ref=e14] [cursor=pointer]:
                - /url: /projects
                - generic [ref=e15]: "01"
                - generic [ref=e16]: Projects
            - listitem [ref=e17]:
              - link "02 Studio" [ref=e18] [cursor=pointer]:
                - /url: /studio
                - generic [ref=e19]: "02"
                - generic [ref=e20]: Studio
            - listitem [ref=e21]:
              - link "03 Services" [ref=e22] [cursor=pointer]:
                - /url: /services
                - generic [ref=e23]: "03"
                - generic [ref=e24]: Services
            - listitem [ref=e25]:
              - link "04 Philosophy" [ref=e26] [cursor=pointer]:
                - /url: /philosophy
                - generic [ref=e27]: "04"
                - generic [ref=e28]: Philosophy
            - listitem [ref=e29]:
              - link "05 Journal" [ref=e30] [cursor=pointer]:
                - /url: /journal
                - generic [ref=e31]: "05"
                - generic [ref=e32]: Journal
        - generic [ref=e33]:
          - link "Start a project" [ref=e34] [cursor=pointer]:
            - /url: /contact
          - button "Menu" [ref=e35]
    - main [ref=e40]:
      - region "Featured projects" [ref=e41]:
        - group "1 of 5" [ref=e45]:
          - paragraph [ref=e46]: "Slide 1 of 5: Halden House, Residential, 2025"
          - heading "Ostrel Atelier — architecture and interiors (fictional studio)" [level=1] [ref=e47]
          - generic [ref=e48]:
            - generic [ref=e49]:
              - paragraph [ref=e50]: 01 — Residential · Sintra hills, Portugal
              - paragraph [ref=e51]: Halden House
            - generic [ref=e52]:
              - paragraph [ref=e53]: A family house of stacked concrete volumes that opens to a single sheltered lawn.
              - link "View Halden House" [ref=e54] [cursor=pointer]:
                - /url: /projects/halden-house
        - generic [ref=e58]:
          - list "Choose a project" [ref=e60]:
            - listitem [ref=e61]:
              - button "Halden House 2025 | Residential" [ref=e62]:
                - generic [ref=e63]: Halden House
                - generic [ref=e64]: 2025 | Residential
            - listitem [ref=e65]:
              - button "Lumen Rooms 2024 | Hospitality" [ref=e66]:
                - generic [ref=e67]: Lumen Rooms
                - generic [ref=e68]: 2024 | Hospitality
            - listitem [ref=e69]:
              - button "Saline Pavilion 2026 | Cultural" [ref=e70]:
                - generic [ref=e71]: Saline Pavilion
                - generic [ref=e72]: 2026 | Cultural
            - listitem [ref=e73]:
              - button "Casa Velo 2023 | Residential" [ref=e74]:
                - generic [ref=e75]: Casa Velo
                - generic [ref=e76]: 2023 | Residential
            - listitem [ref=e77]:
              - button "Northfold Works 2024 | Workplace" [ref=e78]:
                - generic [ref=e79]: Northfold Works
                - generic [ref=e80]: 2024 | Workplace
          - generic [ref=e81]:
            - generic [aria-hidden] [ref=e82]: 01 / 05
            - generic [ref=e84]:
              - button "Previous project" [ref=e85]
              - button "Next project" [ref=e88]
              - button "Play automatic slideshow" [ref=e91]
      - region [ref=e94]:
        - generic [ref=e95]:
          - paragraph [ref=e96]:
            - generic [ref=e97]: (01)
            - generic [ref=e98]: The studio
          - generic [ref=e99]:
            - heading "Quiet buildings, carefully made." [level=2] [ref=e101]
            - generic [ref=e102]:
              - paragraph [ref=e104]: Ostrel is a small practice for architecture and interiors. We work slowly, with models and daylight, on houses, hotels and rooms for culture and work.
              - generic [ref=e105]:
                - generic [ref=e106]:
                  - generic [ref=e107]:
                    - term [ref=e108]: Founded
                    - definition [ref=e109]: 2014 (fictional)
                  - generic [ref=e110]:
                    - term [ref=e111]: Studios
                    - definition [ref=e112]: Lisbon · Copenhagen
                  - generic [ref=e113]:
                    - term [ref=e114]: Disciplines
                    - definition [ref=e115]: Architecture, interiors, reuse, objects
                  - generic [ref=e116]:
                    - term [ref=e117]: People
                    - definition [ref=e118]: 14 architects, designers and makers
                - link "About the studio" [ref=e119] [cursor=pointer]:
                  - /url: /studio
      - region [ref=e123]:
        - generic [ref=e124]:
          - paragraph [ref=e125]: (02) Selected work
          - heading "Places to belong." [level=2] [ref=e126]
          - paragraph [ref=e127]: Two houses and a city residence. Three fictional studies in shelter, light and the spaces between.
          - list [ref=e128]:
            - listitem [ref=e129]:
              - generic [ref=e130]:
                - img "Pale travertine garden villa with oak-framed glazing among olive trees" [ref=e132]
                - generic [ref=e133]:
                  - generic [ref=e134]:
                    - paragraph [ref=e135]: 01 — Residential · Fictional concept
                    - heading "Olive Court House" [level=3] [ref=e136]
                  - generic [ref=e137]:
                    - paragraph [ref=e138]: A quiet garden villa in pale travertine, arranged around shade and olive trees.
                    - link "Explore Olive Court House" [ref=e139] [cursor=pointer]:
                      - /url: /projects/olive-court-house
            - listitem [ref=e143]:
              - generic [ref=e144]:
                - img "Curved ivory coastal villa with an arched passage and a sea-facing limestone terrace" [ref=e146]
                - generic [ref=e147]:
                  - generic [ref=e148]:
                    - paragraph [ref=e149]: 02 — Residential · Fictional concept
                    - heading "Mar de Cal" [level=3] [ref=e150]
                  - generic [ref=e151]:
                    - paragraph [ref=e152]: Curved lime-plaster walls frame the sea from a sheltered stone terrace.
                    - link "Explore Mar de Cal" [ref=e153] [cursor=pointer]:
                      - /url: /projects/mar-de-cal
            - listitem [ref=e157]:
              - generic [ref=e158]:
                - img "Contemporary limestone apartment building with deep planted balconies and timber screens" [ref=e160]
                - generic [ref=e161]:
                  - generic [ref=e162]:
                    - paragraph [ref=e163]: 03 — Residential · Fictional concept
                    - heading "Mira Residence" [level=3] [ref=e164]
                  - generic [ref=e165]:
                    - paragraph [ref=e166]: A limestone apartment building with deep planted balconies and generous shared thresholds.
                    - link "Explore Mira Residence" [ref=e167] [cursor=pointer]:
                      - /url: /projects/mira-residence
      - region [ref=e171]:
        - generic [ref=e172]:
          - generic [ref=e173]:
            - paragraph [ref=e174]:
              - generic [ref=e175]: (03)
              - generic [ref=e176]: Services
            - heading "What we draw" [level=2] [ref=e177]
          - link "All services" [ref=e178] [cursor=pointer]:
            - /url: /services
        - list [ref=e182]:
          - listitem [ref=e183]:
            - link "01 Architecture New buildings and extensions, from feasibility to the last site visit." [ref=e184] [cursor=pointer]:
              - /url: /services#architecture
              - generic [ref=e185]: "01"
              - generic [ref=e186]: Architecture
              - generic [ref=e187]: New buildings and extensions, from feasibility to the last site visit.
          - listitem [ref=e191]:
            - 'link "02 Interior architecture Rooms planned from the inside out: joinery, lighting, surfaces and the way you move." [ref=e192] [cursor=pointer]':
              - /url: /services#interiors
              - generic [ref=e193]: "02"
              - generic [ref=e194]: Interior architecture
              - generic [ref=e195]: "Rooms planned from the inside out: joinery, lighting, surfaces and the way you move."
          - listitem [ref=e199]:
            - 'link "03 Renovation & reuse Careful work with existing buildings: keep what is good, repair what is honest." [ref=e200] [cursor=pointer]':
              - /url: /services#renovation
              - generic [ref=e201]: "03"
              - generic [ref=e202]: Renovation & reuse
              - generic [ref=e203]: "Careful work with existing buildings: keep what is good, repair what is honest."
          - listitem [ref=e207]:
            - link "04 Hospitality Small hotels and restaurants where architecture is part of the welcome." [ref=e208] [cursor=pointer]:
              - /url: /services#hospitality
              - generic [ref=e209]: "04"
              - generic [ref=e210]: Hospitality
              - generic [ref=e211]: Small hotels and restaurants where architecture is part of the welcome.
          - listitem [ref=e215]:
            - link "05 Furniture & objects One-off pieces designed with makers when nothing on the market fits the room." [ref=e216] [cursor=pointer]:
              - /url: /services#objects
              - generic [ref=e217]: "05"
              - generic [ref=e218]: Furniture & objects
              - generic [ref=e219]: One-off pieces designed with makers when nothing on the market fits the room.
      - region [ref=e223]:
        - generic [ref=e224]:
          - generic [ref=e225]:
            - generic [ref=e226]:
              - paragraph [ref=e227]: Anatomy of a home · Fictional design study
              - heading "From landscape to living." [level=2] [ref=e228]
            - paragraph [ref=e229]: Begin with the home. Scroll to explore the layers that give it shape.
          - img "Low plaster home with oak screens and a stone terrace in an olive grove" [ref=e232]
          - generic [ref=e234]:
            - paragraph [ref=e235]: 01 / 07 · Schematic concept
            - heading "The complete home" [level=3] [ref=e236]
            - paragraph [ref=e237]: A sheltered terrace, an olive grove, and rooms drawn around the light.
          - list [ref=e238]:
            - listitem [ref=e239]:
              - heading "Ground" [level=3] [ref=e240]
              - paragraph [ref=e241]: A stone platform establishes the threshold between landscape and home.
            - listitem [ref=e242]:
              - heading "Walls" [level=3] [ref=e243]
              - paragraph [ref=e244]: Solid planes define shelter while keeping the garden in view.
            - listitem [ref=e245]:
              - heading "Openings" [level=3] [ref=e246]
              - paragraph [ref=e247]: Deep reveals temper daylight and frame the long horizon.
            - listitem [ref=e248]:
              - heading "Roof" [level=3] [ref=e249]
              - paragraph [ref=e250]: A light horizontal canopy shades the terrace and the glazing.
            - listitem [ref=e251]:
              - heading "Structure" [level=3] [ref=e252]
              - paragraph [ref=e253]: The parts separate to show how mass, span and light work together.
            - listitem [ref=e254]:
              - heading "A place to live" [level=3] [ref=e255]
              - paragraph [ref=e256]: "The layers return to one whole: a quiet home, carefully made."
      - region [ref=e257]:
        - generic [ref=e259]:
          - img "Empty room opening onto a misty landscape through a full-height window" [ref=e262]
          - generic [ref=e264]:
            - paragraph [ref=e265]: (04) Philosophy
            - heading "We begin with light, then weight, then time. Everything else is a consequence." [level=2] [ref=e266]:
              - generic [ref=e267]: We
              - generic [ref=e268]: begin
              - generic [ref=e269]: with
              - generic [ref=e270]: light,
              - generic [ref=e271]: then
              - generic [ref=e272]: weight,
              - generic [ref=e273]: then
              - generic [ref=e274]: time.
              - generic [ref=e275]: Everything
              - generic [ref=e276]: else
              - generic [ref=e277]: is
              - generic [ref=e278]: a
              - generic [ref=e279]: consequence.
          - list [ref=e280]:
            - listitem [ref=e281]:
              - img "Sunlight falling through a tall window grid onto a curved white wall" [ref=e283]
              - generic [ref=e284]:
                - paragraph [ref=e285]: Principle 01
                - heading "Light before form" [level=3] [ref=e286]
              - paragraph [ref=e287]: We decide where the light falls before we decide what the building looks like.
            - listitem [ref=e288]:
              - img "Deep masonry window reveal and stone window seat catching daylight" [ref=e290]
              - generic [ref=e291]:
                - paragraph [ref=e292]: Principle 02
                - heading "Weight is a comfort" [level=3] [ref=e293]
              - paragraph [ref=e294]: Thick walls, deep reveals and heavy materials make rooms that feel safe and stay cool.
            - listitem [ref=e295]:
              - img "Oak stair landing with a generous built-in window seat" [ref=e297]
              - generic [ref=e298]:
                - paragraph [ref=e299]: Principle 03
                - heading "Thresholds are rooms" [level=3] [ref=e300]
              - paragraph [ref=e301]: Stairs, porches and window seats are where life happens. We give them space.
            - listitem [ref=e302]:
              - img "Paper screen with a dark timber grid" [ref=e304]
              - generic [ref=e305]:
                - paragraph [ref=e306]: Principle 04
                - heading "Made to age" [level=3] [ref=e307]
              - paragraph [ref=e308]: Materials that patinate, wear and can be repaired. A building should look better in twenty years.
      - region [ref=e309]:
        - generic [ref=e310]:
          - generic [ref=e311]:
            - paragraph [ref=e312]:
              - generic [ref=e313]: (05)
              - generic [ref=e314]: Index
            - heading [level=2] [ref=e315]:
              - text: More from the studio
              - superscript [ref=e316]: (3)
          - link "See all projects" [ref=e317] [cursor=pointer]:
            - /url: /projects
        - list [ref=e321]:
          - listitem [ref=e322]:
            - link "Light living room with a low sofa, a round coffee table and soft daylight 01 Mire Apartment 148 m² Interiors · Lisbon, Portugal · 2025" [ref=e323] [cursor=pointer]:
              - /url: /projects/mire-apartment
              - generic [ref=e324]:
                - img "Light living room with a low sofa, a round coffee table and soft daylight" [ref=e325]
                - generic [ref=e326]: "01"
              - generic [ref=e327]:
                - heading "Mire Apartment" [level=3] [ref=e328]
                - generic [ref=e329]: 148 m²
              - paragraph [ref=e330]: Interiors · Lisbon, Portugal · 2025
          - listitem [ref=e331]:
            - link "Concrete bedroom with a low bed and a large dark photograph on the wall 02 Ombra Townhouse 210 m² Interiors · Copenhagen, Denmark · 2026" [ref=e332] [cursor=pointer]:
              - /url: /projects/ombra-townhouse
              - generic [ref=e333]:
                - img "Concrete bedroom with a low bed and a large dark photograph on the wall" [ref=e334]
                - generic [ref=e335]: "02"
              - generic [ref=e336]:
                - heading "Ombra Townhouse" [level=3] [ref=e337]
                - generic [ref=e338]: 210 m²
              - paragraph [ref=e339]: Interiors · Copenhagen, Denmark · 2026
          - listitem [ref=e340]:
            - link "Loft with exposed brick, a steel stair, a living wall and low seating 03 Kiln Yard Studios 640 m² Workplace · Braga, Portugal · 2022" [ref=e341] [cursor=pointer]:
              - /url: /projects/kiln-yard-studios
              - generic [ref=e342]:
                - img "Loft with exposed brick, a steel stair, a living wall and low seating" [ref=e343]
                - generic [ref=e344]: "03"
              - generic [ref=e345]:
                - heading "Kiln Yard Studios" [level=3] [ref=e346]
                - generic [ref=e347]: 640 m²
              - paragraph [ref=e348]: Workplace · Braga, Portugal · 2022
      - region [ref=e349]:
        - generic [ref=e350]:
          - generic [ref=e351]:
            - paragraph [ref=e352]:
              - generic [ref=e353]: (06)
              - generic [ref=e354]: Journal
            - heading "Notes from the bench" [level=2] [ref=e355]
          - link "All entries" [ref=e356] [cursor=pointer]:
            - /url: /journal
        - list [ref=e360]:
          - listitem [ref=e361]:
            - link "Spiral staircase in black and white with a single light at the top Essay 18 Sept 2026 The stair as a room Why we draw staircases first, and why the best ones are wide enough to sit on." [ref=e362] [cursor=pointer]:
              - /url: /journal/the-stair-as-a-room
              - img "Spiral staircase in black and white with a single light at the top" [ref=e364]
              - paragraph [ref=e365]:
                - generic [ref=e366]: Essay
                - time [ref=e367]: 18 Sept 2026
              - heading "The stair as a room" [level=3] [ref=e368]
              - paragraph [ref=e369]: Why we draw staircases first, and why the best ones are wide enough to sit on.
          - listitem [ref=e370]:
            - link "Two cast spheres resting on a smooth mineral floor Material 02 Jul 2026 Notes on lime Lime plaster breathes, repairs itself and ages with grace. A short field guide from our sites." [ref=e371] [cursor=pointer]:
              - /url: /journal/notes-on-lime
              - img "Two cast spheres resting on a smooth mineral floor" [ref=e373]
              - paragraph [ref=e374]:
                - generic [ref=e375]: Material
                - time [ref=e376]: 02 Jul 2026
              - heading "Notes on lime" [level=3] [ref=e377]
              - paragraph [ref=e378]: Lime plaster breathes, repairs itself and ages with grace. A short field guide from our sites.
          - listitem [ref=e379]:
            - link "Blinds filtering sunlight into a long corridor Process 21 Apr 2026 Drawing with daylight How a year of sun studies decides where a single window goes." [ref=e380] [cursor=pointer]:
              - /url: /journal/drawing-with-daylight
              - img "Blinds filtering sunlight into a long corridor" [ref=e382]
              - paragraph [ref=e383]:
                - generic [ref=e384]: Process
                - time [ref=e385]: 21 Apr 2026
              - heading "Drawing with daylight" [level=3] [ref=e386]
              - paragraph [ref=e387]: How a year of sun studies decides where a single window goes.
    - contentinfo [ref=e388]:
      - generic [ref=e389]:
        - generic [ref=e390]:
          - paragraph [ref=e391]: (Next) — A conversation
          - generic [ref=e392]:
            - paragraph [ref=e393]: Have a site, a room or a question? Start with a brief.
            - link "Start a project" [ref=e394] [cursor=pointer]:
              - /url: /contact
        - generic [ref=e398]:
          - navigation "Footer" [ref=e399]:
            - heading "Index" [level=2] [ref=e400]
            - list [ref=e401]:
              - listitem [ref=e402]:
                - link "Home" [ref=e403] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e404]:
                - link "Projects" [ref=e405] [cursor=pointer]:
                  - /url: /projects
              - listitem [ref=e406]:
                - link "Studio" [ref=e407] [cursor=pointer]:
                  - /url: /studio
              - listitem [ref=e408]:
                - link "Services" [ref=e409] [cursor=pointer]:
                  - /url: /services
              - listitem [ref=e410]:
                - link "Philosophy" [ref=e411] [cursor=pointer]:
                  - /url: /philosophy
              - listitem [ref=e412]:
                - link "Journal" [ref=e413] [cursor=pointer]:
                  - /url: /journal
              - listitem [ref=e414]:
                - link "Start a project" [ref=e415] [cursor=pointer]:
                  - /url: /contact
          - generic [ref=e416]:
            - heading "Studio" [level=2] [ref=e417]
            - generic [ref=e418]:
              - generic [ref=e419]: Studio 4, Pátio da Cal (fictional)
              - generic [ref=e420]: Lisbon, Portugal
              - link "hello@ostrel.example" [ref=e421] [cursor=pointer]:
                - /url: mailto:hello@ostrel.example
            - paragraph [ref=e422]: Mon–Fri, 09:00–18:00 · Visits by appointment
          - complementary "Contact card" [ref=e423]:
            - region [ref=e424]:
              - generic [ref=e430]:
                - paragraph [ref=e431]: A conversation starts here
                - paragraph [ref=e432]: No. 02
              - heading "Contact us" [level=2] [ref=e433]
              - paragraph [ref=e434]: A site, a room, an idea. Every project begins with a few words.
              - generic [ref=e435]:
                - paragraph [ref=e436]: Email
                - paragraph [ref=e437]: hello@ostrel.example
                - paragraph [ref=e438]: Find the studio
                - paragraph [ref=e439]: Lisbon · Copenhagen
                - paragraph [ref=e440]: Monday–Friday, 09:00–18:00Visits by appointment
              - paragraph [ref=e442]: Ostrel Atelier is a fictional studio — a VIZAM concept project. Contact details are illustrative; this card does not send or collect messages. Imagery includes stock and AI-generated concepts.
              - generic [ref=e443]:
                - generic [ref=e444]: OA / VZM
                - generic [ref=e445]: Let’s talk
                - generic [ref=e446]: "2026"
        - paragraph [aria-hidden] [ref=e447]: Ostrel
        - generic [ref=e448]:
          - paragraph [ref=e449]: © 2026 Ostrel Atelier
          - paragraph [ref=e450]: VIZAM concept project — fictional studio
          - paragraph [ref=e451]: Not a real practice · Demo forms only
  - alert [ref=e452]
```

# Test source

```ts
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
  294 |     });
  295 |   }
  296 | });
  297 |
  298 | test.describe('accessibility (axe, WCAG 2.x A/AA)', () => {
  299 |   for (const path of PAGES) {
  300 |     test(`axe: ${path}`, async ({ browser }) => {
  301 |       // Reduced motion so every section is in its final, static state when scanned.
  302 |       const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  303 |       const page = await ctx.newPage();
  304 |       await page.goto(path);
  305 |       await page.evaluate(async () => {
  306 |         for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
  307 |       });
  308 |       await page.waitForTimeout(1200);
  309 |       const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  310 |       const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
> 311 |       expect(summary, summary.join('\n')).toEqual([]);
      |                                           ^ Error: color-contrast (serious): .items-start.gap-1[href$="projects"] > .mt-\[-0\.15rem\].text-\[0\.5625rem\].opacity-60 | .items-start.gap-1[href$="studio"] > .mt-\[-0\.15rem\].text-\[0\.5625rem\].opacity-60 | .items-start.gap-1[href$="services"] > .mt-\[-0\.15rem\].text-\[0\.5625rem\].opacity-60
  312 |       await ctx.close();
  313 |     });
  314 |   }
  315 | });
  316 |
```
