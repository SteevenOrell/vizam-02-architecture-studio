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
