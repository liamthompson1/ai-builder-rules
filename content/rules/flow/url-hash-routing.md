---
title: URL Hash Routing Per Step
summary: 'The URL hash changes per step. Each step has its own unique hash so the back button, deep links, and edit jumps all work.'
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
# URL Hash Routing Per Step

The URL hash changes per step. Each step has its own unique hash so the back button, deep links, and edit jumps all work.

## Example hash map (Parking wizard)

```
#flying-from        → airport selector
#parking-from       → departure date calendar
#outbound-flight    → flight search (skippable)
#dropoff-time       → departure time grid
#return-date        → return date calendar
#return-time        → return time grid
#search-summary     → summary + CTA
```

## Rules
- Hash names use **kebab-case** and describe the question in plain language (`#flying-from`, not `#step3`).
- Every wizard step gets its own hash — no exceptions.
- The hash MUST update when the step changes so the browser back button works correctly.
- Deep linking directly to a hash should load the wizard at that step (or the first incomplete step if prior answers are missing).
