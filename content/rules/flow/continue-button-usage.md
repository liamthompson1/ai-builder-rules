---
title: Continue Button — When To Use It
summary: 'A small number of steps require explicit confirmation rather than auto-advance — for example, when the user has typed or searched for something and needs to…'
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
# Continue Button — When To Use It

A small number of steps require explicit confirmation rather than auto-advance — for example, when the user has typed or searched for something and needs to confirm the selection.

## When to use
- After typed input
- After a search result has been chosen and needs confirmation
- After hotel/destination selection
- When auto-advance is genuinely not possible

## Label
Always "Continue" — **never** "Next", "Submit", or "Proceed".

## Visual
- Full-width, purple (`color-primary-brand` / `#542e91`), white text
- Border-radius 12px (`radius-med`)
- 18-20px font, weight 800
- Placed at the bottom of the `.step-body`

## Do NOT use Continue when
- The step is a selection from a list, grid, or card set (use auto-advance instead)
- The user has only one possible answer
