---
title: Items separated by ` · ` on one line become a horizontal row of options
summary: >-
  Plain-text items separated by middle-dot characters (` · `) on a single line
  become a horizontal row of selectable options.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
Items separated by ` · ` on one line become a horizontal row of options

Plain-text items separated by middle-dot characters (` · `) on a
single line become a horizontal row of selectable options.

### Why this matters

When there are only a handful of options (3–5) and each is short,
showing them as a horizontal row saves vertical space and reads more
naturally than a bullet list. This is the pattern for "nearby"
options, quick filters, or small option sets.

### When to apply

When you have 3–5 short options that all fit comfortably on one line
on a mobile screen.

### Examples

#### ✅ Good

```markdown
Southend · **Gatwick** · London City · Stansted
```

The bold item is the currently selected option.

#### ❌ Bad

```markdown
Southend · Gatwick · London City Airport · Stansted · Heathrow Terminal 2 · Heathrow Terminal 3 · Heathrow Terminal 4
```

Too many items, or items too long to fit on one line on mobile. Use a
bullet list (Rule 4) for longer sets.

### Edge cases

The separator must be the middle dot (U+00B7), not a regular dot.
Dashes, slashes, or pipes are not recognised.
