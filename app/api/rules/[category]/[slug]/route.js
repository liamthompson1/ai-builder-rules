import matter from 'gray-matter';
import { revalidateTag } from 'next/cache';
import { getFile, updateFile, deleteFile } from '@/lib/github';
import { CATEGORY_SLUGS } from '@/lib/categories';
import { listAllGroups } from '@/lib/groups';

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

// Reconcile the set of groups that contain this rule against the desired set.
// Reads fresh sha + content per group (the listing's data is up to 60s stale).
// Each touched group becomes its own commit — fine for now, the trade-off is
// readable git history. Returns per-group results so the UI can summarise.
async function reconcileRuleGroupMembership({ category, ruleSlug, desiredGroupSlugs }) {
  const groups = await listAllGroups().catch(() => []);
  const desired = new Set((desiredGroupSlugs || []).map(String));
  const results = [];

  for (const g of groups) {
    const isCurrentlyIn = (g.rules?.[category] || []).includes(ruleSlug);
    const shouldBeIn = desired.has(g.slug);
    if (isCurrentlyIn === shouldBeIn) continue;

    try {
      const file = await getFile(g.path);
      if (!file) {
        results.push({ slug: g.slug, ok: false, error: 'group file disappeared' });
        continue;
      }
      const parsed = matter(file.content);
      const rules = { ...(parsed.data.rules || {}) };
      const list = Array.isArray(rules[category]) ? [...rules[category]] : [];
      if (shouldBeIn) {
        if (!list.includes(ruleSlug)) list.push(ruleSlug);
      } else {
        const idx = list.indexOf(ruleSlug);
        if (idx !== -1) list.splice(idx, 1);
      }
      rules[category] = list;
      const newFm = { ...parsed.data, rules };
      const newMd = matter.stringify(parsed.content, newFm);

      await updateFile({
        path: g.path,
        content: newMd,
        sha: file.sha,
        message: shouldBeIn
          ? `Add ${category}/${ruleSlug} to group: ${g.name}`
          : `Remove ${category}/${ruleSlug} from group: ${g.name}`,
      });
      results.push({
        slug: g.slug,
        name: g.name,
        ok: true,
        action: shouldBeIn ? 'added' : 'removed',
      });
    } catch (e) {
      results.push({ slug: g.slug, name: g.name, ok: false, error: e.message });
    }
  }

  return results;
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

  let result;
  try {
    result = await updateFile({
      path,
      content: md,
      message: `Update rule: ${title}`,
      sha: existing.sha,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }

  // Optional: reconcile group memberships if the client sent a list.
  let groupResults = null;
  if (Array.isArray(payload.groupSlugs)) {
    groupResults = await reconcileRuleGroupMembership({
      category,
      ruleSlug: slug,
      desiredGroupSlugs: payload.groupSlugs,
    });
  }

  bustCaches(path);
  if (groupResults && groupResults.length) {
    revalidateTag('groups');
  }

  return Response.json({
    ok: true,
    url: `/${category}/${slug}`,
    commitUrl: result.commitUrl,
    groupResults,
  });
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
