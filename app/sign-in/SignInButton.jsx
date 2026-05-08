'use client';

import { signIn } from 'next-auth/react';
import { BASE_PATH } from '@/lib/paths';

// Client-side signIn — POSTs to /api/auth/signin/google, no Server Actions
// involved. The callback URL needs the basePath baked in because next-auth/
// react isn't aware of Next.js's basePath setting.

export default function SignInButton({ callbackUrl }) {
  const dest = `${BASE_PATH}${callbackUrl && callbackUrl !== '/' ? callbackUrl : ''}` || `${BASE_PATH}/`;

  return (
    <button
      type="button"
      onClick={() => signIn('google', { callbackUrl: dest })}
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
