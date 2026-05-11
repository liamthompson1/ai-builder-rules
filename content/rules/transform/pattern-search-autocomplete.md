---
title: Pattern 6 — Search With Autocomplete (HTML)
summary: 'Used when: finding a specific flight, hotel or destination.'
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
# Pattern 6 — Search With Autocomplete (HTML)

Used when: finding a specific flight, hotel or destination.

```html
<div class="step-body">

  <!-- Skip button (top-right of the step, not in the header) -->
  <button class="skip-btn">Skip</button>

  <!-- Optional date tabs (for flight search across 2 days) -->
  <div class="date-tabs">
    <button class="date-tab selected">Wed 13 May 2026</button>
    <button class="date-tab">Thu 14 May 2026</button>
  </div>

  <!-- Search input -->
  <input
    type="text"
    class="search-input"
    placeholder="Search destination, time or airline…"
  />
  <span class="result-count">362 flights</span>

  <!-- Results list -->
  <div class="search-results">
    <p class="results-group-label">RECENTLY SELECTED</p>
    <div class="search-result-item">
      <span class="result-time">05:35</span>
      <span class="result-code">U28199</span>
      <p class="result-dest">Kefalonia · Kefallinia · Greece</p>
      <p class="result-meta">North Terminal · easyJet</p>
    </div>
    <!-- more items -->
  </div>

</div>
```

## Rules
- Skip pill is **inside the step-body**, floated right — never in the header.
- `.date-tabs` is optional, used when search spans multiple days.
- The `.search-input` is a real `<input type="text">` so the OS keyboard is invoked.
- `.result-count` updates live as the user types.
- Each `.search-result-item` shows: time, code, destination, terminal/operator.
- A "RECENTLY SELECTED" group label appears first when prior history exists.

## Behaviour
Tapping a result either advances directly, or sets the field and reveals a Continue button (depending on whether confirmation is needed).
