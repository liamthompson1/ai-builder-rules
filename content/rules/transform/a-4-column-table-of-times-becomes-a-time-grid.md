---
title: A 4-column table of times becomes a time grid
summary: >-
  A markdown table with no header row (or an empty header) and 4 columns of
  `HH:MM` values becomes a time-picker grid. A bold cell is the selected time.
golden: false
strictness: should
applies_to:
  - forms
created: '2026-05-11'
---
A 4-column table of times becomes a time grid

A markdown table with no header row (or an empty header) and 4
columns of `HH:MM` values becomes a time-picker grid. A bold cell is
the selected time.

### Why this matters

Time picking is a constrained input — only valid clock times — and a
grid of buttons is faster than typing or scrolling a wheel. Four
columns fits comfortably on a mobile screen and groups times into a
recognisable pattern.

### When to apply

For any step that asks the user to pick a time.

### Examples

#### ✅ Good

```markdown
| | | | |
|---|---|---|---|
| 00:01 | 01:00 | 02:00 | 03:00 |
| 04:00 | 05:00 | **06:00** | 07:00 |
| 08:00 | 09:00 | 10:00 | 11:00 |
| 12:00 | 13:00 | 14:00 | 15:00 |
| 16:00 | 17:00 | 18:00 | 19:00 |
| 20:00 | 21:00 | 22:00 | 23:00 |
| 23:59 | | | |
```

#### ❌ Bad

```markdown
- 00:01
- 01:00
- 02:00
- …
- 23:59
```

A bullet list of 24+ items is exhausting to scroll. The grid is
denser and easier to scan.

### Edge cases

The first and last cells are conventionally `00:01` and `23:59`
rather than `00:00` and `24:00` — these represent "just after
midnight" and "just before midnight".
