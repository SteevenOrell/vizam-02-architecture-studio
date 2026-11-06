import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { POST_SLUGS, PROJECT_SLUGS } from '@/content/slugs';

// Cache Components rejects `dynamicParams = false`, so unknown detail slugs are checked here, before any streaming
// starts (documented: "Status codes" in the loading.js docs). Unknown slugs are rewritten to a route that does not
// exist, which renders app/not-found.tsx with a real 404 status.
const KNOWN: Record<string, readonly string[]> = { projects: PROJECT_SLUGS, journal: POST_SLUGS };

/** Decodes a path segment; malformed percent-encoding (e.g. `%ZZ`) yields null instead of throwing (which was a 500). */
function safeDecode(segment: string): string | null {
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

/** True when the path is a detail route under a known section whose slug is not in the content. */
export function isUnknownDetailPath(pathname: string): boolean {
  const [, section, slug] = pathname.split('/');
  const known = Object.hasOwn(KNOWN, section) ? KNOWN[section] : undefined;
  if (!known || !slug) return false;
  const decoded = safeDecode(slug);
  return decoded === null || !known.includes(decoded);
}

export function proxy(request: NextRequest) {
  if (isUnknownDetailPath(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL('/_missing', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/projects/:slug', '/journal/:slug'] };
