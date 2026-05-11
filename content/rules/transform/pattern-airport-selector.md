---
title: Pattern 1 — Airport / Location Selector (HTML)
summary: 'Used when: choosing a departure airport (all three wizards share this).'
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
# Pattern 1 — Airport / Location Selector (HTML)

Used when: choosing a departure airport (all three wizards share this).

```html
<div class="step-body">

  <!-- RECENT section (if user has prior history) -->
  <div class="recents-section">
    <p class="section-label">RECENT</p>
    <button class="recent-pill">Gatwick <span>✕</span></button>
  </div>

  <!-- NEAREST AIRPORTS (GPS detected) -->
  <div class="nearest-section">
    <p class="section-label">NEAREST AIRPORTS</p>
    <p class="gps-label">✓ GPS · 51.0863°N 1.0348°E</p>
    <div class="airport-grid">
      <!-- 2–4 columns depending on number of results -->
      <button class="airport-option">Southend</button>
      <button class="airport-option">Gatwick</button>
      <button class="airport-option">London City</button>
      <button class="airport-option">Stansted</button>
    </div>
  </div>

  <!-- ALL AIRPORTS — scrollable list -->
  <div class="all-section">
    <p class="section-label">ALL AIRPORTS</p>
    <button class="airport-list-item">Heathrow</button>
    <button class="airport-list-item">Luton</button>
    <button class="airport-list-item">Southampton</button>
  </div>

</div>
```

## Behaviour
Tapping any item (recent pill, grid option, or list item) **immediately advances** to the next step. No "Next" button.

## Sections
- `RECENT` — only shown when the user has prior history
- `NEAREST AIRPORTS` — only shown when GPS is available
- `ALL AIRPORTS` — always present; scrollable list
