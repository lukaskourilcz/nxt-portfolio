# NEEDED — action items for you

Everything in the PR is code-complete, builds, lints, and passes a live header
smoke test. A few things need **your** hands because they require accounts,
secrets, or dashboards I can't reach from the coding environment.

Work top to bottom. Items are ordered by importance.

---

## 1. Deployment (Vercel) — REQUIRED

I merged the branch into `main`. I **cannot trigger the actual deploy** — I have
no Vercel access from here. What happens next depends on your setup:

- **If Vercel's GitHub integration is connected to this repo** (the normal case
  for a Next.js portfolio): the merge to `main` **auto-triggers a production
  deploy**. Just open your Vercel dashboard and confirm the new deployment
  (commit "Adopt motion, add security headers…") went green.
- **If it is NOT connected**: connect it once at
  <https://vercel.com/new> → import `lukaskourilcz/nxt-portfolio` → framework
  auto-detects Next.js → Deploy. After that, every push to `main` deploys
  automatically.

> Nothing in the code assumes Vercel specifically — it's a standard Next.js 15
> app and will deploy on any Node host (`npm run build` → `npm start`).

- [ ] Confirm the production deploy succeeded and the live site loads.

---

## 2. Turn on PostHog analytics — REQUIRED for analytics to do anything

PostHog ships **disabled by default**. With no key set, the tracking snippet is
never injected (verified). To switch it on:

1. Create a free account at <https://posthog.com> (free tier: 1M events +
   5K session recordings/month, no credit card).
2. Create a project → **Settings → Project → copy the "Project API Key"**
   (starts with `phc_...`).
3. Add two environment variables in **Vercel → Project → Settings →
   Environment Variables** (set for **Production**, and Preview if you want):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_POSTHOG_KEY` | `phc_...` (your key) |
   | `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` (or `https://eu.i.posthog.com` for EU) |

4. **Redeploy** — `NEXT_PUBLIC_*` vars are baked in at build time, so a redeploy
   is required for them to take effect (Vercel → Deployments → ⋯ → Redeploy, or
   just push any commit).
5. In PostHog, enable session replay: **Settings → Session Replay → toggle
   "Record user sessions"** (analytics/pageviews work without this; replay needs
   the toggle).

- [ ] Env vars added in Vercel
- [ ] Redeployed after adding them
- [ ] Session replay toggled on in PostHog
- [ ] Visit the live site, then confirm events appear in PostHog → Activity

> Local dev: copy `.env.example` to `.env.local` and paste the key there to test
> before deploying.

---

## 3. Post-deploy sanity check (5 minutes) — RECOMMENDED

The new Content-Security-Policy is strict. It's tuned for Next.js + PostHog and
tested locally, but confirm nothing is blocked in production:

1. Open the live site, open **DevTools → Console**.
2. Look for any red `Content-Security-Policy` / `Refused to …` errors.
3. Scroll to the GitHub contributions grid — it should render (it calls the
   same-origin `/api/contributions`).
4. If PostHog is on, confirm no CSP error mentions `posthog` and that events land.

If you ever add a third-party script (a font CDN, an embed, etc.), it will be
blocked until you add its host to the CSP in `next.config.mjs` (`script-src` /
`connect-src` / `img-src` as appropriate).

- [ ] No CSP errors in the console
- [ ] Contributions grid renders
- [ ] Cursor spotlight + hero mesh gradient look right

---

## 4. Optional — customize the hero mesh gradient

I hand-wrote a subtle emerald-forward mesh gradient (`.hero-mesh` in
`src/app/globals.css`). If you'd rather art-direct it with **Colorflow**
(<https://colorflow.ls.graphics>), generate a mesh there, export the CSS, and
replace the `background-image` radial-gradient stack in `.hero-mesh`. Keep it
low-opacity and masked so it stays a background accent, not a redesign.

---

## 5. NEW — AI-tools catalogue items

### 5a. Spotlight project cards — shipped, no action *(Aceternity/Magic UI, High)*

The project cards now use a new **`SpotlightCard`**
(`src/components/ui/spotlight-card.tsx`) — a cursor-following emerald glow +
hover border lift, so the grid reads as designed instead of the same flat box
repeated (the #1 "AI-slop" flag in `fable-suggestions.md`). Pointer-only, so
touch/reduced-motion users get the static card. It's a generic wrapper — reuse
it on the Education or Experience cards the same way if you like.

### 5b. Recraft / Ideogram hero art — needs you *(explicitly requested)*

I **can't generate images** — Recraft/Ideogram render art from your account. So
I left a placeholder at **`public/hero-art.svg`** (an abstract emerald aurora
sized for the hero's right column) as the swap target.

**To finish:**
1. Generate a bespoke hero illustration with **Recraft** (<https://recraft.ai>,
   vector/SVG output) or **Ideogram** (<https://ideogram.ai>).
2. Save it over `public/hero-art.svg` (keep the name), or export a PNG and
   update the reference.
3. Wire it into `src/app/components/hero/HeroSection.tsx` — the right column
   (`md:grid-cols-[1.05fr_0.95fr]`) currently holds the terminal; add the art
   beside/behind it, or swap the terminal for it. It is **not** wired in yet
   (I didn't want to redesign your hero unprompted) — the file is staged and
   ready.

> Your existing **favicon** (`src/app/icon.svg`) and **OG image**
> (`opengraph-image.tsx`, generated) are already solid — no Recraft needed there.

### 5c. Optional — re-theme with tweakcn *(High, but your design call)*

`fable-suggestions.md` flags emerald overuse. I did **not** unilaterally recolor
your portfolio (a subjective brand decision). If you want to diversify the
palette: open **tweakcn** (<https://tweakcn.com>), design a theme (or generate
one from an image), and paste the exported CSS variables into the `@theme`
block + `:root` tokens in `src/app/globals.css`. The `SpotlightCard` glow reads
from `--color-ring`, so it follows whatever accent you choose.

### 5d. Optional — measure the devicon bundle *(Medium)*

`fable-suggestions.md` flagged devicon bundle bloat. Run the deployed URL through
**PageSpeed Insights** (<https://pagespeed.web.dev>) or **DebugBear**
(<https://www.debugbear.com/tools>) and, if the icon payload shows up, import
only the specific brand icons you use instead of the full set.

---

## Notes

- **This file** (`NEEDED.md`) is just for you — delete it once you've worked
  through the list: `git rm NEEDED.md && git commit -m "Remove NEEDED.md" && git push`.
- No secrets are committed. `.env.example` is a template only; real keys go in
  Vercel / `.env.local` (both gitignored).
