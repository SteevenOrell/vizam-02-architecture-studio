// Dependency-free slug lists used by proxy.ts for a hard 404 on unknown detail pages.
// Kept in sync with content/projects.ts and content/journal.ts by tests/unit/slugs.test.ts.
export const PROJECT_SLUGS = [
  'halden-house',
  'lumen-rooms',
  'saline-pavilion',
  'casa-velo',
  'northfold-works',
  'mire-apartment',
  'ombra-townhouse',
  'kiln-yard-studios',
  'olive-court-house',
  'mar-de-cal',
  'mira-residence',
] as const;

export const POST_SLUGS = ['the-stair-as-a-room', 'notes-on-lime', 'drawing-with-daylight', 'after-the-strip-out'] as const;
