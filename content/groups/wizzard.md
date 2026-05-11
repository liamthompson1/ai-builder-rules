---
name: Wizzard
description: Used to build a wizard flow for data collection or search.
when: >
  Use this group when building a Holiday Extras wizard-style product journey — a
  mobile-first, single-question-per-screen stepped flow used across Parking,
  Insurance, Transfers, or any new HX product needing a guided quote/funnel.
rules:
  transform:
    - step-anatomy
    - page-layout
    - hx-logo-svg-embed
    - pattern-airport-selector
    - pattern-calendar
    - pattern-time-grid
    - pattern-description-cards
    - pattern-binary-yes-no
    - pattern-search-autocomplete
    - context-bar-markup
    - passenger-stepper-markup
    - summary-step-markup
    - helper-card-markup
    - fontawesome-cdn-load
    - hero-image-markup
    - icons-fontawesome-not-emoji
    - accessibility-transform
  flow:
    - clone-design-system-first
    - confirm-assets-with-user
    - auto-advance-on-selection
    - url-hash-routing
    - no-back-button-in-ui
    - continue-button-usage
    - skip-button-for-optional-steps
    - summary-step-always-last
    - edit-jumps-to-step-hash
    - context-bar-on-dependent-steps
    - helper-text-for-non-obvious-questions
    - step-transition-focus
    - product-specific-step-sequences
  intent:
    - core-principle
    - one-thing-at-a-time
    - tap-to-commit
    - speak-the-customers-language
    - show-what-youve-heard
    - earn-every-question
    - summarise-before-you-reveal
    - pattern-is-the-principle
  visual-elements:
    - holiday-extras-design-tokens
    - wizard-design-tokens-quick-ref
    - container-layout
    - header-bar
    - hero-no-overlay
    - progress-bar
    - step-title-typography
    - step-body-typography
    - recent-pill
    - airport-grid-and-list
    - calendar-day-states
    - context-bar-style
    - time-grid-style
    - description-card-style
    - binary-card-style
    - search-input-style
    - summary-row-style
    - cta-button-colours
    - nudge-card
    - helper-card-style
    - responsive-behaviour
    - touch-targets
    - accessibility-requirements
created: '2026-05-08'
---

# Wizzard

A Holiday Extras wizard is a series of full-screen steps, each showing exactly one question or input. The user answers it and the next step appears. The patterns in this group are grounded in the live Parking, Insurance and Transfers wizards.

Apply every rule in this group when building or extending a wizard. The intent rules describe the underlying rhythm (one thing at a time, tap to commit, summarise before reveal). The flow rules cover navigation and prerequisites. The transform rules give you the HTML structure for each step type. The visual-elements rules carry the design tokens and per-component styling.
