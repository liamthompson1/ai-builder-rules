---
title: Context Bar (.ctx-bar) Markup
summary: 'Use a `.ctx-bar` at the top of any step that depends on a previously captured answer.'
golden: false
strictness: should
applies_to:
  - forms
  - mobile
tags:
  - Wizard
  - HTML
  - Markup
related: []
created: '2026-05-11'
---
# Context Bar (.ctx-bar) Markup

Use a `.ctx-bar` at the top of any step that depends on a previously captured answer.

```html
<!-- Example: return date step, after drop-off was captured -->
<div class="ctx-bar">
  Dropping off: Wed 13 May 2026 at 06:00
</div>
```

## Placement
- Inside `.step-body`
- Above the input
- Below the `.step-title`

## Rules
- Keep it to one line.
- Use plain language: "Dropping off:", "Flying from:", "Parking at:".
- Do not repeat the step title — complement it.
- No icons inside the ctx-bar (the bar itself is the cue).
