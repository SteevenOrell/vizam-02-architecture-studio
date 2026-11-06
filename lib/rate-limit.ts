/**
 * Minimal in-memory sliding-window rate limiter.
 * Per server instance only: on serverless platforms each instance has its own memory, so this is a basic speed bump,
 * not a guarantee. Swap for a shared store (e.g. Redis/KV) before production use.
 */
export interface RateLimiter {
  check(key: string, now?: number): { allowed: boolean; remaining: number; retryAfterMs: number };
  reset(): void;
}

export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    check(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      // Re-insert so Map order is least-recently-seen first: eviction then drops idle keys, not active ones.
      hits.delete(key);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return { allowed: false, remaining: 0, retryAfterMs: windowMs - (now - recent[0]) };
      }
      recent.push(now);
      hits.set(key, recent);
      // Bound memory: drop the least recently seen key when the map grows too large.
      if (hits.size > maxKeys) hits.delete(hits.keys().next().value as string);
      return { allowed: true, remaining: limit - recent.length, retryAfterMs: 0 };
    },
    reset() {
      hits.clear();
    },
  };
}
