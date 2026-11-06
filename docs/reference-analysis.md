# Reference analysis — Ostrel Atelier (VIZAM concept project 02)

Inspected on 2026-11-05 with Playwright (headless Chromium shell 1248, run from the terminal) at
1440 × 900 (desktop; 1280 × 800 for stillform.homes) and 390 × 844 (mobile, touch + mobile UA).
Method per site: load, wait 4–8 s, capture viewport frames while wheel-scrolling in fixed steps (or at fixed time
intervals for the carousel), read computed styles of headings/body/nav, list forms and their fields, and run a few
read-only interactions (open menu, hover, keyboard arrow, open contact panel, Tab focus). **No form was typed into or
submitted.** Raw captures and contact sheets live in the session scratchpad, not in the repo.

Rules applied: references are direction, not source. No code, assets, copy, branding or exact compositions were
taken. Where a behaviour could not be observed, it is marked **unverified**.

---

## C — kononenkogroup.com (dominant: overall visual language)

**What I saw (desktop)**
- White page, black type, a fixed transparent header (73 px) with a three-line stacked wordmark top-left and a
  comma-separated text nav top-right ("Index, Work, About, Contact") in 12 px.
- Body text is tiny (12 px, −0.24 px tracking); headings are enormous. A neo-grotesk sans for display headings at
  60 px and 131 px with **line-height < 1 (≈ 0.7–0.8)** and strong negative tracking (≈ −3 %). A transitional serif is
  used for long statements at ≈ 88 px ("Architectural concept, facade and planning solutions…") and for small
  labels.
- Hero: a full-bleed architectural render with the wordmark set large bottom-left in white.
- Editorial rhythm: a centred two-line statement in huge sans, then a two-column block of tiny meta
  (Founded / Founder / Services / Awards / Publications as label + value rows) against a large serif paragraph.
- A long table of offices with thin rules and right-aligned arrows.
- Process story ("From Sketch to Strategy", "Precision in Development") uses line-drawn sketches as imagery, and a
  large serif pull statement with a small column of body text offset to the right.
- "Selected Projects (8+)": an **asymmetric, staggered image grid** — images of different sizes placed at different
  column starts and vertical offsets, each with a small caption row (name left, area in m² right). A small
  centred "See All" link.
- Footer: black, a dense multi-column index (Navigation, Media, Address, Hours), then a viewport-wide wordmark
  in giant sans along the bottom, then a hairline legal row.

**Mobile**
- Same header pattern compressed (wordmark left, "Work, About, Contact" right).
- Statements re-flow to large serif paragraphs at ≈ 30 px; the staggered grid collapses to one column of images
  with the same caption row.
- A black section with stat numerals ("45+", "40K", "490+") in sans with serif labels, and a collage of small photos
  around a heading — seen on mobile only (desktop capture stopped before this section; **unverified on desktop**).

**Take-aways for Ostrel** (translated, not copied)
- Extreme scale contrast: micro meta text (11–12 px, uppercase-free) against giant display type with tight leading.
- Two type voices: a grotesk for display and UI, a serif for long statements and pull quotes.
- Staggered asymmetric project layouts with a caption row (name / location / area), lots of white space.
- Label/value meta rows for project facts.
- Dark footer with a full-width wordmark — Ostrel will use a *paper* footer instead (see A) and keep the giant
  wordmark idea in a different proportion.

## B — senawastudio.com (nav behaviour + hero project carousel)

**What I saw**
- The home page is a single full-viewport screen (document height = viewport) on a warm off-white
  (`rgb(246,242,235)`), dark brown text.
- Intro: an off-white screen with a framed image and spaced wordmark, then the full-bleed carousel (mobile frame 0).
- Header over the image: hamburger button (aria-label "Open menu") left, letter-spaced wordmark centred, search
  button (aria-label "Search projects") right. A "Skip to content" link exists.
- Carousel: a full-bleed photograph per project. At the bottom, a **horizontal strip of project titles**
  (name + "year | CATEGORY" in small caps), the active one centred and bright, neighbours dimmed and cut by the edges.
  Each title is a link with an aria-label like "Show [project], Residential, 2025". The list is duplicated to make it
  loop. A thin **progress line** sits bottom-left under the strip.
- **Mouse wheel advances the carousel** (one wheel gesture → next project; the image changed and the strip
  re-centred). Frames 250 ms apart show the new image already in place, so the transition is a quick crossfade or
  cut — the exact easing is **unverified** at this capture rate.
