# Ostrel Atelier — delivery report

VIZAM concept project — fictional studio. Built on a worktree branch and delivered on `vizam/initial-build`. Report date: 2026-11-06.

## Architecture and design summary
- Next.js 16 App Router with Cache Components and partial prefetching. Content pages are prerendered (25 static pages), and detail routes use `generateStaticParams`.
- Local typed content in `content/` (projects, journal, studio), ready to swap for a CMS later.
- Design: warm stone and graphite palette, large editorial display type, generous spacing, photographic hero carousel.
  - Scroll-driven motion (GSAP ScrollTrigger) is limited to two sections: the home scroll showcase and the cinematic philosophy section.
  - Both have full `prefers-reduced-motion` static fallbacks. Other motion uses Motion.
- Features: filterable projects (URL-synced), gallery lightbox, keyboard-operable before/after slider, journal, full-screen menu with focus trap, demo inquiry form.
- Hard 404: Cache Components rejects `dynamicParams = false`.
  - Instead, `proxy.ts` checks the slug against `content/slugs.ts` and rewrites unknown slugs to a non-existent route, which returns a real 404 status with the not-found page.
  - A unit test keeps the slug lists in sync with the content.

## Status
All planned pages and features are built, and the checks below pass. The independent security review and final QA sign-off (Slice D, at the end of this report) found the site ready.

## Commands run (2026-11-06)
| Command | Result |
|---|---|
| `npm ci` | pass — 446 packages, 0 vulnerabilities (eslint 9.39.5 deprecation warning) |
| `npm run lint` | pass |
| `npm run typecheck` | pass |
| `npm test` | pass — 5 files, 32 tests |
| `npm run build` | pass — 25 static pages, Proxy listed. The first attempt with `dynamicParams = false` failed. |
| `npm run test:e2e -- --workers=2` (production build, port 3102) | pass — 34 of 34 in one run. Covers axe WCAG 2.x A/AA on 9 pages, the under-250 px lock, equal-size cards and the hard 404 for unknown slugs. |
| `npm audit` | pass — found 0 vulnerabilities |

Screenshots (`docs/screenshots/`, 47 WebP) were taken with Playwright headless Chromium at 240, 390, 768 and 1440 px.

## Security review (first pass)
- **Headers** (`next.config.ts`):
  - Content-Security-Policy: default-src self, frame-ancestors none, form-action self, base-uri self, object-src none.
  - Also X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, X-Frame-Options DENY, a Permissions-Policy that turns off camera, microphone and geolocation, and no X-Powered-By.
  - Trade-off: `script-src` allows `'unsafe-inline'` because Next's inline bootstrap needs it without per-request nonces, and nonces would make every page dynamic.
- **Server action validation:** the Zod schema is parsed on the server, and field errors are returned without echoing values.
- **Honeypot** field (`website`) plus a minimum fill time. Bot submissions get a normal-looking demo success and are dropped.
- **Rate limit:** an in-memory sliding window, 5 submissions per 10 minutes per client key. The key is a SHA-256 hash, so raw IPs are not held. It is per instance, resets on restart and is not shared across serverless instances.
- **No personal data stored or logged:** the action neither persists nor logs field values, and submissions are not delivered.
- **Dependencies:** `npm audit` found 0 vulnerabilities. `playwright-core` is pinned to 1.64.0 through `overrides` to fix a type conflict between two installed versions; this is not a security issue.
- **Secrets:** none required or committed.

## Performance and accessibility notes
- **Accessibility:**
  - axe (WCAG 2.x A/AA) passes on `/`, `/projects`, `/projects/mire-apartment`, `/studio`, `/services`, `/philosophy`, `/journal`, `/journal/notes-on-lime` and `/contact`.
  - e2e tests cover the menu focus trap and Escape key, keyboard use of the lightbox and slider, and reduced motion.
- **Layout:** no horizontal scroll at 300, 390, 768 and 1440 px (tested), and equal-size cards in the project and journal grids.
- **Performance:** compressed WebP images through `next/image`, and prerendered pages. Lighthouse and Core Web Vitals were not run, and bundle size was not analysed.

