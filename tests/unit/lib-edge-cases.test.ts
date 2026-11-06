import { describe, expect, it } from 'vitest';
import { filterProjects, parseFilter } from '@/lib/filter';
import { inquirySchema } from '@/lib/inquiry-schema';
import { clamp, pad2, sliderKeyValue, wrapIndex } from '@/lib/math';
import { clientKey, processInquiry } from '@/lib/process-inquiry';
import { createRateLimiter } from '@/lib/rate-limit';
import type { Project } from '@/content/types';

const valid = {
  name: 'Jane Doe', email: 'test@example.com', phone: '', organisation: '', projectType: 'residential',
  services: ['architecture'], location: 'Lisbon', size: '100-300', budget: 'undisclosed', timeline: 'exploring',
  message: 'A fictional brief that is long enough to pass.', consent: true,
};

describe('math edge cases', () => {
  it('wrapIndex handles empty lists and large negatives', () => {
    expect(wrapIndex(5, 0)).toBe(0);
    expect(wrapIndex(-7, 3)).toBe(2);
  });
  it('clamp and pad2', () => {
    expect(clamp(150, 0, 100)).toBe(100);
    expect(clamp(-1, 0, 100)).toBe(0);
    expect(pad2(7)).toBe('07');
    expect(pad2(12)).toBe('12');
  });
  it('sliderKeyValue handles Home/End/paging and ignores other keys', () => {
    expect(sliderKeyValue('Home', 40)).toBe(0);
    expect(sliderKeyValue('End', 40)).toBe(100);
    expect(sliderKeyValue('PageUp', 95)).toBe(100);
    expect(sliderKeyValue('PageDown', 4)).toBe(0);
    expect(sliderKeyValue('a', 40)).toBeNull();
  });
});

describe('filter edge cases', () => {
  it('rejects null, undefined, empty and look-alike values', () => {
    for (const v of [null, undefined, '', 'Residential', '__proto__', 'all']) expect(parseFilter(v)).toBe('all');
  });
  it('returns the full list for "all" and an empty list for no match', () => {
    const list = [{ discipline: 'interiors' }] as Project[];
    expect(filterProjects(list, 'all')).toHaveLength(1);
    expect(filterProjects(list, 'cultural')).toEqual([]);
  });
});

describe('inquiry schema edge cases', () => {
  it('accepts a phone number and rejects letters in it', () => {
    expect(inquirySchema.safeParse({ ...valid, phone: '+1 (555) 010-0000' }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...valid, phone: 'call me' }).success).toBe(false);
  });
  it('rejects a non-boolean consent and unknown services', () => {
    expect(inquirySchema.safeParse({ ...valid, consent: 'true' }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, services: ['demolition'] }).success).toBe(false);
  });
});

describe('rate limiter edge cases', () => {
  it('tracks keys independently and reports remaining and retry time', () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(rl.check('a', 0).remaining).toBe(1);
    expect(rl.check('a', 100).remaining).toBe(0);
    const blocked = rl.check('a', 200);
    expect(blocked).toEqual({ allowed: false, remaining: 0, retryAfterMs: 800 });
    expect(rl.check('b', 200).allowed).toBe(true);
  });
  it('reset clears state and maxKeys bounds memory', () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 });
    rl.check('a', 0); rl.check('b', 0); rl.check('c', 0);
    expect(rl.check('a', 1).allowed).toBe(true); // oldest key was evicted
    rl.reset();
    expect(rl.check('c', 1).allowed).toBe(true);
  });
  it('evicts the least recently seen key, so an active blocked key stays blocked', () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 });
    rl.check('a', 0); rl.check('b', 0);
    expect(rl.check('a', 1).allowed).toBe(false); // a is now most recent
    rl.check('c', 2); // evicts b, not a
    expect(rl.check('a', 3).allowed).toBe(false);
  });
});

describe('processInquiry edge cases', () => {
  it('uses singular minutes in the rate-limit message and does not echo field values', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 30_000 });
    processInquiry(valid, { key: 'k', now: 0, limiter });
    const res = processInquiry(valid, { key: 'k', now: 1, limiter });
    expect(res.ok).toBe(false);
    expect(res.message).toContain('1 minute.');
    expect(JSON.stringify(res)).not.toContain('Jane Doe');
  });
  it('returns a validation failure for non-object input', () => {
    const limiter = createRateLimiter({ limit: 10, windowMs: 1000 });
    const res = processInquiry(null, { key: 'k', limiter });
    expect(res.ok).toBe(false);
  });
  it('clientKey is stable, hashed and tolerates missing IPs', () => {
    expect(clientKey('203.0.113.9')).toBe(clientKey('203.0.113.9'));
    expect(clientKey('203.0.113.9')).not.toContain('203');
    expect(clientKey(null)).toBe(clientKey(undefined));
    expect(clientKey('a')).toHaveLength(32);
  });
});
