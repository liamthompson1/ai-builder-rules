---
title: Accessibility - transform
summary: Accessibility rules for transformations
golden: false
strictness: should
applies_to:
  - any
created: '2026-05-11'
---

# Transform — Accessibility Rules

Rules for the markup and semantics emitted by a Holiday Extras build.
These rules sit in the Transform category alongside `wizard-transform`
(content → AST) — together they govern what gets rendered, regardless
of the framework used to render it.

Target conformance: **WCAG 2.2 AA**.

---

## Part 0 — Core principles

### 0.1 The best ARIA is no ARIA

Every ARIA attribute is a contract you must maintain. Native HTML
gives you that contract for free. Reach for ARIA only when no native
element fits.

### 0.2 Semantic HTML first

Before reaching for ARIA, check whether a native element provides the
semantics you need. Native elements come with keyboard support, focus
management, and screen reader announcements that ARIA cannot fully
replicate.

### 0.3 Every meaningful element has an accessible name

Every interactive element MUST have a name a screen reader can
announce. Decorative elements MUST be explicitly hidden from
assistive tech. There is no third option.

---

## Part 1 — Semantic HTML

### 1.1 Use the native element for the role

| Use this                                  | Instead of                              |
|-------------------------------------------|-----------------------------------------|
| `<button>`                                | `<div role="button" tabindex="0">`      |
| `<a href>`                                | `<span role="link" onclick>`            |
| `<nav>`                                   | `<div role="navigation">`               |
| `<main>`                                  | `<div role="main">`                     |
| `<header>` (page-level)                   | `<div role="banner">`                   |
| `<footer>` (page-level)                   | `<div role="contentinfo">`              |
| `<aside>`                                 | `<div role="complementary">`            |
| `<section>` with `aria-label`             | `<div role="region">`                   |
| `<input type="checkbox">`                 | `<div role="checkbox">`                 |
| `<input type="radio">`                    | `<div role="radio">`                    |
| `<input>` / `<textarea>`                  | `<div role="textbox">`                  |
| `<select>`                                | `<div role="listbox">`                  |
| `<h1>`–`<h6>`                             | `<div role="heading" aria-level="2">`   |
| `<ul>` / `<ol>` + `<li>`                  | `<div role="list">` + `<div role="listitem">` |
| `<form>` with an accessible name          | `<div role="form">`                     |
| `<dialog>`                                | `<div role="dialog">`                   |
| `<details>` / `<summary>`                 | A bespoke accordion                     |

### 1.2 Don't add redundant roles

`<button role="button">` is wrong — the role is already there. Same
for `<nav role="navigation">`, `<main role="main">`, and similar.
Remove the redundant attribute.

### 1.3 Don't change native semantics

Don't put `role="heading"` on an `<h2>`. Don't put `role="button"` on
a `<button>`. Don't put `role="presentation"` on a focusable element.

---

## Part 2 — Images

### 2.1 Every `<img>` has an `alt` attribute

The `alt` attribute is required on every `<img>`. A missing `alt` is
not the same as `alt=""` — most screen readers announce missing
`alt` as the filename.

### 2.2 Informative images describe their meaning

The `alt` describes what the image *conveys*, not what it depicts.
"hero.jpg" is wrong. "image" is wrong. "Q3 revenue up 15% year on
year" is right.

### 2.3 Decorative images use empty alt

