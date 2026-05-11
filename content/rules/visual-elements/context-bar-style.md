---
title: Context Bar (.ctx-bar) Styling
summary: 'Context Bar (.ctx-bar) Styling'
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
# Context Bar (.ctx-bar) Styling

```css
.ctx-bar {
  background: #f8f7fc;                 /* very light purple tint */
  color: #4a5568;                      /* muted text */
  border: 1px solid #e2e8f0;
  border-radius: 8px;                  /* radius-sml */
  padding: 12px 16px;                  /* spacing-med spacing-lrg */
  font-size: 14px;
  margin-bottom: 16px;
}
```

## Rules
- Light purple tint background — subtle, not loud.
- Sits below the step title, above the input.
- One line of text — never wraps to multiple lines.
- No icons inside the ctx-bar.
