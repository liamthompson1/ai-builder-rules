---
title: '`---` between steps is a step boundary marker'
summary: >-
  A horizontal rule between two `#` headings is a step boundary marker. It's
  optional — the next `#` is enough to close the previous step — but authors
  should include it for visual clarity in the source.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`---` between steps is a step boundary marker

A horizontal rule between two `#` headings is a step boundary marker.
It's optional — the next `#` is enough to close the previous step —
but authors should include it for visual clarity in the source.

### Why this matters

In a long source file, step boundaries can be hard to spot when
scanning. The `---` gives the author a visual ruler between steps in
the markdown preview, with no effect on the rendered output.

### When to apply

Between every pair of `#` step headings.

### Examples

#### ✅ Good

```markdown
# Flying from

…content…

---

# Parking from

…content…
```

#### ❌ Bad

A file without `---` separators is technically valid but harder to
scan. Not a parser error, but a readability cost.

### Edge cases

A `---` outside any step (e.g. before the first `#`) has no effect.
A `---` immediately after a `#` is ambiguous and should be avoided.
