# NEEDED: owner follow-ups

The portfolio overhaul is implemented and locally release-validated. The first
section contains only work that requires verified owner information, approval,
post-merge deployment state, specialist review, or external-account access.
This file is parsed by OwnDashboard and also carries its explicitly separated
product backlog, so every task includes an importance score and an owner marker.

## Portfolio follow-ups

- [ ] **Verify the production deployment**: after this merge deploys, confirm that `lukaskouril.dev`, both locale routes, all six localized case-study routes, the CV download, redirects, privacy pages, and the custom 404 work correctly. `[imp:5]` `[owner:me]`
- [ ] **Synchronize public profiles**: update the GitHub profile website, repository About URL, LinkedIn contact URL, public title, company names, and employment dates so they match the portfolio. `[imp:4]` `[owner:me]`
- [ ] **Complete the remaining production accessibility and performance review**: after merge, test 200% and 400% zoom, use a real screen reader, inspect the PDF with a dedicated accessibility checker, and run Lighthouse on `/en`, `/cs`, and one case study. Keyboard navigation, locale switching, the mobile menu, reduced motion, and 320 px reflow already passed local release QA. `[imp:4]` `[owner:me]`
- [ ] **Provide any publishable case-study evidence**: answer the factual questions in `docs/content-gaps.md` for banking, Ersilia, devShark, and Additional Work. Add only details that can be verified and publicly disclosed. `[imp:3]` `[owner:me]`
- [ ] **Confirm the final portrait**: approve the current image or provide a higher-resolution source that may be published. `[imp:2]` `[owner:me]`
- [ ] **Configure the portfolio email address**: create or forward `lukas@lukaskouril.dev` if you want the custom-domain address used in the site and CV later. `[imp:2]` `[owner:me]`
- [ ] **Decide whether to enable PostHog**: if analytics is useful, add the EU project key and host in Vercel, choose a retention period, redeploy, and verify consent behavior. Keep autocapture, person profiles, and session recording disabled. `[imp:2]` `[owner:me]`
- [ ] **Approve testimonials before publication**: if you want recommendations on the site, provide the exact quote, full name, role, company, relevant flagship case study, source URL, and explicit permission for each person. `[imp:1]` `[owner:me]`

## OwnDashboard product backlog

These items belong to the OwnDashboard product that parses this file, not to
the public portfolio implementation.

- [ ] **Replace the jobs view with a sortable table**: present each job as one row and give match score its own column. Support sorting and practical filtering by match score, remote arrangement, location, and other existing job attributes so the list is easier to scan and manage. Preserve a usable compact layout on narrow screens. `[imp:4]` `[owner:me]`
- [ ] **Add an Agents section backed by the VPS**: provide one place to inspect available agents, assign them tasks, see task state and recent results, and stop or retry work where supported. VPS commands must use authenticated, allowlisted operations with explicit destructive-action confirmation, audit history, clear failure states, and no exposed arbitrary shell input. `[imp:4]` `[owner:me]`
- [ ] **Fix drag-and-drop when a dragged container contains text**: dragging must start reliably without text selection or nested content cancelling the gesture. Prefer a clear drag handle and disable text selection only for the active drag; retain normal text selection, keyboard operation, touch behavior, and accessible reordering outside it. Add regression coverage for cards containing selectable text. `[imp:5]` `[owner:me]`
- [ ] **Show subscription renewal timing**: every active subscription must display the next payment date and time, the relevant timezone, and the number of days remaining in the current paid period. Handle monthly, annual, trial, cancelled-at-period-end, overdue, and unknown-renewal states without inventing a date. `[imp:4]` `[owner:me]`
- [ ] **Introduce meaningful subscription categories and importance**: group services into at least Entertainment (for example Netflix and Spotify), Developer tools (for example Claude Code, Codex, and Supabase), and Business/OSVČ costs. Let each subscription record how important it is, and make the money overview show totals by category plus which expenses are essential, useful, or optional. `[imp:4]` `[owner:me]`
- [ ] **Give every main project its own subsection**: keep Projects as a summary table, then allow a new project to be added as a dedicated subsection. Seed at least the eight main projects and store structured project information, status, important links, a direct action to the corresponding `/dev` area where one exists, customer communication history, decisions, and follow-up tasks. The summary must link to each subsection and remain useful as the project count grows. `[imp:4]` `[owner:me]`

## Reference

Detailed factual questions are in `docs/content-gaps.md`. The broader release notes are in `docs/manual-follow-ups.md`, and current operating-cost assumptions are in `stack-and-scaling.md`.
