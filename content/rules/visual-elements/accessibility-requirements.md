---
title: Accessibility Requirements
summary: 'Accessibility Requirements'
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
# Accessibility Requirements

## Roles and ARIA
- Every tappable card/button needs `role="button"` and `tabindex="0"` if not a native `<button>`.
- Passenger stepper buttons need `aria-label="Add adult"` / `aria-label="Remove adult"` etc.
- Summary edit buttons need `aria-label="Edit [field name]"`.
- Skip button needs `aria-label="Skip outbound flight — this is optional"`.
- Progress bar:
  ```html
  <div class="progress-bar"
       role="progressbar"
       aria-valuenow="3"
       aria-valuemin="0"
       aria-valuemax="7"
       aria-label="Step 3 of 7">
  </div>
  ```
- Calendar days need `aria-label="13 May 2026"`. Disabled days need `aria-disabled="true"`.

## Focus
- On step transition, move focus to the `.step-title` of the new active step.
- All interactive elements need a visible focus state.
- Step containers can use `aria-describedby` to link to their helper card.

## Decorative icons
Icons that are purely decorative get `aria-hidden="true"`. If an icon is the only label for a button, put the label on the **button** (`aria-label="…"`) and keep the icon hidden.

## Keyboard
- Tab order follows visual order.
- Enter / Space activates buttons and role="button" elements.
- Esc does nothing (there is no modal to dismiss).
