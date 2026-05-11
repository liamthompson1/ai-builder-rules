---
title: Step Title Typography
summary: 'Step Title Typography'
golden: false
strictness: should
applies_to:
  - forms
  - mobile
tags:
  - Wizard
  - Design Tokens
  - Styling
related: []
created: '2026-05-11'
---
# Step Title Typography

```css
.step-title {
  font-family: Nunito, sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;            /* very dark navy */
}
```

## Rules
- Always an `<h2>`.
- Always written in plain, human language (see Intent: "Speak the customer's language").
- Never use field names, product codes or jargon.
  - ✅ "Flying from", "Going on a cruise?", "Returning to collect car"
  - ❌ "Select departure airport", "Choose cover type", "Enter return date"

## Focus state
`.step-title` needs `tabindex="-1"` so it can receive focus on step transition — but should NOT have a visible focus ring (the screen reader announcement is the cue).
