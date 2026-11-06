# Development plan — Ostrel Atelier

VIZAM concept project 02 — **fictional studio**, not a client commission.

## 1. Requirements summary

Premium architecture & interior design studio site whose priority is visual storytelling: typography, photography,
two scroll-driven sections, and otherwise restrained motion. The most experimental of the five VIZAM concepts while
staying fast and accessible.

Functional requirements
| # | Requirement | Where |
|---|---|---|
| F1 | Hero project carousel: title rail, prev/next, pause/play, keyboard, swipe, autoplay that pauses on hover/focus/reduced motion | Home |
| F2 | Project filtering by discipline (and URL-synced `?type=`) with live result count | /projects |
| F3 | Project detail galleries with an accessible lightbox (Esc, arrows, focus return) | /projects/[slug] |
| F4 | Before/after comparison slider, `role="slider"`, arrows/Home/End/PageUp/PageDown, pointer drag | project details with `comparison` data |
| F5 | "Start a project" inquiry: React Hook Form + Zod client validation, server action with the same Zod schema, honeypot, in-memory rate limit, clearly labelled demo (nothing sent, nothing stored, nothing logged) | /contact |
| F6 | Responsive navigation: fixed header, full-height menu panel with focus trap, Esc, scroll lock | all |
| F7 | Exactly two scroll-driven sections (GSAP ScrollTrigger) with reduced-motion fallbacks | Home "Selected work" showcase, Home + Philosophy "cinematic" section |
| F8 | SEO: Metadata API per page, `generateMetadata` for dynamic routes, sitemap.ts, robots.ts, OG defaults | all |
| F9 | <250 px rule: `#root` and fixed elements 500 px wide, `html { overflow-x: auto }` | globals.css |

Non-functional: WCAG 2.2 AA intent, Lighthouse-friendly (static generation, next/image, self-hosted fonts),
no layout shift from fonts, no horizontal scroll from 300 px, equal-size cards in grids.

## 2. Sitemap

```
/                     Home — hero carousel, intro statement, scroll showcase (A1), services teaser,
                      cinematic philosophy (A2), journal teaser, inquiry CTA
/projects             Index with filters (All, Residential, Interiors, Hospitality, Cultural, Workplace), grid/list
/projects/[slug]      Project detail — hero, facts, narrative, gallery + lightbox, before/after (when present), next project
/studio               Studio — positioning, people (fictional, no real photos of faces), approach, recognition (labelled fictional)
/services             Services — 5 disciplines with scope + deliverables, process stages
/philosophy           Design Philosophy — cinematic section (A2, shared component), principles, materials
/journal              Journal index
/journal/[slug]       Journal article
/contact              Contact / Start a project — paper "brief" form + studio contact block
not-found, error, loading states
```

## 3. Component architecture

```
app/
  layout.tsx            <html> <body> <div id="root"> SkipLink, Header, main, Footer
  page.tsx …            routes above (server components)
  contact/actions.ts    'use server' submitInquiry (Zod + honeypot + rate limit)
  sitemap.ts robots.ts not-found.tsx error.tsx loading.tsx
components/
  layout/   Header, MenuPanel (client), Footer (sticky reveal), SkipLink
  home/     HeroCarousel (client), ScrollShowcase (client, GSAP), CinematicPhilosophy (client, GSAP)
  projects/ ProjectFilter (client), ProjectCard, ProjectGallery (client, lightbox), BeforeAfter (client)
  forms/    InquiryForm (client, RHF + Zod), Field primitives
  ui/       Reveal (Motion, subtle fade-up), SectionLabel, MetaRow, ArrowLink, PaperClip (SVG)
content/    projects.ts, journal.ts, services.ts, studio.ts, site.ts  (typed, CMS-ready)
lib/        schema.ts (Zod), rate-limit.ts, filter.ts, carousel.ts (pure index math), motion.ts (reduced-motion hook)
```

Server components by default; client components only where interaction requires it.

## 4. Technology plan

