---
title: Wizard State Lives In localStorage
summary: >-
  Per-step user selections are stored in the `hx_pw_state` localStorage key, one
  bag per step. They auto-flow into every downstream story request as
  `var_<stepCamel>_<field>` so templates read them via
  `_meta.routeVariables.<stepCamel>_<field>`. The address bar stays clean —
  `var_*` params on link hrefs are diverted into state and stripped from the
  URL.
golden: false
strictness: should
applies_to:
  - forms
  - onboarding
  - mobile
tags:
  - Wizard
  - State
  - Navigation
  - Flow
created: '2026-05-12'
---
# Wizard State Lives In localStorage

The wizard accumulates state across steps without putting it in the URL.
Each step's selections live in `hx_pw_state` (localStorage), keyed by
the bare step name. State auto-flows into every subsequent
`/api/stories` request so templates can reference earlier picks via
Handlebars on `_meta.routeVariables`.

## Storage shape

`localStorage['hx_pw_state']`:

```json
{
  "flying-from": {
    "location":    "LGW",
    "lat":         "51.1481",
    "lng":         "-0.190278",
    "airportFull": "London Gatwick Airport"
  },
  "parking-from": {
    "display": "Wed 20 May",
    "utc":     "2026-05-20T00:00:00Z"
  },
  "outbound-flight": {
    "flightNumber":  "BA2670",
    "airline":       "British Airways",
    "departureTime": "09:45",
    "destination":   "Palma de Mallorca",
    "terminal":      "South Terminal"
  }
}
```

- **Outer key**: bare step name (last segment of the resource path).
  No wizard prefix — `flying-from`, not `airport-parking-wizard/flying-from`.
- **Inner keys**: field names. No `var_` prefix in storage.
- **One bag per step.** A re-pick on the same step REPLACES that bag
  (not a merge). Fields from a previously-selected option are dropped
  cleanly.

## Field naming on the wire

Storage keeps fields under their step:

```json
"parking-from": { "display": "Wed 20 May", "utc": "2026-05-20T00:00:00Z" }
```

On the wire and in templates, the wizard infrastructure prefixes each
field with the **camelCased step name**:

```
storage   parking-from.display
wire      var_parkingFrom_display
template  {{_meta.routeVariables.parkingFrom_display}}
```

One mechanical rule — kebab-case step name becomes camelCase, joined
to the field name with an underscore. No per-step table to memorise.

You can use the same field name across multiple steps (e.g. `display`
on parking-from and dropoff-time) because the prefix keeps them in
separate namespaces:

```handlebars
{{_meta.routeVariables.parkingFrom_display}}   → "Wed 20 May"
{{_meta.routeVariables.dropoffTime_display}}   → "06:00"
```

camelCase is used rather than literal kebab on the wire so the
resulting key is a valid Handlebars identifier (no bracket-notation
lookup needed).

## What authors put in link URLs

A link from a step carries only the fields the user is *choosing on
that step* — never prior-step data. The infrastructure already merges
every prior step's bag into every downstream request; explicit
pass-through is redundant.

### ✅ Good

```markdown
# Parking from

| MON | TUE | WED | … |
|---|---|---|---|
| 28 | [29](#nav/airport-parking-wizard/outbound-flight?var_display=Wed%2029%20Jun&var_utc=2026-06-29T00:00:00Z) | 30 | … |
```

The date link carries only the parking-from fields. flying-from's
airport data is already in state from the previous step and will
flow forward automatically as `var_flyingFrom_*`.

### ❌ Bad

```markdown
| [29](#nav/airport-parking-wizard/outbound-flight?var_location={{_meta.routeVariables.flyingFrom_location}}&var_airportFull={{_meta.routeVariables.flyingFrom_airportFull}}&var_display=Wed%2029%20Jun&var_utc=2026-06-29T00:00:00Z) |
```

Pulling prior-step fields back into the URL writes them into the
CURRENT step's bag, polluting per-step structure and making re-picks
ambiguous.

## On the wire

Every `/api/stories` request flattens every stored step's bag to
`var_<stepCamel>_<field>`:

```
var_flyingFrom_location=LGW
var_flyingFrom_lat=51.1481
var_flyingFrom_lng=-0.190278
var_flyingFrom_airportFull=London%20Gatwick%20Airport
var_parkingFrom_display=Wed%2020%20May
var_parkingFrom_utc=2026-05-20T00:00:00Z
var_outboundFlight_flightNumber=BA2670
…
```

The gateway's `var_*` extractor strips the prefix and exposes them
on `_meta.routeVariables`:

```handlebars
{{_meta.routeVariables.flyingFrom_airportFull}}     → "London Gatwick Airport"
{{_meta.routeVariables.flyingFrom_location}}        → "LGW"
{{_meta.routeVariables.parkingFrom_display}}        → "Wed 20 May"
{{_meta.routeVariables.parkingFrom_utc}}            → "2026-05-20T00:00:00Z"
{{_meta.routeVariables.outboundFlight_flightNumber}}→ "BA2670"
```

## URL stays clean

When a user taps a link with `var_*` in the query string:

1. The `var_*` params are extracted from the href.
2. They're written to `hx_pw_state` under the CURRENT step (the one
   the user is leaving) with the `var_` prefix stripped.
3. The browser URL is pushed WITHOUT those params. Non-`var_*` query
   params (tracking, debug) stay.

A deep link or page reload with `var_*` still in the address bar:

1. The params are diverted into state under the step the user is
   LANDING on.
2. The URL is `replaceState`'d to drop them.

## Replace semantics

A new selection on a step replaces that step's whole bag:

- Pick Gatwick →
  `flying-from = { location: 'LGW', lat, lng, airportFull }`
- Browser back, pick Heathrow →
  `flying-from = { location: 'LHR', lat, lng, airportFull }`

If the new selection has fewer fields than the old one, the missing
fields are simply gone. The bag always reflects only the current
pick.

## Inspecting and clearing

DevTools console:

```js
JSON.parse(localStorage.getItem('hx_pw_state'))
```

For a "Start over" or summary-edit affordance:

```js
import { clearAllWizardState, clearStep } from '@/lib/wizardState'

clearAllWizardState()       // wipe everything
clearStep('parking-from')   // wipe one step
```

## Edge cases

- **Two steps with the same field name**: no collision on the wire —
  they emerge as `var_<stepA>_<field>` and `var_<stepB>_<field>`,
  different keys. So generic field names like `display` / `utc` /
  `time` are fine across steps; the step prefix keeps them separate.
- **Skipped steps**: a skipped step writes nothing — its bag stays
  absent. Templates that reference its fields should guard with
  `{{#if}}` or accept Handlebars rendering empty.
- **Migration**: older versions of the wizard stored keys as full
  paths (`airport-parking-wizard/flying-from`). The reader normalises
  them to the bare step name on first read and persists back. No
  manual migration needed.
