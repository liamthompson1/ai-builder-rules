import Link from 'next/link';

// Plain component (not Next's special `not-found.jsx`). We render this
// directly from inside route pages when data is missing — calling
// `notFound()` triggers Next's `__next_error__` rendering, which strips
// the root layout's stylesheet link and produces a flash of white before
// hydration. Rendering inline keeps the response inside our layout.

export default function NotFoundView({
  title = 'No rule here.',
  subtitle = "The page or rule you're after doesn't exist (yet). Try one of the categories in the sidebar, or contribute the rule yourself.",
}) {
  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">404</div>
        <h1 className="page-title plain">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </header>
      <div style={{ display: 'flex', gap: 10 }}>
        <Link href="/" className="btn">← Home</Link>
        <Link href="/new" className="btn secondary">+ Add a rule</Link>
      </div>
    </>
  );
}
