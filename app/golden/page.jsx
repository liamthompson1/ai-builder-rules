import { GOLDEN } from '@/lib/categories';
import { listGoldenRules } from '@/lib/rules';
import RuleRow from '../RuleRow';

export const metadata = {
  title: GOLDEN.label,
  description: GOLDEN.description,
};

export const dynamic = 'force-dynamic';

export default async function GoldenPage() {
  const rules = await listGoldenRules().catch(() => []);

  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">⭐ Cross-category</div>
        <h1 className="page-title golden">{GOLDEN.label}</h1>
        <p className="page-subtitle">
          The non-negotiables. Any rule with <code>golden: true</code> in its
          frontmatter shows up here, regardless of which category it lives in.
        </p>
      </header>

      {rules.length === 0 ? (
        <div className="empty">
          No golden rules yet — promote one by adding{' '}
          <code>golden: true</code> to its frontmatter.
        </div>
      ) : (
        <div className="rule-list">
          {rules.map((r) => (
            <RuleRow key={`${r.category}-${r.slug}`} rule={r} showCategory />
          ))}
        </div>
      )}
    </>
  );
}
