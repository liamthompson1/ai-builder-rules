import matter from 'gray-matter';
import { commitFile, fileExists } from '@/lib/github';
import { CATEGORY_SLUGS } from '@/lib/categories';
import {
  normalizeStrictness,
  normalizeAppliesTo,
  normalizeRelated,
} from '@/lib/schema';

// Force Node runtime — gray-matter and Buffer aren't supported on edge.
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

function buildMarkdown({
  title,
  summary,
  golden,
  strictness,
  applies_to,
  related,
  tags,
  body,
  created,
}) {
  const fm = { title };
  if (summary) fm.summary = summary;
  fm.golden = !!golden;
  // Schema fields for AI consumption — emit even when default so the
  // schema is visible at a glance in any rule file.
  fm.strictness = normalizeStrictness(strictness);
  fm.applies_to = normalizeAppliesTo(applies_to);
  if (tags && tags.length) fm.tags = tags;
  const rel = normalizeRelated(related);
  if (rel.length) fm.related = rel;
  fm.created = created || new Date().toISOString().slice(0, 10);
  return matter.stringify(body || '', fm);
}

function asTagsArray(input) {
  if (Array.isArray(input)) return input.map((t) => String(t).trim()).filter(Boolean);
  if (typeof input === 'string')
    return input.split(',').map((t) => t.trim()).filter(Boolean);
  return [];
}

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  let {
    mode,
    category,
    title,
    summary,
    golden,
    strictness,
    applies_to,
    related,
    tags,
    body,
    raw,
    slug: customSlug,
  } = payload;

  // Upload mode parses an existing markdown file (with or without frontmatter)
  // and lets explicit form values override what's in the file.
  if (mode === 'upload') {
    if (!raw || !raw.trim()) {
      return Response.json({ error: 'Upload mode needs a `raw` markdown string' }, { status: 400 });
    }
    let parsed;
    try {
      parsed = matter(raw);
    } catch (e) {
      return Response.json({ error: `Failed to parse markdown: ${e.message}` }, { status: 400 });
    }
    title = title || parsed.data.title;
    summary = summary ?? parsed.data.summary;
    golden = golden ?? parsed.data.golden;
    strictness = strictness ?? parsed.data.strictness;
    applies_to = applies_to ?? parsed.data.applies_to;
    related = related ?? parsed.data.related;
    tags = tags ?? parsed.data.tags;
    category = category || parsed.data.category;
    body = parsed.content;
  }

  if (!title || !String(title).trim()) {
    return Response.json({ error: 'A title is required' }, { status: 400 });
  }
  if (!CATEGORY_SLUGS.includes(category)) {
    return Response.json(
      { error: `Category must be one of: ${CATEGORY_SLUGS.join(', ')}` },
      { status: 400 }
    );
  }
  if (!body || !String(body).trim()) {
    return Response.json({ error: 'Body is empty' }, { status: 400 });
  }

  const slug = slugify(customSlug || title);
  if (!slug) {
    return Response.json({ error: 'Could not derive a valid slug from the title' }, { status: 400 });
  }

  const path = `content/rules/${category}/${slug}.md`;

  try {
    if (await fileExists(path)) {
      return Response.json(
        { error: `A rule with slug "${slug}" already exists in ${category}. Edit the title or pass a unique slug.` },
        { status: 409 }
      );
    }
  } catch (e) {
    return Response.json({ error: `Existence check failed: ${e.message}` }, { status: 500 });
  }

  const md = buildMarkdown({
    title: String(title).trim(),
    summary: summary ? String(summary).trim() : '',
    golden: !!golden,
    strictness,
    applies_to,
    related,
    tags: asTagsArray(tags),
    body: String(body),
  });

  try {
    const result = await commitFile({
      path,
      content: md,
      message: `Add rule: ${title}`,
    });
    return Response.json({
      ok: true,
      slug,
      category,
      path,
      url: `/${category}/${slug}`,
      commitUrl: result.commitUrl,
      fileUrl: result.fileUrl,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
