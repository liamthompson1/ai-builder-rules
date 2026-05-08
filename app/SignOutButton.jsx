'use client';

import { BASE_PATH } from '@/lib/paths';

// Like SignInButton: we hand-roll the form POST so the URL includes the
// /ai-builder-rules basePath. next-auth/react's signOut posts to plain
// /api/auth/signout which on holidayextras.com isn't routed to this app.

export default function SignOutButton() {
  async function handleSignOut() {
    try {
      const csrfRes = await fetch(`${BASE_PATH}/api/auth/csrf`, {
        credentials: 'same-origin',
      });
      if (!csrfRes.ok) throw new Error(`CSRF fetch failed: ${csrfRes.status}`);
      const { csrfToken } = await csrfRes.json();

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `${BASE_PATH}/api/auth/signout`;
      form.style.display = 'none';

      for (const [name, value] of Object.entries({
        csrfToken,
        callbackUrl: `${BASE_PATH}/`,
      })) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Sign-out failed:', e);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
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
