---
title: Skip Button For Optional Steps
summary: 'If a step is genuinely optional (e.g. "find your outbound flight"), provide a "Skip" pill at the top-right of the `.step-body`.'
golden: false
strictness: should
applies_to:
  - forms
  - onboarding
  - mobile
tags:
  - Wizard
  - Navigation
  - Flow
related: []
created: '2026-05-11'
---
# Skip Button For Optional Steps

If a step is genuinely optional (e.g. "find your outbound flight"), provide a "Skip" pill at the top-right of the `.step-body`.

## Placement
- Top-right of the step body — **not** in the header.
- Float right within the step.

## Behaviour
- Tapping Skip moves to the next step exactly as a normal answer would.
- A skipped step leaves its captured value blank in the summary, OR the row is omitted entirely from the summary.

## Accessibility
- `aria-label="Skip outbound flight — this is optional"` (describe what is being skipped)

## When NOT to use Skip
- Required questions (airport, dates, cover type, etc.)
- Steps where a default value would be misleading
