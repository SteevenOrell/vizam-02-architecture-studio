import { createHash, randomBytes } from 'node:crypto';
import { inquirySchema, MIN_FILL_MS, type InquiryData, type InquiryResult } from './inquiry-schema';
import { createRateLimiter, type RateLimiter } from './rate-limit';

export const inquiryLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/** Hash the client key so no raw IP address is ever held in memory. */
export function clientKey(ip: string | null | undefined): string {
  return createHash('sha256').update(`ostrel:${ip || 'unknown'}`).digest('hex').slice(0, 32);
}

const DEMO_MESSAGE =
  'Thank you — your brief passed validation. This is a demo: nothing was sent or stored, and no one will contact you.';

/**
 * Validates an inquiry. Pure apart from the limiter so it can be unit-tested.
 * Never logs or persists field values.
 */
export function processInquiry(
  input: unknown,
  { key, now = Date.now(), limiter = inquiryLimiter }: { key: string; now?: number; limiter?: RateLimiter },
): InquiryResult {
  const rate = limiter.check(key, now);
  if (!rate.allowed) {
    const minutes = Math.max(1, Math.ceil(rate.retryAfterMs / 60000));
    return { ok: false, message: `Too many submissions from this connection. Please try again in about ${minutes} minute${minutes > 1 ? 's' : ''}.` };
  }

  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof InquiryData, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof InquiryData | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { ok: false, message: 'Some answers need another look.', fieldErrors };
  }

  const reference = `DEMO-${randomBytes(3).toString('hex').toUpperCase()}`;
  // Bots: honeypot filled, or submitted faster than a person could. Pretend success and drop silently.
  const tooFast = parsed.data.startedAt !== undefined && now - parsed.data.startedAt < MIN_FILL_MS;
  if (parsed.data.website || tooFast) return { ok: true, message: DEMO_MESSAGE, reference };

  return { ok: true, message: DEMO_MESSAGE, reference };
}
