# ai-builder-rules

A library of rules for building AI-driven UI. Markdown-first, repo-as-database, eventually exposable via MCP.

**Live**: https://build-rules-2cc3a555fb8c.herokuapp.com/

## Categories

- 🔁 **Transform** — how elements change, animate, and respond
- 🌊 **Flow** — how users move through screens and tasks
- 🎯 **Intent** — what the UI is trying to communicate
- 🟦 **Visual Elements** — buttons, cards, surfaces, type — the building blocks
- ⭐ **Golden Rules** — non-negotiables, surfaced from the four categories via the `golden: true` frontmatter flag

## How rules are stored

Each rule is a single markdown file under `content/rules/{category}/{slug}.md` with YAML frontmatter:

```markdown
---
title: Animate intent, not decoration
summary: Every animation should communicate something. If it doesn't, cut it.
golden: true
tags: [animation, motion, clarity]
created: 2026-05-08
---

# Body in markdown.
```

**Required**: `title`. **Optional**: `summary`, `golden`, `tags`, `created`. The category is derived from the folder; the slug from the filename.

## How rules are added

Three paths:

1. **Web form** at `/new` — write fields or paste a `.md` file. Posts to `/api/rules` which commits to GitHub via the Contents API.
2. **Git** — drop a markdown file into the right folder, commit, push. The app picks it up within ~60s (GitHub fetch cache).
3. **Eventually MCP** — same data, exposed as `list_rules` / `get_rule` / `search_rules` tools.

## Local dev

```bash
npm install
npm run dev
```

Set `GITHUB_TOKEN` in `.env.local` if you want the add-rule form to work locally:

```
GITHUB_TOKEN=ghp_xxx_finegrained_token_with_contents_write
GITHUB_OWNER=liamthompson1
GITHUB_REPO=ai-builder-rules
GITHUB_BRANCH=main
```

## Heroku deploy

The app reads from GitHub at runtime, so adding a new rule via the form makes it appear within 60s without redeploying. Code changes still need a Heroku build — trigger via the Heroku Build API against the `main` tarball, or set up GitHub auto-deploy at https://dashboard.heroku.com/apps/build-rules/deploy/github.
