---
title: A bullet list becomes a selectable list
summary: >-
  An unordered list (`- item`) of plain text items becomes a list of selectable
  rows. Tapping a row selects it and advances to the next step.
golden: false
strictness: should
applies_to:
  - forms
created: '2026-05-11'
---
A bullet list becomes a selectable list

An unordered list (`- item`) of plain text items becomes a list of
selectable rows. Tapping a row selects it and advances to the next
step.

### Why this matters

Long, flat lists of options (airports, destinations, countries) are
the most common interaction in any wizard. They need to be quick to
author (just a bullet list), quick to scan, and tappable.

### When to apply

Whenever a step offers a flat list of single-text-string choices that
should auto-advance on selection.

### Examples

#### ✅ Good

```markdown
- Heathrow
- Gatwick
- Luton
- Southampton
```

#### ❌ Bad

```markdown
- Heathrow ✏ More info ➜
- Gatwick — recommended
- Luton (closed Sundays)
```

Mixing in extra annotations, links, or icons inside list items breaks
the "single string per row" model.

### Edge cases

A list of just one or two items is still valid but reads awkwardly —
consider whether a binary or horizontal-options pattern fits better.
