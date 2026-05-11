---
title: '`✓ Text` is an informational status line'
summary: >-
  A checkmark (`✓`) at the start of a line marks it as a confirmed status line —
  used for things like "GPS active" or "Verified". The line is informational
  only; it is not selectable.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`✓ Text` is an informational status line

A checkmark (`✓`) at the start of a line marks it as a confirmed
status line — used for things like "GPS active" or "Verified". The
line is informational only; it is not selectable.

### Why this matters

Some context needs to tell the user something is working (their
location was detected, their session is valid). Without a clear
visual treatment, this gets confused with selectable options.

### When to apply

When the author wants to convey "this is true / confirmed / active"
as a small status line, distinct from selectable choices.

### Examples

#### ✅ Good

```markdown
✓ GPS · 51.0862°N 1.0355°E
```

#### ❌ Bad

```markdown
GPS · 51.0862°N 1.0355°E
```

Without the checkmark, the line looks like a horizontal options row
(Rule 7) and the user may try to tap it.

### Edge cases

The checkmark must be the literal Unicode `✓` (U+2713). Other
similar-looking characters (`✔`, `☑`) are not recognised.
