---
title: Hero Image / Video — Absolutely No Overlay
summary: 'The hero image or video must be displayed with **absolutely no overlay, no gradient, no tint, no colour wash, and no dark/light scrim of any kind** placed…'
golden: true
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
# Hero Image / Video — Absolutely No Overlay

The hero image or video must be displayed with **absolutely no overlay, no gradient, no tint, no colour wash, and no dark/light scrim of any kind** placed on top of it.

The photograph or video must be fully visible exactly as supplied.

## Forbidden
- `::before` / `::after` pseudo-elements covering the image
- `background` layers stacked above the image
- `linear-gradient` over the image
- `radial-gradient` over the image
- `rgba()` overlays
- `mix-blend-mode`
- CSS filters (`filter: brightness()`, etc.)
- Any other technique that obscures the image or video

## Required
- Full-width
- Below the header
- Progress bar sits at the bottom edge of the hero

## If no asset is supplied
Do not fall back to a gradient or placeholder. Stop and ask the user again.

## Video specifics
```css
.hero-img {
  width: 100%;
  display: block;
}
```

```html
<video autoplay muted loop playsinline class="hero-img">
  <source src="hero.mp4" type="video/mp4" />
</video>
```

The same no-overlay rule applies to videos.