Next.js (App Router, latest stable) + TypeScript strict, Tailwind CSS v4, GSAP + ScrollTrigger (free licence),
Motion (`motion/react`) for small UI transitions (menu, filter layout), Lucide React icons, React Hook Form +
`@hookform/resolvers` + Zod, `next/image`, `next/font/google` (self-hosted at build). Vitest + Testing Library for
units, Playwright + `@axe-core/playwright` for e2e and accessibility. No CMS (local structured content), no database.

## 5. Content / data model

```ts
type Discipline = 'residential' | 'interiors' | 'hospitality' | 'cultural' | 'workplace';
interface Project {
  slug: string; title: string; location: string; year: number; discipline: Discipline;
  area: number;            // m²
  status: 'Completed' | 'In progress' | 'Concept';
  summary: string; intro: string; story: { heading: string; body: string }[];
  facts: { label: string; value: string }[];
  cover: Img; gallery: Img[];
  comparison?: { before: Img; after: Img; caption: string };
  featured?: boolean; palette?: string[];
}
interface Img { src: StaticImageData; alt: string; credit: string }
interface JournalPost { slug; title; date; category; excerpt; readingTime; cover: Img; body: Block[] }
```
Images are imported statically so `next/image` gets dimensions and blur placeholders. Content maps 1:1 to a future
headless CMS schema.

## 6. Design system

- **Colour tokens** (`@theme` in globals.css): plaster `#EEEBE4` (page), paper `#F7F4EE`, graphite `#1B1A17` (text,
  dark sections), stone `#77726A` (secondary text — ≥ 4.5:1 on plaster), hairline `#CFC9BE`, oxide `#9A4A2C`
  (accent, used sparingly: focus ring, active filter, form state). Dark surfaces use `#14130F`.
- **Type**: Schibsted Grotesk (display/UI; display sizes `clamp()` up to ~12rem, line-height .82, tracking −.04em),
  Newsreader (serif statements, italic for emphasis), JetBrains Mono (11–12 px uppercase metadata, document voice).
- **Grid**: 12 columns, gutter `clamp(1rem, 2vw, 2rem)`, page margin `clamp(1rem, 3vw, 3rem)`; asymmetric offsets
  for project tiles.
- **Motion**: durations 200–700 ms, easing `cubic-bezier(.2,.7,.1,1)`; only opacity/transform/clip-path. Scroll
  scrubbed animation only in the two named sections.
- **Signature details**: index numbers "(01)", label/value meta rows, hairline rules, paper document form with an
  SVG clip, giant wordmark in the footer.

## 7. Security plan

- Server action re-validates with the same Zod schema; length caps on every string; enum checks.
- Honeypot field (visually hidden, `tabIndex=-1`, `autocomplete=off`): filled → pretend success, drop.
- Minimum fill time check (form timestamp) as an additional bot signal.
- Rate limit: in-memory sliding window per hashed client key (IP from `x-forwarded-for`) — 5 per 10 minutes. Noted
  as per-instance only on serverless.
- No persistence, no logging of field values; response returns only `{ ok, message, fieldErrors }`.
- Security headers in `next.config.ts`: CSP (self + inline styles required by Next; scripts self + Next inline
  bootstrap), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`.
- `npm audit`, no secrets in repo, `.env*` ignored.

## 8. Testing plan

- Vitest: Zod schema, rate limiter, filter logic, carousel index maths, content integrity (unique slugs, alt text
  present, comparison pairs valid).
- Playwright e2e (port 3102, production build): navigation + menu, carousel controls/keyboard/pause, filtering,
  gallery lightbox, before/after keyboard, form validation + demo success, reduced-motion render, axe scan per page,
  no horizontal overflow at 300–1440 px, the <250 px lock.
- Screenshot script at 240, 390, 768, 1440 → WebP set in `docs/screenshots/`.

## 9. Deployment plan

Vercel-compatible (no custom server, no filesystem writes). Steps once Steeven signs in: create private GitHub repo
`vizam-02-architecture-studio`, push `vizam/initial-build`, import into Vercel, preview deploy only. No env vars
required. Production deploy only with approval.
