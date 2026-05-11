---
title: Binary Card Styling
summary: '.binary-card { border: 1px solid #c2c2c5; /* field-outline */ border-radius: 12px; /* radius-med */ padding: 16px; /* spacing-lrg */ display: flex;…'
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
# Binary Card Styling

```css
.binary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;                         /* spacing-med */
}

.binary-card {
  border: 1px solid #c2c2c5;         /* field-outline */
  border-radius: 12px;               /* radius-med */
  padding: 16px;                     /* spacing-lrg */
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.binary-card:hover {
  border-color: #542e91;
  border-width: 2px;
}

.binary-label {
  color: #542e91;                    /* color-primary-brand */
  font-size: 16px;
  font-weight: 600;
}

.binary-sublabel {
  color: #737373;                    /* text-color-grey */
  font-size: 13px;
  margin-top: 4px;
}

.binary-chevron {
  color: #542e91;
  margin-top: 8px;
  font-size: 18px;
}
```

## Rules
- Two cards in a 2-column grid (12px gap).
- Each card stacks: label → sublabel → chevron (vertical flex).
- Chevron is purple, hints at "tap to continue".
- Cards have `radius-med` (12px).
