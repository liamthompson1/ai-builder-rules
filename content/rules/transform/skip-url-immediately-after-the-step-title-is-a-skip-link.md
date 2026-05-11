---
title: '`[Skip](url)` immediately after the step title is a skip link'
summary: >-
  A markdown link with the text `Skip` placed directly under the step's `#`
  heading marks the step as skippable. It renders as a Skip pill in the
  top-right of the step.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`[Skip](url)` immediately after the step title is a skip link

A markdown link with the text `Skip` placed directly under the step's
`#` heading marks the step as skippable. It renders as a Skip pill in
the top-right of the step.

### Why this matters

Some steps are genuinely optional (adding a flight number, for
example). Forcing the user through them costs completion. A clear,
visible skip control respects the user's time without burying the
"opt out" in a menu.

### When to apply

Only on truly optional steps. If skipping the step would leave the
wizard in a broken or invalid state, the step isn't skippable.

### Examples

#### ✅ Good

```markdown
# Your outbound flight

[Skip](https://www.holidayextras.com/airport-parking-wizard/#dropoff-time)
```

#### ❌ Bad

```markdown
# Pick your destination

[Skip](#…)
```

A destination is required for the wizard to function. Marking it
skippable lets the user reach the summary with an empty trip.

### Edge cases

The link URL points to the step the skip should advance to. Usually
this is the next step in the natural order, but the URL is the source
of truth — the parser uses it rather than guessing.
