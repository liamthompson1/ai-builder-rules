---
title: Pattern 2 — Inline Scrollable Calendar (HTML)
summary: 'Used when: selecting a departure date or return date.'
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
# Pattern 2 — Inline Scrollable Calendar (HTML)

Used when: selecting a departure date or return date.

```html
<div class="step-body">

  <!-- Context bar — shown on return date step to show drop-off context -->
  <div class="ctx-bar">
    Dropping off: Wed 13 May 2026 at 06:00
  </div>

  <!-- Scrollable calendar — no prev/next arrows, just scroll -->
  <div class="calendar">
    <div class="calendar-month">
      <h3 class="month-heading">April 2026</h3>
      <div class="calendar-grid">
        <span class="day-header">MON</span>
        <!-- … other weekday headers … -->
        <button class="calendar-day">24</button>
        <button class="calendar-day selected">13</button>
        <button class="calendar-day disabled">11</button>
      </div>
    </div>
    <!-- Next month renders below — user scrolls down -->
    <div class="calendar-month">
      <h3 class="month-heading">May 2026</h3>
      <!-- … -->
    </div>
  </div>

</div>
```

## Rules
- **No navigation arrows. No month picker. User scrolls vertically.**
- Each `.calendar-month` is a self-contained block with a heading and a 7-column grid.
- Day state classes: `.selected`, `.in-range`, `.today`, `.disabled`.
- Each `.calendar-day` is a `<button>` with `aria-label="13 May 2026"`. Past days have `aria-disabled="true"`.

## Behaviour
Tapping a day immediately advances to the next step.
