---
title: Airport Grid And List Styling
summary: 'Grid has 2–4 columns depending on number of results.'
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
# Airport Grid And List Styling

## Grid options (nearest airports)
```css
.airport-option {
  border: 1px solid #c2c2c5;          /* field-outline */
  border-radius: 8px;                  /* radius-sml */
  padding: 12px;                       /* spacing-med */
  background: #ffffff;
  font-weight: 600;
}
```

Grid has 2–4 columns depending on number of results.

## List items (all airports)
```css
.airport-list-item {
  display: block;
  width: 100%;
  padding: 8px 16px;                   /* spacing-sml spacing-lrg */
  border-bottom: 1px solid #ededee;    /* color-grey-3 */
  background: transparent;
  text-align: left;
  font-family: Nunito, sans-serif;
}
```

## Section labels
The "RECENT", "NEAREST AIRPORTS", and "ALL AIRPORTS" labels are small, uppercase, grey:
```css
.section-label {
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #737373;                      /* text-color-grey */
}
```
