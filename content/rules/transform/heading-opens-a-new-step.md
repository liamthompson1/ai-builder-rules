---
title: '`# Heading` opens a new step'
summary: >-
  A level-1 heading (`#`) starts a new step. Everything between this heading and
  the next `#` belongs to that step. The heading text becomes the step title.
golden: false
strictness: should
applies_to:
  - forms
created: '2026-05-11'
---
`# Heading` opens a new step

A level-1 heading (`#`) starts a new step. Everything between this
heading and the next `#` belongs to that step. The heading text
becomes the step title.

### Why this matters

A wizard is a sequence of discrete steps. The author needs a way to
say "a new step starts here" that is also the natural way to write
the step's title. Without a clear boundary, content from two steps
bleeds together and the parser can't tell where one ends.

### When to apply

Every time a new step begins. The very first `#` in the file is the
first step; every subsequent `#` opens the next.

### Examples

#### ✅ Good

```markdown
# Flying from

…content…

# Parking from

…content…
```

#### ❌ Bad

```markdown
## Flying from

…content…
```

Using `##` for a step title means the parser treats it as a section
inside whatever step is currently open — not as a new step.

### Edge cases

If a file has no `#` headings at all, it has no steps, and the wizard
won't render. A file with a single `#` produces a single-step wizard.
