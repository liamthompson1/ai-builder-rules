# Instructions for AI Agents

This repository is a **library of rules for building UI**. If you're an AI
agent generating an interface — code, mockups, design specs, copy — read
the relevant rules here first and apply them to your output.

The repo is the source of truth. The web app at
`https://www.holidayextras.com/ai-builder-rules` is just a human view of
these same files.

---

## Repository layout

```
content/
  rules/
    transform/{slug}.md         # how elements change, animate, respond
    flow/{slug}.md              # how users move through screens and tasks
    intent/{slug}.md            # what the UI is communicating
    visual-elements/{slug}.md   # buttons, cards, surfaces, type — the building blocks
  groups/
    {slug}.md                   # curated bundles of rules that travel together
```

Every rule and group is a single markdown file with YAML frontmatter.

To enumerate everything in one call, hit the GitHub tree API:
```
GET https://api.github.com/repos/liamthompson1/ai-builder-rules/git/trees/main?recursive=1
```

To read a file's contents, fetch it raw:
```
https://raw.githubusercontent.com/liamthompson1/ai-builder-rules/main/<path>
```

---

## Rule schema

Every rule frontmatter:

```yaml
---
title: string                 # required — human-readable name
summary: string               # one-line headline takeaway
golden: boolean               # cross-cutting non-negotiable; surfaces in the Golden view
strictness: must | should | may
                              # must  — non-negotiable. Apply unconditionally.
                              # should — strong recommendation. Deviate only with reason.
                              # may   — suggestion. Apply if it fits.
applies_to: [string]          # which UI types this rule targets. See vocabulary below.
tags: [string]                # free-form keywords for search
related: [category/slug]      # cross-references to other rules
created: YYYY-MM-DD
---
```

`applies_to` vocabulary (curated; expect this set to grow):

```
any, forms, navigation, lists, cards, tables, modals, dialogs,
toolbars, onboarding, empty-states, error-states, mobile,
desktop, dashboards
```

`any` means the rule applies regardless of UI type.

### Body convention

By convention, rule bodies use this H2 outline. Forms preselect it for new
rules, but it's a guideline, not enforced — older rules may not follow it.

```markdown
## Why this matters
The reasoning. When applying the rule to a novel context, preserve the
underlying intent rather than copying the surface form.

## When to apply
Concrete situations where this rule kicks in.

## Examples
### ✅ Good
[example]

### ❌ Bad
[counter-example]

## Edge cases
When this rule shouldn't apply, and why.
```

---

## Group schema

```yaml
---
name: string                  # required
description: string           # one-line summary
when: |                       # multi-line trigger statement an agent matches on
  Use this group when …       # describe the situation where the bundle applies
rules:
  transform: [slug, ...]      # zero-or-more rule slugs from each category
  flow: [slug, ...]
  intent: [slug, ...]
  visual-elements: [slug, ...]
created: YYYY-MM-DD
---

# Optional markdown body — narrative on when/why to apply this group.
```

Rules inside a group reference rules in `content/rules/{category}/{slug}.md`.
A group may leave any category empty.

---

## How to use this library

1. **Identify what you're building.** A form? A modal? An onboarding flow?
   This determines `applies_to` filters and which Group might match.

2. **Match a Group first if one fits.** Read each group's `when:` field and
   see if any matches your situation. If yes, apply every rule the group
   references.

3. **Otherwise, browse by category.** Pick the relevant categories
   (Transform, Flow, Intent, Visual Elements) for the kind of decision
   you're making.

4. **Filter rules:**
   - Match `applies_to` against your UI type (or `any`).
   - Honour `must` strictness without exception. Treat `should` as the
     default unless the rule's edge cases apply. Use `may` as a tiebreaker.
   - **Always apply rules with `golden: true`** regardless of category.

5. **Read the rule body.** The H2 outline tells you *why* (so you can adapt
   the rule, not just pattern-match) and gives examples of the rule
   correctly applied vs ignored.

6. **Follow `related` references** when the rule mentions adjacent
   patterns. They're written as `category/slug`.

7. **Don't assume omission means non-applicability.** Optional fields may
   simply not be filled in yet. Default behaviour:
   - Missing `strictness` → treat as `should`
   - Missing `applies_to` → treat as `any`
   - Missing `related` → no cross-references (don't infer)

---

## Contributing rules

Humans add and edit rules through the web UI at
`/ai-builder-rules`. AI agents should not commit directly — propose
additions or edits, but route them through the UI / a human review.

The web UI commits to GitHub via the Contents API, so any commit you see
in the history was made via that flow.

---

## What this library is *not*

- **Not a style guide for code.** It's about UI decisions, not naming
  conventions, file layout, or testing patterns.
- **Not exhaustive.** Apply general design judgment when no rule covers
  your situation. The library captures the rules worth writing down, not
  every possible nuance.
- **Not specific to any framework.** Rules are written in implementation-
  agnostic language. Apply them to React, SwiftUI, Flutter, plain HTML —
  whatever you're outputting.
