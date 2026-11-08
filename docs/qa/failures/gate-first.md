# Quality gate - 2026-11-08T19:46Z

| Step | Result | Detail |
|---|---|---|
| lint | PASS | npm run lint |
| typecheck | PASS | npm run typecheck |
| unit | PASS | npm run test |
| build | PASS | npm run build |
| e2e | FAIL | npm run test:e2e exited 1<br><br>> vizam-02-architecture-studio@0.1.0 test:e2e<br>> playwright test<br><br><br>Running 39 tests using 3 workers<br><br>  ok  2 [chromium] › tests\e2e\media-refinement.spec.ts:31:5 › home study begins with the home and reveals structure only while scrolling (26.5s)<br>  x   1 [chromium] › tests\e2e\media-refinement.spec.ts:4:7 › hero and selected-work composition at 390px (27.0s)<br>  ok  4 [chromium] › tests\e2e\site.spec.ts:7:7 › navigation › menu panel opens, traps focus, closes on Escape and returns focus (3.3s)<br>  ok  5 [chromium] › tests\e2e\site.spec.ts: |
| npm audit (production deps) | PASS | prod: 0 (high/critical 0); all deps: 0 |
| tracked private files (.env, .claude, CLAUDE.md, keys) | PASS |  |
| secret scan (working tree) | PASS |  |
| secret scan (full git history) | PASS |  |
| layout: no horizontal scroll from 300 px up (22 routes) | PASS |  |
| layout: below 250 px locked at 500 px, html pans | PASS |  |
| browser: console errors, failed requests, bad status | PASS |  |
| images: none broken | PASS |  |
| cards: equal height within a row | PASS |  |
| internal links (22 checked) | PASS |  |
