---
title: '`[Question?](url)` is a help link'
summary: >-
  A markdown link whose visible text ends in `?` and points to another step
  renders as a small help link that jumps the user to a different step.
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
`[Question?](url)` is a help link

A markdown link whose visible text ends in `?` and points to another
step renders as a small help link that jumps the user to a different
step.

### Why this matters

Sometimes the user picked something earlier and now realises they
need to change it. Asking a small contextual question and linking to
the relevant step respects their time better than making them hunt
for a back button.

### When to apply

When the current step references a previous choice that the user
might want to revise. The link goes to the earlier step.

### Examples

#### ✅ Good

```markdown
[Returning from a different airport?](https://www.holidayextras.com/airport-parking-wizard/#outbound-flight)
```

#### ❌ Bad

```markdown
[Click here to change your airport](#airport)
```

The text "Click here" is uninformative — the question form is both
more helpful and more accessible.

### Edge cases

A question-form link in the middle of a paragraph is just a normal
link, not a help link. The pattern relies on the question being on
its own line.
