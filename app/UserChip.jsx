import { auth, signOut, isAuthConfigured } from '@/auth';

// Renders the signed-in user's avatar/email + sign-out button at the bottom
// of the sidebar. Returns null when auth isn't configured (so the sidebar
// doesn't reserve empty space) or when there's no session.

export default async function UserChip() {
  if (!isAuthConfigured) return null;
  const session = await auth().catch(() => null);
  if (!session?.user) return null;

  const { name, email, image } = session.user;

  return (
    <div
      style={{
        marginTop: 4,
        paddingTop: 8,
        borderTop: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 12px',
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            width={24}
            height={24}
            style={{ borderRadius: '50%', flexShrink: 0 }}
          />
        ) : (
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'var(--accent-emphasis)',
              color: 'var(--fg-on-emphasis)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {(name || email || '?').charAt(0).toUpperCase()}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--fg-default)',
            }}
          >
            {name || email}
          </div>
          {name ? (
            <div
              style={{
                fontSize: 11,
                color: 'var(--fg-muted)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {email}
            </div>
          ) : null}
        </div>
      </div>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <button
          type="submit"
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
      </form>
    </div>
  );
}
