// Server-only read layer for groups. Same repo-as-database pattern as rules:
// markdown files under content/groups/, parsed via gray-matter, fetched
// from GitHub raw + tree API with 60s revalidate.

import 'server-only';
import matter from 'gray-matter';
import { CATEGORY_SLUGS } from './categories';

const OWNER = process.env.GITHUB_OWNER || 'liamthompson1';
const REPO = process.env.GITHUB_REPO || 'ai-builder-rules';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const GROUPS_DIR = 'content/groups';
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
    next: { revalidate: REVALIDATE, tags: ['groups'] },
  });
  if (!res.ok) {
    if (res.status === 404 || res.status === 409) return [];
    throw new Error(`Group tree fetch failed: ${res.status}`);
  }
  const data = await res.json();
  return data.tree || [];
}

async function fetchRaw(path) {
  const res = await fetch(rawUrl(path), {
    next: { revalidate: REVALIDATE, tags: ['groups', `group:${path}`] },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Group raw fetch failed: ${res.status}`);
  }
  return res.text();
}

// Always return { transform: [], flow: [], intent: [], 'visual-elements': [] }.
// Tolerates an old `category: slug` (string) shape too, in case anyone hand-edits.
function normalizeRules(input) {
  const out = Object.fromEntries(CATEGORY_SLUGS.map((c) => [c, []]));
  if (!input || typeof input !== 'object') return out;
  for (const cat of CATEGORY_SLUGS) {
    const v = input[cat];
    if (Array.isArray(v)) {
      out[cat] = v.filter(Boolean).map(String);
    } else if (typeof v === 'string' && v.trim()) {
      out[cat] = [v.trim()];
    }
  }
  return out;
}

function parseGroup(filePath, raw) {
  const filename = filePath.split('/').pop();
  const slug = filename.replace(/\.md$/, '');
  const { data, content } = matter(raw);
  return {
    slug,
    name: data.name || slug,
    description: data.description || '',
    rules: normalizeRules(data.rules),
    created: data.created || null,
    path: filePath,
    body: content,
  };
}

export async function listAllGroups() {
  const tree = await fetchTree();
  const files = tree.filter(
    (item) =>
      item.type === 'blob' &&
      item.path.startsWith(`${GROUPS_DIR}/`) &&
      item.path.endsWith('.md')
  );
  const groups = await Promise.all(
    files.map(async (f) => {
      const text = await fetchRaw(f.path);
      if (!text) return null;
      const g = parseGroup(f.path, text);
      // Listings don't need the body — strip it for size.
      const { body, ...meta } = g;
      return meta;
    })
  );
  return groups.filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getGroup(slug) {
  const path = `${GROUPS_DIR}/${slug}.md`;
  const text = await fetchRaw(path);
  if (!text) return null;
  return parseGroup(path, text);
}

// For the rule page: which groups currently reference this rule?
export async function listGroupsContainingRule(category, ruleSlug) {
  const all = await listAllGroups();
  return all.filter((g) => (g.rules[category] || []).includes(ruleSlug));
}
