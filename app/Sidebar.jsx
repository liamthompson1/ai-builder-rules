import Link from 'next/link';
import { CATEGORIES, GOLDEN } from '@/lib/categories';
import { listAllGroups } from '@/lib/groups';
import SidebarTree from './SidebarTree';

// Server component. Loads the groups list once per render so the tree can
// show counts and offer the right children. Client interactivity (expand /
// collapse, active-route highlight) lives in <SidebarTree>.

export default async function Sidebar() {
  const groups = await listAllGroups().catch(() => []);
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="brand-mark">⚡</span>
        AI Builder Rules
      </Link>

      <SidebarTree groups={groups} />

      <nav className="nav-section" aria-label="All categories">
        <div className="nav-label">All categories</div>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="nav-link">
            <span className="nav-icon">{c.icon}</span>
            <span className="tree-name">{c.label}</span>
          </Link>
        ))}
      </nav>

      <nav className="nav-section">
        <Link href="/golden" className="nav-link golden">
          <span className="nav-icon">{GOLDEN.icon}</span>
          <span className="tree-name">{GOLDEN.label}</span>
        </Link>
      </nav>

      <nav className="nav-section" style={{ marginTop: 'auto' }}>
        <Link href="/new" className="nav-link new">
          <span className="nav-icon">+</span>
          <span className="tree-name">Add a rule</span>
        </Link>
      </nav>
    </aside>
  );
}
