'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/categories';
import { BASE_PATH } from '@/lib/paths';

// A tiny chevron — rotates 90° when its row is open. Matches GitHub's tree
// disclosure style.
function Chevron({ open }) {
  return (
    <svg
      className={`tree-chevron ${open ? 'open' : ''}`}
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 1 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

// Strip the basePath off whatever Next gives us so we can match against the
// app's own paths regardless of mount point.
function appPath(pathname) {
  if (!pathname) return '/';
  if (pathname.startsWith(BASE_PATH)) return pathname.slice(BASE_PATH.length) || '/';
  return pathname;
}

export default function SidebarTree({ groups }) {
  const rawPath = usePathname();
  const path = appPath(rawPath);

  // Auto-expand the group whose URL we're inside, plus the top-level "Groups"
  // header. The user can toggle from there.
  const initialOpen = useMemo(() => {
    const open = new Set(['__groups__']);
    const m = path.match(/^\/groups\/([^/]+)/);
    if (m) open.add(m[1]);
    return open;
  }, [path]);

  const [open, setOpen] = useState(initialOpen);
  function toggle(key) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const groupsOpen = open.has('__groups__');

  return (
    <nav className="nav-section" aria-label="Groups">
      <button
        type="button"
        className="tree-row"
        onClick={() => toggle('__groups__')}
        aria-expanded={groupsOpen}
      >
        <Chevron open={groupsOpen} />
        <span className="tree-name">Groups</span>
        <span className="tree-count">{groups.length}</span>
      </button>

      {groupsOpen ? (
        <div className="tree-children">
          {groups.length === 0 ? (
            <div className="muted" style={{ padding: '6px 12px' }}>
              No groups yet.
            </div>
          ) : (
            groups.map((g) => {
              const isOpen = open.has(g.slug);
              const isActive = path === `/groups/${g.slug}` || path.startsWith(`/groups/${g.slug}/`);
              return (
                <div key={g.slug}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <button
                      type="button"
                      className="tree-row"
                      style={{ flex: 1 }}
                      onClick={() => toggle(g.slug)}
                      aria-expanded={isOpen}
                    >
                      <Chevron open={isOpen} />
                      <Link
                        href={`/groups/${g.slug}`}
                        className={`tree-name ${isActive ? 'active' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        🧰 {g.name}
                      </Link>
                    </button>
                  </div>
                  {isOpen ? (
                    <div className="tree-children">
                      {CATEGORIES.map((c) => {
                        const count = (g.rules?.[c.slug] || []).length;
                        const href = `/groups/${g.slug}/${c.slug}`;
                        const active = path === href;
                        return (
                          <Link
                            key={c.slug}
                            href={href}
                            className={`nav-link ${active ? 'active' : ''}`}
                          >
                            <span className="nav-icon">{c.icon}</span>
                            <span className="tree-name">{c.label}</span>
                            <span className="tree-count">{count}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
          <Link href="/groups/new" className="nav-link new">
            <span className="nav-icon">+</span>
            <span className="tree-name">New group</span>
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
