---
title: Bold across all three lines + `✓` marks the selected result
summary: >-
  When all three lines of a flight result block are wrapped in `**bold**` and
  followed by a `✓` on the first line, that result is the user's current
  selection.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
Bold across all three lines + `✓` marks the selected result

When all three lines of a flight result block are wrapped in
`**bold**` and followed by a `✓` on the first line, that result is
the user's current selection.

### Why this matters

When the user returns to a step where they've already chosen a
flight, they need to see which one they picked. Bolding the whole
card and adding a check mark is unambiguous.

### When to apply

To exactly one card in a results list, when a selection has been
made. Never more than one.

### Examples

#### ✅ Good

```markdown
**BA2670 · British Airways** ✓
↗ **09:45 · LGW · London Gatwick · Wed 1 Jul**
↙ **13:35 · PMI · Palma de Mallorca · Wed 1 Jul · South Terminal**
```

#### ❌ Bad

```markdown
**BA2670 · British Airways**
↗ 09:45 · LGW · London Gatwick · Wed 1 Jul
↙ 13:35 · PMI · Palma de Mallorca · Wed 1 Jul · South Terminal
```

Bolding only the first line is ambiguous — is the user selecting
just that line, or the whole card? All three lines need to be bold
together.

### Edge cases

If two cards are both marked selected, the parser keeps the first
and logs a warning. The user picks one flight, not several.
