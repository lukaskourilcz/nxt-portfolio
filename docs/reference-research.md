# Design-reference research

Research was performed on 22 July 2026 against the live Refero Styles and
Collect UI archives. The goal was to solve portfolio-specific hierarchy,
long-form reading, navigation, and editor-state problems—not to collect
decorative references.

## Refero Styles

| Reference | Problem solved | Transferable principle | Adaptation and limits |
| --- | --- | --- | --- |
| [Linear](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1) | Exact dark system without visual noise | Near-black surface ladder, hairline boundaries, compact geometry, functional accent, low reliance on shadows | Keep the existing green and Geist identity; do not copy Linear’s product chrome, acid-lime color, typography, or screenshot composition. Maintain stronger body contrast and 44 px controls. |
| [Column](https://styles.refero.design/style/a76ec6ba-20b3-495c-9d89-1e58281e79e7) | Trustworthy financial tone | Ledger-like metadata, institutional calm, structured evidence, warm editorial counterpoints | Apply the metadata discipline to banking without mimicking a bank product, orange palette, serif identity, or real/fake account UI. |
| [Vercel](https://styles.refero.design/style/f24daf3a-d43f-4dec-85a9-8ac1d5148a03) | Technical publishing with few visual ingredients | Type, rules, source-document rhythm, and authentic product evidence can carry identity | Retain the darker, more human blue-black portfolio voice; do not copy the triangle mark, monochrome corporate language, or oversized marketing composition. |
| [Structured](https://styles.refero.design/style/6c0b77d3-71f9-469d-98aa-4ce1d6d76ac8) | Editorial pacing and artifact presentation | A single evidence artifact can anchor a section; asymmetry can create hierarchy without cards | Adapt to project-specific diagrams and screenshots; reject gallery theatrics and low-information whitespace. |

Relevant categories inspected included minimal design, editorial type,
monochrome UI, high contrast, premium design, and dark technical systems.
Patterns adopted: controlled surface steps, narrow prose measures, deliberate
metadata grouping, restrained radii, one functional accent, and authentic
evidence as imagery. Patterns rejected: multi-accent palettes, giant gradients,
glass panels, dashboard mimicry, low-contrast body text, decorative terminal
language, and proprietary compositions.

## Collect UI

The archive categories inspected were Portfolio, Blog Post, Mobile Menu, Header
Navigation, Breadcrumbs, Contact Us, File Upload, Form, Flash Messages, Empty
States, Error State, 404 Page, Terms of Service, Admin Panel, Code Editor,
Documentation, and UI Interaction.

Collect UI is useful as a breadth check for state and interaction patterns, not
as a source of complete product direction. Selected principles:

- Portfolio and Blog Post: maintain a strong title/metadata/prose hierarchy and
  let long-form content breathe without card-wrapping every section.
- Mobile Menu and Header Navigation: keep the menu compact, expose state,
  preserve large touch targets, close on selection and Escape, and restore
  focus to the trigger.
- Breadcrumbs: provide a clear return path on case studies and system pages.
- File Upload, Form, and Flash Messages: show progress, field context, validation
  summaries, and durable success/error feedback in `/dev`.
- Empty and Error States: explain the state and the next available action with
  plain language.
- 404 and Terms of Service: prioritize reading and recovery over illustration.
- Admin Panel and Code Editor: use operational density and predictable grouping;
  do not import public-site theatrics into `/dev`.

The archive’s common centered cards, decorative mockups, small controls,
hover-only cues, and visually polished but unimplemented states were rejected.
No proprietary copy, illustrations, code, or distinctive composition is used.

## Route mapping

- Homepage hero and Selected Work: Refero’s one-focal-point pacing and evidence
  hierarchy.
- Banking case study: Column’s ledger discipline, adapted as abstract system
  boundaries with an explicit confidentiality label.
- Ersilia case study: document and validation rhythm rather than generic AI
  imagery.
- devShark case study: authentic screenshot as the focal artifact.
- Case-study body: blog/article hierarchy, decisions as annotated records, and
  compact next-project navigation.
- Global shell: compact route-aware navigation with predictable mobile focus.
- `/dev`: file-upload/form/error-state principles with denser operational
  presentation.
- Privacy and not-found: readable policy and direct recovery patterns.

