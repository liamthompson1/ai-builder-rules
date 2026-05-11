---
title: Pattern 4 — Description Cards (HTML)
summary: 'Used when: the user needs to understand the difference between options before choosing. Insurance uses this for cover type, cruise, cancellation value.'
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
# Pattern 4 — Description Cards (HTML)

Used when: the user needs to understand the difference between options before choosing. Insurance uses this for cover type, cruise, cancellation value.

Use when the option label alone is not self-explanatory.

```html
<div class="step-body">

  <div class="description-card" role="button" tabindex="0">
    <h3 class="card-title">Annual Cover</h3>
    <p class="card-body">Unlimited trips for 12 months.
    Usually better value and more convenient if you travel more than once.</p>
  </div>

  <!-- Helper text between cards (optional) -->
  <p class="between-card-hint">Annual cover renews automatically each year –
  we'll remind you before it does, and you can opt out at any time.</p>

  <div class="description-card" role="button" tabindex="0">
    <h3 class="card-title">Single Trip Cover</h3>
    <p class="card-body">One trip only.
    You'll still see the annual price to compare before you decide.</p>
  </div>

</div>
```

## Rules
- Each card is `role="button" tabindex="0"`.
- `.card-title` is the option name (e.g. "Annual Cover").
- `.card-body` is the short description.
- `.between-card-hint` is optional clarifying copy that sits between two cards.
- Cards are stacked vertically — never side by side.

## Behaviour
Tapping a card **immediately advances** to the next step.
