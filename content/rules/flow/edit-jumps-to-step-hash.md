---
title: Edit Jumps To Step Hash
summary: 'When the user taps the edit pencil (✏️) on a summary row, the wizard scrolls to / activates the relevant step.'
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
# Edit Jumps To Step Hash

When the user taps the edit pencil (✏️) on a summary row, the wizard scrolls to / activates the relevant step.

## Behaviour
1. Update the URL hash to the step's hash (e.g. `#flying-from`).
2. Set that step to `.active`, remove `.active` from the summary step.
3. Scroll smoothly to the step section.
4. Move focus to the new active step's `.step-title`.

## After the edit
- When the user picks a new value, auto-advance behaviour resumes.
- The wizard fast-forwards through any unchanged subsequent steps and lands back at the summary with the new value reflected.
- OR: returns directly to the summary if no downstream steps depend on the edited value.

## Accessibility
- Each edit button needs `aria-label="Edit [field name]"` — e.g. `aria-label="Edit airport"`.
