---
title: Header Bar Styling
summary: 'Header Bar Styling'
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
# Header Bar Styling

```css
.wizard-header {
  background: #542e91;       /* color-primary-brand */
  color: #ffffff;            /* color-primary-brand-contrast */
  font-family: Nunito, sans-serif;
}
```

## Composition
- Purple full-width strip.
- HX SVG logo on the left (always — see logo embed rule).
- Product name text immediately to the right of the logo (e.g. "Airport Parking", "Travel Insurance", "Airport Transfers").
- **No back button.** No menu icons.

## Notes
- The product name is white (`#ffffff` on `#542e91`).
- Nunito font, weight 700.
- Comfortable padding around the logo + product name (≈16px vertical).
