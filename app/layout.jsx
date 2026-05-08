import './globals.css';
import { auth, isAuthConfigured } from '@/auth';
import Sidebar from './Sidebar';

export const metadata = {
  title: {
    default: 'AI Builder Rules',
    template: '%s · AI Builder Rules',
  },
  description:
    'A library of rules for building AI-driven UI — Transform, Flow, Intent, Visual Elements, plus the Golden Rules.',
};

// We make the sidebar conditional on auth: if the user isn't signed in,
// pages render full-screen (e.g. the sign-in card on `/`) without the
// sidebar's protected nav showing through.

export default async function RootLayout({ children }) {
  let signedIn = !isAuthConfigured;
  if (isAuthConfigured) {
    const session = await auth().catch(() => null);
    signedIn = !!session?.user;
  }

  return (
    <html lang="en">
      <body>
        {signedIn ? (
          <div className="layout">
            <Sidebar />
            <main className="main">{children}</main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
