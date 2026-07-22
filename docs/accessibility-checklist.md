# Manual accessibility checks

Release review: 22 July 2026. Checked items were verified in the production
Playwright flow, the in-app browser accessibility tree, or both. This is
implementation evidence, not a WCAG certification.

- [x] Skip link is the first keyboard focus and moves focus to `main`
- [x] Desktop and mobile navigation work with keyboard only
- [x] Language switching preserves the current page and fragment
- [ ] Focus remains visible at 200% and 400% zoom
- [ ] Complete a focused pass with a real screen reader
- [x] No horizontal page scroll at 320 CSS pixels
- [x] Heading hierarchy and landmarks make sense in an accessibility-tree outline
- [x] Selected-work and additional-work links have unambiguous names
- [x] External-link behavior is announced to assistive technology
- [x] Reduced-motion mode shows all content immediately
- [x] Consent actions have equal prominence and can be changed later
- [x] English and Czech pages expose the correct `lang` attribute
- [x] Portrait, work, education, and logo alt text is appropriate in both languages
- [x] CV text is selectable and its document structure was reviewed manually
- [ ] Review the CV with a dedicated PDF accessibility checker before any PDF/UA claim
