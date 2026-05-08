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
  secret: process.env.AUTH_SECRET || 'dev-only-not-for-production',
  providers,
  // Auth.js's redirect builder only joins the request host with pages.signIn,
  // dropping any path from AUTH_URL — so we hardcode the full path here
  // (basePath included) to avoid landing on the parent site's /login.html.
  pages: {
    signIn: '/ai-builder-rules/sign-in',
    error: '/ai-builder-rules/sign-in',
  },
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
