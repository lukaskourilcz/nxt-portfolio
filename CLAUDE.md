@AGENTS.md

# Claude project control

Use `AGENTS.md` as the shared operating contract. The product/design source of
truth is:

- `docs/portfolio-direction.md` — purpose, audiences, journeys, flagship work,
  brand, voice, confidentiality, anti-positioning, and implementation priorities.
- `docs/design-system.md` — semantic tokens, typography, spacing, layout,
  surfaces, components, motion, responsive behavior, accessibility, and states.
- `docs/reference-research.md` — adopted and rejected reference principles.
- `docs/generative-media.md` — media opportunity audit, mandatory current
  provider research, production briefs, prompt foundations, provenance, and
  regeneration workflow.
- `README.md` — architecture, content flow, privacy, `/dev`, and commands.
- `stack-and-scaling.md` — verified architecture and cost assumptions; recheck
  linked official pricing before a billing decision.
- `NEEDED.md` — owner-only deployment, account, approval, and evidence tasks.
- `CONTINUATION.md` — completed overhaul scope and measured release evidence.

## Workflow routing

- Invoke `$portfolio-context` for content, brand, case studies, privacy,
  analytics, media, metadata, or `/dev` changes.
- Invoke `$implement-portfolio-route` for a new or substantially revised screen.
- Invoke `$verify` after implementation and before release.
- Invoke `$generative-media-production` for provider research, approved
  generation, compositing, responsive export, or generated-media replacement.
- Use the three narrow agents in `.claude/agents/` for route implementation,
  UX/visual QA, or accessibility—not overlapping generic review.
- Use `/generative-asset` for the complete custom-media workflow and
  `/release-validate` for the real release command sequence.

Search before creating and reuse existing components/tokens. Preserve both
locales, confidential information, authentic UI, privacy behavior, and `/dev`
isolation. Validate mobile, accessibility, non-happy states, and actual tests.
For large autonomous work, make coherent incremental commits and keep this
control document plus linked documentation synchronized with implementation.


## Session routine & markdown conventions

This repo follows a shared markdown contract (see the `session-start`,
`session-end`, and `markdown-checkup` skills under `.claude/skills/`):

- **`NEEDED.md`** — owner/agent action items. Each task:
  `- [ ] **Title** — desc. [imp:1-5] [owner:me|ai] [time:30m] [kind:K]`, where
  `[kind:K]` is one of `setup` `deploy` `legal` `content` `decision`.
- **`about-project.md`** — project summary + the tech stack.
- **`scaling.md`** — cost & scaling only (renamed from `stack-and-scaling.md`).
- **`monetization.md`** — how the project could earn (options table).

At session start, check `NEEDED.md` for `[owner:ai]` tasks that can now be done;
at session end, update `NEEDED.md` (finished + newly-needed owner items).
