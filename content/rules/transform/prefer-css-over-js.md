---
title: Prefer CSS animations over JavaScript
summary: Reach for `transform` and `opacity` before scripting. They run on the compositor thread and don't trigger layout or paint.
golden: false
tags: [animation, performance, css]
created: 2026-05-08
---

When something needs to move, fade, scale, or rotate, do it in CSS first. Animating `transform` and `opacity` is hardware-accelerated, doesn't invalidate layout, and survives main-thread jank.

## When to use JS instead

- The animation depends on real-time input you can't express declaratively (e.g. spring physics tied to a gesture).
- You need to animate a property CSS can't reach (e.g. SVG path `d` attribute).
- You're orchestrating a complex sequence and a state machine is genuinely clearer than a chain of `@keyframes`.

## Tells that you've reached for JS too soon

- You're calling `requestAnimationFrame` to lerp a value you could express as a `cubic-bezier`.
- The animation jitters under load — usually means you're animating `top`/`left`/`width` instead of `transform`.
- The component re-renders 60 times a second.

> If a designer can describe it as "ease-out over 200ms," it belongs in CSS.
