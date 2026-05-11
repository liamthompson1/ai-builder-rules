---
title: A markdown table with day-name headers becomes a calendar month
summary: >-
  A table whose header row is `MON | TUE | WED | THU | FRI | SAT | SUN` becomes
  a calendar grid for the month named in the `##` heading directly above it.
  Cells with numbers are days; empty cells are padding. A bold cell is the
  selected day.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
A markdown table with day-name headers becomes a calendar month

A table whose header row is `MON | TUE | WED | THU | FRI | SAT | SUN`
becomes a calendar grid for the month named in the `##` heading
directly above it. Cells with numbers are days; empty cells are
padding. A bold cell is the selected day.

### Why this matters

Date picking is the most common non-list interaction in a wizard.
Authors need a way to express "show a calendar for this month" that
also renders as a real calendar in markdown preview, so they can
verify their layout before shipping.

### When to apply

For every month the user can pick from.

### Examples

#### ✅ Good

```markdown
## July 2026

| MON | TUE | WED | THU | FRI | SAT | SUN |
|---|---|---|---|---|---|---|
| | | **1** | 2 | 3 | 4 | 5 |
| 6 | 7 | 8 | 9 | 10 | 11 | 12 |
```

#### ❌ Bad

```markdown
## July 2026

Mon 6  Tue 7  Wed 8  Thu 9  Fri 10
```

A plain-text approximation doesn't render as a calendar in any
previewer and the parser doesn't recognise it.

### Edge cases

The month heading must be a `## Month YYYY` format. Other formats
(`July`, `Jul 2026`, `2026-07`) are not recognised.

Empty cells at the start and end of the month are required — the
parser uses them to align days with their correct day-of-week.
