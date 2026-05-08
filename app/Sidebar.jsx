import Link from 'next/link';
import { CATEGORIES, GOLDEN } from '@/lib/categories';

// Server component. Active-link highlighting would require usePathname
// (client component); the page header already conveys location.
//
// Order: Groups (primary lens) → Categories → Golden Rules → Add a rule.

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="brand-mark">⚡</span>
        AI Builder Rules
      </Link>

      <nav className="nav-section">
        <Link href="/groups" className="nav-link group-link">
          <span className="nav-icon">🧰</span>
          Groups
        </Link>
      </nav>

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
