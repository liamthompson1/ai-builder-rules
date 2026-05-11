---
title: Nudge Card Styling
summary: 'The nudge card sits below the primary CTA on the summary step. It provides a final confidence signal — usually an urgency message or reassurance about…'
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
# Nudge Card Styling

The nudge card sits below the primary CTA on the summary step. It provides a final confidence signal — usually an urgency message or reassurance about included extras.

```css
.nudge-card {
  background: #e5f1f0;               /* color-green-4 */
  border-radius: 8px;                /* radius-sml */
  padding: 16px;
  margin-top: 12px;
  font-size: 14px;
  color: #232323;
}
```

## Rules
- Light green background — pairs visually with the green CTA above it.
- Smaller radius (8px / radius-sml) than cards (12px) — visually subordinate.
- Bold the leading phrase with `<strong>`.
- One short paragraph maximum.
- Never appears anywhere other than the summary step.

## Example content
> **Book early, pay less.** Our data shows prices go up 95% of the time as the stay date gets closer. Secure today's rate now — **Flextras** is included, just tap more info to understand the terms.
