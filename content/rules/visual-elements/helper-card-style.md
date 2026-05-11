---
title: Helper Card Styling
summary: 'Helper Card Styling'
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
# Helper Card Styling

```css
.helper-card {
  background: #f7f7f7;               /* color-grey-4 */
  border-radius: 8px;                /* radius-sml */
  padding: 16px;
  margin-top: 16px;
  font-size: 14px;                   /* body-sml */
  color: #232323;
  line-height: 1.5;
}
```

## Rules
- Neutral light grey background — subordinate to the input above it.
- 8px radius matches input fields.
- Sits below the options inside `.step-body`.
- Always set `line-height: 1.5` for readability.