## Known limitations
- Under 250 px on a desktop browser, the 500 px fixed header does not pan with the page, so the Menu button can be off-screen. Touch devices pan the visual viewport and work. This follows the VIZAM rule as written.
- CSP uses `'unsafe-inline'` for scripts.
- The rate limiter is per instance and in memory.
- The inquiry form is a demo; no email provider is configured.
- No Lighthouse, real-device or cross-browser testing was done (Chromium only).
- Photos are stock images; see `assets/images/CREDITS.md`. No video, voice or AI images were used.

## Blockers only Steeven can resolve
- Link the project in Vercel to get a preview URL; none exists yet.
- Approve any production deploy.

## Portfolio case-study blurb
Ostrel Atelier is a VIZAM concept for an invented architecture and interior design studio. We set out to give quiet, material-led work a site that feels like walking through a building: a full-bleed photographic carousel, a pinned scroll sequence that opens from a small framed window to full bleed, and a cinematic philosophy section that follows the light. Projects filter instantly, galleries open in an accessible lightbox, and a before-and-after slider works with the keyboard as well as the mouse. Built with Next.js 16, TypeScript, Tailwind, GSAP and Motion, it is fully responsive, respects reduced motion, passes axe checks and ships with a validated demo inquiry form.

## Slice D — independent review (2026-11-06)
Reviewer: a fresh Opus agent. The code was read directly; earlier claims were re-checked, not trusted.

### Security findings
| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | Low | `proxy.ts` called `decodeURIComponent` without a guard: a malformed slug such as `/journal/%ZZ` or `/projects/%E0%A4%A` threw and returned **500** (reproduced against the production build). | Fixed in `e7f902e`: malformed slugs are treated as unknown and return 404. Unit tests plus an e2e case added. |
| 2 | Low | The rate limiter's memory cap evicted the first-inserted key, which could be an active, blocked client; re-setting a Map key does not move it. | Fixed in `0243799`: keys are re-inserted on every check, so eviction drops the least recently seen key. Unit test added. |
| 3 | Info | `Permissions-Policy` listed the deprecated `interest-cohort` token, which Chrome reports as a console error. | Fixed in `f42e370`. |
| 4 | Low | The rate-limit key uses the first `X-Forwarded-For` entry. On Vercel the platform sets this header; behind another host or no proxy it can be spoofed, so the limiter can be bypassed. The limiter is also per instance and in memory. | Recommendation: before real use, read the IP from the trusted platform header and move the limiter to a shared store (KV or Redis). |
| 5 | Low | The CSP allows `'unsafe-inline'` for scripts (documented trade-off for static Cache Components pages). | Recommendation: switch to nonces or hashes if the site ever handles real user data. |
| 6 | Info | No `Strict-Transport-Security` header in `next.config.ts`. Vercel adds HSTS on its domains. | Recommendation: add HSTS if the site is hosted elsewhere or on a custom domain without it. |

Verified with no change needed:
- **Server action:** the input is `unknown` and is re-parsed with the shared Zod schema. Every string has a maximum length, the enums are closed and the services array is capped. Unknown keys are stripped.
- **Error messages:** they are static and never echo submitted values. The action catches errors and returns a generic message.
- **No personal data:** nothing is stored, logged or sent. There is no `console.*` anywhere in `app/`, `components/`, `lib/` or `content/`.
- **Bot handling:** the honeypot and the minimum fill time give bots a silent fake success.
- **Rate limiting:** the limit is checked before parsing, and the client key is a truncated SHA-256 hash, so raw IPs are not held. Memory is bounded at 5,000 keys × 5 timestamps.
- **Proxy:** the matcher covers only `/projects/:slug` and `/journal/:slug`. The section lookup uses an own-property check. Traversal-style slugs such as `..%2F` return 404, and a trailing slash returns a 308 redirect.
- **Headers on the production build:** CSP (`default-src 'self'`, `frame-ancestors 'none'`, `form-action 'self'`, `base-uri 'self'`, `object-src 'none'`), `nosniff`, `X-Frame-Options: DENY`, the Referrer-Policy and the Permissions-Policy are all present, and there is no `X-Powered-By`.
- **XSS:** there is no `dangerouslySetInnerHTML`, `innerHTML` or `eval`. All `href`s are built from static content slugs or `mailto:` with the site's own address. No `target="_blank"` links exist, so no `rel` issue. Images are local only, with no `remotePatterns`.
- **Secrets:** the full `git log --all -p` history has no API keys, tokens or `.env` files. `.claude/`, `test-results/`, `playwright-report/` and `.secrets` never appear in any commit. Only WebP images are tracked (34 assets and 47 screenshots), with no originals.

