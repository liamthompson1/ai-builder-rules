import Link from 'next/link';
import { getCategory } from '@/lib/categories';

// Single-rule list row. Used on category pages, the home page, and the
// Golden Rules aggregator. Shows category context only when the surrounding
// page mixes categories (i.e. golden + home).

export default function RuleRow({ rule, showCategory = false }) {
  const cat = getCategory(rule.category);
  return (
    <Link
      href={`/${rule.category}/${rule.slug}`}
      className="rule-row"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {rule.golden ? <span className="gold-mark" title="Golden rule">⭐</span> : null}
      <div className="rule-meta">
        <h3 className="rule-title">{rule.title}</h3>
        {rule.summary ? <p className="rule-summary">{rule.summary}</p> : null}
        <div className="rule-tags">
          {showCategory && cat ? (
            <span className="tag">{cat.icon} {cat.label}</span>
          ) : null}
          {rule.tags.slice(0, 5).map((t) => (
            <span key={t} className="tag">#{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
