---
name: portfolio-context
description: Protect Lukas Kouril Portfolio product positioning, bilingual content, confidentiality, brand voice, design-system, privacy, and development-editor invariants. Use for any change to public copy, case studies, content JSON, metadata, navigation, visual design, generated media planning, analytics, or `/dev` behavior.
---

# Portfolio context

## Establish the source of truth

Read these files before changing behavior or public claims:

1. `docs/portfolio-direction.md`
2. `docs/design-system.md`
3. `src/lib/content-schema.ts`
4. both files under `src/content/site-content*.json`
5. `README.md` for architecture, privacy, and `/dev` constraints

Use repository facts as evidence. Mark inferences as inferences. Do not turn
performance budgets, accessibility targets, confidential scope, or unverified
outcomes into public claims.

## Protect the product argument

Keep the primary promise clear: Lukáš takes responsibility for complex web
products, understands system boundaries and human consequences, and delivers
accessible, maintainable software. Prioritize technical hiring evaluation;
support freelance evaluation in plain language without presenting him as an
agency, AI consultant, or expert in everything.

Treat the flagship work distinctly:

- Banking: responsibility, modernization, BFF boundaries, accessibility,
  tests, delivery, and confidentiality. Never invent product UI or details.
- Ersilia: scientific metadata, schema, PDF extraction, validation, automation,
  and human-verifiable AI-assisted workflow. Never imply scientific findings.
- devShark: owner-operated product, educational content, UX, engineering, and
  sustained execution. Keep authentic UI authentic.

## Preserve content and brand rules

- Update English and Czech structures together. Keep IDs, ordering, and slugs
  aligned and run `npm run validate:content`.
- Use specific, calm, evidence-led language. Avoid generic marketing and
  unsupported superlatives, leadership scope, numbers, or testimonials.
- Use semantic tokens and existing editorial components. Monospace is an
  annotation layer; green is a signal, not a section wash.
- Reject glass, random glow, giant gradients, fake dashboards, decorative
  metrics, repeated pills/cards, and filler imagery.
- Keep real screenshots, portraits, and product artifacts unaltered. Defer
  unavailable generative-media work; never substitute another generator.

## Preserve technical invariants

Keep `/dev` and `/api/dev/*` development-only and loopback-bound. Preserve
content size limits, schema/parity validation, per-file atomic replacement,
upload allowlists, format/dimension limits, metadata stripping, SVG/GIF
rejection, and randomized filenames. Keep analytics absent without a key and
consent-gated with Do Not Track when configured.

Before handoff, run checks proportional to the change and report only commands
that completed. Use `$verify` for the complete release workflow.
