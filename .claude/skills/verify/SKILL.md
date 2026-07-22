---
name: verify
description: Validate Lukas Kouril Portfolio content, TypeScript, tests, static production routes, accessibility, localization, responsive behavior, privacy, and `/dev` isolation. Use after implementation, before release, or whenever actual pass/fail evidence is required.
---

# Verify the portfolio

## Inspect scope first

Run `git status --short` and inspect the diff. Preserve unrelated changes. Read
`package.json`, `playwright.config.ts`, and the applicable checklists before
running commands; package scripts are the source of truth.

## Run deterministic checks

Use the smallest useful set during iteration:

- Content/schema: `npm run validate:content` and `npm run test`.
- TypeScript/UI: `npm run lint` and `npm run typecheck`.
- Static production behavior: `npm run build`.
- Routes, keyboard, reflow, console, metadata, privacy absence, and production
  isolation: `npm run test:e2e`.
- Automated axe coverage: `npm run test:a11y`.

`npm run check` runs content, lint, typecheck, and unit tests. `npm run
check:full` adds E2E; Playwright builds and serves the production app on port
3100. Use the repository’s `@playwright/test`. Do not install an alternate
scratch browser package or kill an unverified port owner.

## Inspect representative behavior

Cover `/en`, `/cs`, all three localized `/work/[slug]` routes, both privacy
pages, localized not-found behavior, and production denial of `/dev` and
`/api/dev/*`. At minimum inspect 320, 390–430, 768, 1024–1280, and 1440 px,
keyboard focus, Escape/focus return, language route/hash retention, long prose,
project media, and console errors.

Use `docs/accessibility-checklist.md` for manual keyboard, zoom, reflow, PDF,
and assistive-technology boundaries. Lighthouse budgets, 200% zoom, deployed
headers, and PDF accessibility are not proven by the ordinary automated suite.

Report every command with its actual result. Distinguish introduced failures
from confirmed pre-existing issues and fix introduced failures before handoff.
Never claim WCAG certification or a score that was not measured.
