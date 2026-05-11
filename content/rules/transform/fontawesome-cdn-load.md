---
title: Load FontAwesome Via CDN
summary: 'Load FontAwesome via CDN in the `<head>` of the document. This is required for every wizard.'
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
# Load FontAwesome Via CDN

Load FontAwesome via CDN in the `<head>` of the document. This is required for every wizard.

```html
<head>
  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
</head>
```

## Why
- All icons in the wizard must be FontAwesome (`<i class="fa-solid fa-…"></i>`).
- Emojis are not allowed as UI control or action icons.

## Usage
```html
<i class="fa-solid fa-pencil"></i>
<i class="fa-solid fa-calendar-days"></i>
<i class="fa-regular fa-clock"></i>
```

Use `fa-solid`, `fa-regular`, or `fa-light` variants as appropriate.

## Common icon classes
| Purpose | Class |
|---|---|
| Edit / pencil | `fa-solid fa-pencil` |
| Location / airport | `fa-solid fa-location-dot` |
| Calendar | `fa-solid fa-calendar-days` |
| Clock / time | `fa-solid fa-clock` |
| Aeroplane outbound | `fa-solid fa-plane-departure` |
| Aeroplane inbound | `fa-solid fa-plane-arrival` |
| Person / traveller | `fa-solid fa-person` |
| Check / tick | `fa-solid fa-check` |
| Chevron right | `fa-solid fa-chevron-right` |
| Close / dismiss | `fa-solid fa-xmark` |
| Info / help | `fa-solid fa-circle-info` |
| Car | `fa-solid fa-car` |
| Suitcase | `fa-solid fa-suitcase` |
| GPS / crosshair | `fa-solid fa-location-crosshairs` |
| Search | `fa-solid fa-magnifying-glass` |
