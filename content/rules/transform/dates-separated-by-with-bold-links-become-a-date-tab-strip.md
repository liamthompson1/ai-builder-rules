---
title: Dates separated by ` · ` with bold + links become a date-tab strip
summary: >-
  A line of dates separated by ` · ` where one is bold and the others are links
  becomes a date-tab strip. The bold date is the currently selected tab; the
  linked dates are alternative tabs.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
Dates separated by ` · ` with bold + links become a date-tab strip

A line of dates separated by ` · ` where one is bold and the others
are links becomes a date-tab strip. The bold date is the currently
selected tab; the linked dates are alternative tabs.

### Why this matters

Flight search is one of the few places where the user might want to
look at the day before or after their main date (in case the flight
they remember is just outside the day they picked). Tabs let them
swap quickly without leaving the step.

### When to apply

On flight-search steps where shifting by a day is plausibly useful.
Not for general date selection (use a calendar for that — Rule 8).

### Examples

#### ✅ Good

```markdown
**Wed 1 Jul** · [Tue 30 Jun](#) · [Thu 2 Jul](#)
```

#### ❌ Bad

```markdown
Wed 1 Jul · Tue 30 Jun · Thu 2 Jul
```

Without any styling difference, the parser can't tell which is
selected.

### Edge cases

The pattern requires exactly one bold item and at least one link. A
strip with three links and no bold means no tab is selected — that's
a bug.
