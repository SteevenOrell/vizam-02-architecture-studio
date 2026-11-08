/**
 * Timeline of the "home to drawings" scroll section, in abstract time units.
 * One scrubbed GSAP timeline is built from these marks, and the same marks drive the chapter counter, the progress
 * bar and the chapter buttons, so the UI can never disagree with what is on screen.
 */

/** Time at which each chapter becomes the current one (its picture starts to wipe in). */
export const STUDY_MARKS = [1.1, 2.6, 4.6, 6.6, 8.6, 10.6, 14.3] as const;

/** Time at which each chapter is fully drawn and has settled: where a chapter button scrolls to. */
export const STUDY_SETTLE = [1.8, 4.2, 6.2, 8.2, 10.2, 12.8, 15.3] as const;

/** Total length of the timeline. */
export const STUDY_TOTAL = 16;

/** Viewport heights of scrolling that the pinned section spans. */
export const STUDY_SCROLL_SCREENS = 9;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Index (0-based) of the chapter that is current at time t. Before the first mark the first chapter is current. */
export function chapterAt(t: number): number {
  let current = 0;
  for (let i = 0; i < STUDY_MARKS.length; i++) if (t >= STUDY_MARKS[i]) current = i;
  return current;
}

/** Scroll progress (0..1) to jump to when chapter i is chosen. */
export function settleProgress(i: number): number {
  const idx = Math.min(STUDY_SETTLE.length - 1, Math.max(0, i));
  return STUDY_SETTLE[idx] / STUDY_TOTAL;
}

/**
 * Progress of the chapter bar (0..1): piecewise linear between the chapter marks, so chapter i sits exactly at
 * i / (n - 1) whatever its duration. Matches the tick marks, which are evenly spaced.
 */
export function chapterProgress(t: number): number {
  const n = STUDY_MARKS.length;
  if (t <= STUDY_MARKS[0]) return 0;
  if (t >= STUDY_MARKS[n - 1]) return 1;
  const i = chapterAt(t);
  const span = STUDY_MARKS[i + 1] - STUDY_MARKS[i];
  return (i + clamp01((t - STUDY_MARKS[i]) / span)) / (n - 1);
}

/**
 * Staggered reveal progress for element `index` of `count`: all elements finish when p = 1, and the last one starts
 * when p = spread / (1 + spread). Returns 0..1.
 */
export function staggerProgress(p: number, index: number, count: number, spread = 0.6): number {
  if (count <= 1) return clamp01(p);
  return clamp01(p * (1 + spread) - (index / (count - 1)) * spread);
}
