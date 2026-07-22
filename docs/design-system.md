# Portfolio design system

This system implements the “restrained editorial engineering” direction in
`src/app/globals.css` and shared components. Tokens are semantic; Tailwind
utilities consume the token names rather than raw palette roles.

## Foundations

- **Color:** `canvas`, `canvas-elevated`, `surface`, `surface-subtle`,
  `surface-interactive`, `text-primary`, `text-secondary`, `text-muted`,
  `border-subtle`, `border-strong`, `accent`, `accent-hover`, `accent-muted`,
  `focus`, `success`, `warning`, `danger`, `info`, `confidential`, `selection`,
  and `overlay`.
- **Typography:** Geist Sans for identity, display, headings, and prose; Geist
  Mono for eyebrows, metadata, decision labels, and technical annotations.
  Prose is 16–20 px with 1.65–1.8 line height and a 62–70 character measure.
- **Spacing:** a 4 px base with intentional 8, 12, 16, 20, 24, 32, 40, 48,
  64, 80, 96, and 128 px steps. Section rhythm is responsive rather than a
  fixed oversized gap.
- **Layout:** page max 1180 px, prose max 70ch, case-study reading max 760 px,
  and gutters of 20 px, 32 px from `sm`, and 40 px on wide screens.
- **Shape:** 2–10 px functional radii. Large rounded containers are reserved for
  authentic media, never used as the default section treatment.
- **Surface:** spacing, type, tonal steps, and hairline borders establish
  hierarchy. Shadows appear only for fixed overlays where separation is
  operationally necessary.

## Shared component rules

- `Section` owns page width, gutters, anchor offset, and vertical rhythm.
- `SectionHeading` owns numbered/technical eyebrow, heading, and optional intro.
- Buttons use the shared CVA primitive; controls never fall below 44 px on
  touch layouts.
- External links consistently announce a new tab. Download links use a stable
  file name and visible PDF context.
- Flagship project visuals distinguish confidential systems, structured
  scientific workflow, and authentic product UI without inventing evidence.
- Metadata uses definition lists; technology lists are supporting annotations,
  not logo or pill walls.
- Decision records expose context, decision, tradeoff, and outcome with stable
  label treatment and a readable mobile order.
- Notices pair a text label/icon with color so meaning never depends on hue.
- `/dev` field groups, image controls, validation summary, and sticky save state
  reuse the tokens but prioritize operational density.

Before adding any primitive, component, hook, type, or styling pattern, search
the repository and extend or compose the closest existing implementation.

## Motion

Use shared durations: fast 120 ms, standard 220 ms, deliberate 420 ms. The
default curve is calm ease-out. Motion is permitted for the initial hero,
navigation state, visual-path explanation, and editor feedback. It is not
permitted for every card, scroll-jacking, cursor effects, or delayed content.
`prefers-reduced-motion` disables transforms, smooth scrolling, and nonessential
animation.

## Responsive transformations

- 320–639 px: compact gutters, readable hero scale, one visual focal point,
  metadata in dense rows, no horizontal overflow, no hover dependency.
- 640–1023 px: two-column structures only when each column preserves its
  measure; otherwise maintain editorial stacking.
- 1024 px and above: asymmetric flagship layouts and case-study metadata
  columns; long-form prose remains constrained.
- Wide screens: increase negative space around the reading column, never the
  line length.

## Accessibility and states

All interactive controls need a visible `:focus-visible` state, accessible
name, keyboard behavior, 44 px target, and non-color state indicator. Mobile
navigation closes on Escape/selection and returns focus. Forms expose labels,
invalid state, an error summary, and announced saving/saved/error status.
Images use localized alternative text when informative and empty alt when
decorative. Layout must reflow at 320 CSS pixels and remain usable at 200% zoom.

Real states to cover: loading/saving, saved, invalid content, parity failure,
uploading, upload error, missing optional media, analytics absent, consent not
chosen, Do Not Track, localized not-found, and production denial of `/dev`.

## Content and anti-slop rules

Use specific verbs, name the system boundary or responsibility, distinguish
facts from reflections, and make confidentiality explicit. Never add a metric
unless content supplies verified evidence. Remove generic gradients, glass,
glows, decorative cards, repetitive pills, fake charts/UI, filler imagery,
technology walls, excessive entrance motion, and inconsistent radii.

Performance and WCAG scores remain release budgets until measured; documentation
must never convert them into claims.