### Final QA against the brief
- **Pages:** all 8 page types are present: Home, Projects, Project details, Studio, Services, Philosophy, Journal (index and post), and Contact / Start a project.
- **Feature coverage:** the e2e suite covers each of these:
  - the working carousel (controls, keyboard, pause, autoplay, no autoplay with reduced motion);
  - URL-synced filtering;
  - the gallery lightbox;
  - the before/after slider with arrows, Page Up/Down and Home/End;
  - the inquiry form with "Demo form", "Send brief (demo)" and "Demo submission received (not delivered)".
- **Scroll animation:** GSAP ScrollTrigger is used in exactly two components (`ScrollShowcase`, `CinematicPhilosophy`). Each runs under `matchMedia('(prefers-reduced-motion: no-preference)')` and keeps static fallback markup.
- **Under 250 px:** the lock works. `#root` and the `.is-fixed` elements (header, menu, lightbox, skip link) are 500 px wide with `right: auto`, and `html { overflow-x: auto }` is set.
- **Labelling:** "VIZAM concept project — fictional studio" appears in the footer (`site.disclaimer`), the menu and the README.
- **Images:** WebP only, with credits in `assets/images/CREDITS.md`.
- **Screenshots reviewed:** `1440-home`, `390-menu-open`, `768-filter-interiors` and `240-lock-panned` show no defects beyond the known under-250 px header limitation.

### Gate after fixes (2026-11-06)
| Command | Result |
|---|---|
| `npm ci` | pass, 0 vulnerabilities |
| `npm run lint` | pass |
| `npm run typecheck` | pass |
| `npm test` | pass — 5 files, 36 tests |
| `npm run build` | pass — 25 static pages, Proxy listed |
| `npm run test:e2e -- --workers=2` (production build, port 3102) | pass — 35 of 35 |
| `npm audit` | found 0 vulnerabilities |

The server on port 3102 was stopped afterwards.

### Verdict
**Ready** for the PR as a concept and portfolio site. Before any real-client or production use, address recommendations 4 to 6 and get an independent security review.


## 2026-11-08 follow-up: persistent navigation, mobile frames, selected projects and home study

Implemented the user-approved four-image set. Navbar remains visible; phone heroes preserve complete landscape compositions. Selected Work has three distinct fictional studies, with all 11 projects in the catalogue. The home-first scroll sequence is an original labelled schematic assembly with chapter controls and reduced-motion content. Footer paper/contact presentation remains intact. Source-bounded optimized srcsets and accurate gallery sizes avoid advertising raster variants beyond their source.

Validation: delivery quality gate **0 FAIL / 0 WARN**, with lint, types, 37 unit tests, 28-page production build, 39 E2E/axe tests, audit (zero reported vulnerabilities), working-tree/history scans, and live layout checks at 240/300/390/768/1440 on 13 representative routes covering all changed page types. An earlier live run covered all 22 sitemap routes. Final content audit covers all 22 routes: **0 FAIL / 149 WARN**; affected-route visual rerun covers 9 routes: **0 FAIL / 58 WARN**. Every distinct warning has a reason in [content-warning-dispositions.md](qa/content-warning-dispositions.md). Full quality report: [gate-report.md](qa/gate-report.md).

