---
title: Holiday Extras Design Tokens
summary: 'These are colours, stylings, effects and breakpoints'
golden: true
tags:
  - Colours
  - Fonts
  - Stylings
  - Breakpoints
created: '2026-05-08'
---
# Holiday Extras Design Tokens

These tokens are sourced directly from the official HX token files. Always use token names in code, never hardcode a hex value without referencing the token it came from.

---

## Colour — Light Mode

### Brand Primary

| Token | Value | Notes |
|---|---|---|
| `color-primary-brand` | `#542e91` | Main HX purple, buttons, links, key UI |
| `color-primary-brand-contrast` | `#ffffff` | Text on primary brand colour |
| `color-primary-1` | `#542e91` | Same as brand, alias |
| `color-primary-1-contrast` | `#ffffff` |  |
| `color-primary-2` | `#a996c8` | Light purple |
| `color-primary-2-contrast` | `#1a0c27` |  |
| `color-primary-3` | `#ccc0de` | Lighter purple, focus ring, field override |
| `color-primary-3-contrast` | `#1a0c27` |  |
| `color-primary-4` | `#eeeaf4` | Purple tint, backgrounds, badges |
| `color-primary-4-contrast` | `#1a0c27` |  |
| `color-primary-5` | `#47277b` | Darker purple, hover states |
| `color-primary-5-contrast` | `#ffffff` |  |

### Brand Secondary / CTA

| Token | Value | Notes |
|---|---|---|
| `color-secondary-brand` | `#fdd506` | HX yellow, CTA buttons |
| `color-secondary-brand-contrast` | `#232323` | Text on yellow |
| `color-secondary-1` | `#fdd506` | Same as brand, alias |
| `color-secondary-1-contrast` | `#232323` |  |
| `color-secondary-2` | `#feea82` | Light yellow |
| `color-secondary-2-contrast` | `#232323` |  |
| `color-secondary-3` | `#fef2b4` | Lighter yellow |
| `color-secondary-3-contrast` | `#232323` |  |
| `color-secondary-4` | `#fffbe6` | Yellow tint, backgrounds |
| `color-secondary-4-contrast` | `#232323` |  |
| `color-secondary-5` | `#d7b505` | Darker yellow, hover on CTA |
| `color-secondary-5-contrast` | `#232323` |  |

### Semantic Status Colours

| Token | Value | Use |
|---|---|---|
| `color-green-1` | `#347e7a` | Success, text, icons |
| `color-green-1-contrast` | `#ffffff` |  |
| `color-green-2` | `#80b7b6` | Success medium |
| `color-green-3` | `#c2d8d7` | Success light |
| `color-green-4` | `#e5f1f0` | Success background |
| `color-green-5` | `#2c6b68` | Success dark, hover |
| `color-red-1` | `#d9313a` | Error / destructive, text, icons |
| `color-red-1-contrast` | `#ffffff` |  |
| `color-red-2` | `#e88084` | Error medium |
| `color-red-3` | `#f4c1c4` | Error light |
| `color-red-4` | `#fae5e6` | Error background |
| `color-red-5` | `#b82a31` | Error dark, hover |
| `color-blue-1` | `#2a77b6` | Info / link colour |
| `color-blue-1-contrast` | `#ffffff` |  |
| `color-blue-2` | `#80b5e1` | Info medium |
| `color-blue-3` | `#bfd6e9` | Info light |
| `color-blue-4` | `#e5f0f9` | Info background |
| `color-blue-5` | `#24659b` | Info dark, hover |
| `color-orange-1` | `#bc5415` | Warning, text, icons |
| `color-orange-1-contrast` | `#ffffff` |  |
| `color-orange-2` | `#d6824d` | Warning medium |
| `color-orange-3` | `#ebccb9` | Warning light |
| `color-orange-4` | `#f3dbcc` | Warning background |
| `color-orange-5` | `#a04712` | Warning dark, hover |

---

## Global Primitive Colours

These sit beneath all brand tokens and are used directly across the design system.

