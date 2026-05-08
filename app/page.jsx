import Link from 'next/link';
import { CATEGORIES, GOLDEN } from '@/lib/categories';
import { listAllRules } from '@/lib/rules';

export default async function HomePage() {
  const all = await listAllRules().catch(() => []);
  const goldenCount = all.filter((r) => r.golden).length;
  const byCategory = Object.fromEntries(
    CATEGORIES.map((c) => [c.slug, all.filter((r) => r.category === c.slug).length])
  );

  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">Library</div>
        <h1 className="page-title">Ready to build?</h1>
        <p className="page-subtitle">
          A library of rules for building AI-driven UI. Browse by category, or
          jump straight to the {GOLDEN.label.toLowerCase()} — the
          non-negotiables that cut across everything.
        </p>
      </header>

      <div className="cards">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="cat-card" style={{ textDecoration: 'none' }}>
            <span className="cat-card-icon">{c.icon}</span>
            <h2 className="cat-card-title">{c.label}</h2>
            <p className="cat-card-desc">{c.description}</p>
            <div className="cat-card-count">
              {byCategory[c.slug] || 0} {byCategory[c.slug] === 1 ? 'rule' : 'rules'}
            </div>
          </Link>
        ))}
        <Link href="/golden" className="cat-card golden" style={{ textDecoration: 'none' }}>
          <span className="cat-card-icon">{GOLDEN.icon}</span>
          <h2 className="cat-card-title">{GOLDEN.label}</h2>
          <p className="cat-card-desc">{GOLDEN.description}</p>
          <div className="cat-card-count">
            {goldenCount} {goldenCount === 1 ? 'rule' : 'rules'}
          </div>
        </Link>
      </div>

      <div style={{ marginTop: 36 }}>
        <Link href="/new" className="btn">+ Add a rule</Link>
      </div>
    </>
  );
}
