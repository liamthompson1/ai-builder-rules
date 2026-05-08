# ai-builder-rules

A library of rules for building AI-driven UI — markdown-first, with a web UI for humans to view, edit, and add rules. Designed to be consumed directly by AI agents from the GitHub repo.

**Web UI**: <https://www.holidayextras.com/ai-builder-rules> (Holiday Extras only, Google sign-in)

**For AI agents**: read [`AGENTS.md`](./AGENTS.md). It's the canonical specification of the schema, the body conventions, and how to apply rules to a UI you're generating.

---

## Layout

```
content/
  rules/
    transform/        🔁 how elements change, animate, respond
    flow/             🌊 how users move through screens and tasks
    intent/           🎯 what the UI is communicating
    visual-elements/  🟦 buttons, cards, surfaces, type
  groups/             🧰 curated bundles of rules that travel together
```

Each rule and group is a markdown file with YAML frontmatter. The schema is documented in [`AGENTS.md`](./AGENTS.md).

A rule can be `golden: true` (cross-cutting non-negotiable, surfaces in the Golden view alongside its home category).

A group can pull any number of rules from any of the four categories. Group's `when:` field tells AI agents the situation in which to apply the bundle.

## Adding rules

Three paths, in order of preference:

1. **Web UI** at `/ai-builder-rules/new` — fields for every frontmatter property, body textarea pre-filled with the H2 outline AI agents expect (`## Why this matters` / `## When to apply` / `## Examples` / `## Edge cases`).
2. **Upload `.md` file** via the same page — paste or drop a markdown file with full frontmatter; categories are derived from the file's frontmatter or the picker.
3. **Direct git commit** if you're confident with the schema — drop a markdown file in the right `content/rules/{category}/` folder, push, the app picks it up within ~60s.

The web UI commits to GitHub via the Contents API, so changes made by every path show up in the same git history.

## Editing & deleting

Every rule and group page in the web UI has Edit and Delete buttons. Edits commit a single update; deletes commit a removal. Group memberships stay consistent — toggling a rule's group membership from the rule edit screen reads/writes each group file in one transaction.

## Local dev

```bash
npm install
npm run dev
```

Set in `.env.local`:
```
GITHUB_TOKEN=<fine-grained PAT, contents:write on this repo>
GITHUB_OWNER=liamthompson1
GITHUB_REPO=ai-builder-rules
GITHUB_BRANCH=main

AUTH_SECRET=<openssl rand -base64 33>
AUTH_GOOGLE_ID=<from Google Cloud Console>
AUTH_GOOGLE_SECRET=<from Google Cloud Console>
AUTH_URL=https://www.holidayextras.com/ai-builder-rules
```

## Stack

- Next.js 16 (App Router) on Heroku, Node 22
- Repo-as-database — markdown files in `content/`, no SQL
- Reads via the GitHub tree + raw APIs (60s tag-based cache, busted on writes)
- Writes via the GitHub Contents API (`PUT` / `DELETE` with sha)
- Auth.js v5 with a single Google provider, gated to `@holidayextras.com`
- GitHub-Primer dark theme

## License

Private — Holiday Extras internal tool.
