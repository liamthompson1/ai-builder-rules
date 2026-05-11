---
title: Search Input And Results Styling
summary: '.search-input:focus { border-color: #ccc0de; /* field-override */ outline: 2px solid #ccc0de; } ```'
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
# Search Input And Results Styling

## Skip pill (top-right of step body)
```css
.skip-btn {
  float: right;
  border: 1px solid #542e91;         /* color-primary-brand */
  border-radius: 999px;              /* radius-xl — pill */
  padding: 6px 16px;
  color: #542e91;
  background: transparent;
  font-size: 14px;
}
```

## Search input
```css
.search-input {
  width: 100%;
  border: 1px solid #d7d7d9;         /* field-outline */
  border-radius: 8px;                /* radius-sml */
  padding: 12px 16px;                /* spacing-med spacing-lrg */
  font-size: 16px;
  font-family: Nunito, sans-serif;
}

.search-input:focus {
  border-color: #ccc0de;             /* field-override */
  outline: 2px solid #ccc0de;
}
```

## Search result time + items
```css
.result-time {
  color: #542e91;                    /* color-primary-brand */
  font-size: 20px;
  font-weight: 700;
}

.search-result-item {
  padding: 12px 0;
  border-bottom: 1px solid #ededee;  /* color-grey-3 */
  cursor: pointer;
}
```

## Date tabs
```css
.date-tab {
  border: 1px solid #c2c2c5;
  border-radius: 8px;
  padding: 8px 12px;
  background: transparent;
}

.date-tab.selected {
  border-color: #542e91;
  background: #eeeaf4;
  color: #542e91;
}
```
