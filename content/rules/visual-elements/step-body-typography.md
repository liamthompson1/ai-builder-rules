---
title: Step Body Typography
summary: 'Step Body Typography'
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
# Step Body Typography

```css
.step-body {
  font-family: Nunito, sans-serif;
  font-size: 18px;
  font-weight: 300;
  color: #1a1a2e;
}
```

## Rules
- Contains only the input for this step — nothing else.
- Helper text (if needed) sits **below** the options, never above.
- `.ctx-bar` (context strip) sits **above** the options when showing prior answers.

## Step subtitle (when used)
A `.step-subtitle` is a clarifying line below the title (e.g. "What time will you collect your car on Wed 20 May 2026?"):
```css
.step-subtitle {
  font-size: 16px;
  font-weight: 400;
}
```
