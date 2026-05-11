---
title: No Back Button In The UI
summary: 'There is **no back button rendered in the wizard UI**. Not in the header, not in the step body.'
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
# No Back Button In The UI

There is **no back button rendered in the wizard UI**. Not in the header, not in the step body.

## Navigation is via
- Browser back button / native gesture (works because of URL hash routing)
- Tapping the edit icon (✏️) on a summary row, which jumps to that step's hash

## Why no back button?
- The browser already provides one for free
- A custom back button creates two competing affordances
- The summary step lets users edit anything they need to change

## What about the header?
The header contains only the HX logo + product name. No back button, no menu, no actions.
