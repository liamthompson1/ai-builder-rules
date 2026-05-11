---
title: Step Anatomy — Required HTML Structure
summary: 'Every step shares this structure:'
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
# Step Anatomy — Required HTML Structure

Every step shares this structure:

```html
<div class="step active">
  <h2 class="step-title">Question text here</h2>
  <div class="step-body">
    <!-- input pattern for this step type -->
  </div>
</div>
```

## Rules
- Inactive steps use `class="step"` (no `active`).
- Only **one** step has `.active` at any time.
- `.step-title` is always an `<h2>` containing the plain-language question.
- `.step-body` contains exactly one input pattern (one of the six defined patterns) — nothing else.

## Optional decorations inside `.step-body`
- `.ctx-bar` — sits above the input when showing prior answers.
- `.helper-card` — sits below the input/options.
- `.skip-btn` — floats top-right when the step is optional.

## Never inside a step
- Multiple questions
- More than one input pattern
- A back button
- Marketing copy that isn't direct helper text
