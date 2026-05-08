import { NextResponse } from 'next/server';
import { auth } from './auth';

// We deliberately *don't* wrap this middleware with `auth(...)` (the helper
// Auth.js exports) because that wrapper rewrites the Location header on
// every response — using AUTH_URL's host and dropping its basePath. Instead
// we call `auth()` standalone to read the JWT session, and emit redirect
// responses ourselves with the basePath baked into the path explicitly.

const APP_BASE_PATH = '/ai-builder-rules';
const CANONICAL_HOST = 'www.holidayextras.com';
const PUBLIC_PATHS = ['/sign-in', '/api/auth'];

// When testing directly on the herokuapp.com hostname, redirect to that
// same host so the dev workflow doesn't bounce to www. But: Heroku's router
// rewrites Host to *.herokuapp.com even for requests forwarded via
// Cloudflare. We detect "came via Cloudflare" by the cf-ray header — it's
// only present when CF is in the chain. No cf-ray + heroku host = direct
// curl/dev hit; cf-ray = real user, use the canonical host so they don't
// land on the herokuapp domain.
function pickHost(req) {
  const host = req.headers.get('host') || '';
  const viaCloudflare = !!req.headers.get('cf-ray');
  if (host.endsWith('.herokuapp.com') && !viaCloudflare) return host;
  return CANONICAL_HOST;
}

function appRedirect(req, path, search = '') {
  const target = `https://${pickHost(req)}${APP_BASE_PATH}${path}${search}`;
  return new Response(null, { status: 307, headers: { Location: target } });
}

export default async function middleware(req) {
  // Until OAuth is wired up, skip the gate so the app stays usable.
  if (
    !process.env.AUTH_SECRET ||
    !process.env.AUTH_GOOGLE_ID ||
    !process.env.AUTH_GOOGLE_SECRET
  ) {
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname;

  // Auth.js's default error page is at /api/auth/error. Bounce to our themed
  // sign-in card with the error preserved so the user gets context (e.g.
  // "AccessDenied" for a non-@holidayextras.com email).
  if (path === '/api/auth/error') {
    const errCode = req.nextUrl.searchParams.get('error') || 'unknown';
    return appRedirect(req, '/sign-in', `?error=${encodeURIComponent(errCode)}`);
  }

  const isPublic = PUBLIC_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );

  const session = await auth();

  if (!session && !isPublic) {
    const redirectTo = path + (req.nextUrl.search || '');
    const search =
      redirectTo && redirectTo !== '/' && redirectTo !== '/sign-in'
        ? `?callbackUrl=${encodeURIComponent(redirectTo)}`
        : '';
    return appRedirect(req, '/sign-in', search);
  }

  // Already signed in? Don't show the sign-in page.
  if (session && path === '/sign-in') {
    return appRedirect(req, '/');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
