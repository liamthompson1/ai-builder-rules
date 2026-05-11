---
title: Product-Specific Step Sequences
summary: 'The same patterns and rhythm are used across all wizards, but the **step sequence** differs by product. These differences are intentional.'
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
# Product-Specific Step Sequences

The same patterns and rhythm are used across all wizards, but the **step sequence** differs by product. These differences are intentional.

| Product | Step types used | Key differences |
|---|---|---|
| **Parking** | Airport selector, Calendar×2, Flight search (skip), Time grid×2, Summary | Time grid for drop-off/collection. Green CTA: "Show prices and availability". Nudge: "Book early, pay less." |
| **Insurance** | Description cards×N, Binary Yes/No×N, Calendar, Summary | No time inputs. Multiple branching steps using description cards. More helper text for eligibility. |
| **Transfers** | Airport selector, Calendar, Flight search (skip), Location search, Calendar, Flight search (skip), Pax stepper, Summary | Hotel/destination text search. Passenger stepper in summary. Green CTA: "Show transfers". |

## Partner brand application
When building a wizard for a partner brand (Jet2, AA, Purple Parking etc.), the **structure and patterns are identical**. Only the colours change.

Use the design-tokens skill to get the correct brand tokens. Swap:
- `color-primary-brand` → partner primary colour
- `color-secondary-brand` → partner CTA colour
- `field-title-text` → partner primary colour
- Hero image → partner brand photography

**Do not invent new patterns for partner brands. The pattern set is fixed.**
