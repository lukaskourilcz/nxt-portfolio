import { GITHUB_USERNAME } from "@/lib/site";

// Cache the upstream contributions for an hour instead of hitting it on
// every request — the data only changes daily.
export const revalidate = 3600;

const CONTRIBUTIONS_API = `https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`;

// Best-effort, in-memory fixed-window rate limit. The response is already cached
// (revalidate above), so this mainly guards against a single client hammering
// the handler. It's per-instance and resets on cold start — deliberately light;
// swap for Upstash Redis if you ever need durable, cross-instance limits.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    // Opportunistically prune expired entries so the map can't grow unbounded.
    if (hits.size > 5000) {
      for (const [key, val] of hits) if (now > val.reset) hits.delete(key);
    }
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function GET(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const res = await fetch(CONTRIBUTIONS_API, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch contributions" },
        { status: 502 }
      );
    }

    const data = await res.json();

    return Response.json(data);
  } catch {
    // Never surface the raw error message to the client — it can leak internal
    // details (hostnames, stack fragments). Log-worthy, but respond generically.
    return Response.json(
      { error: "Failed to fetch contributions" },
      { status: 502 }
    );
  }
}
