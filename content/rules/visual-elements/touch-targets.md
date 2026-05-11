---
title: Touch Target Sizes
summary: 'Every tappable element must meet the minimum size below.'
golden: false
strictness: should
applies_to:
  - forms
  - mobile
tags:
  - Wizard
  - Design Tokens
  - Styling
related: []
created: '2026-05-11'
---
# Touch Target Sizes

Every tappable element must meet the minimum size below.

| Element | Minimum size |
|---|---|
| Every tappable element (general) | 44px height |
| Time grid buttons | 44px height |
| List items (e.g. airport list) | 48px height |
| Calendar days | 44px × 44px |
| Edit pencil on summary row | 44px × 44px (use padding to expand the hit area) |
| Skip pill | 32px height (acceptable because it has clear surrounding space) |

## Implementation tips
- Use `min-height: 44px` on buttons rather than relying on padding alone.
- For small icons that act as buttons, set padding so the hit area is 44px even if the icon is smaller.
- On iOS, Safari respects WCAG hit areas only if they're set explicitly.
