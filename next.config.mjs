/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

// PostHog analytics + session-replay endpoints. Kept in the CSP so the lazily
// injected snippet can load its assets and phone home once a key is set. Wildcard
// covers the us/eu ingest + asset hosts (us.i.posthog.com, us-assets.i.posthog.com, …).
const posthog = "https://*.posthog.com https://*.i.posthog.com";

// A pragmatic CSP: Next.js injects inline bootstrap/hydration scripts, so
// script/style need 'unsafe-inline'; dev additionally needs eval + websockets
// for Turbopack HMR. Everything else is locked down to same-origin + PostHog.
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${posthog}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https:`,
  `font-src 'self' data:`,
  `connect-src 'self' ${posthog}${isDev ? " ws: wss:" : ""}`,
  `worker-src 'self' blob:`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  ...(isDev ? [] : [`upgrade-insecure-requests`]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Serve modern formats; Next negotiates AVIF → WebP → original per browser.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
