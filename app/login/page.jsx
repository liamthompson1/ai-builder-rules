import { signIn, auth, isAuthConfigured } from '@/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sign in',
  robots: { index: false },
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl = typeof params?.callbackUrl === 'string' ? params.callbackUrl : '/';
  const error = typeof params?.error === 'string' ? params.error : null;

  // Already signed in → bounce home (the middleware does the same, but render
  // here is cheaper for the common case of arriving fresh).
  if (isAuthConfigured) {
    const session = await auth();
    if (session?.user) {
      redirect(callbackUrl || '/');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'var(--canvas-default)',
      }}
    >
      <div className="form-card" style={{ maxWidth: 380, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            className="brand-mark"
            style={{
              width: 44,
              height: 44,
              fontSize: 20,
              margin: '0 auto 14px',
              borderRadius: 10,
            }}
          >
            ⚡
          </div>
          <h1 style={{ fontSize: 22, margin: 0, fontWeight: 600, letterSpacing: '-0.01em' }}>
            AI Builder Rules
          </h1>
          <p style={{ color: 'var(--fg-muted)', fontSize: 14, marginTop: 6, marginBottom: 0 }}>
            Sign in with your Holiday Extras Google account.
          </p>
        </div>

        {error ? (
          <div className="alert error" style={{ marginBottom: 16 }}>
            {error === 'AccessDenied'
              ? 'Only @holidayextras.com Google accounts can sign in.'
              : 'Sign-in failed. Try again?'}
          </div>
        ) : null}

        {!isAuthConfigured ? (
          <div className="alert" style={{ borderColor: 'var(--border-default)', color: 'var(--fg-muted)', marginBottom: 16 }}>
            OAuth isn't configured yet. The operator needs to set{' '}
            <code>AUTH_SECRET</code>, <code>AUTH_GOOGLE_ID</code>, and{' '}
            <code>AUTH_GOOGLE_SECRET</code> on Heroku.
          </div>
        ) : (
          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: callbackUrl || '/' });
            }}
          >
            <button
              type="submit"
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
          </form>
        )}

        <p
          style={{
            textAlign: 'center',
            color: 'var(--fg-subtle)',
            fontSize: 12,
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          Only <code>@holidayextras.com</code> accounts allowed.
        </p>
      </div>
    </div>
  );
}
