import { describe, expect, it } from 'vitest';
import { getContext, projects } from '@/content/projects';
import { initials } from '@/lib/initials';
import { splitTitle } from '@/lib/split-title';

describe('project details (fictional C1 fields)', () => {
  it('every project has architects, three tags and plausible coordinates', () => {
    for (const p of projects) {
      expect(p.architects.length, p.slug).toBeGreaterThan(0);
      expect(p.tags, p.slug).toHaveLength(3);
      expect(p.coordinates, p.slug).toMatch(/^\d{1,2}\.\d{4}° [NS], \d{1,3}\.\d{4}° [EW]$/);
    }
  });

  it('every project resolves a context with 3 stats and 3 rows, with or without its own data', () => {
    for (const p of projects) {
      const c = getContext(p);
      expect(c.lead.length, p.slug).toBeGreaterThan(20);
      expect(c.stats, p.slug).toHaveLength(3);
      expect(c.rows, p.slug).toHaveLength(3);
      for (const r of c.rows) expect(r.lines.length, `${p.slug} ${r.title}`).toBeGreaterThan(0);
    }
  });

  it('featured and showcase projects carry their own context data', () => {
    const own = projects.filter((p) => p.context).map((p) => p.slug);
    for (const p of projects.filter((x) => x.featured)) expect(own).toContain(p.slug);
    for (const s of ['olive-court-house', 'mar-de-cal', 'mira-residence']) expect(own).toContain(s);
  });
});

describe('initials and splitTitle', () => {
  it('builds a monogram from the first and last word', () => {
    expect(initials('Lena Marsk')).toBe('LM');
    expect(initials('  anders  holm ')).toBe('AH');
    expect(initials('Cher')).toBe('C');
    expect(initials('')).toBe('');
  });
  it('sets the last word as the accent when a title has two or more words', () => {
    expect(splitTitle('Halden House')).toEqual({ lead: 'Halden', accent: 'House' });
    expect(splitTitle('Mar de Cal')).toEqual({ lead: 'Mar de', accent: 'Cal' });
    expect(splitTitle('Atelier')).toEqual({ lead: 'Atelier', accent: null });
  });
});
