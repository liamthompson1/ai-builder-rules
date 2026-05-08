---
title: Confirm destructive actions
summary: Anything irreversible needs a beat of pause. Anything reversible should never need one.
golden: false
tags: [safety, confirmation, undo]
created: 2026-05-08
---

The cost of a confirm dialog is paid by every user, every time. The cost of skipping one is paid only by the people who slipped — but they pay it loudly.

## The rule

- **Reversible** (archive, hide, mute, soft-delete with undo): commit immediately, show a 5-second "Undo" toast.
- **Irreversible** (delete forever, send invoice, deploy to prod): require an explicit confirmation step. For the truly destructive (delete account, drop database), require typing the resource name.

## Bad patterns

- Modal confirms on archive — punishes the 99% case to maybe-help the 1%.
- "Are you sure?" with no detail — the user can't tell *what* they're confirming.
- Auto-focused destructive button — one Enter and it's gone.

## Good copy for the dialog

- Title states the consequence: **"Delete this trip?"** — not "Confirm".
- Body lists what will be lost: "All 12 photos, 3 documents, and shared link will be removed."
- Primary button repeats the verb: **"Delete trip"** — not "OK".
- Secondary is **"Cancel"**, never "No".
