---
title: Hero Image / Video Markup
summary: 'The hero sits directly below the header bar and is full-width. The progress bar sits at the very bottom edge of the hero.'
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
# Hero Image / Video Markup

The hero sits directly below the header bar and is full-width. The progress bar sits at the very bottom edge of the hero.

## Image
```html
<div class="hero">
  <img class="hero-img" src="/path/to/hero.jpg" alt="Parking at the airport" />
  <div class="progress-bar"
       role="progressbar"
       aria-valuenow="3"
       aria-valuemin="0"
       aria-valuemax="7"
       aria-label="Step 3 of 7"
       style="width: 42%"></div>
</div>
```

## Video
If the user supplies a video:
```html
<div class="hero">
  <video autoplay muted loop playsinline class="hero-img">
    <source src="/path/to/hero.mp4" type="video/mp4" />
  </video>
  <div class="progress-bar" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="7"></div>
</div>
```

## Hard rules
- **No overlay, no gradient, no tint, no colour wash, no scrim** on top of the image or video.
- Do not add `::before` / `::after` pseudo-elements that obscure it.
- Do not use `linear-gradient`, `radial-gradient`, `rgba` overlays, `mix-blend-mode`, or CSS filters on top of it.
- The asset must be visible exactly as supplied.

## Tagline
If a tagline is required, place it as a sibling element below the hero (or inside but with no semi-transparent layer over the photo).
