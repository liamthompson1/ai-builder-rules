import { NextRequest } from 'next/server';
import { handlers } from '@/auth';

// Force Node runtime — Auth.js v5 uses Buffer/crypto.
export const runtime = 'nodejs';

// Auth.js's basePath is configured as `/ai-builder-rules/api/auth` so that
// OAuth redirect URIs include the Next.js basePath. But Next.js strips its
// basePath from req.url before the handler runs, so Auth.js would see
// /api/auth/<action> and fail to match its prefix. Re-add the basePath
// here, then call Auth.js's handler.
//
// We use NextRequest (not plain Request) because Auth.js expects req.nextUrl
// to exist; constructing a fresh Request would strip that.

const BASE_PATH = '/ai-builder-rules';

function withBasePath(req) {
  const url = new URL(req.url);
  if (url.pathname.startsWith(BASE_PATH)) return req;
  url.pathname = BASE_PATH + url.pathname;
  return new NextRequest(url, req);
}

export async function GET(req) {
  return handlers.GET(withBasePath(req));
}

export async function POST(req) {
  return handlers.POST(withBasePath(req));
}
