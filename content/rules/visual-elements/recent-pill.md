---
title: Recent Pill Styling
summary: 'Used in the airport selector for recent selections.'
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
# Recent Pill Styling

Used in the airport selector for recent selections.

```css
.recent-pill {
  border-radius: 999px;                /* radius-xl — pill shape */
  border: 1px solid #c2c2c5;          /* field-outline */
  padding: 6px 12px;                   /* spacing-sml spacing-med */
  background: #ffffff;
  font-family: Nunito, sans-serif;
}
```

## Notes
- A small ✕ within the pill lets the user remove a recent entry.
- Pills are arranged horizontally with wrap.
