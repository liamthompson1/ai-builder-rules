---
title: '`**Bold lead-in.** Body.` next to an input is a helper card'
summary: >-
  A paragraph that opens with bolded text followed by a period becomes a helper
  card — an info panel sitting next to or below the input, with the bold phrase
  as the helper's title and the rest as its body.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`**Bold lead-in.** Body.` next to an input is a helper card

A paragraph that opens with bolded text followed by a period becomes
a helper card — an info panel sitting next to or below the input,
with the bold phrase as the helper's title and the rest as its body.

### Why this matters

Some steps benefit from a small piece of context that anticipates a
question the user might have ("Not sure of the exact time?"). Having
this content authorable as a regular paragraph — but rendered as a
visually distinct card — keeps the source readable and the rendered
output helpful.

### When to apply

On steps where there's a common user worry or question the helper
text can address pre-emptively.

### Examples

#### ✅ Good

```markdown
**Not sure of the exact time?** Most car parks allow you to arrive
up to 3 hours either side of your booked drop-off time, and some
offer grace periods of up to 6 hours.
```

#### ❌ Bad

```markdown
Not sure of the exact time? Most car parks allow you to arrive…
```

Without the bold lead-in, the paragraph reads as ordinary body text
and doesn't render as a card.

### Edge cases

If the same pattern appears AFTER the summary CTA rather than next to
an input, it's a nudge card (Rule 28), not a helper.
