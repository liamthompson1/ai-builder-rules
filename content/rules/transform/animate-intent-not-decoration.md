---
title: Animate intent, not decoration
summary: Every animation should communicate something — a relationship, a change of state, a direction of travel. If it doesn't, cut it.
golden: true
tags: [animation, motion, clarity]
created: 2026-05-08
---

Motion is a language. Each animation says one of a few things:

- **Where this thing came from** (a card slides in from the side it was tapped on)
- **What changed** (a value ticks up; an icon morphs)
- **What's next** (a chevron points toward the action)
- **What's loading** (a shimmer; a spinner — only when nothing more specific is available)

If your animation isn't saying any of those, it's decoration, and decoration is noise.

## How to audit

Open the screen, watch every animation, and for each one ask: *if this didn't move, would the user be more confused?* If no, delete it.

## Common offenders

- Hover scales on every card on the page
- Page-load fade-ins that delay content the user is already reading
- Bounce easings on functional UI (buttons, toggles) — bounce reads as playful, which is rarely the right intent

> The best motion design is the kind users feel without noticing.
