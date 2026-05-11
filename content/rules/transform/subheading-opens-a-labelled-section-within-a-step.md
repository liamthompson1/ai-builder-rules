---
title: '`## Subheading` opens a labelled section within a step'
summary: >-
  A level-2 heading within a step becomes a section label inside that step. The
  text becomes a small uppercase label used to group related items.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`## Subheading` opens a labelled section within a step

A level-2 heading within a step becomes a section label inside that
step. The text becomes a small uppercase label used to group related
items.

### Why this matters

Some steps have multiple groups of options (e.g. recent picks vs
nearest airports vs all airports). Without a way to label groups, the
user sees one undifferentiated list and can't tell why items appear
in the order they do.

### When to apply

Whenever a step contains two or more visually-distinct groups of
content. A step with just one group doesn't need a `##`.

### Examples

#### ✅ Good

```markdown
# Flying from

## Recent
**London Gatwick Airport** ×

## Nearest airports
✓ GPS · 51.0862°N 1.0355°E
Southend · **Gatwick** · London City · Stansted

## All airports
- Heathrow
- Gatwick
- Luton
```

#### ❌ Bad

```markdown
# Flying from

Recent

**London Gatwick Airport** ×

Nearest airports
```

Plain-text labels without `##` aren't recognised as section labels.
They render as ordinary text.

### Edge cases

In a calendar step, `## Month YYYY` has a different meaning — it
names a calendar month (Rule 8). Both uses share the same syntax but
the parser distinguishes them by what follows (a table = calendar
month; anything else = section label).