Opened the full-site contact-sheet set and refreshed affected-route sheets. Corrected catalogue count/copy, navbar number contrast, mobile hero framing, repeated new-project cover-only gallery, source bounds and gallery size hints. Reviewed final new-project hero montage and motion/static fallbacks. Generated output is native 1672×941, not 4K; legacy high-density desktop limits and editorial microtype are recorded. Canonical article/project thumbnails and existing comparison/gallery reuse remain intentional. Earlier full failure evidence is retained under docs/qa/failures and build logs.

Limits: local Chromium only; no real-device, other-browser, screen-reader or Core Web Vitals guarantee. The schematic is not a measured/photorealistic 3D model. No production deployment was requested.

## Round 2 independent review (2026-11-08, slice D)

Reviewer: fresh Opus agent, branch `vizam/initial-build`, own production builds on ports 3107 (Playwright), 3108 (gate) and
3109 (spot checks), all stopped afterwards. Earlier slice claims were re-checked in code and in rendered screenshots.

### Findings

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | Medium (content) | Studio said "14 people" (studio hero, home intro) but the people table lists 6. | Fixed: `studioFacts.people = people.length`; home intro reads founded/cities/people from `studioFacts`; unit test pins it. |
| 2 | Medium (content) | Project spec cards and home panels credited 22 invented architects, not the studio's 6 people. | Fixed: architects are now drawn from the people table; unit test checks every name. |
| 3 | Low (a11y) | Project hero: small meta/tags at the top sat on bright skies (worst-case background contrast 2.5:1). | Fixed: extra top shade + darker mid gradient. Worst-case (brightest 5% of pixels, text-shadow ignored) now 4.4:1 for meta, 3.4:1 for tags, 2.3-3.0:1 for the very large titles (Mire Apartment, Northfold Works); readable in screenshots. Kept as a limitation. |
| 4 | Low (layout) | Halden House gallery (cover + 3) left an empty half cell in the last row. | Fixed: a lone last tile spans the row (16:9 on desktop, 4:3 on phone). |
| 5 | Low (docs) | README described the pre-Round-2 phone hero and selected-work layout. | Fixed: README describes full-bleed heroes, panels, "A home, drawn" and the new sections. |
| 6 | Low (a11y) | The pinned section's chapter rail is hidden until the intro has played, so keyboard users tabbing from the top reach "Skip the chapters" but not the rail. The rail works with Enter once visible (verified: dot 4 -> "Chapter 4 of 7: Elevation"), and the live status reads each chapter. | Open, recommendation: show the HUD on `:focus-within`. |
| 7 | Low (decision) | On portrait phones the drawing sheets are turned a quarter turn (by design in slice B) so labels read sideways. | Needs Steeven's taste call. |
| 8 | Low (images) | Reuse across pages: material-spheres (journal cover "Notes on lime", Halden gallery, services "Furniture & objects", philosophy materials), journal-renovation (journal cover + renovation service), lumen-suite, material-shoji. Never twice on one page. | Kept: each use fits its section; cards repeat by nature. |
| 9 | Info (security) | Rate limit keys on the first `x-forwarded-for` entry, which a client can set when not behind a proxy that overwrites it; per-instance memory only. | Open, recommendation: use the platform-trusted IP (Vercel overwrites XFF) and a shared store before production. |
| 10 | Info (security) | CSP keeps `'unsafe-inline'` for scripts (no nonces, to stay static). | Known trade-off (see first-pass review). |
| 11 | Info | `priority` on next/image is deprecated in Next 16 (`preload`); the hero uses `ResponsiveImage`, which maps it to `loading="eager"` + `fetchPriority="high"`. | Kept; switch when touching those files. |

