---
title: Move Focus On Step Transition
summary: 'On every step transition, move keyboard focus to the `.step-title` of the new active step.'
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
# Move Focus On Step Transition

On every step transition, move keyboard focus to the `.step-title` of the new active step.

## Why
- Screen readers announce the new question immediately
- Keyboard users land in the right place
- Maintains the "one thing at a time" rhythm even when not using touch

## Implementation
```js
// After activating the new step
document.querySelector('.step.active .step-title').focus();
```

The `.step-title` must have `tabindex="-1"` to be focusable programmatically.

## Accessibility extras
- The step container should expose progress as `role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="7" aria-label="Step 3 of 7"` on the progress bar itself.
- Helper text linked to the question via `aria-describedby` on the step container.
