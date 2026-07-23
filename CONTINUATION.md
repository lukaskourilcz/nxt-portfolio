# Portfolio overhaul completion handoff

This file records the completed autonomous portfolio overhaul begun and
validated on 22 July 2026. It remains as a repository handoff so a future agent
can understand the implementation and evidence without repeating the audit or
mistaking external work for an unfinished code change. Generative-media
production state and provider-selection rules are recorded in
`docs/generative-media.md`.

## Current state

- Branch: `agent/portfolio-overhaul-handoff`
- Starting worktree was clean; no unrelated user changes were present.
- Eight coherent milestones were committed before the final release checkpoint.
- Public content remains local, static, bilingual, schema validated, and free of
  a database, remote CMS, authentication, or public runtime content API.
- `/dev` remains development-only and its mutation APIs are now more strongly
  constrained than at the start of the session.
- No generated media was accepted during the original overhaul. A later
  continuation completed the opportunity audit, production briefs, and a
  mandatory current-provider research gate. No generation or credit spend is
  recorded; see `docs/generative-media.md`.
- Final QA added keyboard focus transfer for case-study fragment navigation, an
  explicit/focus-recovering advanced JSON field, localized generated Open Graph
  metadata, and regression coverage for the advertised Open Graph assets.
- A repository-wide Markdown reconciliation subsequently checked every tracked
  guide, internal link, package command, remaining owner task, and cost model
  against the completed implementation and current public-repository state.

## Completed implementation

### Product, research, and design system

- Audited Git, routes, content, schemas, navigation, metadata, privacy,
  analytics, `/dev`, upload security, public assets, tests, CI, and deployment
  configuration.
- Researched relevant Refero patterns directly (Linear, Column, Vercel and
  structured editorial patterns) plus Collect UI categories for portfolios,
  articles, compact navigation, mobile menus, and upload forms.
- Added authoritative product/design documents:
  - `docs/portfolio-direction.md`
  - `docs/reference-research.md`
  - `docs/design-system.md`
- Matured the existing dark direction into an editorial engineering system with
  semantic tokens, controlled reading widths, restrained green signal use,
  shared section rhythm, focus treatment, motion rules, and responsive rules.

### Public portfolio

- Added a restrained code-native `LK` brand mark and refined the page shell,
  header, mobile navigation, locale switching, footer, buttons, links, and skip
  navigation.
- Locale switching now preserves equivalent paths and hashes; mobile navigation
  restores focus and handles Escape predictably.
- Reworked every homepage section: Hero, Selected Work, Experience, Engineering
  Approach, Additional Work, Capabilities, Education, and Contact.
- Made the three flagship projects deliberately distinct:
  - banking: code-native system-boundary/migration diagram and confidentiality;
  - Ersilia: code-native paper/schema/validation workflow;
  - devShark: the exact authentic product screenshot.
- Rebuilt case studies around editorial metadata, contextual contents, project
  visuals, constraints/confidentiality, responsibilities, decisions with
  context/decision/tradeoff/outcome labels, outcomes, reflection, technology,
  and next-project navigation.
- Strengthened English/Czech content parity, unique IDs/slugs, referenced asset
  checks, and experience-to-case-study references.
- Updated localized Open Graph output, privacy pages, not-found experiences,
  analytics preference behavior, and metadata/system-page coverage.

### `/dev`, privacy, and security

- Reworked the local editor for operational density, field grouping, per-locale
  dirty state, validation summaries, status announcements, accessible image
  inputs, advanced JSON application, narrow-screen use, and unload protection.
- Changed content saves to one bilingual staged transaction with rollback so one
  locale cannot be published without the other.
- Added loopback and same-origin mutation enforcement in development.
- Preserved schema and request-size validation, atomic replacement, upload
  allowlists, decoded raster restrictions, dimension limits, metadata stripping,
  randomized names, and SVG/GIF rejection.
- Constrained PostHog to EU ingestion and preserved key absence, explicit
  consent, Do Not Track, disabled autocapture/forms/session recording/profiles,
  and deliberate events only.

### CV, assets, tests, and AI workflows

- Replaced the stale one-page CV with a current two-page, tagged A4 document
  generated from validated site content by `npm run generate:cv`.
- Verified its title, A4 dimensions, two pages, selectable text, five contact
  annotations, current custom domain, and both rendered pages. File size dropped
  from roughly 881 KB to 277 KB.
- Removed eleven confirmed-unreferenced tracked assets (about 3 MB), including a
  duplicate portrait and work-in-progress raster; all active authentic imagery
  remains.
