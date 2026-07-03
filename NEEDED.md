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

## Notes

- **This file** (`NEEDED.md`) is just for you — delete it once you've worked
  through the list: `git rm NEEDED.md && git commit -m "Remove NEEDED.md" && git push`.
- No secrets are committed. `.env.example` is a template only; real keys go in
  Vercel / `.env.local` (both gitignored).
