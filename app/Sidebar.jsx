import Link from 'next/link';
import { CATEGORIES, GOLDEN } from '@/lib/categories';

// Server component. We don't highlight the active link here (would need
// usePathname which forces client component) — the page header is enough
// to tell the user where they are.

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="brand-mark">⚡</span>
        AI Builder Rules
      </Link>

      <nav className="nav-section">
        <div className="nav-label">Categories</div>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="nav-link">
            <span className="nav-icon">{c.icon}</span>
            {c.label}
          </Link>
        ))}
      </nav>

      <nav className="nav-section">
        <Link href="/golden" className="nav-link golden">
          <span className="nav-icon">{GOLDEN.icon}</span>
          {GOLDEN.label}
        </Link>
      </nav>

      <nav className="nav-section">
        <Link href="/new" className="nav-link new">
          <span className="nav-icon">+</span>
          Add a rule
        </Link>
      </nav>
    </aside>
  );
}
