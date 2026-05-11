---
title: Progress Bar Styling
summary: 'The progress bar sits **at the very bottom edge** of the hero image as a thin filled yellow strip.'
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
# Progress Bar Styling

The progress bar sits **at the very bottom edge** of the hero image as a thin filled yellow strip.

```css
.progress-bar {
  height: 4px;
  background: #fdd506;       /* color-secondary-brand */
  width: XX%;                /* grows with each completed step */
  transition: width 240ms ease;
}
```

## Rules
- **No step numbers. No dot indicators. Just the growing yellow stripe.**
- The bar grows from left to right as steps complete.
- Anchored to the bottom edge of the hero — not its own row.
- Yellow `#fdd506` only (the HX secondary brand colour).

## Accessibility
```html
<div class="progress-bar"
     role="progressbar"
     aria-valuenow="3"
     aria-valuemin="0"
     aria-valuemax="7"
     aria-label="Step 3 of 7">
</div>
```