| Token | Value | Notes |
|---|---|---|
| `color-black` | `#232323` | True black, default text, high contrast |
| `color-white` | `#ffffff` | White, surfaces, inverted text |
| `color-grey-1` | `#c2c2c5` | Border colour default |
| `color-grey-2` | `#d7d7d9` | Field outline, subtle dividers |
| `color-grey-3` | `#ededee` | Light background tint |
| `color-grey-4` | `#f7f7f7` | Lightest background, hover states |
| `color-grey-5` | `#a5a5a7` | Muted icons, placeholder text |
| `color-yellow-1` | `#fddf44` | Bright yellow primitive |
| `color-yellow-2` | `#feea82` | Light yellow |
| `color-yellow-3` | `#fef5c7` | Very light yellow |
| `color-yellow-4` | `#fffbe6` | Yellow tint background |
| `color-yellow-5` | `#d7be3a` | Darker yellow |
| `color-red-1` | `#d9313a` | Error red |
| `color-red-2` | `#e88084` | Medium red |
| `color-red-3` | `#f4c1c4` | Light red |
| `color-red-4` | `#fae5e6` | Red tint background |
| `color-red-5` | `#b82a31` | Dark red |
| `color-green-1` | `#347e7a` | Success green |
| `color-green-2` | `#80b7b6` | Medium green |
| `color-green-3` | `#c2d8d7` | Light green |
| `color-green-4` | `#e5f1f0` | Green tint background |
| `color-green-5` | `#2c6b68` | Dark green |
| `color-blue-1` | `#2a77b6` | Info / link blue |
| `color-blue-2` | `#80b5e1` | Medium blue |
| `color-blue-3` | `#bfd6e9` | Light blue |
| `color-blue-4` | `#e5f0f9` | Blue tint background |
| `color-blue-5` | `#24659b` | Dark blue |
| `color-orange-1` | `#bc5415` | Warning orange |
| `color-orange-2` | `#d6824d` | Medium orange |
| `color-orange-3` | `#ebccb9` | Light orange |
| `color-orange-4` | `#f3dbcc` | Orange tint background |
| `color-orange-5` | `#a04712` | Dark orange |
| `color-link` | `#2a77b6` | Hyperlink colour, same as `color-blue-1` |
| `surface-color-1` | `#fafafa` | Page / app background |
| `surface-color-2` | `#ffffff` | Card / panel background |
| `text-color` | `#232323` | Default body text |
| `text-color-grey` | `#737373` | Secondary / muted text |
| `text-color-inverted` | `#ffffff` | Text on dark/coloured backgrounds |

**How globals relate to HX brand tokens:** The HX `color-primary-*` and `color-secondary-*` tokens are semantic aliases built on top of these global primitives. When in doubt, prefer the semantic HX token, e.g. `color-primary-brand`, over the raw global. Use globals directly only when no semantic token fits, e.g. `color-grey-2` for a generic divider.

### Neutrals / Greyscale HX Semantic Aliases

| Token | Value |
|---|---|
| `color-grey-1` | `#c2c2c5` |
| `color-grey-2` | `#d7d7d9` |
| `color-grey-3` | `#ededee` |
| `color-grey-4` | `#f7f7f7` |
| `color-grey-5` | `#a5a5a7` |

### Surfaces and Text

| Token | Value | Use |
|---|---|---|
| `surface-color-1` | `#fafafa` | Page / app background |
| `surface-color-2` | `#ffffff` | Card / panel background |
| `text-color` | `#232323` | Default body text |
| `text-color-brand` | `#542e91` | Brand-coloured text, links, labels |
| `text-color-grey` | `#737373` | Secondary / muted text |
| `text-color-inverted` | `#ffffff` | Text on dark/coloured backgrounds |
| `color-link` | `#2a77b6` | Hyperlink colour |

---

## Component Tokens

| Token | Resolved Value | Use |
|---|---|---|
| `field-title-text` | `#542e91` | Input field label colour |
| `field-outline` | `#d7d7d9` | Input border default |
| `field-error-outline` | `#fae5e6` | Input border error state |
| `field-override` | `#ccc0de` | Input border focus |
| `btn-default-background` | `#ffffff` | Default / ghost button background |
| `btn-disabled-background` | `#f5f5f5` | Disabled button background |
| `btn-disabled-border` | `#d9d9d9` | Disabled button border |
| `btn-disabled-text` | `#b8b8b8` | Disabled button text |

