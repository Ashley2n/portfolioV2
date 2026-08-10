import { headers } from "next/headers";

type RateLimitOptions = {
  /** Max number of requests allowed inside the window */
  limit: number;
  /** Length of the window, in milliseconds */
  windowMs: number;
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
  /** Unix ms timestamp for when this key's window resets */
  resetAt: number;
};

type Bucket = { count: number; resetAt: number };

// Lives in this server process's memory for as long as it stays alive.
// Good enough for a single instance / low-traffic site like a portfolio.
// If you later deploy to serverless with many concurrent instances and need
// a hard global limit, swap this for Upstash Ratelimit (Redis-backed) -
// the call sites in action.ts barely change.
const buckets = new Map<string, Bucket>();

// Periodically drop expired buckets so this Map doesn't grow forever.
let lastSweep = 0;
const SWEEP_INTERVAL_MS = 10 * 60 * 1000;

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Fixed-window rate limiter. Call it with a stable key (e.g. "contact:1.2.3.4")
 * and it tells you whether this particular call is allowed to go through.
 *
 * NOT distributed: each server process/instance keeps its own counters in
 * memory, and counts reset on redeploy/restart. That's an acceptable
 * trade-off for a single-instance app; it's not a substitute for a shared
 * store (Redis, etc.) if you run many instances behind a load balancer.
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (bucket.count >= limit) {
    return { success: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

/**
 * Reads the caller's IP out of the request headers. Works behind Vercel and
 * most reverse proxies (nginx, Cloudflare, etc). `x-forwarded-for` can be a
 * comma-separated chain ("client, proxy1, proxy2"); the first entry is the
 * original client.
 *
 * Caveat: this header is only trustworthy when something in front of your
 * app (a proxy/load balancer) sets it and strips any client-supplied value.
 * On a bare Node server with nothing in front of it, a caller could set
 * this header themselves to dodge the limit - fine for a portfolio site,
 * worth knowing if you ever put something more sensitive behind this.
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();

  const realIp = headersList.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}
