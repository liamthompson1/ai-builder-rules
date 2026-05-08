import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">404</div>
        <h1 className="page-title plain">No rule here.</h1>
        <p className="page-subtitle">
          The page or rule you're after doesn't exist (yet). Try one of the
          categories in the sidebar, or contribute the rule yourself.
        </p>
      </header>
      <div style={{ display: 'flex', gap: 10 }}>
        <Link href="/" className="btn">← Home</Link>
        <Link href="/new" className="btn secondary">+ Add a rule</Link>
      </div>
    </>
  );
}
