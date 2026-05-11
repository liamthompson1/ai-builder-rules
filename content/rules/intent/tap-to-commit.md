---
title: Tap To Commit
summary: 'Selecting an answer is the same as confirming it. There is no "Next" button after a single-answer question. The selection itself advances the journey.'
golden: false
strictness: should
applies_to:
  - any
  - forms
  - onboarding
tags:
  - Wizard
  - Decision Rhythm
  - Principles
related: []
created: '2026-05-11'
---
# Tap To Commit

Selecting an answer is the same as confirming it. There is no "Next" button after a single-answer question. The selection itself advances the journey.

## Why
A "Next" button after a single-answer selection is a redundant confirmation of a decision already made. It adds a click, creates ambiguity, and slows a journey that should feel effortless.

## In practice
- Tapping "Gatwick" immediately opens the date picker.
- Tapping "Annual Cover" immediately shows the destination question.
- Tapping a calendar date immediately advances to the time step.

## The exception
When the customer is typing or searching rather than selecting from a fixed list, an explicit "Continue" button is appropriate.

**Rule:** auto-advance for selection, explicit confirm for typed input.

## The test
After a customer makes a selection, is there any conceivable reason they might want to stay on that screen? If no — remove the Next button.
