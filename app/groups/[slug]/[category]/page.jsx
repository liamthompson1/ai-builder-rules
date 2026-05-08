import Link from 'next/link';
import { CATEGORIES, getCategory } from '@/lib/categories';
import { getGroup } from '@/lib/groups';
import { listAllRules } from '@/lib/rules';
import RuleRow from '../../../RuleRow';
import NotFoundView from '../../../NotFoundView';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug, category } = await params;
  const g = await getGroup(slug).catch(() => null);
  const cat = getCategory(category);
  if (!g || !cat) return { title: 'Not found', robots: { index: false } };
  return {
    title: `${cat.label} · ${g.name}`,
    description: `${cat.label} rules in the "${g.name}" group.`,
  };
}

export default async function GroupCategoryPage({ params }) {
  const { slug, category } = await params;

  const g = await getGroup(slug).catch(() => null);
  if (!g) {
    return (
      <NotFoundView
        title={`No group called "${slug}".`}
        subtitle="Pick one from the sidebar."
      />
    );
  }
  const cat = getCategory(category);
  if (!cat) {
    return (
      <NotFoundView
        title={`No category called "${category}".`}
        subtitle="Pick one from the sidebar."
      />
    );
  }

  const ruleSlugs = g.rules?.[category] || [];
  const allRules = await listAllRules().catch(() => []);
  const ruleByKey = new Map(
    allRules.map((r) => [`${r.category}:${r.slug}`, r])
  );
  const rules = ruleSlugs
    .map((s) => ({ slug: s, rule: ruleByKey.get(`${category}:${s}`) }))
    .filter((entry) => entry.rule);
  const missing = ruleSlugs.filter((s) => !ruleByKey.has(`${category}:${s}`));

  return (
    <>
      <div style={{ marginBottom: 16, fontSize: 13, color: 'var(--fg-muted)' }}>
        <Link href="/groups" className="text-link">🧰 Groups</Link>
        {' / '}
        <Link href={`/groups/${slug}`} className="text-link">{g.name}</Link>
        {' / '}
        <span>{cat.label}</span>
      </div>

      <header className="page-header">
        <div className="page-eyebrow">
          🧰 {g.name} · {cat.icon} Category
        </div>
        <h1 className="page-title">{cat.label}</h1>
        <p className="page-subtitle">
          Rules from <strong>{g.name}</strong> in the {cat.label.toLowerCase()} bucket.
          {' '}
          <Link href={`/${category}`} className="text-link">
            View all {cat.label.toLowerCase()} rules across the library →
          </Link>
        </p>
      </header>

      {rules.length === 0 && missing.length === 0 ? (
        <div className="empty">
          No {cat.label.toLowerCase()} rules in <strong>{g.name}</strong> yet.{' '}
          <Link href={`/groups/${slug}/edit`} className="text-link">
            Edit the group to add some →
          </Link>
        </div>
      ) : (
        <div className="rule-list">
          {rules.map(({ rule }) => (
            <RuleRow key={rule.slug} rule={rule} />
          ))}
          {missing.map((s) => (
            <div
              key={s}
              className="rule-row"
              style={{ opacity: 0.7, borderTopColor: 'rgba(248,81,73,0.3)' }}
            >
              <span className="gold-mark">⚠️</span>
              <div className="rule-meta">
                <h3 className="rule-title">Missing: {s}</h3>
                <p className="rule-summary">
                  Referenced by this group but no longer exists.{' '}
                  <Link href={`/groups/${slug}/edit`} className="text-link">
                    Edit to remove →
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