Verified as correct: proxy 404s (`/projects/nope`, `/journal/nope`, `/projects/%ZZ` -> 404; all 11 project and 4 post slugs
200; slug lists tied to content by unit test); bogus server action -> 400; headers (CSP, nosniff, DENY, referrer,
permissions, no x-powered-by); no `dangerouslySetInnerHTML`, no `target="_blank"`, only `mailto:` and internal links;
images local only (no remote patterns); nothing tracked from `.claude/`, `.secrets`, `test-results/` or the reference
folder; tracked images are WebP only (the PNGs once in history were own-site screenshots, since removed); no third-party
screenshots or markup in the tree or history (`docs/reference-analysis.md` is prose notes). Footer, menu and contact page
show "VIZAM concept project — fictional studio"; README opens with it. Statistics are labelled (studio stats, project
Context note, panels, drawings "fictional concept").
Scroll-driven animation exists in exactly two components: `components/home/HomeToDrawings.tsx` (scrub 0.6, pinned) and
`components/home/CinematicPhilosophy.tsx` (scrub 0.8); everything else uses Reveal (in-view only).
Performance sanity (headless Chromium, production): home LCP is the hero h1 at about 0.3 s; about 524 KB of images on
first load (hero 117 KB at w=1672, the study photo 96 KB eager with `fetchPriority="low"`, three panel images); JS about
272-338 KB transferred; no long tasks while scrubbing through the pinned section. Not a Lighthouse run.

### Screenshots looked at
Hero, all 5 slides at 1885x950, 1353x810, 1440x900, 768x1024, 390x844: title top never above 329 px, header bottom 72 px,
nav legible over every photo. "A home, drawn" intro + 7 chapters at 1440 and 390: images fitted, sheets and title blocks
clean, no collisions. Home panels, project spec hero + Context (11 projects), studio hero (4 stats render: 11, 2014, 6, 2),
philosophy closing statement and services sheets at 390 and 1440: nothing clipped. Contact sheets of all 11 routes
(content QA). Fixed header and skip link showing mid-section in element screenshots are a capture artefact (both are
off-screen or at the top in real viewports).

### Checks (final run, after the fixes)
| Command | Result |
|---|---|
| `E2E_PORT=3107 node <skill>/vizam-quality-gate/scripts/gate.mjs --start "npx next start -p 3108" --url http://127.0.0.1:3108 --out docs/qa` | 0 FAIL, 0 WARN |
| - `npm run lint` | PASS (0 errors, 1 pre-existing warning: `components/ui/ResponsiveImage.tsx` jsx-a11y/alt-text false positive, alt is passed through props) |
| - `npm run typecheck` | PASS |
| - `npm test` (Vitest) | PASS, 51/51 |
| - `npm run build` | PASS |
| - `npm run test:e2e` (Playwright + axe, own build on 3107) | PASS, 94 tests |
| - `npm audit` | PASS, 0 vulnerabilities (prod and dev) |
| - tracked private files, secret scan tree + full history | PASS |
| - layout at 240/300/390/768/1440 on 22 routes (h-scroll, 250 px lock, console, images, links, cards) | PASS |
| `node <skill>/vizam-content-qa/scripts/content-qa.mjs ... --routes` (11 routes, `docs/qa/content-d`) | 0 FAIL, 80 WARN |
| `node <skill>/site-media/scripts/image-audit.mjs validate --images public,assets,src/assets` | PASS, 1 WARN (photographer piro4d has 4 images site-wide) |

Content QA WARNs kept: 58 "slightly soft on retina" are a measurement artefact (with `srcset` the browser reports
`naturalWidth` density-corrected to the `sizes` slot, e.g. 475 = 33vw at 1440; the file actually fetched is the 1080 or
1672 variant); 11 "text under 12px" are the mono meta labels and SVG drawing labels (design system); repeated
paragraphs are journal cards and the fictional-data note (intended); repeated images: see finding 8.

### Known limitations
Not covered: Lighthouse/Core Web Vitals, screen readers, real devices, Safari/Firefox. Contrast over photos is estimated
from screenshots, not certified. The form is a demo (nothing sent or stored). Concept site with fictional data; any
production use needs an independent security and compliance review.

### Verdict
Ready for a PR (no merge without Steeven). Open items 6, 7, 9 are recommendations or taste calls, not blockers.
