import { getCategory } from '@/lib/categories';
import { getRule, listAllRules } from '@/lib/rules';
import { listAllGroups } from '@/lib/groups';
import EditRuleForm from './EditRuleForm';
import NotFoundView from '../../../NotFoundView';

// Fresh data on every load — we don't want a 60s-stale rule body in the
// editor when the user might have just saved.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const rule = await getRule(category, slug).catch(() => null);
  return {
    title: rule ? `Edit · ${rule.meta.title}` : 'Edit rule',
    robots: { index: false },
  };
}

export default async function EditPage({ params }) {
  const { category, slug } = await params;
  const cat = getCategory(category);
  if (!cat) {
    return (
      <NotFoundView
        title={`No category called "${category}".`}
        subtitle="Pick one from the sidebar."
      />
    );
  }

  const rule = await getRule(category, slug).catch(() => null);
  if (!rule) {
    return (
      <NotFoundView
        title={`No "${slug}" in ${cat.label}.`}
        subtitle="Maybe it was deleted, or never existed."
      />
    );
  }

  const [allGroups, allRules] = await Promise.all([
    listAllGroups().catch(() => []),
    listAllRules().catch(() => []),
  ]);
  const initialGroupSlugs = allGroups
    .filter((g) => (g.rules?.[category] || []).includes(slug))
    .map((g) => g.slug);

  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">
          {cat.icon} {cat.label} · Editing
        </div>
        <h1 className="page-title plain">{rule.meta.title}</h1>
        <p className="page-subtitle">
          Save commits to GitHub. Listings refresh immediately; the rule's
          page may show the old body for a few seconds while caches catch up.
        </p>
      </header>

      <EditRuleForm
        initial={{
          slug: rule.meta.slug,
          category: rule.meta.category,
          title: rule.meta.title,
          summary: rule.meta.summary,
          golden: rule.meta.golden,
          strictness: rule.meta.strictness,
          applies_to: rule.meta.applies_to,
          related: rule.meta.related,
          tags: rule.meta.tags,
          body: rule.body,
          groupSlugs: initialGroupSlugs,
        }}
        allGroups={allGroups}
        allRules={allRules}
      />
    </>
  );
}
