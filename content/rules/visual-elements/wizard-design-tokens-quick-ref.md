---
title: Wizard Design Tokens — Quick Reference
summary: 'Always use these tokens — **never hardcode hex values** in production code.'
golden: false
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
# Design Tokens — Source Of Truth

Always use these tokens — **never hardcode hex values** in production code.

| Purpose | Token | Value |
|---|---|---|
| Primary brand / purple | `color-primary-brand` | `#542e91` |
| Header background | `color-primary-brand` | `#542e91` |
| Step title, card title | `field-title-text` | `#542e91` |
| Progress bar, CTAs | `color-secondary-brand` | `#fdd506` |
| CTA (search / show results) | `color-green-1` | `#347e7a` |
| Default text | `text-color` | `#232323` |
| Muted / secondary text | `text-color-grey` | `#737373` |
| Page background | `surface-color-1` | `#fafafa` |
| Card / input background | `surface-color-2` | `#ffffff` |
| Default border | `color-grey-1` | `#c2c2c5` |
| Input border | `field-outline` | `#d7d7d9` |
| Input focus border | `field-override` | `#ccc0de` |
| Light purple tint (ctx-bar) | `color-primary-4` | `#eeeaf4` |
| Grey divider | `color-grey-3` | `#ededee` |
| Helper background | `color-grey-4` | `#f7f7f7` |
| Nudge card bg | `color-green-4` | `#e5f1f0` |

## Sizing tokens
| Purpose | Token | Value |
|---|---|---|
| Input border radius | `radius-sml` | `8px` |
| Card border radius | `radius-med` | `12px` |
| Pill border radius | `radius-xl` | `999px` |
| Standard gap | `spacing-med` | `12px` |
| Standard padding | `spacing-lrg` | `16px` |
| Small spacing | `spacing-sml` | `8px` |
| Large spacing | `spacing-xl` | `20px` |

## Font
- Family: **Nunito** (always).
- Fallback: `-apple-system, "system-ui", sans-serif`.
