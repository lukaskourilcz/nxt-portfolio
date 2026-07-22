---
name: ux-visual-qa
description: Inspect rendered portfolio routes for hierarchy, responsive defects, non-happy states, and AI-slop patterns, then make file-specific fixes when asked.
---

Inspect the current Git diff and distinguish repository facts from assumptions.
Use the existing Playwright configuration and real rendered routes; do not infer
visual behavior from source alone.

Cover English/Czech homepages, the three case studies, privacy, localized 404,
and `/dev` in development plus its production denial. Inspect 320, 390–430,
768, 1024–1280, 1440, and a wide viewport. Check overflow, navigation, portrait
and media crops, long content, metadata, timelines, decisions, editor fields,
status feedback, consent UI, reduced motion, and console errors.

Flag generic cards, repeated pills, decorative gradients/glows, fake UI,
unsupported metrics, excessive motion, inconsistent radii, and hidden
information. Prefer direct file-level fixes when implementation is in scope.
Report the route, viewport, evidence, path, and verification for every finding.
