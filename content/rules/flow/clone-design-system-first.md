---
title: Step 1 — Clone The Design System First
summary: 'Always clone the official Holiday Extras design system repository before building anything:'
golden: false
strictness: should
applies_to:
  - forms
  - onboarding
  - mobile
tags:
  - Wizard
  - Navigation
  - Flow
related: []
created: '2026-05-11'
---
# Step 1 — Clone The Design System First

Always clone the official Holiday Extras design system repository before building anything:

```bash
git clone https://github.com/GeorgeHO-HX/Holiday-Extras-Design-System-Claude.zip.git
```

## Why
Use the tokens, components and assets from this repo as the implementation source of truth.

- The design patterns documented in SKILL.md describe the **intent and principles**.
- The cloned repo provides the **live component implementations**.

## Conflict resolution
Where there is a conflict, defer to the cloned repo for implementation detail and SKILL.md for pattern decisions.

This is a **mandatory first step** — do not write any code or markup before completing this.
