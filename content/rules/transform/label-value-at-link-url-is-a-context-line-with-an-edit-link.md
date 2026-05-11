---
title: '`Label: value at [link](url)` is a context line with an edit link'
summary: >-
  A line containing a label, a colon, a value, and an embedded link becomes a
  context bar where the linked portion is editable — tapping it jumps to that
  step.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`Label: value at [link](url)` is a context line with an edit link

A line containing a label, a colon, a value, and an embedded link
becomes a context bar where the linked portion is editable — tapping
it jumps to that step.

### Why this matters

On a step that depends on a value the user set earlier, surfacing
that value AND making it editable in one tap is much better than
forcing them to navigate back, change it, and find their way forward
again.

### When to apply

At the top of a step that depends on a prior capture the user might
want to amend.

### Examples

#### ✅ Good

```markdown
Dropping off: Wed 1 Jul 2026 at [06:00](https://www.holidayextras.com/airport-parking-wizard/#dropoff-time)
```

#### ❌ Bad

```markdown
Dropping off: Wed 1 Jul 2026 at 06:00
```

Without the link, the user knows the value but can't change it
without navigating back manually.

### Edge cases

The linked text should be the smallest editable portion — usually
just the value, not the whole sentence. Linking the entire line
makes the tap target larger than needed and overlaps with adjacent
text.
