import matter from 'gray-matter';
import { revalidateTag } from 'next/cache';
import { getFile, updateFile, deleteFile } from '@/lib/github';
import { CATEGORY_SLUGS } from '@/lib/categories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function buildMarkdown({ title, summary, golden, tags, body, created }) {
  const fm = { title };
  if (summary) fm.summary = summary;
  fm.golden = !!golden;
  if (tags && tags.length) fm.tags = tags;
  if (created) fm.created = created;
  return matter.stringify(body || '', fm);
}

function asTagsArray(input) {
  if (Array.isArray(input)) return input.map((t) => String(t).trim()).filter(Boolean);
  if (typeof input === 'string')
    return input.split(',').map((t) => t.trim()).filter(Boolean);
  return [];
}

function pathFor(category, slug) {
  return `content/rules/${category}/${slug}.md`;
}

function bustCaches(path) {
  // Listings + this specific rule's body. Tags match `tags` in lib/rules.js.
  revalidateTag('rules');
  revalidateTag(`rule:${path}`);
}

export async function PUT(req, { params }) {
  const { category, slug } = await params;
  if (!CATEGORY_SLUGS.includes(category)) {
    return Response.json({ error: 'Invalid category' }, { status: 400 });
  }
  const path = pathFor(category, slug);

  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { title, summary, golden, tags, body } = payload;
  if (!title || !String(title).trim()) {
    return Response.json({ error: 'Title is required' }, { status: 400 });
  }
  if (!body || !String(body).trim()) {
    return Response.json({ error: 'Body is empty' }, { status: 400 });
  }

  let existing;
  try {
    existing = await getFile(path);
  } catch (e) {
    return Response.json({ error: `Lookup failed: ${e.message}` }, { status: 500 });
  }
  if (!existing) {
    return Response.json({ error: 'Rule not found' }, { status: 404 });
  }

  // Preserve the original `created` date — editing shouldn't reset it.
  let created = null;
  try {
    const parsed = matter(existing.content);
    created = parsed.data.created || null;
  } catch {
    /* fall through */
  }

  const md = buildMarkdown({
    title: String(title).trim(),
    summary: summary ? String(summary).trim() : '',
    golden: !!golden,
    tags: asTagsArray(tags),
    body: String(body),
    created,
  });

  try {
    const result = await updateFile({
      path,
      content: md,
      message: `Update rule: ${title}`,
      sha: existing.sha,
    });
    bustCaches(path);
    return Response.json({
      ok: true,
      url: `/${category}/${slug}`,
      commitUrl: result.commitUrl,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { category, slug } = await params;
  if (!CATEGORY_SLUGS.includes(category)) {
    return Response.json({ error: 'Invalid category' }, { status: 400 });
  }
  const path = pathFor(category, slug);

  let existing;
  try {
    existing = await getFile(path);
  } catch (e) {
    return Response.json({ error: `Lookup failed: ${e.message}` }, { status: 500 });
  }
  if (!existing) {
    return Response.json({ error: 'Rule not found' }, { status: 404 });
  }

  // Try to recover the title for a nicer commit message.
  let title = slug;
  try {
    const parsed = matter(existing.content);
    title = parsed.data.title || slug;
  } catch {
    /* fall through */
  }

  try {
    const result = await deleteFile({
      path,
      sha: existing.sha,
      message: `Delete rule: ${title}`,
    });
    bustCaches(path);
    return Response.json({
      ok: true,
      categoryUrl: `/${category}`,
      commitUrl: result.commitUrl,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
