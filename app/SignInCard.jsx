import { BASE_PATH } from '@/lib/paths';
import SignInButton from './SignInButton';

// Full-screen centered sign-in card. Stripped to brand mark + title +
// button, with an inline error if Auth.js redirected here from
// /api/auth/error (e.g. an @gmail.com user hitting the gate).

export default function SignInCard({ callbackUrl, error }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'var(--canvas-default)',
      }}
    >
      <div
        className="form-card"
        style={{
          maxWidth: 360,
          width: '100%',
          textAlign: 'center',
          padding: '32px 28px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_PATH}/holiday-extras-logo.svg`}
          alt="Holiday Extras"
          style={{
            height: 40,
            width: 'auto',
            display: 'block',
            margin: '0 auto 12px',
          }}
        />
        <h1
          style={{
            fontSize: 16,
            margin: '0 0 24px',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            color: 'var(--fg-muted)',
          }}
        >
          AI Builder Rules
        </h1>

        {error ? (
          <div
            className="alert error"
            style={{ marginBottom: 14, fontSize: 13, textAlign: 'left' }}
          >
            {error === 'AccessDenied'
              ? '@holidayextras.com accounts only.'
              : 'Sign-in failed. Try again?'}
          </div>
        ) : null}

        <SignInButton callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
