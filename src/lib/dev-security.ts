import type { Locale } from "@/lib/content-schema";

export const MAX_CONTENT_BYTES = 1_000_000;
export const MAX_UPLOAD_BYTES = 5_000_000;
export const MAX_UPLOAD_REQUEST_BYTES = MAX_UPLOAD_BYTES + 64_000;
export const MAX_IMAGE_DIMENSION = 8_000;
export const ALLOWED_UPLOAD_DIRS = new Set(["projects", "logos", "education", "uploads"]);

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

export function isTrustedDevRequest(request: Request): boolean {
  if (!isDevelopment()) return false;
  const url = new URL(request.url);
  if (!LOCAL_HOSTNAMES.has(url.hostname)) return false;
  const origin = request.headers.get("origin");
  return !origin || origin === url.origin;
}

export function devRequestDeniedResponse(request: Request): Response | null {
  if (!isDevelopment()) return new Response(null, { status: 404 });
  if (!isTrustedDevRequest(request)) {
    return Response.json({ error: "Development requests must originate from this local server" }, { status: 403 });
  }
  return null;
}

export function devRouteMethodResponse(): Response {
  return isDevelopment()
    ? Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } })
    : new Response(null, { status: 404 });
}

export function contentFilename(locale: Locale): string {
  return locale === "en" ? "site-content.json" : "site-content.cs.json";
}

export function safeAssetBase(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "image";
}
