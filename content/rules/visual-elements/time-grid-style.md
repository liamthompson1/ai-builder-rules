---
title: Time Grid Styling
summary: '.time-option { border: 1px solid #c2c2c5; /* field-outline */ border-radius: 8px; /* radius-sml */ padding: 12px 4px; /* spacing-med */ background: #ffffff;…'
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
# Time Grid Styling

```css
.time-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;                          /* spacing-sml */
}

.time-option {
  border: 1px solid #c2c2c5;         /* field-outline */
  border-radius: 8px;                /* radius-sml */
  padding: 12px 4px;                 /* spacing-med */
  background: #ffffff;
  font-size: 16px;
  font-family: Nunito, sans-serif;
  text-align: center;
}

.time-option:hover,
.time-option.selected {
  border-color: #542e91;             /* color-primary-brand */
  background: #eeeaf4;               /* color-primary-4 */
  color: #542e91;
}
```

## Rules
- 4 columns, 8px gap.
- Hourly increments from `00:01` to `23:59`.
- Selected and hover states share the same purple-tinted look.
- Minimum 44px tap height per option.
