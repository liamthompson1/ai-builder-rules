import { auth } from './auth';
import { NextResponse } from 'next/server';

// Public paths the middleware lets through unauthenticated.
const PUBLIC_PATHS = ['/login', '/api/auth'];

export default auth((req) => {
  // Until the operator has wired up AUTH_SECRET + Google OAuth credentials,
  // skip the gate entirely so the app remains usable. The moment all three
  // env vars are set on Heroku, the gate flips on automatically.
  if (
    !process.env.AUTH_SECRET ||
    !process.env.AUTH_GOOGLE_ID ||
    !process.env.AUTH_GOOGLE_SECRET
  ) {
    return;
  }

  const { nextUrl, auth: session } = req;
  const path = nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );

  if (!session && !isPublic) {
    // Redirect to /login (basePath-aware via nextUrl.basePath) and remember
    // the target so we can bounce back after sign-in.
    const basePath = nextUrl.basePath || '';
    const loginUrl = new URL(`${basePath}/login`, nextUrl.origin);
    const redirectTo = path + (nextUrl.search || '');
    if (redirectTo && redirectTo !== '/' && redirectTo !== '/login') {
      loginUrl.searchParams.set('callbackUrl', redirectTo);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Already signed in? Don't show the login page.
  if (session && path === '/login') {
    const basePath = nextUrl.basePath || '';
    return NextResponse.redirect(new URL(`${basePath}/`, nextUrl.origin));
  }
});

export const config = {
  // Skip Next.js internals and static-file requests so we don't run auth on
  // every CSS/JS/image fetch.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
