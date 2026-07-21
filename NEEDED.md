# NEEDED — portfolio to-do list

Everything is code-complete, builds, lints, and is deployed. These are the items
that need **your** hands (accounts, secrets, dashboards, or artwork). Each task
carries an importance score `[imp:N]` (1–5, 5 = highest). This file is parsed
into the OwnDashboard **Úkoly** section, where you can filter by that priority.

## Tasks

- [ ] **Turn on PostHog analytics** — add `NEXT_PUBLIC_POSTHOG_KEY` + `_HOST` in Vercel, redeploy, and toggle Session Replay on in PostHog (disabled, no data, until then). `[imp:2]`
- [ ] **Smoke-test the CSP + security headers in production** — the strict CSP only applies on Vercel; check DevTools console for `Refused to …` errors after deploy. `[imp:2]`
- [ ] **Replace the hero-art placeholder** (`public/hero-art.svg`) with real art from Recraft/Ideogram and wire it into `HeroSection.tsx`. `[imp:2]`
- [ ] **Customize the hero mesh gradient** (`.hero-mesh` in `globals.css`) — art it with Colorflow if you want to move off the hand-written emerald mesh. `[imp:1]`
- [ ] **Re-theme with tweakcn** — optionally diversify the emerald-heavy palette via exported CSS variables in `globals.css`. `[imp:1]`
- [ ] **Measure the devicon bundle** — run the deployed URL through PageSpeed / DebugBear and import only the brand icons you use if the payload shows up. `[imp:1]`

## Details

**PostHog** — create a free project (<https://posthog.com>), copy the Project API
Key (`phc_…`), add `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST`
(`https://eu.i.posthog.com` or US) in **Vercel → Settings → Environment
Variables**, then **redeploy** (these are baked in at build time). Enable
**Settings → Session Replay** in PostHog. Local: paste into `.env.local` to test.

**CSP check** — open the live site → DevTools → Console; look for red
`Content-Security-Policy` / `Refused to …` errors. Any new third-party host must
be added to the CSP in `next.config.mjs` (`script-src` / `connect-src` /
`img-src`).

**Hero art** — generate a bespoke illustration with **Recraft**
(<https://recraft.ai>, vector/SVG) or **Ideogram** (<https://ideogram.ai>), save
it over `public/hero-art.svg` (keep the name), and add it to the hero's right
column in `src/app/components/hero/HeroSection.tsx` (currently the terminal). The
favicon (`icon.svg`) and generated OG image are already solid.
