---
title: A three-line block with `↗` and `↙` markers is a search result
summary: Three consecutive non-empty lines form one search result card
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---
A three-line block with `↗` and `↙` markers is a search result

Three consecutive non-empty lines form one search result card:

- Line 1: code · provider (the title)
- Line 2: `↗ time · airport-code · airport-name · date` (the
  outbound)
- Line 3: `↙ time · airport-code · airport-name · date · terminal`
  (the inbound)

Multiple blocks separated by blank lines become a list of search
results.

### Why this matters

Flight cards have a specific information shape: airline + code,
departure detail, arrival detail. Hardcoding this shape in the
markdown means the parser can render rich cards from plain text
without HTML or custom components.

### When to apply

On flight-search result steps. Don't reuse this shape for other kinds
of search (destinations, products) — they have different shapes.

### Examples

#### ✅ Good

```markdown
FR2714 · Ryanair
↗ 05:30 · LGW · London Gatwick · Wed 1 Jul
↙ 09:00 · AGP · Malaga · Wed 1 Jul · South Terminal

EZY8807 · easyJet
↗ 06:00 · LGW · London Gatwick · Wed 1 Jul
↙ 09:20 · PMI · Palma de Mallorca · Wed 1 Jul · South Terminal
```

#### ❌ Bad

```markdown
FR2714 Ryanair 05:30 LGW Gatwick 09:00 AGP Malaga Wed 1 Jul
```

Mashing it into a single line loses the structure and the parser
can't pull out the parts.

### Edge cases

The up-arrow `↗` (U+2197) and down-arrow `↙` (U+2199) are required
markers. Without them, the parser doesn't know which line is
outbound vs inbound.

A two-line block (just title and one direction) isn't valid — the
parser expects all three lines.
