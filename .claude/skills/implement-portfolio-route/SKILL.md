---
name: implement-portfolio-route
description: Implement or substantially revise a localized public route, homepage section, case-study screen, system page, or development-editor screen in Lukas Kouril Portfolio. Use when real repository code must be changed with component reuse, locale parity, responsive behavior, accessibility, states, tests, and documentation kept synchronized.
---

# Implement a portfolio route

## Inspect before creating

1. Read `docs/portfolio-direction.md` and `docs/design-system.md`.
2. Inspect the target route, sibling routes, `src/components`, relevant hooks,
   content loaders, schema, metadata, and tests.
3. Search with `rg` for the nearest primitive, layout, state, and copy pattern.
4. Extend or compose existing code. Create a new abstraction only when reuse
   would harm semantics, accessibility, or maintenance.

Use `$portfolio-context` whenever the change touches claims, bilingual content,
confidentiality, media, analytics, or `/dev`.

## Implement the complete route contract

- Preserve server rendering and static generation unless the behavior genuinely
  needs a client boundary.
- Update both locale documents and schema together when content shape changes.
- Keep equivalent routes switchable through `LanguageToggle`.
- Use semantic tokens, `page-shell`, shared buttons/links, and existing
  editorial primitives.
- Provide landmarks, sequential headings, visible focus, meaningful link names,
  44 px controls, localized image semantics, and reduced-motion behavior.
- Handle real loading, empty, invalid, saving, error, and disabled states. Do not
  invent application states or authenticated areas.
- Validate 320, 390–430, 768, 1024–1280, and 1440 px behavior. Avoid solving
  mobile by wrapping every datum in a card.
- Use authentic screenshots or code-native diagrams. Do not fabricate banking,
  scientific, or product UI; do not use generated filler.

## Verify and document

Add or update unit and browser coverage for the changed route, including locale,
keyboard, reflow, production guards, privacy, or metadata when applicable.
Run the relevant subset of `npm run check`, `npm run build`, `npm run test:e2e`,
and `npm run test:a11y`. Inspect browser console errors and representative
breakpoints. Update architecture/design documentation only when the implemented
contract changed.

Return file-specific outcomes, completed checks, and concrete limitations. Do
not claim Lighthouse, WCAG certification, or manual checks that were not run.
