---
title: '`> ✈ …` is a step context bar'
summary: >-
  A blockquote (`>`) starting with an airplane emoji renders as a context bar at
  the top of the step, summarising the user's previous selections relevant to
  this step.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`> ✈ …` is a step context bar

A blockquote (`>`) starting with an airplane emoji renders as a
context bar at the top of the step, summarising the user's previous
selections relevant to this step.

### Why this matters

Once the user is on step 4 or 5, the context they built up earlier
fades from working memory. A small context bar at the top of the
step ("you're booking parking for the BA2670 to Palma…") reorients
them without them having to navigate back.

### When to apply

On any step where prior context is critical to making the current
choice. Mostly applies from step 3 onwards.

### Examples

#### ✅ Good

```markdown
# Parking from time

> ✈ BA2670 to Palma de Mallorca (Majorca) · departs 09:45 · Wed 1 Jul · London Gatwick Airport · South Terminal
```

#### ❌ Bad

```markdown
# Parking from time

✈ BA2670 to Palma de Mallorca · departs 09:45 · Wed 1 Jul
```

Without the blockquote marker, the line renders as ordinary body text
and loses the visual distinction.

### Edge cases

A step can have at most one context bar. Multiple `> ✈ …` blocks in
the same step are folded into the first one's content.
