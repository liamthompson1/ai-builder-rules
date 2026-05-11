---
title: Consecutive month tables stack into a scrollable multi-month calendar
summary: >-
  When multiple `## Month YYYY` + table pairs appear in the same step, they
  stack vertically into a single scrollable calendar covering all the months.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
Consecutive month tables stack into a scrollable multi-month calendar

When multiple `## Month YYYY` + table pairs appear in the same step,
they stack vertically into a single scrollable calendar covering all
the months.

### Why this matters

A trip is often booked weeks or months ahead. The user shouldn't have
to click through one month at a time. Showing several months at once
with vertical scroll matches how mobile date pickers work.

### When to apply

Any time a step needs to show more than one month of dates. Most
date-picking steps benefit from at least three months of lookahead.

### Examples

#### ✅ Good

```markdown
# Parking from

## July 2026
| MON | TUE | WED | THU | FRI | SAT | SUN |
| … |

## August 2026
| MON | TUE | WED | THU | FRI | SAT | SUN |
| … |

## September 2026
| MON | TUE | WED | THU | FRI | SAT | SUN |
| … |
```

#### ❌ Bad

Putting each calendar month in a separate step. The user shouldn't
have to press "next" to see August's dates — they're part of the same
date choice.

### Edge cases

If the months aren't contiguous, the parser still renders them in
order but adjacent non-contiguous months may look odd. Use contiguous
months unless there's a specific reason not to.
