---
title: '`# Search Summary`'
summary: >-
  A step titled `# Search Summary` renders as the summary view rather than a
  normal input step. Its body uses a different set of rules (Rules 25–27) for
  rendering rows and the CTA.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`# Search Summary` step renders as the summary view

A step titled `# Search Summary` renders as the summary view rather
than a normal input step. Its body uses a different set of rules
(Rules 25–27) for rendering rows and the CTA.

### Why this matters

The summary is structurally different from the rest of the wizard —
it shows captured values rather than asking for new ones. Treating
it as a normal step would mean every author has to manually compose
the recap. Naming it explicitly lets the parser switch into the
right rendering mode.

### When to apply

The final step of every wizard. Always titled `# Search Summary`.

### Examples

#### ✅ Good

```markdown
# Search Summary

✈️ Airport ✏
London Gatwick Airport (LGW)

🚗 Dropping off car ✏
**Wednesday 1st July 2026 at 06:00**
```

#### ❌ Bad

```markdown
# Final Step

✈️ Airport ✏
London Gatwick Airport (LGW)
```

The title `Final Step` doesn't trigger summary rendering, so the
emoji+pencil rows below won't render as summary rows — they'll be
treated as body text.

### Edge cases

The exact title `Search Summary` is required. Variants like
`Summary`, `Your Summary`, `Trip Summary`, or translations are not
recognised yet — these would need a per-product mapping that doesn't
exist yet.

---

## Rule 25 — `emoji Label ✏` opens a summary row

A line beginning with an emoji, followed by a label, and ending in a
pencil (`✏`) opens a summary row. The emoji is the row's icon and
the pencil is an edit affordance.

The following lines (until the next emoji-`✏` line, or until the
CTA) are the row's value(s).

### Why this matters

Summary rows have a recognisable shape — icon, label, value, edit
button. Letting the author write each row as `emoji Label ✏` keeps
the source readable in preview while giving the parser enough
structure to render the row properly.

### When to apply

Inside the `# Search Summary` step. Use one of these openers for
every captured value the user can edit.

### Examples

#### ✅ Good

```markdown
✈️ Airport ✏
London Gatwick Airport (LGW)

🚗 Dropping off car ✏
**Wednesday 1st July 2026 at 06:00**
```

#### ❌ Bad

```markdown
Airport: London Gatwick Airport (LGW) (edit)
Dropping off car: Wednesday 1st July 2026 at 06:00 (edit)
```

A flat colon-separated form loses the icon and the explicit edit
control. The structured shape is what lets the parser render the
proper row with pencil button.

### Edge cases

The pencil must be the literal `✏` Unicode character (U+270F). Other
similar characters (`📝`, `✎`) are not recognised.

---

## Rule 26 — Within a summary row, bold is the primary value; plain is supplementary

Inside a summary row, a bolded line is the primary value (large,
bold type). Non-bold lines that follow are supplementary detail
(smaller, muted).

### Why this matters

A summary row often has a headline value (the date and time) plus
supporting context (the flight that justifies the time). Showing
them with equal weight reads flatly; bolding the headline and muting
the rest creates a clear hierarchy.

### When to apply

Whenever a summary row has more than a single short value to
display.

### Examples

#### ✅ Good

```markdown
🚗 Dropping off car ✏
**Wednesday 1st July 2026 at 06:00**
To catch your British Airways flight BA2670 to Palma de Mallorca (Majorca), departing South Terminal at 09:45 on Wed 1 Jul 2026
```

#### ❌ Bad

```markdown
🚗 Dropping off car ✏
Wednesday 1st July 2026 at 06:00
To catch your British Airways flight BA2670…
```

Without the bold, both lines read as equally important — visual
hierarchy is lost.

### Edge cases

A row with no bold line uses the first line as primary by default.
A row with multiple bold lines uses the first bold line as primary
and the rest as supplementary (this is unusual; usually only one
line is bold).

---

## Rule 27 — `[Action label](url)` after the rows is the summary CTA

After all the summary rows, a standalone link renders as the primary
CTA button.

### Why this matters

The whole purpose of the summary is to reach a moment where the user
commits. The CTA needs to be unambiguous, prominent, and not buried —
making it a standalone link at the end of the rows gives the
renderer a clear place to put a big button.

### When to apply

Once per summary step. Placed after the last row.

### Examples

#### ✅ Good

```markdown
✈️ Airport ✏
London Gatwick Airport (LGW)

🚗 Dropping off car ✏
**Wednesday 1st July 2026 at 06:00**

[Show prices and availability](https://www.holidayextras.com/airport-parking-wizard/#search-summary)
```

#### ❌ Bad

```markdown
✈️ Airport ✏
London Gatwick Airport (LGW)

Tap "Show prices and availability" below to continue.

[Show prices and availability](#…)
```

Adding prose around the CTA muddies the visual hierarchy and tells
the user something they'll see in a second anyway.

### Edge cases

Multiple links after the rows is undefined behaviour. The first one
is treated as the CTA; the rest are dropped with a warning.

---

## Rule 28 — A `**Bold lead-in.** …` paragraph after the CTA is a nudge card

A bold-lead paragraph appearing after the summary CTA (rather than
beside an input) becomes a nudge card — a green-tinted persuasion
panel below the CTA, distinct from a helper card.

### Why this matters

The summary is the last chance to give the user a reason to commit
now rather than abandon. A small persuasion panel — pricing trends,
booking benefits, time-sensitive value — sits below the CTA where
it's seen but doesn't compete with the call to action.

### When to apply

At most once per summary step, after the CTA. Only when there's a
genuine, accurate reason to nudge — never as filler.

### Examples

#### ✅ Good

```markdown
[Show prices and availability](#…)

**Book early, pay less.** Our data shows prices go up 95% of the
time as the stay date gets closer.
```

#### ❌ Bad

```markdown
[Show prices and availability](#…)

**You should book now.** Don't miss out.
```

A nudge without specific, defensible reasoning reads as a generic
upsell and erodes user trust. The bold lead-in must point to a real
reason in the body.

### Edge cases

This shares the same surface syntax as a helper card (Rule 21). The
distinction is position: next to an input = helper; after the CTA =
nudge. The parser uses location, not syntax, to choose between them.
