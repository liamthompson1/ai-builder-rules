---
title: Responsive Behaviour
summary: 'The wizard is **mobile-first** at **393px**. All layout is single-column.'
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
# Responsive Behaviour

The wizard is **mobile-first** at **393px**. All layout is single-column.

## At mobile (393px)
- Full-width container with 16px horizontal padding.
- Hero spans the full viewport width.
- Single-column step body.

## At tablet (834px+)
- The max-width container (620px) stays centred with whitespace either side.
- The hero image remains full-width.
- The step content stays within the 620px max-width.

## Forbidden
- No horizontal scrolling at any breakpoint.
- No two-column layouts inside `.step-body` (except where the pattern explicitly defines a grid — time grid, airport grid, binary grid).
- No collapsing patterns into accordions or tabs at any breakpoint.
