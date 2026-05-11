---
title: Passenger Stepper (.pax-stepper) Markup
summary: 'Used in the Transfers summary (and potentially other steps). Controls for adults, children, infants with age range labels.'
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
# Passenger Stepper (.pax-stepper) Markup

Used in the Transfers summary (and potentially other steps). Controls for adults, children, infants with age range labels.

```html
<div class="pax-stepper">

  <div class="pax-row">
    <div class="pax-info">
      <span class="pax-label">Adults</span>
      <span class="pax-age">12+</span>
    </div>
    <div class="pax-controls">
      <button class="pax-btn minus" aria-label="Remove adult">−</button>
      <span class="pax-count">2</span>
      <button class="pax-btn plus" aria-label="Add adult">+</button>
    </div>
  </div>

  <div class="pax-row">
    <div class="pax-info">
      <span class="pax-label">Children</span>
      <span class="pax-age">2–11</span>
    </div>
    <div class="pax-controls">
      <button class="pax-btn minus" aria-label="Remove child">−</button>
      <span class="pax-count">0</span>
      <button class="pax-btn plus" aria-label="Add child">+</button>
    </div>
  </div>

  <div class="pax-row">
    <div class="pax-info">
      <span class="pax-label">Infants</span>
      <span class="pax-age">0–1</span>
    </div>
    <div class="pax-controls">
      <button class="pax-btn minus" aria-label="Remove infant">−</button>
      <span class="pax-count">0</span>
      <button class="pax-btn plus" aria-label="Add infant">+</button>
    </div>
  </div>

</div>
```

## Rules
- One `.pax-row` per passenger type.
- Each row has a label and an age range badge.
- `+` / `−` buttons need explicit `aria-label`s naming the action and passenger type.
- The numeric `.pax-count` updates inline as the buttons are tapped.
- Stepper is placed inline within the summary step body (not on its own step).
