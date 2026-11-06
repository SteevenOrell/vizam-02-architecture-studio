import { describe, expect, it } from 'vitest';
import { posts } from '@/content/journal';
import { projects } from '@/content/projects';
import { POST_SLUGS, PROJECT_SLUGS } from '@/content/slugs';
import { isUnknownDetailPath } from '@/proxy';

describe('proxy slug lists', () => {
  it('match the project content', () => {
    expect([...PROJECT_SLUGS].sort()).toEqual(projects.map((p) => p.slug).sort());
  });
  it('match the journal content', () => {
    expect([...POST_SLUGS].sort()).toEqual(posts.map((p) => p.slug).sort());
  });
});

describe('proxy unknown-slug check', () => {
  it('passes known slugs, including percent-encoded ones', () => {
    expect(isUnknownDetailPath('/projects/halden-house')).toBe(false);
    expect(isUnknownDetailPath('/projects/halden%2Dhouse')).toBe(false);
    expect(isUnknownDetailPath('/journal/notes-on-lime')).toBe(false);
  });
  it('flags unknown and malformed slugs instead of throwing', () => {
    expect(isUnknownDetailPath('/projects/nope')).toBe(true);
    expect(isUnknownDetailPath('/projects/%E0%A4%A')).toBe(true);
    expect(isUnknownDetailPath('/journal/%ZZ')).toBe(true);
    expect(isUnknownDetailPath('/projects/..%2F..%2Fstudio')).toBe(true);
  });
  it('ignores other sections and prototype keys', () => {
    expect(isUnknownDetailPath('/studio')).toBe(false);
    expect(isUnknownDetailPath('/constructor/x')).toBe(false);
    expect(isUnknownDetailPath('/projects')).toBe(false);
  });
});
