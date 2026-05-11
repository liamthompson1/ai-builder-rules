---
title: CTA Button Colours — Green For Results, Purple For Continue
summary: 'There are **two distinct CTA colours** in the wizard. Use the right one.'
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
# CTA Button Colours — Green For Results, Purple For Continue

There are **two distinct CTA colours** in the wizard. Use the right one.

## Green CTA — show results (summary step only)
```css
.cta-primary {
  width: 100%;
  background: #347e7a;               /* color-green-1 — search/find action */
  color: #ffffff;
  border-radius: 12px;               /* radius-med */
  padding: 18px 24px;
  font-size: 18px;
  font-weight: 800;
  font-family: Nunito, sans-serif;
  border: none;
  margin-top: 24px;
  cursor: pointer;
}
```

Used for: "Show prices and availability", "Show transfers".

## Purple Continue — mid-wizard confirmation only
```css
.btn-continue {
  width: 100%;
  background: #542e91;               /* color-primary-brand */
  color: #ffffff;
  border-radius: 12px;               /* radius-med */
  padding: 18px 24px;
  font-size: 20px;
  font-weight: 800;
  border: none;
  margin-top: 16px;
}
```

Label: "Continue" — never "Next", "Submit", or "Proceed".

## Rule
- Green = search / show results. Used **once**, on the summary step only.
- Purple = mid-wizard confirmation after typed/searched input.
- **Never use yellow for a CTA** — yellow is reserved for the progress bar only.
