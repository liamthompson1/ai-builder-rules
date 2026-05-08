import Link from 'next/link';
import { auth, isAuthConfigured } from '@/auth';
import { CATEGORIES, GOLDEN } from '@/lib/categories';
import { listAllRules } from '@/lib/rules';
import SignInCard from './SignInCard';

// Render on every request so a freshly-added rule doesn't sit behind
// Cloudflare's 60s s-maxage. The GitHub fetch inside still caches for 60s
// via tag-based revalidation, so this doesn't hammer the API.
export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }) {
  const params = (await searchParams) || {};

  // When auth is wired up and the visitor isn't signed in, the home URL
  // *is* the sign-in screen — no separate /sign-in route.
  if (isAuthConfigured) {
    const session = await auth().catch(() => null);
    if (!session?.user) {
      const callbackUrl =
        typeof params.callbackUrl === 'string' ? params.callbackUrl : '/';
      const error =
        typeof params.error === 'string' ? params.error : null;
      return <SignInCard callbackUrl={callbackUrl} error={error} />;
    }
  }

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
