---
title: Container Layout
summary: 'The entire wizard content area sits inside a centred container.'
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
# Container Layout

The entire wizard content area sits inside a centred container.

```css
.wizard-container {
  max-width: 620px;
  margin: 0 auto;
  padding: 0 16px;           /* spacing-lrg */
  font-family: Nunito, -apple-system, "system-ui", sans-serif;
}
```

## Rules
- Single column on all breakpoints.
- Mobile-first at 393px.
- On tablet 834px+: the 620px container stays centred with whitespace either side.
- The hero image remains full-width regardless of breakpoint.
- The step content stays within the 620px max-width.
- **No horizontal scrolling at any breakpoint.**