---

## Colour — Dark Mode

Dark mode swaps surfaces and adjusts colour scale steps. Brand colours stay the same.

| Token | Dark Value | Notes |
|---|---|---|
| `surface-color-1` | `#1d1d1f` | Dark app background |
| `surface-color-2` | `#2c2c2e` | Dark card background |
| `text-color` | `#232323` | Inherits from global |
| `text-color-grey` | `#959393` | Muted text in dark |
| `color-primary-brand` | `#542e91` | Unchanged |
| `color-primary-1` | `#ae94cf` | Lighter purple on dark |
| `color-primary-4` | `#47277b` | Darker purple tint |
| `color-primary-5` | `#ccc0de` | Light purple, hover in dark |
| `color-secondary-brand` | `#fdd506` | Unchanged |
| `color-link` | `#80b5e1` | Lighter blue link on dark |

---

## Typography

**Font family: Nunito** — used for all HX UI text without exception. Never substitute Arial, system-ui, or any other font.

| Token | Font | Size | Weight | Line Height | Use |
|---|---|---|---|---|---|
| `H1` | Nunito | 40px | Bold 700 | 40px | Page titles |
| `H2` | Nunito | 28px | Bold 700 | 30px | Section headings |
| `H3` | Nunito | 22px | Bold 700 | 28px | Card / sub-section headings |
| `body-lrg-bold` | Nunito | 18px | SemiBold 600 | 26px | Large body emphasis |
| `body-med-bold` | Nunito | 16px | SemiBold 600 | 22px | Standard body emphasis, button labels |
| `body-sml-bold` | Nunito | 14px | SemiBold 600 | 18px | Small emphasis text |
| `body-lrg` | Nunito | 18px | Regular 400 | 26px | Large body text |
| `body-med` | Nunito | 16px | Regular 400 | 22px | Standard body text |
| `body-sml` | Nunito | 14px | Regular 400 | 18px | Small / supporting text, captions |

**Key distinction:** Headings H1 to H3 use Bold 700. Bold body variants use SemiBold 600. Letter spacing: 0 on all. Paragraph spacing: 0 on headings, 2px on body.

---

## Spacing

Three density modes. **Base is the default**, use unless designing for a compact or spacious layout.

| Token | Base | Condensed | Expanded |
|---|---|---|---|
| `spacing-xs` | 4px | 2px | 8px |
| `spacing-sml` | 8px | 4px | 12px |
| `spacing-med` | 12px | 6px | 20px |
| `spacing-lrg` | 16px | 8px | 28px |
| `spacing-xl` | 20px | 10px | 36px |
| `spacing-xxl` | 32px | 16px | 52px |

---

## Border Width

| Token | Value |
|---|---|
| `border-sml` | 1px |
| `border-med` | 2px |
| `border-lrg` | 4px |

---

## Border Radius

HX uses the **Base Primitive** radius scale, no brand overrides.

| Token | Value | Use |
|---|---|---|
| `radius-xs` | 0px | Square corners |
| `radius-sml` | 8px | Buttons, inputs, small cards |
| `radius-med` | 12px | Cards, modals, panels |
| `radius-lrg` | 20px | Large containers, feature cards |
| `radius-xl` | 999px | Pills, badges, toggles |

---

## Shadows

| Token | CSS Value | Use |
|---|---|---|
| `shadows-sml` | `0 2px 4px -12px rgba(0,0,0,0.04)` | Subtle lift |
| `shadows-med` | `0 6px 16px -12px rgba(0,0,0,0.04)` | Cards, dropdowns |
| `shadows-lrg` | `0 8px 16px -12px rgba(0,0,0,0.08)` | Elevated panels |
| `shadows-xl` | `0 16px 48px -12px rgba(0,0,0,0.16)` | Modals, overlays |

---

## Breakpoints

| Token | Value |
|---|---|
| `phone sml` | 320px |
| `phone` | 393px |
| `tablet` | 834px |
| `tablet lrg` | 1366px |
| `desktop` | 1440px |
