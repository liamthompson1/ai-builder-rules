import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCategory } from '@/lib/categories';
import { getRule } from '@/lib/rules';

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const rule = await getRule(category, slug).catch(() => null);
  if (!rule) return {};
  return {
    title: rule.meta.title,
    description: rule.meta.summary || undefined,
  };
}

export default async function RulePage({ params }) {
  const { category, slug } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const rule = await getRule(category, slug).catch(() => null);
  if (!rule) notFound();

  const { meta, body } = rule;

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

      <footer className="muted" style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
        Source: <code>{meta.path}</code>
        {meta.created ? ` · added ${meta.created}` : ''}
      </footer>
    </>
  );
}
