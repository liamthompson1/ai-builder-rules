---
title: Context Bar On Dependent Steps
summary: 'Any step whose answer depends on a previous step''s answer must display a `.ctx-bar` showing the prior answer.'
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
# Context Bar On Dependent Steps

Any step whose answer depends on a previous step's answer must display a `.ctx-bar` showing the prior answer.

## When required
- Return date step (depends on drop-off date)
- Return time step (depends on drop-off time)
- Any step where the user could give a contradictory answer if they forget a prior choice

## Placement
- Above the input
- Below the step title
- One line only

## Phrasing
Use plain language and a colon:
- `Dropping off: Wed 13 May 2026 at 06:00`
- `Flying from: London Gatwick (LGW)`
- `Parking at: Manchester Airport`

## Don't
- Repeat the step title in the ctx-bar — complement it, don't duplicate it
- Stack multiple lines of context (collapse to one) — if you need more, embed prior answers in the question text itself
