import Link from 'next/link';
import { CATEGORIES, GOLDEN } from '@/lib/categories';
import { listAllGroups } from '@/lib/groups';
import { BASE_PATH } from '@/lib/paths';
import SidebarTree from './SidebarTree';
import UserChip from './UserChip';

// Server component. Loads the groups list once per render so the tree can
// show counts and offer the right children. Client interactivity (expand /
// collapse, active-route highlight) lives in <SidebarTree>.

export default async function Sidebar() {
  const groups = await listAllGroups().catch(() => []);
  return (
    <aside className="sidebar">
      <Link href="/" className="brand brand-stacked">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_PATH}/holiday-extras-logo.svg`}
          alt="Holiday Extras"
          style={{ height: 56, width: 'auto', display: 'block' }}
        />
        <span className="brand-sub">AI Builder Rules</span>
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

      <nav className="nav-section" aria-label="Docs">
        <div className="nav-label">Docs</div>
        <Link href="/readme" className="nav-link">
          <span className="nav-icon">📘</span>
          <span className="tree-name">README</span>
        </Link>
        <Link href="/agents" className="nav-link">
          <span className="nav-icon">🤖</span>
          <span className="tree-name">AGENTS.md</span>
        </Link>
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <nav className="nav-section">
          <Link href="/new" className="nav-link new">
            <span className="nav-icon">+</span>
            <span className="tree-name">Add a rule</span>
          </Link>
        </nav>
        <UserChip />
      </div>
    </aside>
  );
}
