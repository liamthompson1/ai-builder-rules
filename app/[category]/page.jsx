import Link from 'next/link';
import { CATEGORIES, getCategory } from '@/lib/categories';
import { listRulesByCategory } from '@/lib/rules';
import RuleRow from '../RuleRow';
import NotFoundView from '../NotFoundView';

// Dynamic so newly-added/edited rules show up without Cloudflare serving a
// 60s-old s-maxage'd response.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: 'Not found', robots: { index: false } };
  return { title: cat.label, description: cat.description };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) {
    return (
      <NotFoundView
        title={`No category called "${category}".`}
        subtitle="Pick one from the sidebar — Transform, Flow, Intent, Visual Elements, or Golden Rules."
      />
    );
  }

  const rules = await listRulesByCategory(category).catch(() => []);

  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">{cat.icon} Category</div>
        <h1 className="page-title plain">{cat.label}</h1>
        <p className="page-subtitle">{cat.description}</p>
      </header>

      {rules.length === 0 ? (
        <div className="empty">
          No rules in <strong>{cat.label}</strong> yet.{' '}
          <Link href="/new" className="text-link">Add the first one →</Link>
        </div>
      ) : (
        <div className="rule-list">
          {rules.map((r) => (
            <RuleRow key={r.slug} rule={r} />
          ))}
        </div>
      )}
    </>
  );
}
