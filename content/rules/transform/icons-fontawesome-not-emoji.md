---
title: Icons Must Be FontAwesome — Never Emojis
summary: '**Always use FontAwesome icons. Never use emojis as icons.**'
golden: true
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
# Icons Must Be FontAwesome — Never Emojis

**Always use FontAwesome icons. Never use emojis as icons.**

The only exception: when the user explicitly requests an emoji for a specific purpose (e.g. a flag emoji inside body copy, not as a control icon).

## Transforming markdown that uses emojis
When converting markdown samples that show emojis (e.g. ✏️, ✈️, 🚗), replace them with FontAwesome equivalents in the rendered HTML:

| Emoji in markdown | FontAwesome class |
|---|---|
| ✏️ | `fa-solid fa-pencil` |
| ✈️ | `fa-solid fa-plane-departure` |
| 🚗 | `fa-solid fa-car` |
| 🏠 | `fa-solid fa-house` |
| ✓ | `fa-solid fa-check` |
| ✕ / ✖ | `fa-solid fa-xmark` |
| › | `fa-solid fa-chevron-right` |
| ℹ️ | `fa-solid fa-circle-info` |
| 📅 | `fa-solid fa-calendar-days` |
| ⏰ | `fa-solid fa-clock` |
| 🧳 | `fa-solid fa-suitcase` |

## Markup pattern
```html
<i class="fa-solid fa-pencil" aria-hidden="true"></i>
```

If the icon is the only label for a button, add an `aria-label` to the **button**, and keep `aria-hidden="true"` on the icon itself.
