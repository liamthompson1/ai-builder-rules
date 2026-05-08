'use client';

import { BASE_PATH } from '@/lib/paths';

// We deliberately don't use `next-auth/react`'s signIn helper — it isn't
// basePath-aware and posts to /api/auth/signin/google, which Cloudflare
// doesn't route to this app (only /ai-builder-rules/* lives here). The
// parent holidayextras.com site catches the request and bounces to its
// legacy /api/auth/error.html. Instead we build the form ourselves with
// the basePath baked in.

export default function SignInButton({ callbackUrl }) {
  const dest =
    callbackUrl && callbackUrl.startsWith('/')
      ? `${BASE_PATH}${callbackUrl}`
      : `${BASE_PATH}/`;

  async function handleSignIn() {
    try {
      // Auth.js's CSRF endpoint sets the csrf cookie and returns the matching
      // token. Both endpoints live under our basePath.
      const csrfRes = await fetch(`${BASE_PATH}/api/auth/csrf`, {
        credentials: 'same-origin',
      });
      if (!csrfRes.ok) throw new Error(`CSRF fetch failed: ${csrfRes.status}`);
      const { csrfToken } = await csrfRes.json();

      // Submit a normal HTML form so the browser follows the OAuth redirect
      // chain naturally (302 to Google, then back to our callback).
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `${BASE_PATH}/api/auth/signin/google`;
      form.style.display = 'none';

      for (const [name, value] of Object.entries({
        csrfToken,
        callbackUrl: dest,
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
      console.error('Sign-in failed:', e);
      alert('Sign-in failed. Please try again.');
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="btn"
      style={{ width: '100%', padding: '8px 16px' }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        style={{ marginRight: 4 }}
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M21.35 11.1H12v3.45h5.45c-.25 1.6-1.95 4.7-5.45 4.7-3.3 0-6-2.75-6-6.1s2.7-6.1 6-6.1c1.85 0 3.1.8 3.85 1.5l2.6-2.5C16.7 4.6 14.6 3.5 12 3.5c-4.8 0-8.7 3.9-8.7 8.7s3.9 8.7 8.7 8.7c5 0 8.3-3.5 8.3-8.5 0-.55-.05-1.05-.1-1.3z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
