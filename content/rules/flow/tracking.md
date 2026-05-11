---
title: tracking
summary: enable tracking on every page
golden: true
strictness: must
applies_to:
  - any
tags:
  - tracking
  - orion
  - tracker
created: '2026-05-11'
---
# Tracking

Holiday Extras client-side analytics is **Orion** — the in-house SDK.

**Authoritative source:** <https://github.com/holidayextras/orion.js>

That repo is the single source of truth for supported events, schema versions, bootstrap, and SDK behaviour. Read it directly. Don't mirror or paraphrase its contents in this repo.

**The rule:** every rendered HX web page MUST load Orion and emit events for customer-meaningful actions. How is in the repo above.
