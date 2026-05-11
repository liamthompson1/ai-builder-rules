---
title: Embed The Official HX SVG Logo Inline
summary: 'The header bar **always** uses the official Holiday Extras SVG logo. Never substitute a text wordmark, a placeholder, a partner logo, or any other asset in…'
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
# Embed The Official HX SVG Logo Inline

The header bar **always** uses the official Holiday Extras SVG logo. Never substitute a text wordmark, a placeholder, a partner logo, or any other asset in the main HX header bar.

This applies even when building for partner brands — the HX logo stays in the HX header bar.

## Rules
- **Embed inline.** Do not load from a URL.
- The logo must be visible at all viewport widths.
- In a real deployment it should link to `https://www.holidayextras.com/` (`target="_blank"`, `rel="noopener"`).
- Width 173, height 25, viewBox `0 0 173 25`.

## Embed code

```html
<a href="https://www.holidayextras.com/" target="_blank" rel="noopener" aria-label="Holiday Extras">
  <svg width="173" height="25" viewBox="0 0 173 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3099_1553)">
      <!-- yellow xkar paths (#FDD506) and white "holiday" paths (#FFFFFF) -->
      <!-- copy the full path data from SKILL.md Step 3 -->
    </g>
    <defs>
      <clipPath id="clip0_3099_1553">
        <rect width="172.71" height="24.8092" fill="white"/>
      </clipPath>
    </defs>
  </svg>
</a>
```

> Full SVG path data is in the source skill (`wizard-ds.md` Step 3). Do not recreate or simplify — copy the exact paths.

## Header composition
- Logo on the left
- Product name text (e.g. "Airport Parking") immediately to the right of the logo
- No back button, no menu icons in the header
