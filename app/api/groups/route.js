import matter from 'gray-matter';
import { revalidateTag } from 'next/cache';
import { commitFile, fileExists } from '@/lib/github';
import { CATEGORY_SLUGS } from '@/lib/categories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

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
  fm.created = created || new Date().toISOString().slice(0, 10);
  return matter.stringify(body || '', fm);
}

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    name,
    slug: customSlug,
    description = '',
    when = '',
    rules,
    body = '',
  } = payload;

  if (!name || !String(name).trim()) {
    return Response.json({ error: 'Name is required' }, { status: 400 });
  }

  const slug = slugify(customSlug || name);
  if (!slug) {
    return Response.json(
      { error: 'Could not derive a valid slug from the name' },
      { status: 400 }
    );
  }

  const path = `content/groups/${slug}.md`;
  try {
    if (await fileExists(path)) {
      return Response.json(
        { error: `A group with slug "${slug}" already exists` },
        { status: 409 }
      );
    }
  } catch (e) {
    return Response.json(
      { error: `Existence check failed: ${e.message}` },
      { status: 500 }
    );
  }

  const md = buildGroupMd({
    name: String(name).trim(),
    description: String(description).trim(),
    when: typeof when === 'string' ? when : '',
    rules: normalizeRules(rules),
    body: String(body),
  });

  try {
    const result = await commitFile({
      path,
      content: md,
      message: `Add group: ${name}`,
    });
    revalidateTag('groups');
    return Response.json({
      ok: true,
      slug,
      url: `/groups/${slug}`,
      commitUrl: result.commitUrl,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
