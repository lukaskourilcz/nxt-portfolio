# NEEDED: owner follow-ups

The portfolio overhaul is implemented and locally release-validated. This list
contains only work that requires verified owner information, approval,
post-merge deployment state, specialist review, or external-account access. It
is parsed by OwnDashboard, so every task includes an importance score and an
owner marker.

## Tasks

- [ ] **Verify the production deployment**: after this merge deploys, confirm that `lukaskouril.dev`, both locale routes, all six localized case-study routes, the CV download, redirects, privacy pages, and the custom 404 work correctly. `[imp:5]` `[owner:me]`
- [ ] **Synchronize public profiles**: update the GitHub profile website, repository About URL, LinkedIn contact URL, public title, company names, and employment dates so they match the portfolio. `[imp:4]` `[owner:me]`
- [ ] **Complete the remaining production accessibility and performance review**: after merge, test 200% and 400% zoom, use a real screen reader, inspect the PDF with a dedicated accessibility checker, and run Lighthouse on `/en`, `/cs`, and one case study. Keyboard navigation, locale switching, the mobile menu, reduced motion, and 320 px reflow already passed local release QA. `[imp:4]` `[owner:me]`
- [ ] **Provide any publishable case-study evidence**: answer the factual questions in `docs/content-gaps.md` for banking, Ersilia, devShark, and Additional Work. Add only details that can be verified and publicly disclosed. `[imp:3]` `[owner:me]`
- [ ] **Confirm the final portrait**: approve the current image or provide a higher-resolution source that may be published. `[imp:2]` `[owner:me]`
- [ ] **Configure the portfolio email address**: create or forward `lukas@lukaskouril.dev` if you want the custom-domain address used in the site and CV later. `[imp:2]` `[owner:me]`
- [ ] **Decide whether to enable PostHog**: if analytics is useful, add the EU project key and host in Vercel, choose a retention period, redeploy, and verify consent behavior. Keep autocapture, person profiles, and session recording disabled. `[imp:2]` `[owner:me]`
- [ ] **Approve a generative-media provider only after the agent completes the required comparison**: the next agent must first research current free and low-cost services using official pricing, licensing, privacy, watermark, and export terms. Approve an account, card-backed trial, credits, or recurring plan only if the documented best option justifies it. `[imp:2]` `[owner:me]`
- [ ] **Approve testimonials before publication**: if you want recommendations on the site, provide the exact quote, full name, role, company, relevant flagship case study, source URL, and explicit permission for each person. `[imp:1]` `[owner:me]`

## Reference

Detailed factual questions are in `docs/content-gaps.md`. The broader release notes are in `docs/manual-follow-ups.md`, and current operating-cost assumptions are in `stack-and-scaling.md`.

## Developer tooling

- [ ] **Install and initialize RTK (`rtk-ai/rtk`)** — RTK could not be set up from the Claude Code web session because its GitHub download host is outside the session's network allowlist (`github.com/rtk-ai/rtk` and its release binaries return HTTP 403). Set it up locally at home with the commands below, then enable it for this repository following `rtk --help` / the RTK docs (the exact per-repo command isn't documented here because the tool wouldn't install in the sandbox). `[imp:2]` `[owner:me]`

```sh
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
rtk init --global
```
