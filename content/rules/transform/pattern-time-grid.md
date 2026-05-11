---
title: Pattern 3 — Time Grid (HTML)
summary: 'Used when: selecting drop-off or collection time.'
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
# Pattern 3 — Time Grid (HTML)

Used when: selecting drop-off or collection time.

```html
<div class="step-body">
  <p class="step-subtitle">What time will you drop your car off?</p>

  <div class="time-grid">
    <button class="time-option">00:01</button>
    <button class="time-option">01:00</button>
    <button class="time-option">02:00</button>
    <button class="time-option">03:00</button>
    <!-- 4 columns, covering 00:01 through 23:59 -->
  </div>

  <!-- Helper text — answers "why does this matter?" -->
  <div class="helper-card">
    <p><strong>Not sure of the exact time?</strong> Don't worry — most car parks
    allow you to arrive up to 3 hours either side of your booked drop-off time…</p>
  </div>

</div>
```

## Rules
- 4-column grid, covering hourly increments from `00:01` to `23:59`.
- Each `.time-option` is a `<button>` with the time as text.
- The `.step-subtitle` can dynamically interpolate the previously selected date:
  > "What time will you collect your car on Wed 20 May 2026?"
- Helper card sits **below** the grid, not above.

## Behaviour
Tapping a time **immediately advances** to the next step.
