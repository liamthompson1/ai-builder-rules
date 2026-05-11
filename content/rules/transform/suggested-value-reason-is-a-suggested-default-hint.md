---
title: '`Suggested: **value** ← reason` is a suggested-default hint'
summary: >-
  A line starting with `Suggested:` containing a bold value followed by an arrow
  (`←`) and reason renders as a soft suggestion below the input, prompting the
  user without preselecting.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`Suggested: **value** ← reason` is a suggested-default hint

A line starting with `Suggested:` containing a bold value followed by
an arrow (`←`) and reason renders as a soft suggestion below the
input, prompting the user without preselecting.

### Why this matters

Sometimes the system has a strong hint about what the user probably
wants (matching the outbound flight date, for example) but the user
should still make the choice deliberately. A suggestion makes the
preferred answer obvious without auto-selecting it and causing
mistakes.

### When to apply

When the system can compute a sensible default based on earlier
captures, and wants to surface it without forcing it.

### Examples

#### ✅ Good

```markdown
Suggested: **Wed 1 Jul 2026** ← your outbound flight date
```

#### ❌ Bad

```markdown
Default: Wed 1 Jul 2026
```

The word "Default" implies the value is already chosen. "Suggested"
with the bold value and reason is softer and more honest about who's
deciding.

### Edge cases

The arrow must be the left-pointing Unicode `←` (U+2190), not a
hyphen or `<-`.
