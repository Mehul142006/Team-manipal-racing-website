const buckets = new Map<string, number[]>();

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Returns true when the caller is still within the limit. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

export function isCrossSitePost(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return true;

  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}