If an image conveys no information (a divider, a flourish, a stock
photo that's already described by adjacent text), use `alt=""`. The
empty attribute tells assistive tech to skip the image entirely.

```html
<img src="divider.png" alt="">
```

### 2.4 SVGs used as images have a role and a name

```html
<svg role="img" aria-label="Company logo">…</svg>
```

A decorative SVG uses `aria-hidden="true"` instead.

### 2.5 Complex images have a longer description

Charts, diagrams, and infographics need more than an `alt` can carry:

```html
<img src="flowchart.png"
     alt="Booking process flowchart"
     aria-describedby="flow-desc">
<div id="flow-desc">
  The booking process has four steps: search, select, pay, confirm.
</div>
```

### 2.6 Icons inside named buttons are hidden from assistive tech

If a button has visible text, the icon inside it is decorative — it
duplicates information the text already carries:

```html
<button>
  <i class="fa-solid fa-trash" aria-hidden="true"></i>
  Delete booking
</button>
```

Without `aria-hidden`, a screen reader announces "trash delete
booking" — the icon name leaks through.

### 2.7 Icon-only buttons have an aria-label

```html
<button aria-label="Search">
  <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
</button>
```

The icon is hidden; the button's name comes from `aria-label`.

---

## Part 3 — Forms

### 3.1 Every input has a label

Every `<input>`, `<select>`, and `<textarea>` MUST have a
programmatically associated label. The four valid ways, in priority
order:

```html
<!-- Explicit label (preferred) -->
<label for="email">Email address</label>
<input id="email" type="email">

<!-- Implicit (wrapping) label -->
<label>Phone number <input type="tel"></label>

<!-- Visually hidden label (when the design has no visible label) -->
<label for="search" class="sr-only">Search products</label>
<input id="search" type="search">

<!-- aria-label (last resort) -->
<input type="search" aria-label="Search products">
```

A label that's visually hidden via `.sr-only` is still a real label.

### 3.2 Placeholder is not a label

Placeholders disappear on input, have poor contrast, and are not
announced consistently. They are *hints*, not labels. Every input
with a placeholder ALSO needs a real label.

### 3.3 Required fields are marked

Use `required` on the input. The visible asterisk (or the word
"required") is a separate, complementary signal — colour alone is
never enough (see Visual Elements a11y rules).

```html
<label for="email">Email <span aria-hidden="true">*</span></label>
<input id="email" type="email" required aria-describedby="email-help">
<span id="email-help">Required. We'll send your booking here.</span>
```

### 3.4 Autocomplete is set on common fields

Set `autocomplete` on every field whose value the browser could
sensibly fill: name, email, telephone, address, payment fields,
new/current password. This isn't just a UX nicety — it's an
accessibility win for users with motor impairments who rely on
autofill.

| Field type            | autocomplete value         |
|-----------------------|----------------------------|
| Full name             | `name`                     |
| Given name            | `given-name`               |
| Family name           | `family-name`              |
| Email                 | `email`                    |
| Telephone             | `tel`                      |
| Street address        | `street-address`           |
| Postcode              | `postal-code`              |
| Country               | `country` / `country-name` |
| Current password      | `current-password`         |
| New password          | `new-password`             |

### 3.5 Errors are associated with their input

When a field has an error, the error message MUST be
programmatically linked to the field:

```html
<label for="email">Email</label>
<input id="email"
       type="email"
       aria-invalid="true"
       aria-describedby="email-error">
<span id="email-error" role="alert">
  Please enter a valid email address.
</span>
```

`aria-invalid="true"` tells the user the field is invalid;
`aria-describedby` connects them to the explanation; `role="alert"`
ensures the message is announced immediately.

### 3.6 Radio buttons live in a fieldset

A group of related radio buttons MUST be wrapped in a `<fieldset>`
with a `<legend>`:

```html
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>
```

The legend is the group's accessible name. Without it, a screen
reader announces only the individual options, with no context.

---

## Part 4 — Headings

### 4.1 Exactly one `<h1>` per page

Or per route, for SPAs. The `<h1>` names the page or the current
view. More than one breaks the outline; zero leaves the page nameless.

### 4.2 Heading levels never skip

`<h1>` → `<h2>` → `<h3>` is correct. `<h1>` → `<h3>` is wrong — a
screen reader user navigating by heading levels can't tell whether
they missed a section.

### 4.3 Headings describe their section

The heading is read in isolation by screen reader users using the
heading list. "Information" or "Details" is useless out of context.
"Cancellation policy", "Pricing breakdown", "Available dates" are
useful.

### 4.4 Don't use a heading just because it's the right size

If you need text styled large, style a `<p>` to be large. A heading
is a structural promise about the document — it MUST correspond to a
real section.

### 4.5 No empty headings

`<h2></h2>` is invisible visually but announced as "heading level 2,
empty" by some screen readers. Remove it.

---

## Part 5 — Links and buttons

### 5.1 Links navigate, buttons act

A `<a href>` takes the user somewhere new. A `<button>` performs an
action in place. Use the right one.

A link with `href="#"` that calls JavaScript is wrong twice over — it
should be a button, and the `#` will scroll to the top if the JS
fails.

### 5.2 Links have descriptive text

Link text must make sense out of context. Screen reader users often
navigate by listing all links on the page — "click here" and "read
more" tell them nothing.

```html
<!-- Wrong -->
<a href="/deals">Click here</a> for current deals.

<!-- Right -->
View our <a href="/deals">current deals</a>.

<!-- Also right -->
<a href="/deals">View current deals</a>
```

### 5.3 Links to new windows say so

```html
<a href="/terms" target="_blank" rel="noopener">
  Terms and conditions <span class="sr-only">(opens in new tab)</span>
</a>
```

Without the warning, the back button doesn't work and the user
doesn't know why.

### 5.4 Buttons have a name

A button containing only an icon is unnamed unless given an
`aria-label`:

```html
<!-- Wrong -->
<button><i class="fa-solid fa-magnifying-glass"></i></button>

<!-- Right -->
<button aria-label="Search">
  <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
</button>
```

---

## Part 6 — Landmarks and page structure

### 6.1 Every page has core landmarks

The minimum structure for any page:

```html
<html lang="en-GB">
<head>
  <title>Page name — Holiday Extras</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <a href="#main" class="sr-only sr-only-focusable">Skip to main content</a>
  <header>
    <nav aria-label="Main">…</nav>
  </header>
  <main id="main">
    <h1>Page heading</h1>
    …
  </main>
  <footer>
    <nav aria-label="Footer">…</nav>
  </footer>
</body>
</html>
```

### 6.2 Only one `<main>` per page

Multiple `<main>` landmarks confuse screen readers. There is exactly
one place that is "the content of this page" and exactly one element
expressing it.

### 6.3 Multiple `<nav>` regions are labelled

If a page has more than one `<nav>` (header nav, footer nav,
breadcrumb), each one MUST have an `aria-label` that distinguishes it:

```html
<nav aria-label="Main">…</nav>
<nav aria-label="Footer">…</nav>
<nav aria-label="Breadcrumb">…</nav>
```

### 6.4 The current page is marked

In a navigation menu, the link to the current page uses
`aria-current="page"`:

```html
<a href="/parking" aria-current="page">Parking</a>
```

In a step indicator, the current step uses `aria-current="step"`.

### 6.5 `<html>` declares the language

The `lang` attribute is required, and MUST match the actual language
of the page content:

```html
<html lang="en-GB">
```

For pages translated to other locales, set `lang` accordingly
(`fr-FR`, `de-DE`, etc.).

### 6.6 Every page has a unique, descriptive `<title>`

The `<title>` is the first thing a screen reader announces and the
text that appears in the browser tab. Format:

```html
<title>Specific page — Product — Holiday Extras</title>
```

### 6.7 All `id` values on the page are unique

Duplicate IDs break label associations, `aria-describedby` references,
and skip links. The HTML spec already requires uniqueness; here it's
also an accessibility requirement.

---

## Part 7 — Tables

### 7.1 Data tables use `<th>` with `scope`

Every column header MUST be a `<th>` with `scope="col"`. Every row
header MUST be a `<th>` with `scope="row"`:

```html
<table>
  <caption>Available parking options</caption>
  <thead>
    <tr>
      <th scope="col">Option</th>
      <th scope="col">Price</th>
      <th scope="col">Distance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Short stay</th>
      <td>£45</td>
      <td>2 min walk</td>
    </tr>
  </tbody>
</table>
```

### 7.2 Tables have a caption or label

`<caption>` is preferred. `aria-label` is an acceptable alternative
when a visible caption doesn't fit the design.

### 7.3 Layout tables (if unavoidable) are marked presentation

Tables used purely for layout MUST use `role="presentation"` so they
aren't announced as data tables. Better: don't use tables for layout
at all.

---

## Part 8 — Dynamic content

### 8.1 Updates that aren't urgent use `role="status"`

For information that updates without interrupting the user — search
result counts, status messages, "saved" indicators — use
`role="status"` (equivalent to `aria-live="polite"`):

```html
<div role="status">3 results found</div>
```

### 8.2 Urgent updates use `role="alert"`

For errors and critical warnings that must interrupt the user, use
`role="alert"` (equivalent to `aria-live="assertive"`):

```html
<div role="alert">Payment failed. Please check your card details.</div>
```

### 8.3 Live regions exist before their content

A live region added to the DOM *with* its content already inside
won't announce — the screen reader only watches *changes* to live
regions. Add the empty region first, then update its content:

```html
<!-- Render this empty on initial page load -->
<div id="status" role="status"></div>

<!-- Later, populate it -->
document.getElementById('status').textContent = '3 results found';
```

### 8.4 Loading states use `aria-busy`

When a region is performing background work, mark it busy so screen
readers know to expect changes:

```html
<div aria-busy="true" aria-live="polite">
  Loading results…
</div>
```

Set `aria-busy="false"` when done.

### 8.5 Choose the right pattern

| Scenario                            | Pattern                            |
|-------------------------------------|------------------------------------|
| Form validation error appears       | `role="alert"`                     |
| Search result count updates         | `role="status"`                    |
| Content area is loading             | `aria-busy="true"` on the container|
| Chat message arrives                | `aria-live="polite"`               |
| Page-wide loading spinner           | `role="status"` with "Loading…"    |
| Toast / snackbar (informational)    | `role="status"`                    |
| Toast / snackbar (error)            | `role="alert"`                     |

---

## Part 9 — ARIA states

When a custom widget has state, the state MUST be exposed to
assistive tech. CSS-only state (e.g. just a class change) is invisible
to screen readers.

| State                     | Attribute                       |
|---------------------------|---------------------------------|
| Expanded / collapsed      | `aria-expanded="true|false"`   |
| Selected (tab, option)    | `aria-selected="true|false"`   |
| Checked (custom checkbox) | `aria-checked="true|false"`    |
| Pressed (toggle button)   | `aria-pressed="true|false"`    |
| Busy                      | `aria-busy="true|false"`       |
| Current (in a set)        | `aria-current="page|step|true"`|
| Disabled (custom control) | `aria-disabled="true"` *(use `disabled` on real form controls)* |

Pair `aria-expanded` with `aria-controls` pointing to the toggled
element's `id` — otherwise the screen reader says "expanded" with no
context for what just appeared.

---

## Part 10 — Common mistakes to avoid

| Mistake | Why it's wrong | Fix |
|---------|---------------|-----|
| `<div role="button">` with no keyboard handler | Keyboard users can't activate it | Use `<button>`, or add `tabindex="0"` + Enter/Space handlers |
| `aria-label` on a `<div>` | Most screen readers ignore names on generic elements | Move the label to an interactive or landmark element |
| `aria-hidden="true"` on a parent of focusable children | The user can Tab to a ghost element | Remove `aria-hidden`, OR remove focusability from the children |
| `<button role="button">` | Redundant role | Remove the role attribute |
| `aria-expanded` without `aria-controls` | Screen reader says "expanded" but nothing visibly appears | Add `aria-controls="some-id"` |
| Multiple `<main>` landmarks | Confuses screen readers | Use exactly one `<main>` |
| `role="presentation"` on an interactive element | Strips semantics but keeps interactivity — invisible button | Never use `role="presentation"` on buttons, links, or inputs |
| Dynamic content with no live region | Screen readers don't announce the change | Add `role="status"`, `role="alert"`, or `aria-live` |
| `tabindex="5"` (any positive value) | Breaks the natural focus order | Use `tabindex="0"` or `tabindex="-1"` only |
| Placeholder as the only label | Disappears when the user types | Add a real `<label>` |
| `<a href="#" onclick>` | Should be a button; broken if JS fails | Use `<button>` |

---

## Checklist — transform accessibility for a build

Before shipping any markup change:

**Semantic HTML**
- [ ] Used the native element for each role (no `<div role="button">`)
- [ ] No redundant roles (no `<button role="button">`)
- [ ] No `role="presentation"` on interactive elements

**Images**
- [ ] Every `<img>` has an `alt` attribute
- [ ] Informative `alt` describes meaning, not filename
- [ ] Decorative images use `alt=""`
- [ ] SVG images have `role="img"` + name; decorative SVGs are hidden
- [ ] Icons inside named buttons use `aria-hidden="true"`
- [ ] Icon-only buttons have an `aria-label`

**Forms**
- [ ] Every input has a label (visible or `.sr-only`)
- [ ] Placeholders are not used as the only label
- [ ] Required fields are marked with `required` AND a visible signal
- [ ] `autocomplete` is set on common fields
- [ ] Errors use `aria-invalid` + `aria-describedby` + `role="alert"`
- [ ] Radio groups live in `<fieldset>` with `<legend>`

**Headings**
- [ ] Exactly one `<h1>` per page
- [ ] No skipped heading levels
- [ ] Headings describe their section
- [ ] No empty headings

**Links and buttons**
- [ ] Links navigate, buttons act
- [ ] Link text makes sense out of context
- [ ] Links opening in new windows say so
- [ ] Every button has a name

**Page structure**
- [ ] Has `<header>`, `<main>`, `<footer>` landmarks
- [ ] Exactly one `<main>`
- [ ] Multiple `<nav>` regions are labelled
- [ ] Current page is marked with `aria-current`
- [ ] `<html>` has a `lang` attribute
- [ ] `<title>` is unique and descriptive
- [ ] All IDs are unique

**Tables**
- [ ] Data tables use `<th>` with `scope`
- [ ] Tables have a caption or label
- [ ] Layout tables (if any) use `role="presentation"`

**Dynamic content**
- [ ] Status updates use `role="status"`
- [ ] Errors use `role="alert"`
- [ ] Live regions exist before their content
- [ ] Loading states use `aria-busy`

**ARIA states**
- [ ] Custom widgets expose their state via ARIA attributes
- [ ] `aria-expanded` is paired with `aria-controls`
