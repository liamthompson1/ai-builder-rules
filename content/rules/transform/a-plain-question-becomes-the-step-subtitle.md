---
title: A plain question becomes the step subtitle
summary: >-
  A short plain-text line below the `#` heading (or below a context bar) that
  ends in `?` becomes the step's subtitle.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
A plain question becomes the step subtitle

A short plain-text line below the `#` heading (or below a context
bar) that ends in `?` becomes the step's subtitle.

### Why this matters

Sometimes the step title is a noun phrase ("Parking from time") and
the question that makes it concrete is separate ("What time will you
drop your car off?"). Letting authors write the question naturally
under the heading keeps the source readable without sacrificing the
two-part structure.

### When to apply

When the step's title alone isn't enough to make the user understand
what they're being asked.

### Examples

#### ✅ Good

```markdown
# Parking from time

> ✈ BA2670 to Palma de Mallorca…

What time will you drop your car off?
```

#### ❌ Bad

```markdown
# What time will you drop your car off?
```

Long, full-sentence titles work less well in summary rows, edit
pencils, and progress indicators. The short title plus the question
subtitle gives both: a name and a prompt.

### Edge cases

A line ending in `?` that contains link syntax or formatting isn't a
subtitle — it's a help link (Rule 13).
