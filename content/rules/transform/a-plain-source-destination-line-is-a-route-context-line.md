---
title: A plain `Source → Destination` line is a route context line
summary: >-
  A line containing two place names joined by an arrow (`→`) renders as a
  context bar showing the journey direction.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
A plain `Source → Destination` line is a route context line

A line containing two place names joined by an arrow (`→`) renders as
a context bar showing the journey direction.

### Why this matters

On later steps, the user has already chosen an origin and destination
several screens ago. Reminding them of the route they're booking
prevents confusion ("wait, was I going to Palma or Faro?") and
reinforces the choice they made.

### When to apply

At the top of any step (after the title) where the user benefits from
seeing the route they're working with.

### Examples

#### ✅ Good

```markdown
London Gatwick Airport → Palma de Mallorca (Majorca)
```

#### ❌ Bad

```markdown
From London Gatwick Airport to Palma de Mallorca (Majorca)
```

Prose works but doesn't render as a distinct context bar — it just
becomes body text.

### Edge cases

The arrow must be the right-pointing Unicode `→` (U+2192). `->`,
`=>`, `>`, or em-dashes are not recognised.
