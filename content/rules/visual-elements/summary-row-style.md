---
title: Summary Row Styling
summary: '.summary-label { color: #737373; /* text-color-grey */ font-size: 13px; display: block; }'
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
# Summary Row Styling

```css
.summary-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;                         /* spacing-med */
  padding: 16px 0;                   /* spacing-lrg */
  border-bottom: 1px solid #ededee;  /* color-grey-3 */
}

.summary-label {
  color: #737373;                    /* text-color-grey */
  font-size: 13px;
  display: block;
}

.summary-value {
  color: #232323;                    /* text-color */
  font-size: 16px;
  font-weight: 600;
}

.summary-edit {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #542e91;                    /* color-primary-brand */
  cursor: pointer;
}
```

## Rules
- Three columns by flex: icon, content (label + value), edit pencil.
- Edit pencil is purple, transparent background, no border.
- Each row separated by a thin grey divider.
- Label is muted grey, value is dark and bold.
