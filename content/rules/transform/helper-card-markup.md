---
title: Helper Card Markup
summary: 'Helper Card Markup'
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
# Helper Card Markup

```html
<div class="helper-card">
  <p><strong>Not sure of the exact time?</strong> Don't worry — most car parks
  allow you to arrive up to 3 hours either side of your booked drop-off time…</p>
</div>
```

## Rules
- Single `<div class="helper-card">` wrapping a `<p>`.
- Bold the leading phrase with `<strong>`.
- Keep under 3 sentences.
- Place **below** the options inside `.step-body`.

## Linked to the question
Optionally connect the helper card to the question via `aria-describedby` on the step container so screen readers announce both.

```html
<div class="step active" aria-describedby="drop-off-help">
  <h2 class="step-title">Drop-off time</h2>
  <div class="step-body">
    <!-- time grid -->
    <div class="helper-card" id="drop-off-help">…</div>
  </div>
</div>
```
