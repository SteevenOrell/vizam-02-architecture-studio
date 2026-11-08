# Ostrel Atelier

**VIZAM concept project — fictional studio.** Ostrel Atelier is an invented architecture and interior design studio.
This site is a portfolio concept built by VIZAM, not a real client commission. Projects, people, places and journal
entries are fictional, and no real institution is represented.

A premium, editorial site: a hero carousel, a distinct selected-project collection and a home-first scroll-driven architectural study, a cinematic philosophy section, filterable
projects with gallery lightbox and before/after slider, a journal, and a demo inquiry form.

## Stack

Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript, Tailwind CSS 4, GSAP ScrollTrigger, Motion,
Lucide React, React Hook Form + Zod, `next/image`, Metadata API. Content is local and structured in `content/`
(CMS-ready, no CMS). Vitest for unit tests, Playwright + axe for end-to-end and accessibility.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 3102 |
| `npm run build` | Production build |
| `npm start` | Serve the production build on port 3102 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `next typegen` then `tsc --noEmit` |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright e2e + axe (starts `npm start` on 3102; run `npm run build` first; add `-- --workers=2` on slow machines) |
| `npm run screenshots` | WebP screenshots at 240/390/768/1440 px into `docs/screenshots/` (needs a server on 3102) |

Ports 3000 and 3001 are deliberately avoided.

## Getting started

```bash
npm ci
npm run build
npm start          # http://localhost:3102
npm test
npm run test:e2e -- --workers=2
```

No environment variables are required.

## Structure

```
app/            routes (home, projects, studio, services, philosophy, journal, contact), layout, not-found, sitemap, robots
components/     layout, home (carousel, scroll showcase), projects (filter, gallery, before/after), journal, forms, ui
content/        typed local content: projects, journal, studio, image registry, slug lists
lib/            inquiry schema and processing, rate limiter, filter, math, reduced-motion hook
proxy.ts        hard 404 for unknown /projects/<slug> and /journal/<slug>
assets/images/  optimized WebP stock and AI-generated images (credits in CREDITS.md)
tests/          unit (Vitest) and e2e (Playwright + axe)
docs/           plan, reference analysis, report, handoff, screenshots
```

## Demo inquiry form

The contact form is a **demo**. It validates on the server (Zod), uses a honeypot and a rate limit, and then shows a
clearly labelled demo confirmation. Nothing is delivered, stored or logged, and no email provider is configured.

## Small screens and motion

Below 250 px width the layout locks at 500 px and can be panned (`#root` and fixed elements get `width: 500px`,
`html { overflow-x: auto }`). Reduced-motion users get static, readable versions of the scroll sections.

## Image credits

See [`assets/images/CREDITS.md`](assets/images/CREDITS.md). The 2026-11-08 refinement replaces 11 low-resolution or unsuitable images with section-specific AI-generated concepts. Native 1672×941 output is preserved without upscaling; full-height images use aspect-aware responsive sizing, and project cards use a landscape ratio. Prompts are recorded in `docs/image-requests/`.

The footer paper is a static “Contact us” card with illustrative studio details, without fields or submission controls. The separate `/contact` demo inquiry page remains available.

## More

Report, security review and test results: [`docs/report.md`](docs/report.md).

## Follow-up: navigation, mobile imagery and architectural study

The header stays visible while scrolling. Phone heroes show a complete landscape photograph with the title and controls below it. Selected Work presents Olive Court House, Mar de Cal and Mira Residence; the Projects catalogue includes all 11 fictional projects. The approved home image opens an original scroll-driven schematic assembly sequence with seven chapter controls and a reduced-motion reading layout. This is a conceptual diagram, not an engineered or measured model of the generated home.

`ResponsiveImage` uses Next.js `getImageProps` and its optimizer while capping advertised raster variants to the original image width. It omits blur placeholders because `getImageProps` does not remove them. The four approved source images retain native 1672×941 detail; none are upscaled. Native slot checks and final QA reports are under `docs/`.
