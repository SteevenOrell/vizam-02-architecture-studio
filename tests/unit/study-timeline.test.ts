import { describe, expect, it } from 'vitest';
import {
  STUDY_MARKS,
  STUDY_SETTLE,
  STUDY_TOTAL,
  chapterAt,
  chapterProgress,
  settleProgress,
  staggerProgress,
} from '@/lib/study-timeline';

describe('study timeline', () => {
  it('has seven chapters with increasing marks that fit inside the timeline', () => {
    expect(STUDY_MARKS).toHaveLength(7);
    expect(STUDY_SETTLE).toHaveLength(7);
    for (let i = 1; i < STUDY_MARKS.length; i++) expect(STUDY_MARKS[i]).toBeGreaterThan(STUDY_MARKS[i - 1]);
    expect(STUDY_MARKS[6]).toBeLessThan(STUDY_TOTAL);
    expect(STUDY_SETTLE[6]).toBeLessThanOrEqual(STUDY_TOTAL);
  });

  it('settles every chapter inside its own slot, so a chapter button lands on that chapter', () => {
    STUDY_SETTLE.forEach((t, i) => {
      expect(chapterAt(t)).toBe(i);
      expect(settleProgress(i)).toBeCloseTo(t / STUDY_TOTAL);
    });
  });

  it('reports chapter one during the intro and the last chapter at the end', () => {
    expect(chapterAt(0)).toBe(0);
    expect(chapterAt(STUDY_TOTAL)).toBe(6);
  });

  it('clamps out-of-range chapter indexes', () => {
    expect(settleProgress(-3)).toBe(settleProgress(0));
    expect(settleProgress(99)).toBe(settleProgress(6));
  });

  it('puts chapter i exactly at i/6 on the progress bar, rising monotonically', () => {
    STUDY_MARKS.forEach((m, i) => expect(chapterProgress(m)).toBeCloseTo(i / 6));
    let last = -1;
    for (let t = 0; t <= STUDY_TOTAL; t += 0.1) {
      const p = chapterProgress(t);
      expect(p).toBeGreaterThanOrEqual(last);
      last = p;
    }
    expect(chapterProgress(0)).toBe(0);
    expect(chapterProgress(STUDY_TOTAL)).toBe(1);
  });

  it('staggers a reveal so it starts at 0, ends at 1 and never leaves the range', () => {
    expect(staggerProgress(0, 3, 10)).toBe(0);
    expect(staggerProgress(1, 0, 10)).toBe(1);
    expect(staggerProgress(1, 9, 10)).toBe(1);
    expect(staggerProgress(0.5, 0, 10)).toBeGreaterThan(staggerProgress(0.5, 9, 10));
    expect(staggerProgress(0.7, 0, 1)).toBeCloseTo(0.7);
    for (let p = -1; p <= 2; p += 0.25) {
      const v = staggerProgress(p, 4, 9);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});
