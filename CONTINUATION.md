# Portfolio overhaul continuation

This file is the restart handoff for the autonomous portfolio overhaul begun on
22 July 2026. Continue from this repository state; do not repeat the completed
audit, research, or implementation. The original acceptance criteria still
apply, except that all Higgsfield work is explicitly deferred until its MCP is
available.

## Current state

- Branch: `agent/portfolio-overhaul-handoff`
- Starting worktree was clean; no unrelated user changes were present.
- Seven implementation milestones are committed before this handoff commit.
- Public content remains local, static, bilingual, schema validated, and free of
  a database, remote CMS, authentication, or public runtime content API.
- `/dev` remains development-only and its mutation APIs are now more strongly
  constrained than at the start of the session.
- Higgsfield was not researched, invoked, or replaced with another generator.
  Prepared integration slots are documented in `docs/deferred-media.md`.

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

## Commits already created

1. `5cc2c39` - `Document portfolio direction and design system`
2. `100ecd2` - `Establish editorial portfolio foundations`
3. `b2479cb` - `Redesign homepage and flagship case studies`
4. `5f5a390` - `Make bilingual editor saves transactional`
5. `47b2cbe` - `Strengthen public pages privacy and release coverage`
6. `55d1f4d` - `Add project-specific agent workflows`
7. `685bba2` - `Refresh the CV and portfolio assets`

## Validation evidence so far

Completed successfully:

- `npm run validate:content` (multiple runs): 12 work items, 8 roles, 21
  referenced assets, English/Czech parity.
- Targeted ESLint runs for every implementation milestone.
- Repository-wide `npm run lint` as the lint stage of the final `npm run check`.
- `npx vitest run tests/dev-security.test.ts`: 12/12 tests.
- `npx vitest run tests/content.test.ts`: 6/6 tests.
- Skill frontmatter and `agents/openai.yaml` validation using Ruby YAML because
  the bundled Python validator lacked PyYAML.
- CV generation, PDF metadata/structure extraction, and visual inspection of
  both rendered pages.

Interrupted due to host capacity, not a reported diagnostic:

- `npm run check` completed content validation and repository-wide lint, then
  spent more than 30 minutes in `tsc --noEmit` while accumulating only about one
  minute of CPU time on a heavily oversubscribed host. It was stopped for this
  CLI restart, so the combined command did not pass and its unit-test stage was
  not reached.
- A replacement `tsc --noEmit --incremental false` was also still CPU-limited
  and was stopped when the restart was requested. Do not report typecheck as
  passing until a fresh run completes.

## Work remaining after restart

1. Inspect `git status -sb`, read `AGENTS.md`, and preserve this committed state.
2. Run the final release matrix on the fresh CLI/host:
   - `npm run validate:content`
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
   - `npm run test:e2e`
   - `npm run test:a11y`
3. Fix every introduced failure and rerun the affected command. Make coherent
   follow-up commits rather than one commit per lint fix.
4. Start the app and visually inspect `/en`, `/cs`, all three case studies,
   both privacy pages, localized not-found behavior, and `/dev` in development.
   Check 320, 390-430, 768, 1024-1280, 1440, and wide desktop widths plus menu
   keyboard/Escape/focus return, locale/hash retention, consent behavior,
   overflow, reading widths, media crops, editor states, and console errors.
5. Verify production `/dev` and `/api/dev/*` denial, sitemap, robots, canonical
   and alternate metadata, CV download, analytics absence without a key, and
   representative critical flows.
6. Reconcile documentation only if fixes change an implemented contract.
7. Commit validation fixes/final cleanup, confirm the worktree is clean, and
   prepare the original requested final report with actual command results and
   the complete commit list.

## Manual or external boundaries

- Lighthouse budgets require a measured deployed run; do not claim scores from
  local source inspection.
- PDF/UA conformance, screen-reader behavior, 200/400 percent zoom, deployed
  headers, Vercel configuration, PostHog retention, and production domain state
  remain manual/external checks unless actually measured.
- Verified project metrics, testimonials, custom-domain email setup, profile
  updates, and a higher-resolution approved portrait require owner input or
  external account access; see `NEEDED.md` and `docs/manual-follow-ups.md`.

## Deferred Higgsfield tasks

Do not use another generator or create filler. Once the Higgsfield MCP exists,
assess and produce only the optional assets in `docs/deferred-media.md`: a hero
system-boundary layer, abstract banking cover, scientific metadata-workflow
cover, deterministic devShark screenshot environment, homepage/case-study social
images, and optional explanatory motion with posters and reduced-motion
fallbacks. Authentic portrait and UI pixels must remain unchanged; banking UI
and scientific outcomes must never be fabricated.
