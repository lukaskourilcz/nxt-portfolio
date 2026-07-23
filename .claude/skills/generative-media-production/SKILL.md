---
name: generative-media-production
description: Research affordable generation providers and assess, generate, refine, integrate, document, and validate custom media for Lukas Kouril Portfolio. Use for project covers, presentation environments, responsive media variants, optional motion, or comparisons of free and low-cost AI image services.
---

# Generative portfolio media production

## Establish the brief

Read `docs/generative-media.md`, `docs/portfolio-direction.md`, and
`docs/design-system.md`. Read the relevant English and Czech work records and
inspect `src/components/project-visual.tsx` before generating anything. Search
the repository for an authentic source and an existing visual slot first.

Reject filler. Generate only when the opportunity audit classifies the asset as
high value and the output can improve comprehension or identity without
inventing evidence.

## Research providers before generation

Browse current primary sources before recommending or using any service. Do not
rely on remembered pricing or old comparison articles.

1. Compare at least three viable providers when the market offers that many,
   including at least two genuinely free or low-cost options and the strongest
   suitable paid baseline.
2. Record official links, research date, free-tier limits, estimated cost for
   the complete selected asset set, maximum export resolution, aspect-ratio
   control, watermark behavior, commercial-use rights, ownership, public versus
   private generations, retention/training terms, deletion controls, and
   browser/API/MCP availability.
3. Prefer a genuinely free or lower one-off cost only when its license,
   privacy, output quality, and export contract are adequate. Reject unclear
   commercial rights, mandatory public source uploads, mandatory watermarks, or
   unusable resolution.
4. Never upload the portrait, authentic product UI, confidential information,
   customer communication, or unpublished material to a third-party generator.
   The approved abstract prompts require text-only generation; devShark needs
   surroundings only and deterministic local compositing.
5. Do not start a trial requiring a card, accept auto-renewal, buy credits, or
   create a paid account without explicit owner approval. If no safe provider is
   available, retain the code-native visual rather than lowering the standard.

Save the comparison and selection reasoning in `docs/generative-media.md`
before generation.

## Generate deliberately

Inspect the selected provider's account, model constraints, supported ratios,
input roles, output contract, and complete cost. Preflight when supported.
Generate materially different directions, compare them in the real route,
reject weak outputs, then refine the strongest direction. Preserve job IDs or
provider generation references. Do not invent model names, parameters,
generation state, provenance, or success.

## Protect authentic evidence

- Never generate people or modify Lukáš's face.
- Never generate banking UI, confidential detail, scientific findings, charts,
  product claims, code, lettering, logos, testimonials, or metrics.
- Keep the exact devShark screenshot pixels. Generate surroundings only, then
  composite the real screenshot deterministically.
- Treat generated banking and Ersilia visuals as decorative abstraction. Keep
  localized captions explicit about their status.
- Reject watermarks, malformed geometry, fake labels, random symbols, unwanted
  branding, unusable crops, and visual implications unsupported by content.

## Deliver and validate

Download selected outputs only. Strip metadata and export responsive AVIF/WebP
variants with intrinsic dimensions and measured file sizes. Use `next/image`,
correct `sizes`, lazy loading outside the hero, and localized alt or empty alt
according to the brief. Motion requires a poster and reduced-motion exclusion.

Record provider, prompts, model, job IDs or provider generation references,
rejected directions, selection reasoning, exports, sizes, accessibility
classification, and regeneration steps in
`docs/generative-media.md`. Run content validation, lint, type checking, tests,
build, responsive browser checks, accessibility checks, and media-integrity
checks proportional to the change. Commit only selected assets and remove dead
variants and replaced fallback code.
