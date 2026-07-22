# Release validation

Run the project-specific `$verify` workflow for `$ARGUMENTS`.

1. Inspect `git status --short`, the diff, and package scripts.
2. Run `npm run validate:content`.
3. Run `npm run lint`.
4. Run `npm run typecheck`.
5. Run `npm run test`.
6. Run `npm run build`.
7. Run `npm run test:e2e`.
8. Run `npm run test:a11y`.
9. Inspect English/Czech home, all flagship case studies, privacy, not-found,
   locale switching, metadata, responsive overflow, console errors, analytics
   absence/consent configuration, and production `/dev` isolation.
10. Summarize actual passes, failures, and manual boundaries. Fix introduced
    failures and rerun the affected command.

Do not commit, push, deploy, or mutate external systems unless `$ARGUMENTS`
explicitly requests that exact action. If a commit is requested, stage only the
validated in-scope files and use one coherent imperative message.
