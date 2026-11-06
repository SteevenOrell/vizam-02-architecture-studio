// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { inquirySchema, MIN_FILL_MS } from '@/lib/inquiry-schema';
import { clientKey, processInquiry } from '@/lib/process-inquiry';
import { createRateLimiter } from '@/lib/rate-limit';

const valid = {
  name: 'Jane Doe',
  email: 'test@example.com',
  phone: '',
  organisation: '',
  projectType: 'residential',
  services: ['architecture'],
  location: 'Lisbon',
  size: '100-300',
  budget: 'undisclosed',
  timeline: 'exploring',
  message: 'A small house on a sloping site with a view to the river.',
  consent: true,
  website: '',
};

describe('inquirySchema', () => {
  it('accepts a complete brief', () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it('rejects bad email, short message, unknown enum and missing consent with readable messages', () => {
    const r = inquirySchema.safeParse({ ...valid, email: 'nope', message: 'short', projectType: 'castle', consent: false });
    expect(r.success).toBe(false);
    const fields = r.error!.issues.map((i) => i.path[0]);
    expect(fields).toEqual(expect.arrayContaining(['email', 'message', 'projectType', 'consent']));
    expect(r.error!.issues.find((i) => i.path[0] === 'email')!.message).toMatch(/valid email/);
  });

  it('requires at least one service and caps lengths', () => {
    expect(inquirySchema.safeParse({ ...valid, services: [] }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, message: 'x'.repeat(2001) }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, phone: '<script>' }).success).toBe(false);
  });

  it('trims whitespace', () => {
    const r = inquirySchema.parse({ ...valid, name: '  Jane Doe  ' });
    expect(r.name).toBe('Jane Doe');
  });
});

describe('processInquiry', () => {
  const now = 1_000_000;

  it('returns a demo success with a reference for valid input', () => {
    const res = processInquiry({ ...valid, startedAt: now - 5000 }, { key: 'a', now, limiter: createRateLimiter({ limit: 5, windowMs: 1000 }) });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.reference).toMatch(/^DEMO-[0-9A-F]{6}$/);
      expect(res.message).toMatch(/nothing was sent or stored/);
    }
  });

  it('returns field errors for invalid input', () => {
    const res = processInquiry({ ...valid, email: 'x' }, { key: 'b', now, limiter: createRateLimiter({ limit: 5, windowMs: 1000 }) });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.fieldErrors?.email).toBeTruthy();
  });

  it('answers bots (honeypot / too fast) exactly like people', () => {
    const limiter = createRateLimiter({ limit: 5, windowMs: 1000 });
    const bot = processInquiry({ ...valid, website: 'http://spam.example' }, { key: 'c', now, limiter });
    const fast = processInquiry({ ...valid, startedAt: now - (MIN_FILL_MS - 100) }, { key: 'c', now, limiter });
    expect(bot.ok).toBe(true);
    expect(fast.ok).toBe(true);
  });

  it('rate limits after the configured number of attempts', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 60_000 });
    processInquiry(valid, { key: 'd', now, limiter });
    processInquiry(valid, { key: 'd', now, limiter });
    const third = processInquiry(valid, { key: 'd', now, limiter });
    expect(third.ok).toBe(false);
    expect(third.message).toMatch(/Too many submissions/);
  });

  it('hashes client keys so raw IPs are never stored', () => {
    const k = clientKey('203.0.113.7');
    expect(k).toHaveLength(32);
    expect(k).not.toContain('203');
    expect(clientKey('203.0.113.7')).toBe(k);
  });
});

describe('createRateLimiter', () => {
  it('frees capacity once the window passes', () => {
    const l = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(l.check('k', 0).allowed).toBe(true);
    expect(l.check('k', 500).allowed).toBe(false);
    expect(l.check('k', 1500).allowed).toBe(true);
  });
});
