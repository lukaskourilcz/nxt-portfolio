# fable-suggestions.md — UX modernization audit

Reviewed against `main` @ `f42bb15`. An honest pass over the whole site looking
for "AI slop" patterns (things every Claude-generated portfolio ships with),
plus responsiveness and polish issues. Organized by impact; file references
point at the current code.

**Already good (recent work that landed):** real screenshots on every project
card, always-visible live-link icons, calmer single-effect card hover,
per-brand hover colours in the stack, trimmed education tags, simplified
footer, touch-safe cursor spotlight, security headers, sharp-corner radius
system. The suggestions below build on that, they don't re-litigate it.

---

## 1. Bugs / functional gaps first

### 1a. Nav clips off-screen between ~768px and ~1130px
`nav.tsx:50` and `nav.tsx:117` apply `md:-ml-[50px]` / `md:-mr-[50px]` to pull
the email and resume button outward. The container is `max-w-5xl px-6`
(1024px + 24px padding), so those offsets only have room when the viewport is
≥ ~1130px. From `md` (768px) up to that point, the avatar/email is pulled
**26px past the viewport edge** and clipped (`html` has `overflow-x: clip`, so
it's silently cut, not scrollable). Fix: apply the negative margins only when
there's room — `min-[1130px]:-ml-[50px]` — or drop them and let the grid
breathe inside the container.

### 1b. The contribution garden doesn't exist on mobile
`StackSection.tsx:339` — the whole garden backdrop (header, grid, caption) is
`hidden sm:block`. Phone visitors — recruiters skimming on a commute are a
primary audience — never see your contributions at all. Now that the grid
auto-sizes cells to its container (`github-grid.tsx:66-78`), a small
4–6-month version is cheap to show below the constellation on mobile.

### 1c. Project cards aren't clickable where users will click
`ProjectsSection.tsx:180` — the title is intentionally not a link, and the only
link is a 26px icon in the banner corner. Users tap the screenshot and the
title first; both are dead. You don't need the old triple-hover back — just
make the banner image (or the whole card) the link to the live site, keep the
icon as the visual affordance. On touch, a 26px sole target is below the 44px
minimum.

### 1d. Stack constellation is anonymous on touch
`StackSection.tsx` — names appear only via hover (`IconBubble`, line 285).
On phones/tablets the section is ~50 unlabeled logos at ~30–35px, with the
repulsion/tilt/glow interactions unreachable. Keep the constellation `md:` and
up — it's the most original thing on the site — but below `md` swap to a
grouped, labeled grid (Languages / Frameworks / Backend & Data / Tooling /
AI) with icon + visible name.

### 1e. Garden overflows the viewport at tablet widths
`StackSection.tsx:348` scales the grid `1.3×` and the caption is `w-[130%]`
(line 355). The container is `max-w-3xl` (768px); at 130% that's ~1000px of
visual width. Between `sm` (640px, where the garden turns on) and ~1050px the
scaled grid and the right-aligned caption extend past the viewport and get
clipped by `overflow-x: clip`. Verify at 640–1000px; likely fix is scaling
down (or not up) below `lg`.

## 2. The big design one: the same AI-default card, five times

The pattern `rounded-* border border-zinc-800 bg-zinc-900 shadow-card`
(± emerald hover border ± lift) still appears everywhere:

- Project cards — `ProjectsSection.tsx:152`
- Experience timeline cards — `ExperienceSection.tsx:178`
- Academy cards — `EducationSection.tsx:137`
- Educator cards — `EducationSection.tsx:194` (still has the full
  lift + emerald border + shadow triple hover)
- Contact rows — `ContactSection.tsx:62`

When everything is a box, nothing is. Modern professional sites (Linear,
Vercel, the good personal sites) get structure from **typography, alignment
and hairline dividers, not boxes**. Suggestion — keep real cards only where
there's an image to frame (projects), and de-box the rest:

- **Experience** → drop the cards *and* the left-rail-with-dots timeline
  (another AI default, `ExperienceSection.tsx:168-176` — the rail also eats
  ~2.5rem of width on 320–375px phones). Use an editorial per-entry grid:
  `grid sm:grid-cols-[140px_1fr]`, mono period on the left, role + company +
  bullets right, single `border-t` hairline between entries. No bg, no hover
  lift. This is the single biggest "designed, not generated" shift available.
- **Contact rows** → plain rows or inline `label: value` pairs; three boxes
  for email/phone/location is box inflation. Also make the whole row the
  anchor — the tap target is currently the small nested text link.
- **Educator cards** → compact two-column list (see §5).

## 3. Emerald-on-zinc is still the default AI dark palette

The stack section now lights up in per-brand colours (good). Everywhere else
emerald is still the answer to every question: nav numbers, prompts, tag
pills, icon chips, timeline dots, hover borders, hover text, buttons,
selection, scrollbar. That uniformity is the tell.

**Suggestion — demote emerald from "brand color" to "terminal semantic":**
- Reserve emerald for literally terminal-flavored things: `$` prompts, the
  `SectionHeading` command, the availability dot.
- Make hover states **monochrome** (zinc-500 → zinc-100 brightness steps, or
  `hover:bg-white/[0.02]` on surfaces) instead of hue shifts. Kill
  `hover:border-emerald-500/40` on cards/rows.
- `button.tsx:14`: white → emerald-400 bg on hover is a loud hue swap; white →
  zinc-200 reads calmer and more premium.
- Optional: warm the base. `--background` (`globals.css:33`) is already oklch —
  a tiny chroma shift toward warm gray separates you from every zinc site.

## 4. Tag pill fatigue

`Tag` (emerald/10 bg + emerald/20 border pill) is the most recognizable AI-UI
element, and the site still renders ~75 of them: 5 per project card, tag rows
on every job, 10+8 on academies, plus educators. The education trim helped;
the *rendering* is still pills everywhere.

**Suggestion:** default to plain mono text with middots — `Next.js ·
TypeScript · Prisma` in `text-xs text-zinc-500` — for projects' tech footers,
experience tags, and academy skills. It's quieter, more editorial, and makes
the few remaining highlights actually stand out. Keep at most one pill style
for rare emphasis.

## 5. Positioning: the educators grid reads junior

`EducationSection.tsx:67-124` — for a *senior* engineer, a 7-card grid
celebrating Udemy/YouTube instructors (CleverProgrammer, Rafeh Qazi…) with
monogram chips and hover lifts spends prime résumé real estate on other
people's brands, styled with the same weight as your actual jobs. Matt
Pocock/Josh Comeau are fine names; the *presentation* is the problem.
Compress to a modest un-boxed line list under Education ("courses: Joy of
React, Total TypeScript, …") — or cut it.

Related: **Experience** still shows 9 full entries back to 2015 including
non-engineering roles, ×6 bullets each — a wall on mobile. Show engineering
roles in full; collapse Controlant/Entain/Kiwi into one-line entries under an
"Earlier" divider (period — company — role). Recruiters get the trajectory
without the scroll tax.

## 6. Hero polish

The terminal is your brand — keep it. Remaining nits:

- `$ whoami` eyebrow (`HeroSection.tsx:48`) + the terminal *also* running
  `whoami` says the same thing twice, side by side. Change one (eyebrow →
  `// senior frontend engineer`, or vary the terminal script).
- `"available for work ✅"` (`HeroSection.tsx:110`) — an emoji inside
  otherwise-faithful bash output is off-key. `STATUS=available` in green
  reads better in-world.
- Two ping-animated availability dots (hero avatar `HeroSection.tsx:38-41` +
  nav avatar `nav.tsx:84-87`). One live dot is a signal; two is decoration.
- `scroll ↓` (`HeroSection.tsx:116-123`) is a generated-site tell; drop it or
  make it a real affordance.
- Mobile: `min-h-screen` + `justify-start` (line 15) leaves a large dead gap
  below the terminal on tall phones, and the terminal sits half below the
  fold. Use `min-h-[100svh]` and let the section shrink to content below `lg`.
- Tablet: the hero stays single-column until `lg`, so portrait tablets get a
  wide lonely column. Consider two columns from `md`.

## 7. Motion still feels generated

Every element does the same `opacity 0→1, y 16→0, 0.5s ease-out` whileInView
fade-up with stagger (`reveal.tsx`, used ~30×). Uniform page-wide fade-up
stagger is the most recognizable AI motion signature. The hover-transition
cleanup already landed; do the same for entrances: hero + section headings
animate, in-section content just appears (or opacity-only, ~200ms, no
y-shift, no stagger). Fewer, faster animations read premium. Reduced-motion
handling is already good — keep it.

## 8. The garden-behind-constellation tradeoff

Layering real contribution data at `opacity-30` behind floating icons
(`StackSection.tsx:339-358`) makes it decorative — hard to read as data, and
it competes with the icons for the same visual space (plus its Radix tooltips
sit *under* the icon layer, so some cells can't be hovered at all). Two
coherent directions; pick one:

- **Commit to decoration**: drop the month labels + tooltips entirely (they
  promise data the layer can't deliver), keep it as texture.
- **Commit to data**: give the grid back its own compact panel below the
  constellation (which also solves mobile, §1b) at full opacity.

The "wish I could show you the GitLab stats" caption is genuinely charming —
keep it wherever the grid ends up.

## 9. Smaller consistency & quality wins

- **Terminal breaks the design system**: hardcoded `rounded-[10px]`
  (`terminal.tsx:331`) vs your 1–3px sharp-corner tokens, and `neutral-*`
  grays throughout vs `zinc-*` everywhere else. Unify both.
- **Mobile nav menu** (`nav.tsx:121-150`): no `aria-expanded`/`aria-controls`
  on the toggle, no open/close animation, no active-section state, no Escape
  to close. Small lift, feels much more finished.
- `aria-current="true"` (`nav.tsx:99`) → `aria-current="location"`.
- **devicon CSS** (`globals.css:2`) ships the entire icon font for ~35 glyphs
  — the single easiest bundle win. Inline SVGs (you already do this for
  shadcn/Drizzle/brands) would also let you unify hover colouring.
- `STACK` still lists **Framer Motion** (`StackSection.tsx:100`) — the site
  itself just migrated to `motion`; rename the entry.
- Stack curation: ~50 items, and the AI row lists ChatGPT, Perplexity, Grok,
  Gemini, Copilot, Cursor *and* "Superpowers" — using AI chat apps isn't a
  skill signal in 2026 and dilutes the real stack. One entry ("Claude Code /
  agentic tooling") says more. Also: icon sizes crown JavaScript/HTML/CSS
  (`ICON_SIZE_PX`, lines 218-221) while the hero says senior
  TypeScript/React — resize so TS/React lead.
- Educator title arrow is still hover-only (`EducationSection.tsx:203`) —
  invisible on touch; make it always visible or drop the arrow.
- `NEEDED.md` in the repo root is a done-list per its own instructions —
  delete once worked through.

---

## Suggested priority order

1. **§1 bugs** — nav clipping (1a) and unclickable project cards (1c) are
   user-visible today; garden-on-mobile (1b) and touch stack (1d) close the
   two biggest mobile gaps.
2. **§2 de-box Experience + Contact** (+ §5 collapse early career) — the
   biggest "not-a-template" visual shift.
3. **§3 + §4 emerald demotion & pill cull** — global, mechanical, large
   aesthetic payoff.
4. **§5 educators reframe** — positioning win, 30 minutes of work.
5. **§6 hero + §7 motion budget** — cheap polish that changes perceived speed.
6. **§8 garden decision + §9 consistency pass.**
