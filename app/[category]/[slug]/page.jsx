import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCategory } from '@/lib/categories';
import { getRule } from '@/lib/rules';
import { listGroupsContainingRule } from '@/lib/groups';
import NotFoundView from '../../NotFoundView';
import DeleteRuleButton from '../../DeleteRuleButton';

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const rule = await getRule(category, slug).catch(() => null);
  if (!rule) return { title: 'Not found', robots: { index: false } };
  return {
    title: rule.meta.title,
    description: rule.meta.summary || undefined,
  };
}

export default async function RulePage({ params }) {
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
        subtitle="It might have been renamed, or never written. Pick another from the category page, or add it yourself."
      />
    );
  }

  const { meta, body } = rule;
  const groups = await listGroupsContainingRule(category, slug).catch(() => []);

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <Link href={`/${category}`} className="muted">
          ← {cat.icon} {cat.label}
        </Link>
      </div>

      <header className="page-header">
        <div className="page-eyebrow">
          {cat.icon} {cat.label}
          {meta.golden ? (
            <>
              {' · '}
              <span style={{ color: 'var(--gold)' }}>⭐ Golden</span>
            </>
          ) : null}
        </div>
        <h1 className="page-title plain">{meta.title}</h1>
        {meta.summary ? <p className="page-subtitle">{meta.summary}</p> : null}
        {meta.tags.length ? (
          <div className="rule-tags" style={{ marginTop: 14 }}>
            {meta.tags.map((t) => (
              <span key={t} className="tag">#{t}</span>
            ))}
          </div>
        ) : null}
      </header>

      <article className="rule-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </article>

      {groups.length > 0 ? (
        <section
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: '1px solid var(--line)',
          }}
        >
          <h2
            style={{
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--fg-3)',
              fontWeight: 500,
              margin: '0 0 12px',
            }}
          >
            🧰 Used in {groups.length === 1 ? 'this group' : `these ${groups.length} groups`}
          </h2>
          <div className="rule-tags">
            {groups.map((g) => (
              <Link
                key={g.slug}
                href={`/groups/${g.slug}`}
                className="tag"
                style={{ textDecoration: 'none' }}
              >
                🧰 {g.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 40,
          paddingTop: 20,
          borderTop: '1px solid var(--line)',
        }}
      >
        <Link className="btn secondary" href={`/${category}/${slug}/edit`}>
          Edit
        </Link>
        <DeleteRuleButton
          category={category}
          slug={slug}
          title={meta.title}
        />
      </div>

      <footer className="muted" style={{ marginTop: 24 }}>
        Source: <code>{meta.path}</code>
        {meta.created ? ` · added ${meta.created}` : ''}
      </footer>
    </>
  );
}
