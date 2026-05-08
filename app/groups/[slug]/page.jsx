import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CATEGORIES } from '@/lib/categories';
import { getGroup } from '@/lib/groups';
import { listAllRules } from '@/lib/rules';
import NotFoundView from '../../NotFoundView';
import DeleteGroupButton from '../../DeleteGroupButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = await getGroup(slug).catch(() => null);
  if (!g) return { title: 'Group not found', robots: { index: false } };
  return { title: g.name, description: g.description || undefined };
}

export default async function GroupPage({ params }) {
  const { slug } = await params;
  const g = await getGroup(slug).catch(() => null);
  if (!g) {
    return (
      <NotFoundView
        title={`No group called "${slug}".`}
        subtitle="It might have been renamed or deleted."
      />
    );
  }

  // Pull every rule once and look up by `${category}:${slug}` so we can
  // render member rules with their proper title/summary/golden flag.
  const allRules = await listAllRules().catch(() => []);
  const ruleByKey = new Map(allRules.map((r) => [`${r.category}:${r.slug}`, r]));

  const totalRules = CATEGORIES.reduce(
    (acc, c) => acc + (g.rules[c.slug]?.length || 0),
    0
  );

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <Link href="/groups" className="muted">
          ← 🧰 Groups
        </Link>
      </div>

      <header className="page-header">
        <div className="page-eyebrow">🧰 Group</div>
        <h1 className="page-title plain">{g.name}</h1>
        {g.description ? <p className="page-subtitle">{g.description}</p> : null}
      </header>

      {g.when && g.when.trim() ? (
        <div
          style={{
            background: 'var(--canvas-subtle)',
            border: '1px solid var(--border-default)',
            borderLeft: '3px solid var(--accent-emphasis)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            margin: '0 0 24px',
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--fg-muted)',
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            When to apply
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--fg-default)', whiteSpace: 'pre-wrap' }}>
            {g.when}
          </p>
        </div>
      ) : null}

      {g.body && g.body.trim() ? (
        <article className="rule-body" style={{ marginTop: 16 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{g.body}</ReactMarkdown>
        </article>
      ) : null}

      <section style={{ marginTop: 32 }}>
        {totalRules === 0 ? (
          <div className="empty">
            No rules assigned to this group yet.{' '}
            <Link href={`/groups/${slug}/edit`} className="text-link">
              Edit to add some →
            </Link>
          </div>
        ) : (
          CATEGORIES.map((cat) => {
            const slugs = g.rules[cat.slug] || [];
            if (slugs.length === 0) return null;
            return (
              <div key={cat.slug} style={{ marginBottom: 28 }}>
                <h2
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    margin: '0 0 10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {cat.icon} {cat.label}{' '}
                  <span className="muted" style={{ fontSize: 13, fontWeight: 400 }}>
                    · {slugs.length}
                  </span>
                </h2>
                <div className="rule-list">
                  {slugs.map((s) => {
                    const r = ruleByKey.get(`${cat.slug}:${s}`);
                    if (!r) {
                      return (
                        <div
                          key={s}
                          className="rule-row"
                          style={{ opacity: 0.7, borderColor: 'rgba(248,113,113,0.3)' }}
                        >
                          <span className="gold-mark" title="Rule no longer exists">⚠️</span>
                          <div className="rule-meta">
                            <h3 className="rule-title">Missing: {s}</h3>
                            <p className="rule-summary">
                              This rule was deleted or moved. Edit the group to remove the broken reference.
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={s}
                        href={`/${cat.slug}/${s}`}
                        className="rule-row"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {r.golden ? (
                          <span className="gold-mark" title="Golden rule">⭐</span>
                        ) : null}
                        <div className="rule-meta">
                          <h3 className="rule-title">{r.title}</h3>
                          {r.summary ? (
                            <p className="rule-summary">{r.summary}</p>
                          ) : null}
                          {r.tags?.length ? (
                            <div className="rule-tags">
                              {r.tags.slice(0, 4).map((t) => (
                                <span key={t} className="tag">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </section>

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
        <Link className="btn secondary" href={`/groups/${slug}/edit`}>
          Edit
        </Link>
        <DeleteGroupButton slug={slug} name={g.name} />
      </div>

      <footer className="muted" style={{ marginTop: 24 }}>
        Source: <code>{g.path}</code>
        {g.created ? ` · added ${g.created}` : ''}
      </footer>
    </>
  );
}
