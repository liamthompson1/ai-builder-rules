---
title: Summary Step Is Always Last
summary: 'Every wizard ends with a Search Summary step before showing results. This is the **only** step that has a primary CTA button.'
golden: false
strictness: should
applies_to:
  - forms
  - onboarding
  - mobile
tags:
  - Wizard
  - Navigation
  - Flow
related: []
created: '2026-05-11'
---
# Summary Step Is Always Last

Every wizard ends with a Search Summary step before showing results. This is the **only** step that has a primary CTA button.

## Required content of the summary step
1. `.step-title` = "Search Summary"
2. One `.summary-row` per captured answer, each with:
   - An icon
   - A label (e.g. "Airport", "Dropping off car")
   - The captured value (e.g. "London Gatwick Airport (LGW)")
   - An edit pencil button (✏️)
3. (Optional) inline controls like the `.pax-stepper` for passenger counts
4. The primary CTA — full-width, green, e.g. "Show prices and availability" / "Show transfers"
5. A nudge card below the CTA (urgency or reassurance message)

## Ordering rule
The CTA appears **below** the summary rows. Never above. The user reads what they told you, then commits.

## Edit affordance
Every summary row must have an edit button that jumps the user back to that step's hash for amendment.
