---
title: Auto-Advance On Selection
summary: 'Selection auto-advances to the next step. There is **no "Next" button** after a single-answer step.'
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
# Auto-Advance On Selection

Selection auto-advances to the next step. There is **no "Next" button** after a single-answer step.

## What triggers auto-advance
- Tapping a recent pill, grid option, or list item in an airport selector
- Tapping a calendar day
- Tapping a time option in the time grid
- Tapping a description card
- Tapping a binary Yes/No card

## What does NOT auto-advance
- Typed input (use Continue button)
- Search input (user must tap a result)
- The summary step (user must tap the primary CTA)

## Implementation
Each step in HTML has `.step` class. The active step has `.step.active`. Only **one** step is `.active` at a time. When the user makes a selection:
1. Apply `.selected` to the chosen option (visual feedback)
2. Update URL hash to the next step
3. Remove `.active` from the current step, add to the next
4. Move focus to the new step's `.step-title`
