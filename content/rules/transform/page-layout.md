---
title: Page Layout HTML
summary: 'The wizard page is composed of three vertical sections inside a centred container.'
golden: false
strictness: should
applies_to:
  - forms
  - mobile
tags:
  - Wizard
  - HTML
  - Markup
related: []
created: '2026-05-11'
---
# Page Layout HTML

The wizard page is composed of three vertical sections inside a centred container.

```
┌────────────────────────────────────┐
│  Purple header (full width)        │  ← bg #542e91, Nunito
│  HX logo + product name            │
├────────────────────────────────────┤
│  Hero image (full width)           │  ← product-specific photography
│  Tagline text overlaid             │
│  ░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← yellow progress bar at bottom edge
├────────────────────────────────────┤
│  [.step.active]                    │
│  .step-title  (the question)       │
│  .step-body   (the input/options)  │
└────────────────────────────────────┘
         max-width: 620px, centred
```

## HTML skeleton

```html
<body>
  <header class="wizard-header"><!-- HX SVG + product name --></header>

  <div class="hero">
    <img class="hero-img" src="…" alt="…" />
    <div class="progress-bar" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="7"></div>
  </div>

  <main class="wizard-container">
    <!-- one .step per question; only one has .active -->
  </main>
</body>
```

## Container CSS contract
```css
.wizard-container {
  max-width: 620px;
  margin: 0 auto;
  padding: 0 16px;           /* spacing-lrg */
  font-family: Nunito, -apple-system, "system-ui", sans-serif;
}
```
