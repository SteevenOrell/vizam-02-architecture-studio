import { describe, expect, it } from 'vitest';
import { posts } from '@/content/journal';
import { projects } from '@/content/projects';
import { POST_SLUGS, PROJECT_SLUGS } from '@/content/slugs';

describe('proxy slug lists', () => {
  it('match the project content', () => {
    expect([...PROJECT_SLUGS].sort()).toEqual(projects.map((p) => p.slug).sort());
  });
  it('match the journal content', () => {
    expect([...POST_SLUGS].sort()).toEqual(posts.map((p) => p.slug).sort());
  });
});
