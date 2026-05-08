---
title: Touch targets must be at least 44×44pt
summary: If a finger can't hit it reliably, it isn't really tappable. Apple's HIG calls 44pt a minimum, not a goal.
golden: false
tags: [accessibility, mobile, hit-area]
created: 2026-05-08
---

A 24×24px icon button looks neat in a mockup and is unusable in the rain. The fingertip pad of a typical adult is roughly 10mm — that's the floor. Apple specifies **44×44pt** (≈ 44px at 1x) as the minimum interactive size; Material says **48×48dp**. Use the larger of the two.

## Where this gets violated

- **Icon-only buttons** in toolbars, sized to match the icon glyph.
- **Close buttons** in dialogs, designed at 16×16 because they "shouldn't draw the eye."
- **Inline links** in dense lists — clickable, but the hit area is just the text bounds.
- **Small toggles** with a tappable area smaller than the visual track.

## How to fix without bulking up the visuals

Use **transparent padding** to extend the hit area beyond the visual element:

```css
.icon-btn {
  width: 24px;
  height: 24px;
  padding: 10px; /* hit area becomes 44×44 */
  /* visually still 24, tappably 44 */
}
```

Or use a `::before` pseudo-element that extends the touch surface invisibly. The user shouldn't see the hit area; they should just notice that the thing reliably tapping when they tap it.
