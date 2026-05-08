import matter from 'gray-matter';
import { revalidateTag } from 'next/cache';
import { getFile, updateFile, deleteFile } from '@/lib/github';
import { CATEGORY_SLUGS } from '@/lib/categories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function normalizeRules(input) {
  const out = {};
  for (const cat of CATEGORY_SLUGS) {
    const v = input?.[cat];
    out[cat] = Array.isArray(v) ? v.filter(Boolean).map(String) : [];
  }
  return out;
}

function buildGroupMd({ name, description, when, rules, body, created }) {
  const fm = { name };
  if (description) fm.description = description;
  if (when && when.trim()) fm.when = when.trim();
  fm.rules = rules;
  if (created) fm.created = created;
  return matter.stringify(body || '', fm);
}

function pathFor(slug) {
  return `content/groups/${slug}.md`;
}

function bustCaches(path) {
  revalidateTag('groups');
  revalidateTag(`group:${path}`);
}

export async function PUT(req, { params }) {
  const { slug } = await params;
  const path = pathFor(slug);

  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, description = '', when = '', rules, body = '' } = payload;
  if (!name || !String(name).trim()) {
    return Response.json({ error: 'Name is required' }, { status: 400 });
  }

  let existing;
  try {
    existing = await getFile(path);
  } catch (e) {
    return Response.json({ error: `Lookup failed: ${e.message}` }, { status: 500 });
  }
  if (!existing) {
    return Response.json({ error: 'Group not found' }, { status: 404 });
  }

  let created = null;
  try {
    const parsed = matter(existing.content);
    created = parsed.data.created || null;
  } catch {
    /* ignore */
  }

  const md = buildGroupMd({
    name: String(name).trim(),
    description: String(description).trim(),
    when: typeof when === 'string' ? when : '',
    rules: normalizeRules(rules),
    body: String(body),
    created,
  });

  try {
    const result = await updateFile({
      path,
      content: md,
      message: `Update group: ${name}`,
      sha: existing.sha,
    });
    bustCaches(path);
    return Response.json({
      ok: true,
      url: `/groups/${slug}`,
      commitUrl: result.commitUrl,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { slug } = await params;
  const path = pathFor(slug);

  let existing;
  try {
    existing = await getFile(path);
  } catch (e) {
    return Response.json({ error: `Lookup failed: ${e.message}` }, { status: 500 });
  }
  if (!existing) {
    return Response.json({ error: 'Group not found' }, { status: 404 });
  }

  let name = slug;
  try {
    name = matter(existing.content).data.name || slug;
  } catch {
    /* ignore */
  }

  try {
    const result = await deleteFile({
      path,
      sha: existing.sha,
      message: `Delete group: ${name}`,
    });
    bustCaches(path);
    return Response.json({
      ok: true,
      url: '/groups',
      commitUrl: result.commitUrl,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