- Pressing ArrowRight with no focus did **not** visibly change the slide.
- No automatic advance was observed over 12 s (desktop and mobile). **Autoplay: not observed.**
- Menu: clicking the hamburger opens a **left drawer (≈ 30 % width on desktop, ≈ 85 % on mobile)** with a frosted,
  blurred translucent background over the photo, a small "MENU" label, a vertical list of links at ≈ 18–24 px, a
  "Search" item, and the email + location pinned to the bottom. It was fully open within 300 ms. Hovering a link
  lightens it. Close is an "×" in the top-left where the hamburger was.
- Mobile: same composition in portrait crop; strip shows three titles, active centred.

**Take-aways for Ostrel**
- Full-bleed hero carousel with a **title rail** as the main control (titles are buttons), a progress line, and
  minimal chrome.
- Ostrel adds what the reference does not visibly expose: explicit previous/next buttons, a pause/play button,
  keyboard arrows when the carousel has focus, slide counter, `aria-roledescription="carousel"` and live region,
  and a slow autoplay that respects reduced motion and pauses on hover/focus.
- Drawer menu with frosted glass, hairline links, contact details at the bottom; Ostrel uses a full-height
  panel from the right on desktop with a large index-number list, and a full-screen sheet on mobile.

## A — storeyarchitecture.co.uk (footer + project inquiry only)

**What I saw**
- The inquiry form is designed as a **sheet of off-white textured paper** with a **paper-clip** graphic on its top
  edge, set on the page with a soft shadow. Header in a **typewriter monospace**: "01 / SPATIAL BRIEF INTAKE" plus a
  small wordmark at the right.
- Fields are numbered in a left gutter "01) Name, 02) Email, 03) Project type, 04) Location, 05) Timeline,
  06) Tell us more". Inputs are **underline only**; project type is four square checkboxes in a 2-column grid
  (Residential, Commercial, Hospitality, Interior); "Tell us more" is a set of ruled lines. A small black "Submit"
  button with an icon. The paper ends with a footer row in monospace ("ST / CTF — THANK YOU — website").
- To the left of the paper on desktop: a short intro paragraph ("Whether you are planning…"); on mobile a heading
  "Start a conversation" sits above the sheet.
- The "Contact" button in the header opens the **same paper sheet as an overlay that slides up from the bottom**
  over a dimmed page (captured over 0–1.2 s). Tab moved focus into the header nav, not obviously into the sheet —
  **focus management of the overlay is unverified**.
- Footer: the paper scrolls away upward over a **black footer**: "Site index", "Legal", "Get in touch" (email,
  phone, address) in a two-column grid, a wordmark, and on the right a **small paper note pinned with a binder clip**
  over a large house photograph. Below that, black geometric shards on white (a WebGL/3D-looking effect).
- Mobile: the sheet goes full width with the same numbered gutter; the footer stacks: Site index, Legal,
  Get in touch, wordmark, then the photo with the pinned note.

**Take-aways for Ostrel**
- An inquiry presented as a physical **brief document**: numbered fields, underline inputs, mono metadata, a
  document header/footer, a paper texture made in CSS (no image asset), a clip drawn in SVG.
- Ostrel's form is longer and structured in fieldsets (the "Start a project" brief): contact, project type, scope,
  site location, budget band, timeline, message, consent. Visible labels (not placeholders), error text per field.
- Footer: Ostrel uses a dark, warm footer that the page **slides off** (sticky-reveal "curtain" — pure CSS
  position: sticky, no scroll script) with an index, contact, a pinned paper "colophon" card and a giant wordmark.

## D — stillform.homes (animation inspiration for exactly two sections)

**What I saw (desktop; heavy WebGL, two canvases, Lenis smooth scrolling detected on `window`)**
- Beige page (`≈ #ece6da`), dark text, Familjen Grotesk + Instrument Serif (from computed styles).
- Hero headline "Space, Considered." in serif (90 px).
- **Section 1 — converging images:** tilted, scattered small image cards with rounded corners float around a
  serif line ("A quieter way to live"); on scroll they drift away while the central card **scales from a small card
  to an almost full-bleed rounded frame** (frames 02 → 05). Scroll-linked, not time-based.
- **Section 2 — text with inline image:** a large statement in grotesk with a small inline photo at the start of the
  line ("[image] We create residences where…"); words appear progressively while scrolling (frames 06 → 08; the
  initial text was off to the right and moved into place).
