# Portfolio product and design direction

## Purpose and promise

This portfolio turns Lukáš Kouřil’s career into an evidence-led professional
argument: he can take responsibility for complex web-product work, understand
both system boundaries and their human consequences, and deliver accessible,
maintainable software through validation and release.

The primary audience is senior engineering managers, frontend leads, CTOs, and
technical hiring managers. Founders and product owners evaluating selected
freelance work are the second primary audience. Recruiters, engineering peers,
collaborators, and Czech-language visitors are secondary audiences.

## Evaluation journeys

- **Fast evaluation:** name, seniority, product focus, three flagship projects,
  Prague/availability, CV, and contact are understandable in about one minute.
- **Deep evaluation:** case studies expose context, constraints, responsibilities,
  decisions, tradeoffs, outcomes, reflection, and real technology.
- **Freelance evaluation:** public product and client work explains ownership and
  business value without weakening technical credibility.
- **Engineering review:** boundaries, accessibility, tests, validation, and
  delivery practices are discoverable without turning the homepage into a stack
  dump.
- **Localized evaluation:** `/en` and `/cs` preserve equivalent route, stable ID,
  slug, metadata, and content structure.

## Design thesis

**A restrained editorial engineering portfolio: dark, exact, human, and
evidence-led.** It borrows the discipline of technical documentation,
independent publishing, and decision records—not generic SaaS marketing.
Project context, constraints, and engineering decisions are the visual content.
Motion and media support comprehension and identity; they do not compete with
the work.

## Content hierarchy

1. Identity, level, scope, availability, and next actions.
2. Banking, Ersilia, and devShark as three different forms of responsibility.
3. Recent engineering progression, then the earlier operational foundation.
4. Concrete engineering principles.
5. Supporting products, experiments, and client work at an honest scale.
6. Capabilities grouped by responsibility, not logos.
7. Concise education, then a decisive contact close.

Case studies lead with context and a readable summary, then metadata and visual
evidence. Decisions are the signature unit. Empty editorial sections are not
rendered.

## Brand strategy

The public identity remains the person’s name. Use `Lukas Kouril` in established
international metadata and file names; use `Lukáš Kouřil` when Czech copy or
typographic context calls for Czech diacritics. Avoid changes that fragment
existing canonical URLs or structured data.

Brand attributes: dependable, rigorous, direct, observant, composed,
independent, pragmatic, globally experienced, and human without being casual.
Visitors should leave with clarity, professional curiosity, and confidence that
complexity will be handled carefully.

Voice is plain, specific, calm, and evidence-led. Explain technical value in
language a founder can understand, then expose deeper detail for engineers.
Never invent outcomes, metrics, interfaces, testimonials, leadership scope, or
confidential details. Avoid “passionate developer”, “pixel-perfect”,
“cutting-edge”, “leveraging innovation”, “rockstar”, and equivalent generic
claims.

## Visual principles

- Preserve the blue-black canvas, high-contrast text, Geist type, green signal
  accent, compact radii, technical grid, numbered eyebrows, and `$ whoami`.
- Use typography, spacing, rules, and metadata to create hierarchy before
  introducing a container.
- Use one accent as a signal for focus, active state, status, and the primary
  action. Do not wash sections in green.
- Use deliberate asymmetry in flagship work and case-study headers while
  preserving reading order.
- Treat authentic project screenshots as evidence. Confidential work uses
  clearly abstract, code-native system diagrams; it never implies a real UI.
- Prefer crisp borders and tonal surfaces to glass, glows, or shadow stacks.
- Monospace is an annotation layer for IDs, metadata, labels, and state—not body
  copy and not a terminal simulation.

## Motion, responsive, and accessibility principles

Motion is limited to short hero entrance, navigation state, purposeful reveal,
and operational feedback. Shared timing is 120–420 ms with calm easing. Nothing
delays reading; reduced motion removes transforms and smooth scrolling.

The editorial grid uses stable gutters, a controlled maximum width, readable
prose measures, and compact transformations at 320 px. Mobile is not a pile of
full-width cards: timelines become dense rows, metadata remains grouped, and
project visuals keep their hierarchy.

WCAG 2.2 AA is a target, not a certification claim. Required behavior includes
landmarks, sequential headings, skip navigation, visible focus, route-aware and
keyboard-safe navigation, 44 px touch targets, localized alternative text,
announced form status, 320 px reflow, and reduced-motion support.

## Anti-positioning

This is not a developer template, résumé-card grid, agency, AI startup, crypto
site, gaming interface, effects showcase, fake terminal, or technology badge
wall. No generated people, fabricated banking/science interfaces, fake charts,
decorative metrics, testimonials without permission, purple-blue gradients,
glassmorphism, random glows, floating fake UI, or ornamental pills.

Earlier operations and risk-related roles remain because they support the story
of investigation, communication, and consequences. AI remains a validated
workflow capability, not the primary identity.

## Implementation priorities and invariants

1. Preserve local validated content, locale parity, static rendering, privacy,
   and development-only security.
2. Establish semantic tokens and editorial primitives, then reuse them across
   the shell, homepage, case studies, system pages, and editor.
3. Make the three flagship projects structurally related but visually distinct.
4. Improve mobile focus management, editor feedback, and non-happy states.
5. Extend browser coverage for locale routing, focus behavior, production
   isolation, responsive overflow, and analytics absence.

`/dev` and `/api/dev/*` must remain unavailable outside development. Content
writes remain size-limited, schema-validated, parity-checked, and atomic. Upload
directories remain allowlisted; raster decoding, file/dimension limits,
metadata stripping, SVG/GIF rejection, and randomized non-overwriting names are
non-negotiable. Analytics remains absent without a key and consent-gated with
Do Not Track support when configured.

