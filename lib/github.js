// Server-only write layer. Commits markdown files to GitHub via the Contents
// API. Requires GITHUB_TOKEN env var (fine-grained PAT with Contents:Write on
// the target repo).

import 'server-only';

const OWNER = process.env.GITHUB_OWNER || 'liamthompson1';
const REPO = process.env.GITHUB_REPO || 'ai-builder-rules';
const BRANCH = process.env.GITHUB_BRANCH || 'main';

function authHeaders() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN not configured on the server');
  }
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

export async function fileExists(path) {
  if (!process.env.GITHUB_TOKEN) {
    // Fall back to public raw lookup so reads don't hard-fail without a token.
    const res = await fetch(
      `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`,
      { cache: 'no-store' }
    );
    return res.ok;
  }
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURI(path)}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (res.status === 404) return false;
  if (!res.ok) throw new Error(`fileExists check failed: ${res.status}`);
  return true;
}

// Fetch the current sha + decoded content for a file. Needed before updating
// or deleting (GitHub requires the sha to confirm we're acting on the version
// we think we are).
export async function getFile(path) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURI(path)}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`getFile failed: ${res.status}`);
  const data = await res.json();
  return {
    sha: data.sha,
    content: Buffer.from(data.content || '', 'base64').toString('utf-8'),
  };
}

export async function updateFile({ path, content, message, sha }) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURI(path)}`;
  const body = {
    message,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    sha,
    branch: BRANCH,
  };
  const res = await fetch(url, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`updateFile failed (${res.status}): ${err.message || res.statusText}`);
  }
  const data = await res.json();
  return {
    commitUrl: data.commit?.html_url,
    fileUrl: data.content?.html_url,
    sha: data.commit?.sha,
  };
}

export async function deleteFile({ path, sha, message }) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURI(path)}`;
  const body = { message, sha, branch: BRANCH };
  const res = await fetch(url, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`deleteFile failed (${res.status}): ${err.message || res.statusText}`);
  }
  const data = await res.json();
  return {
    commitUrl: data.commit?.html_url,
    sha: data.commit?.sha,
  };
}

export async function commitFile({ path, content, message }) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURI(path)}`;
  const body = {
    message,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: BRANCH,
  };
  const res = await fetch(url, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err.message || res.statusText;
    throw new Error(`GitHub commit failed (${res.status}): ${msg}`);
  }
  const data = await res.json();
  return {
    commitUrl: data.commit?.html_url,
    fileUrl: data.content?.html_url,
    sha: data.commit?.sha,
  };
}
