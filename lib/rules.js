// Server-only read layer. The repo is the source of truth — we hit the GitHub
// tree API for listings and raw.githubusercontent.com for file bodies. Cached
// for 60s via Next.js fetch revalidation, so new rules surface within a minute
// without needing a Heroku redeploy.

import 'server-only';
import matter from 'gray-matter';
import { CATEGORY_SLUGS } from './categories';

const OWNER = process.env.GITHUB_OWNER || 'liamthompson1';
const REPO = process.env.GITHUB_REPO || 'ai-builder-rules';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const RULES_DIR = 'content/rules';
const REVALIDATE = 60;

const rawUrl = (path) =>
  `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
const treeUrl = `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`;

function ghHeaders() {
  const h = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function fetchTree() {
  const res = await fetch(treeUrl, {
    headers: ghHeaders(),
    next: { revalidate: REVALIDATE, tags: ['rules'] },
  });
  if (!res.ok) {
    if (res.status === 404 || res.status === 409) return [];
    throw new Error(`GitHub tree fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return data.tree || [];
}

async function fetchRaw(path) {
  const res = await fetch(rawUrl(path), {
    next: { revalidate: REVALIDATE, tags: ['rules', `rule:${path}`] },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Raw fetch failed: ${res.status} for ${path}`);
  }
  return res.text();
}

function parseMeta(filePath, raw) {
  const parts = filePath.split('/');
  if (parts.length < 4) return null;
  const category = parts[2];
  if (!CATEGORY_SLUGS.includes(category)) return null;
  const slug = parts[parts.length - 1].replace(/\.md$/, '');
  const { data } = matter(raw);
  return {
    slug,
    category,
    title: data.title || slug,
    summary: data.summary || '',
    golden: !!data.golden,
    tags: Array.isArray(data.tags) ? data.tags : [],
    created: data.created || null,
    path: filePath,
  };
}

export async function listAllRules() {
  const tree = await fetchTree();
  const ruleFiles = tree.filter(
    (item) =>
      item.type === 'blob' &&
      item.path.startsWith(`${RULES_DIR}/`) &&
      item.path.endsWith('.md')
  );

  const rules = await Promise.all(
    ruleFiles.map(async (f) => {
      const text = await fetchRaw(f.path);
      if (!text) return null;
      return parseMeta(f.path, text);
    })
  );

  return rules
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function listRulesByCategory(category) {
  const all = await listAllRules();
  return all.filter((r) => r.category === category);
}

export async function listGoldenRules() {
  const all = await listAllRules();
  return all.filter((r) => r.golden);
}

export async function getRule(category, slug) {
  if (!CATEGORY_SLUGS.includes(category)) return null;
  const path = `${RULES_DIR}/${category}/${slug}.md`;
  const text = await fetchRaw(path);
  if (!text) return null;
  const { data, content } = matter(text);
  return {
    meta: {
      slug,
      category,
      title: data.title || slug,
      summary: data.summary || '',
      golden: !!data.golden,
      tags: Array.isArray(data.tags) ? data.tags : [],
      created: data.created || null,
      path,
    },
    body: content,
  };
}
