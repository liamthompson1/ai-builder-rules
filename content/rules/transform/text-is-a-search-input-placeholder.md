---
title: "`\U0001F50D Text…` is a search input placeholder"
summary: >-
  A line starting with a magnifying glass emoji renders as a search input with
  the rest of the line as the placeholder text.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`🔍 Text…` is a search input placeholder

A line starting with a magnifying glass emoji renders as a search
input with the rest of the line as the placeholder text.

### Why this matters

When the list of options is long (every airline, every airport, every
destination), a search box is the only practical way to find one.
The placeholder tells the user what they can search for.

### When to apply

On any step where the underlying list is too long to scan and the
user is expected to type to filter.

### Examples

#### ✅ Good

```markdown
🔍 Search destination, time or airline…
```

#### ❌ Bad

```markdown
🔍
Search destination, time or airline…
```

The emoji and the placeholder must be on the same line — the parser
treats them as one unit.

### Edge cases

The emoji must be the magnifying glass `🔍` (U+1F50D), tilted-left
variant.
