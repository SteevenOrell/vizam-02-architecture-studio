'use server';

import { headers } from 'next/headers';
import type { InquiryResult } from '@/lib/inquiry-schema';
import { clientKey, processInquiry } from '@/lib/process-inquiry';

/**
 * Demo inquiry endpoint. Re-validates on the server with the same Zod schema as the client,
 * applies a honeypot, a minimum fill time and a basic per-instance rate limit.
 * Nothing is sent, stored or logged.
 */
export async function submitInquiry(input: unknown): Promise<InquiryResult> {
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip');
  try {
    return processInquiry(input, { key: clientKey(ip) });
  } catch {
    return { ok: false, message: 'Something went wrong on our side. Please try again.' };
  }
}
