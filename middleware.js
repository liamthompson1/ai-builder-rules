import { NextResponse } from 'next/server';
import { auth } from './auth';

// Redirect unauthenticated visitors to the home URL `/` — which now
// renders the sign-in card directly (no separate /sign-in route).
//
// We don't wrap with auth(); that helper rewrites Location headers, which
// strips the basePath and clobbers our redirect targets. Read the session
// standalone and emit raw Response redirects instead.

const APP_BASE_PATH = '/ai-builder-rules';
const CANONICAL_HOST = 'www.holidayextras.com';
const PUBLIC_PATHS = ['/api/auth'];

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

  // Auth.js's default error page lives at /api/auth/error. Bounce to the
  // home URL with the error preserved so the sign-in card can show it.
  if (path === '/api/auth/error') {
    const errCode = req.nextUrl.searchParams.get('error') || 'unknown';
    return appRedirect(req, '/', `?error=${encodeURIComponent(errCode)}`);
  }

  // The root path always renders fine — page.jsx itself decides whether to
  // show the sign-in card or the authed home.
  if (path === '/') return NextResponse.next();

  const isPublic = PUBLIC_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );

  const session = await auth();

  if (!session && !isPublic) {
    const redirectTo = path + (req.nextUrl.search || '');
    const search = redirectTo
      ? `?callbackUrl=${encodeURIComponent(redirectTo)}`
      : '';
    return appRedirect(req, '/', search);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