- Expanded E2E coverage for localized routes, all case studies, metadata,
  locale/hash preservation, focus return, 320 px overflow, reduced motion,
  analytics absence, console errors, and production `/dev` isolation.
- Expanded unit/security tests and changed axe coverage to fail on every
  violation rather than only serious/critical findings.
- Added project-specific operating guidance:
  - `AGENTS.md` and `CLAUDE.md`
  - `.claude/skills/portfolio-context/`
  - `.claude/skills/implement-portfolio-route/`
  - `.claude/skills/verify/`
  - `.claude/agents/`
  - `.claude/commands/`
- Added real `check` and `check:full` package scripts and strengthened CI
  permissions, concurrency, timeouts, build, E2E, and accessibility coverage.

## Implementation commits through release validation

1. `5cc2c39` - `Document portfolio direction and design system`
2. `100ecd2` - `Establish editorial portfolio foundations`
3. `b2479cb` - `Redesign homepage and flagship case studies`
4. `5f5a390` - `Make bilingual editor saves transactional`
5. `47b2cbe` - `Strengthen public pages privacy and release coverage`
6. `55d1f4d` - `Add project-specific agent workflows`
7. `685bba2` - `Refresh the CV and portfolio assets`
8. `48df43f` - `Add portfolio overhaul continuation handoff`
9. `e98b28c` - `Complete portfolio release validation`

## Final validation evidence

Completed successfully:

- `npm run check`: content validation, repository-wide lint, type-check, and 18
  Vitest tests all passed. Content validation found 12 work items, 8 roles, 21
  referenced assets, and English/Czech parity.
- `npm run build`: Next.js 15.5.21 production build passed and generated 19
  static pages, including both locales and all six localized case-study routes.
- `npm run test:e2e`: all 21 Chromium tests passed, covering localized
  routes, keyboard navigation, fragment focus, 320 px reflow, metadata and Open
  Graph delivery, locale/hash preservation, analytics absence, reduced motion,
  production `/dev` isolation, localized not-found behavior, and console errors.
- `npm run test:a11y`: axe found no violations on the two localized homepages,
  two privacy pages, and three English flagship case studies.
- The in-app browser was used for manual QA at 320, 390, 768, 1024, 1280, 1440,
  and 1680 px across the English and Czech homepages, all three case studies,
  both privacy pages, localized not-found state, and `/dev`.
- Manual interaction checks covered mobile menu Escape/focus return,
  locale/hash retention, case-study fragment focus, editor invalid-JSON focus,
  configured analytics decline/reopen behavior, editor dirty/reset state, wide
  layout containment, image/caption authenticity, and browser console output.
- HTTP checks confirmed the permanent root redirect, robots restrictions,
  localized sitemap entries, CV download, and resolvable generated Open Graph
  images with localized case-study alt text.
- Skill frontmatter and `agents/openai.yaml` validation using Ruby YAML because
  the bundled Python validator lacked PyYAML.
- CV generation, PDF metadata/structure extraction, and visual inspection of
  both rendered pages.
- Repository-wide documentation validation found no broken internal Markdown
  links or missing referenced npm scripts. Current provider pricing assumptions
  were reconciled with official documentation and the repository's public
  visibility.

## Repository work remaining

No feasible implementation or validation work remains from the original
overhaul. The items below require deployment, specialist tooling, owner input,
or completion of the current generative-provider research gate and are not safe
substitutes for local code changes.

## Manual or external boundaries

- Lighthouse budgets require a measured deployed run; do not claim scores from
  local source inspection.
- PDF/UA conformance, screen-reader behavior, 200/400 percent zoom, deployed
  headers, Vercel configuration, PostHog retention, and production domain state
  remain manual/external checks unless actually measured.
- Verified project metrics, testimonials, custom-domain email setup, profile
  updates, and a higher-resolution approved portrait require owner input or
  external account access; see `NEEDED.md` and `docs/manual-follow-ups.md`.

## Generative-media production state

Before recommending a paid plan, the next agent must research current free and
low-cost providers under the comparison and safety rules in
`docs/generative-media.md`. Resume the three selected asset
families only with a documented suitable provider: abstract banking cover,
scientific metadata-workflow cover, and deterministic devShark screenshot
environment. Hero, identity, social imagery, and motion were reviewed and
intentionally not selected. Authentic portrait and UI pixels must remain
unchanged; banking UI and scientific outcomes must never be fabricated.
