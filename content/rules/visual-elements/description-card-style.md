---
title: Description Card Styling
summary: '.description-card:hover, .description-card.selected { border-color: #542e91; /* color-primary-brand */ border-width: 2px; /* border-med */ }'
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
# Description Card Styling

```css
.description-card {
  border: 1px solid #c2c2c5;         /* field-outline */
  border-radius: 12px;               /* radius-med */
  padding: 16px 20px;                /* spacing-lrg spacing-xl */
  margin-bottom: 8px;
  background: #ffffff;
  cursor: pointer;
}

.description-card:hover,
.description-card.selected {
  border-color: #542e91;             /* color-primary-brand */
  border-width: 2px;                 /* border-med */
}

.card-title {
  color: #542e91;                    /* color-primary-brand / field-title-text */
  font-size: 16px;
  font-weight: 600;                  /* body-med-bold */
  margin-bottom: 4px;
}

.card-body {
  color: #737373;                    /* text-color-grey */
  font-size: 14px;                   /* body-sml */
  font-weight: 400;
}
```

## Rules
- Card uses `radius-med` (12px), distinguishing it from input fields (which use 8px).
- Stacked vertically — never in a grid.
- Hover and selected share the same purple-bordered look (2px).
- Title in purple, body in muted grey.
