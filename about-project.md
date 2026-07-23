# Lukas Kouril Portfolio

Bilingual (EN/CS), statically rendered professional portfolio for a Prague-based
senior software engineer. Proves ownership of complex web-product work through
context, decisions, constraints, and three deep case studies: banking
modernization, Ersilia scientific metadata tooling, and devShark.

## Tech stack

- **Framework:** Next.js (App Router), TypeScript, statically rendered
- **Content:** validated local JSON (EN/CS), no database, CMS, or content API
- **UI:** Tailwind CSS, Geist typography, Radix Slot, `next/image`, Lucide icons
- **Media:** local animated project previews (`<video>`, reduced-motion aware)
- **Testing:** Vitest, Playwright, axe-core

## Connected third parties

- **PostHog** — optional, explicit-consent-only, EU-hosted, Do-Not-Track-aware analytics; absent without a key.

## Key libraries

- `geist` — primary Sans and Mono typography.
- `zod` — content schema and EN/CS parity validation.
- `sharp` — build-time image optimization.
