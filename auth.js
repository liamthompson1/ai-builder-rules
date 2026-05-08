// Auth.js v5 setup. Single Google provider, locked to @holidayextras.com via
// both Google's `hd` hint (so the picker filters) and a server-side signIn
// callback (so the lock is real).
//
// Until AUTH_SECRET + AUTH_GOOGLE_ID + AUTH_GOOGLE_SECRET are all set on
// Heroku, the middleware skips the gate so the app keeps working — see
// `isAuthConfigured` below and middleware.js.

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const ALLOWED_DOMAIN = 'holidayextras.com';

export const isAuthConfigured =
  !!process.env.AUTH_SECRET &&
  !!process.env.AUTH_GOOGLE_ID &&
  !!process.env.AUTH_GOOGLE_SECRET;

const providers = [];
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          // Hint to Google: hide non-holidayextras.com accounts in the picker.
          // Not enforcement — that's done in signIn() below.
          hd: ALLOWED_DOMAIN,
          prompt: 'select_account',
        },
      },
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // We sit behind Cloudflare and on .herokuapp.com both, so let Auth.js
  // figure out the canonical URL from request headers rather than baking
  // one in.
  trustHost: true,
  // Next.js basePath (/ai-builder-rules) is normally stripped before our
  // route handler runs, so Auth.js would see /api/auth/<action>. But for
  // OAuth redirect-URI generation it needs to know the *full* path so it
  // tells Google to call https://host/ai-builder-rules/api/auth/callback
  // /google. We set the full path here AND rewrite incoming requests in
  // the route handler to add the basePath back, so URL parsing matches.
  basePath: '/ai-builder-rules/api/auth',
  secret: process.env.AUTH_SECRET || 'dev-only-not-for-production',
  providers,
  // We deliberately don't set pages.signIn / pages.error: Auth.js v5 strips
  // any basePath from those paths when building redirect URLs (assuming it
  // gets re-added, which doesn't happen with our setup), producing a bare
  // `/sign-in` that lands on holidayextras.com's parent /login.html instead
  // of our app. Our middleware handles redirect-to-signin itself, with the
  // basePath baked in. Auth.js's default /api/auth/signin and
  // /api/auth/error live under our basePath naturally — and the middleware
  // bounces /api/auth/error to /sign-in?error=… so we keep our themed UI.
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email_verified) return false;
      const email = String(profile?.email || '').toLowerCase();
      return email.endsWith(`@${ALLOWED_DOMAIN}`);
    },
    async session({ session, token }) {
      // No DB. JWT-only. Pass user fields through.
      if (token?.picture && session.user) session.user.image = token.picture;
      return session;
    },
  },
  session: { strategy: 'jwt' },
});
