import { describe, expect, it, vi } from 'vitest';

// Static image imports resolve to plain objects in tests.
vi.mock('@/content/images', () => {
  const fake = { src: '/x.webp', width: 10, height: 10, blurDataURL: '' };
  return { img: new Proxy({}, { get: () => fake }) };
});

const { projects, countByDiscipline, nextProject, featuredProjects } = await import('@/content/projects');
const { posts } = await import('@/content/journal');
const { filterProjects, parseFilter } = await import('@/lib/filter');
const { wrapIndex, sliderKeyValue, clamp } = await import('@/lib/math');

describe('content integrity', () => {
  it('has unique slugs and alt text everywhere', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of projects) {
      expect(p.cover.alt.length).toBeGreaterThan(10);
      for (const g of p.gallery) expect(g.alt.length).toBeGreaterThan(10);
      if (p.comparison) {
        expect(p.comparison.before.alt).toMatch(/Existing condition/);
        expect(p.comparison.caption).toMatch(/Illustrative/);
      }
    }
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
  });

  it('features at least three projects for the carousel and at least one comparison', () => {
    expect(featuredProjects.length).toBeGreaterThanOrEqual(3);
    expect(projects.some((p) => p.comparison)).toBe(true);
  });

  it('counts disciplines and wraps the next project', () => {
    const c = countByDiscipline();
    expect(c.all).toBe(projects.length);
    expect(c.residential + c.interiors + c.hospitality + c.cultural + c.workplace).toBe(projects.length);
    expect(nextProject(projects[projects.length - 1].slug).slug).toBe(projects[0].slug);
  });
});

describe('filter', () => {
  it('parses only known disciplines', () => {
    expect(parseFilter('interiors')).toBe('interiors');
    expect(parseFilter('<script>')).toBe('all');
    expect(parseFilter(null)).toBe('all');
  });
  it('filters projects', () => {
    expect(filterProjects(projects, 'all')).toHaveLength(projects.length);
    expect(filterProjects(projects, 'interiors').every((p) => p.discipline === 'interiors')).toBe(true);
  });
});

describe('math helpers', () => {
  it('wraps carousel indexes in both directions', () => {
    expect(wrapIndex(5, 5)).toBe(0);
    expect(wrapIndex(-1, 5)).toBe(4);
    expect(wrapIndex(3, 0)).toBe(0);
  });
  it('maps slider keys to values within 0–100', () => {
    expect(sliderKeyValue('ArrowRight', 50)).toBe(52);
    expect(sliderKeyValue('ArrowLeft', 1)).toBe(0);
    expect(sliderKeyValue('PageUp', 95)).toBe(100);
    expect(sliderKeyValue('Home', 40)).toBe(0);
    expect(sliderKeyValue('End', 40)).toBe(100);
    expect(sliderKeyValue('a', 40)).toBeNull();
    expect(clamp(120, 0, 100)).toBe(100);
  });
});
