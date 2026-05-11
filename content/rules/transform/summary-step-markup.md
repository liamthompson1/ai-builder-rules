---
title: Summary Step Markup
summary: '<!-- One row per captured answer --> <div class="summary-row"> <span class="summary-icon"><i class="fa-solid fa-plane-departure"></i></span> <div…'
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
# Summary Step Markup

```html
<div class="step active">
  <h2 class="step-title">Search Summary</h2>
  <div class="step-body">

    <!-- One row per captured answer -->
    <div class="summary-row">
      <span class="summary-icon"><i class="fa-solid fa-plane-departure"></i></span>
      <div class="summary-content">
        <span class="summary-label">Airport</span>
        <span class="summary-value">London Gatwick Airport (LGW)</span>
      </div>
      <button class="summary-edit" aria-label="Edit airport">
        <i class="fa-solid fa-pencil"></i>
      </button>
    </div>

    <div class="summary-row">
      <span class="summary-icon"><i class="fa-solid fa-car"></i></span>
      <div class="summary-content">
        <span class="summary-label">Dropping off car</span>
        <span class="summary-value">Wednesday 13th May 2026 at 06:00</span>
      </div>
      <button class="summary-edit" aria-label="Edit drop-off">
        <i class="fa-solid fa-pencil"></i>
      </button>
    </div>

    <div class="summary-row">
      <span class="summary-icon"><i class="fa-solid fa-house"></i></span>
      <div class="summary-content">
        <span class="summary-label">Returning to collect car</span>
        <span class="summary-value">Wednesday 20th May 2026 at 12:00</span>
      </div>
      <button class="summary-edit" aria-label="Edit return">
        <i class="fa-solid fa-pencil"></i>
      </button>
    </div>

    <!-- Passenger stepper shown inline in Transfers summary -->
    <!-- <div class="pax-stepper">…</div> -->

    <!-- Primary CTA — full width, green -->
    <button class="cta-primary">Show prices and availability</button>

    <!-- Nudge card below CTA -->
    <div class="nudge-card">
      <p><strong>Book early, pay less.</strong> Our data shows prices go up 95% of the
      time as the stay date gets closer. Secure today's rate now — <strong>Flextras</strong>
      is included, just tap more info to understand the terms.</p>
    </div>

  </div>
</div>
```

## Rules
- Each `.summary-row` contains: `.summary-icon` (FontAwesome), `.summary-content` (label + value), `.summary-edit` (pencil button).
- Edit button MUST have `aria-label="Edit [field name]"`.
- CTA appears below all rows, never above.
- Nudge card appears below the CTA.
- Use FontAwesome icons — never emojis.
