# Manual follow-ups

These items require verified information, account access, deployment state, or
specialist review outside the repository. Local keyboard, locale, mobile-menu,
reduced-motion, 320 px reflow, axe, and PDF structure checks are complete and
recorded in `CONTINUATION.md`.

## Metrics and proof

- Provide disclosable project scale and outcome details listed in `docs/content-gaps.md`.
- Confirm any accessibility outcomes before publishing them.
- Confirm any CI/CD, workflow, usage, or content figures before adding metrics.

## Testimonials

- Select up to three relevant LinkedIn recommendations.
- Obtain explicit permission to publish each quote.
- Record the original recommendation URL where available.
- Identify the flagship case study each recommendation supports.

## Identity and profiles

- Configure `lukas@lukaskouril.dev` and forward it to the existing inbox.
- Update the GitHub repository About URL to `https://lukaskouril.dev`.
- Update the GitHub profile website and LinkedIn contact URL.
- Confirm that public profile titles use `Senior Software Engineer` consistently.

## CV

- Review the generated PDF's tagged reading order and link labels with a dedicated PDF accessibility checker before claiming PDF/UA conformance.
- Provide a verified content-level `cvUpdatedAt` date if the website should display one dynamically.

## Photography

- Confirm that the current portrait is the approved final image.
- Provide a higher-resolution source if one is available and approved.

## Performance

- Run Lighthouse against the deployed English and Czech homepages and one case study.
- Record measured results before presenting the documented performance budgets as achieved outcomes.

## Accessibility

- Test the deployed site at 200% and 400% zoom.
- Perform a focused pass with a real screen reader rather than inferring its
  behavior from the accessibility tree and axe results.
- Keep `docs/accessibility-checklist.md` synchronized with completed evidence.

## Privacy and deployment

- Confirm the Vercel custom domain and redirects are active for `lukaskouril.dev`.
- If PostHog is enabled, confirm the EU project host and set an appropriate retention period.
- Do not enable session recording without a separate review and updated privacy text.
