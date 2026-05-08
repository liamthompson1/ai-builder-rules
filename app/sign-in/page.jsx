import { auth, isAuthConfigured } from '@/auth';
import { redirect } from 'next/navigation';
import SignInButton from './SignInButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sign in',
  robots: { index: false },
};

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl = typeof params?.callbackUrl === 'string' ? params.callbackUrl : '/';
  const error = typeof params?.error === 'string' ? params.error : null;

  if (isAuthConfigured) {
    const session = await auth().catch(() => null);
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
          <div
            className="alert"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--fg-muted)',
              marginBottom: 16,
            }}
          >
            OAuth isn't configured yet.
          </div>
        ) : (
          <SignInButton callbackUrl={callbackUrl} />
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
