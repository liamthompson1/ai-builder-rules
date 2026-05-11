---
title: Calendar Day States
summary: '/* Today */ .calendar-day.today { border: 1px solid #232323; border-radius: 4px; }'
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
# Calendar Day States

```css
/* Default day */
.calendar-day { background: transparent; color: #232323; }

/* Today */
.calendar-day.today { border: 1px solid #232323; border-radius: 4px; }

/* Selected (departure) */
.calendar-day.selected {
  background: #542e91;         /* color-primary-brand */
  color: #ffffff;
  border-radius: 4px;
}

/* In range (between depart and return) */
.calendar-day.in-range {
  background: #eeeaf4;         /* color-primary-4 */
  color: #1a0c27;
}

/* Disabled (past dates) */
.calendar-day.disabled {
  color: #c2c2c5;              /* color-grey-1 */
  cursor: not-allowed;
}
```

## Month heading
```css
.month-heading {
  color: #542e91;              /* color-primary-brand */
  font-size: 18px;
  font-weight: 700;
}
```

## Calendar grid layout
- 7 columns (one per weekday).
- Weekday headers at the top of each month block (MON, TUE, …).
- Months stack vertically — user scrolls down to reach future months.
- **No previous / next month arrows. No month picker.**
