---
name: verify
description: Build, run, and visually drive this portfolio site to verify changes (Next.js static site with scroll/hover/touch animations).
---

# Verifying changes in this repo

Single-page Next.js 15 portfolio (App Router, Tailwind v4, motion/react).
Almost everything user-visible is animation- or viewport-dependent, so
verification means driving a real browser at both mobile and desktop sizes.

## Build & serve

```bash
npm ci                 # first time
npm run lint
npm run build          # turbopack; runs the TS check
npm run start          # serves the production build on :3000
```

Gotcha: before restarting `next start` after a rebuild, actually free the
port (`fuser -k 3000/tcp`) and confirm the new process came up (`tail
server.log` for EADDRINUSE). A stale server serves old chunk names → the
client crashes with 404/MIME errors and React unmounts the whole page.

## Drive it

Use `playwright-core` (install into the scratchpad, not the repo) with the
pre-installed Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.

- Sections live at `/#stack`, `/#projects`, `/#experience`, `/#education`,
  `/#contact`. Scroll with `scrollIntoView({ behavior: "instant" })` —
  `html` has smooth scrolling that otherwise delays whileInView triggers.
- Mobile context: `{ viewport: {width: 390, height: 844}, isMobile: true,
  hasTouch: true }`; also test 320px and `reducedMotion: "reduce"`.
- The mobile stack icons float permanently, so Playwright's stability check
  makes `.tap()` time out — use `.tap({ force: true })`.
- "Which stack icon is spotlighted/hovered" can be read programmatically:
  name pills are `#stack span` elements whose inline `style.opacity === '1'`
  (filter `offsetParent !== null` to skip the hidden desktop/mobile twin).
- Project-card flashlight color: read `--spot-color` off `#projects article`
  after `.hover()`.
- Check `document.documentElement.scrollWidth - clientWidth === 0` on mobile
  after interactions (labels near canvas edges are the overflow risk).
- Collect `pageerror`/console errors on every page — hydration bugs here
  often surface only as console noise while the page still looks fine.
