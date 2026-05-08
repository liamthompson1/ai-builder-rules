import Link from 'next/link';
import { listAllGroups } from '@/lib/groups';
import { CATEGORIES } from '@/lib/categories';

export const metadata = {
  title: 'Groups',
  description: 'Curated bundles of rules to apply together.',
};

export default async function GroupsPage() {
  const groups = await listAllGroups().catch(() => []);

  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">🧰 Bundles</div>
        <h1 className="page-title plain">Groups</h1>
        <p className="page-subtitle">
          Curated bundles of rules. A group can pull any number of rules from
          any of the four categories — pick the ones that travel together.
        </p>
      </header>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Link href="/groups/new" className="btn">+ New group</Link>
      </div>

      {groups.length === 0 ? (
        <div className="empty">
          No groups yet —{' '}
          <Link href="/groups/new" className="text-link">
            create the first one →
          </Link>
        </div>
      ) : (
        <div className="rule-list">
          {groups.map((g) => {
            const total = CATEGORIES.reduce(
              (acc, c) => acc + (g.rules[c.slug]?.length || 0),
              0
            );
            return (
              <Link
                key={g.slug}
                href={`/groups/${g.slug}`}
                className="rule-row"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="gold-mark">🧰</span>
                <div className="rule-meta">
                  <h3 className="rule-title">{g.name}</h3>
                  {g.description ? (
                    <p className="rule-summary">{g.description}</p>
                  ) : null}
                  <div className="rule-tags">
                    {CATEGORIES.map((c) => {
                      const n = g.rules[c.slug]?.length || 0;
                      return n > 0 ? (
                        <span key={c.slug} className="tag">
                          {c.icon} {c.label} · {n}
                        </span>
                      ) : null;
                    })}
                    {total === 0 ? (
                      <span className="tag">empty</span>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
