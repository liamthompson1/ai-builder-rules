// Server-only fetcher for repo-root markdown docs (README.md, AGENTS.md).
// Same pattern as lib/rules.js — pull from GitHub raw with a tagged 60s
// fetch cache. Lets us host the docs inside the app without bundling them
// into the build.

import 'server-only';

const OWNER = process.env.GITHUB_OWNER || 'liamthompson1';
const REPO = process.env.GITHUB_REPO || 'ai-builder-rules';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const REVALIDATE = 60;

export async function fetchDoc(filename) {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${filename}`;
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE, tags: ['docs', `doc:${filename}`] },
  });
  if (!res.ok) return null;
  return res.text();
}

export function githubBlobUrl(filename) {
  return `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${filename}`;
}
