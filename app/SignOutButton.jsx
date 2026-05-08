'use client';

import { signOut } from 'next-auth/react';
import { BASE_PATH } from '@/lib/paths';

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: `${BASE_PATH}/sign-in` })}
      className="nav-link"
      style={{
        width: '100%',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        color: 'var(--fg-muted)',
        fontSize: 13,
      }}
    >
      <span className="nav-icon">↪</span>
      <span className="tree-name">Sign out</span>
    </button>
  );
}
