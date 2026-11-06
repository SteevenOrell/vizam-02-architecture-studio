import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { POST_SLUGS, PROJECT_SLUGS } from '@/content/slugs';

// Cache Components rejects `dynamicParams = false`, so unknown detail slugs are checked here, before any streaming
// starts (documented: "Status codes" in the loading.js docs). Unknown slugs are rewritten to a route that does not
// exist, which renders app/not-found.tsx with a real 404 status.
const KNOWN: Record<string, readonly string[]> = { projects: PROJECT_SLUGS, journal: POST_SLUGS };

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split('/');
  const known = KNOWN[section];
  if (known && slug && !known.includes(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL('/_missing', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/projects/:slug', '/journal/:slug'] };
