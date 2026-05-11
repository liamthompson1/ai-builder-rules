---
title: Pattern 5 — Binary Yes/No (HTML)
summary: 'Used when: a single yes/no question that affects the path. Insurance uses this for cruise cover, cancellation cover, winter sports, etc.'
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
# Pattern 5 — Binary Yes/No (HTML)

Used when: a single yes/no question that affects the path. Insurance uses this for cruise cover, cancellation cover, winter sports, etc.

```html
<div class="step-body">

  <div class="binary-grid">

    <div class="binary-card" role="button" tabindex="0">
      <span class="binary-label">No</span>
      <span class="binary-sublabel">Cruise cover not required</span>
      <span class="binary-chevron">›</span>
    </div>

    <div class="binary-card" role="button" tabindex="0">
      <span class="binary-label">Yes</span>
      <span class="binary-sublabel">Add Cruise Cover</span>
      <span class="binary-chevron">›</span>
    </div>

  </div>

  <!-- Helper text explaining why this matters -->
  <p class="helper-text">From missed ports to cabin confinement, additional
  baggage cover and itinerary changes, our cruise cover helps with the extras.</p>

</div>
```

## Rules
- Exactly two cards in a 2-column grid (`.binary-grid`).
- Each card has:
  - `.binary-label` (Yes / No)
  - `.binary-sublabel` (short clarifier of what selecting it means)
  - `.binary-chevron` (visual hint that tapping commits)
- `role="button" tabindex="0"` on each card.

## Behaviour
Tapping a card **immediately advances** to the next step.
