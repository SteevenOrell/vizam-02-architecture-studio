import { describe, expect, it } from 'vitest';
import { posts } from '@/content/journal';
import { projects } from '@/content/projects';
import { people, studioFacts } from '@/content/studio';

describe('studio facts and journal drawings', () => {
  it('has sensible fictional figures', () => {
    expect(studioFacts.founded).toBeGreaterThan(1990);
    expect(studioFacts.people).toBe(people.length);
    expect(studioFacts.cities.length).toBe(2);
    expect(projects.length).toBeGreaterThan(0);
  });
  it('journal drawings are captioned as fictional and inline figures point at a real block', () => {
    for (const p of posts) {
      if (p.coverDrawing) expect(p.coverDrawing.alt.length).toBeGreaterThan(20);
      if (p.figure) {
        expect(p.figure.after).toBeLessThan(p.body.length);
        expect(p.figure.caption.toLowerCase()).toContain('fictional');
      }
    }
  });
});
