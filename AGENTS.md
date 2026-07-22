# Repository operating guide

## Product

Lukas Kouril Portfolio is a bilingual, statically rendered professional
portfolio for a Prague-based senior software engineer. It must prove—through
context, decisions, constraints, and implementation quality—that Lukáš can own
complex web-product work and its real-world consequences.

Primary audiences are senior engineering managers, frontend leads, CTOs, and
technical hiring managers, followed by founders/product owners evaluating
selected freelance work. Support fast evaluation on the homepage and deep
evaluation in the three case studies: banking modernization, Ersilia scientific
metadata tooling, and devShark.

Read `docs/portfolio-direction.md` for product, brand, journeys, voice, and
anti-positioning. Read `docs/design-system.md` before UI changes and
`docs/reference-research.md` before introducing a new visual pattern.

## Architecture and paths

- Public routes: `src/app/(site)/[locale]/`
- Homepage sections: `src/app/components/`
- Shared components: `src/components/`
- English/Czech content: `src/content/site-content*.json`
- Content schema/parity: `src/lib/content-schema.ts`
- Metadata/site constants: `src/lib/metadata.ts`, `src/lib/site.ts`
- Local editor: `src/app/(dev)/` and `src/app/api/dev/`
- Styles/tokens: `src/app/globals.css`
- Unit/E2E: `tests/`
- Product/design docs: `docs/`

The public site uses validated local JSON, server components, static routes,
`next/image`, and no database, remote CMS, authentication, or public content
API. Client code is limited to navigation, locale routing, consent, and `/dev`.

## Non-negotiable invariants

- Search with `rg` before creating a component, hook, type, helper, token,
  layout, test pattern, skill, agent, or command. Extend or compose first.
- Preserve stable IDs, ordering, slugs, and structural parity across English and
  Czech. Update both documents and run `npm run validate:content`.
- Preserve business/content behavior and do not invent facts, clients, metrics,
  testimonials, leadership scope, scientific outcomes, or confidential details.
- Never fabricate banking/scientific/product UI. Keep authentic screenshots
  exact and generated imagery out of filler roles.
- `/dev` and `/api/dev/*` remain development-only and mutation requests remain
  loopback/same-origin. Preserve size limits, schema/parity validation,
  transactional staging, atomic replacement, upload allowlists, decoded raster
  restrictions, dimension limits, metadata stripping, SVG/GIF rejection, and
  randomized filenames. Do not add a production bypass or authentication as a
  substitute for isolation.
- Analytics stays absent without a key, explicit-consent-only when configured,
  EU-hosted, Do Not Track aware, and without autocapture, form capture, session
  recording, or person profiles.

## Design, writing, and media

Use semantic tokens and shared editorial components. Geist Sans is primary;
Geist Mono is an annotation layer. Green is a signal for focus/action/status,
not a section wash. Prefer typography, spacing, rules, metadata, and authentic
evidence over cards or decorative effects.

Write specifically, calmly, and in plain language. Explain business value
without hiding technical depth. Avoid generic SaaS/AI copy, superlatives,
technology walls, repeated pills, glass, random glow, giant gradients, fake
charts, fake terminals, and decorative metrics.

Higgsfield media production is deferred because its integration is unavailable.
Do not use another generator or create placeholder assets. The prepared slots
and intended uses are in `docs/deferred-media.md`.

## Accessibility and responsive behavior

Target WCAG 2.2 AA without certification claims. Preserve landmarks, sequential
headings, skip navigation, visible focus, keyboard/Escape/focus-return behavior,
meaningful link names, 44 px controls, localized alternative text, non-color
states, status announcements, reduced motion, and 320 CSS pixel reflow.

Validate 320, 390–430, 768, 1024–1280, 1440, and wide desktop behavior. Keep
long-form reading widths controlled; do not solve mobile by turning every datum
into a full-width card. Use `docs/accessibility-checklist.md` for manual limits.

## Commands and validation

```bash
npm run validate:content
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:a11y
npm run check
npm run check:full
```

Run proportional checks during implementation and the complete release workflow
before handoff. Report only checks that completed. Inspect localized routes,
locale switching, metadata, sitemap/robots, privacy, analytics absence/consent,
production `/dev` isolation, console errors, keyboard behavior, reduced motion,
and representative widths. Treat Lighthouse scores, deployed headers, zoom,
screen-reader behavior, and PDF accessibility as manual until measured.

## Git workflow

Preserve unrelated worktree changes. Never reset, discard, or reformat unrelated
work. Stage deliberately. Large autonomous tasks use coherent incremental
imperative commits after meaningful validation; continue automatically after
each checkpoint. Do not commit secrets, caches, `.env`, dependencies, or
temporary assets. Do not push, deploy, or rewrite history unless explicitly
requested.

## AI workflows

- `$portfolio-context`: product, content, brand, confidentiality, privacy, and
  editor guardrails.
- `$implement-portfolio-route`: complete localized route/section implementation.
- `$verify`: evidence-based release validation.
- Agents: `.claude/agents/portfolio-route-implementer.md`,
  `ux-visual-qa.md`, and `accessibility-reviewer.md`.
- Commands: `/implement-route`, `/visual-qa`, and `/release-validate`.

## Definition of done

Implementation, content, both locales, design tokens, tests, and documentation
agree. Relevant automated checks pass; representative responsive and keyboard
flows are inspected; real non-happy states are handled; privacy and `/dev`
security are unchanged or stronger; no unsupported claim or fake visual is
introduced; intended files are committed and temporary files removed.