- **Section 3 — marquee to full-bleed:** a repeated "STILL / FORM" marquee runs horizontally behind a small central
  photo that grows to full-bleed ("SCROLL TO ENTER"), then a 3D model of the building appears ("DRAG TO ROTATE",
  "01 OF 07") — a WebGL scene.
- Later sections (from DOM text): stacked rooms ("THE LIVING AREA", "THE BEDROOM") with numbered 01–03 counters
  and a "Step inside" first-person 3D tour with WASD controls.
- Rendering in headless Chromium was slow (screenshots up to tens of seconds); frames 0–1 timed out, so the very first
  hero animation is **unverified**. Mobile capture: see note at the end.

**Decision for Ostrel** (exactly two scroll-driven sections, everything else restrained)
1. **Scroll project showcase (Home, "Selected work")** — a pinned section where a small framed image grows to a
   near-full-bleed frame via `clip-path` inset, then successive projects are revealed by clip-path wipes while the
   project title, index and facts change; scroll-linked (GSAP ScrollTrigger, `scrub`). Inspired by the "card scales to
   full frame" principle, without the scattered cards, marquee or 3D.
2. **Cinematic philosophy (Home + Design Philosophy page)** — a pinned, letterboxed sequence: an image with a slow
   scale/parallax, a serif statement whose words brighten one by one on scroll, and four principle "chapters" that
   cross-dissolve. Inspired by the progressive statement reveal; no inline-image-in-text copy.
- No WebGL, no smooth-scroll hijacking library (native scroll keeps accessibility and performance), no 3D tour.
- `prefers-reduced-motion: reduce` → both sections render as static, stacked, fully readable content.

---

## Typography, colour, spacing — synthesis

| Aspect | Observed | Ostrel decision |
|---|---|---|
| Display type | Neo-grotesk, line-height ≈ 0.75–0.8, −3 % tracking (C); serif display (C, D) | Families not used by any reference: *Schibsted Grotesk* for display/UI, *Newsreader* (serif, optical sizes) for statements; both via `next/font/google`, self-hosted at build |
| Micro text | 12 px meta (C), small caps labels (B), typewriter mono (A) | 11–12 px meta in *JetBrains Mono* uppercase for document/metadata voice |
| Palette | White/black (C), warm off-white + brown (B), beige (D), paper + black (A) | "Plaster" off-white `#EEEBE4`, "Graphite" `#1B1A17`, "Oxide" accent `#9A4A2C` (terracotta), "Paper" `#F6F3EC`, "Stone" grey `#8C877D` |
| Grid | Asymmetric staggered grid (C) | 12-column grid with deliberate offsets; captions as label/value rows |
| Spacing | Very generous vertical spacing (C, D) | Section spacing `clamp(6rem, 14vw, 14rem)` |

## Inaccessible / unverified items

- Senawa: carousel transition easing and duration; whether keyboard arrows work once the rail is focused; autoplay
  (not seen). Search overlay not opened.
- Storey: overlay focus trap / Escape behaviour; validation messages (not tested — no submission on a third-party
  form).
- Kononenko: the dark stats section on desktop (only seen on mobile); page transitions between routes (not navigated).
- Stillform: first hero frames (timed out in headless), all WebGL-driven sequences (only sampled), mobile behaviour
  (see below).
- No reference was inaccessible; all four loaded over HTTPS.

### stillform.homes mobile (390 × 844, second run, 12 frames at 800 px steps, load ≈ 16 s)

- Hero: full-bleed photo, serif "Space, Considered." top-left, two small uppercase links with arrows, small caption
  pairs at the bottom.
- The scattered cards of desktop are reduced to a **single rounded card with prev/next round buttons** under the serif
  line — the converging-cards effect is not used on mobile.
- The statement with the inline thumbnail reflows to ≈ 18 px text; marquee + growing central image are kept and grow
  to full-bleed (frames 04 → 05).
- The 3D "structure" sequence becomes a full-screen pinned scene with a vertical progress rail on the right, a stepper
  "01 OF 07 … 04 OF 07" and labelled layers (Full view, Walls, Floor, Roof) that change on scroll.
- Lesson for Ostrel: on small screens simplify the choreography (fewer moving layers), keep a clear step counter and a
  progress indicator in pinned sections.

## Studio name check

Name chosen: **Ostrel Atelier** (an invented word). Web searches run on 2026-11-05:
`"Ostrel" architecture studio` and `"Ostrel" interior design` — no architecture or interior studio of that name
was found (results were only near-spellings such as Ostrowscy Architekci, Osterlund Architects, Östlinghs).
This is a best-effort check, not a trademark search.
