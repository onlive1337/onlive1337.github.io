import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isLocalhost = (url: string) => {
  return url.includes('localhost') || url.includes('127.0.0.1');
};

export function middleware(request: NextRequest) {
  const isLocal = isLocalhost(request.url);
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isLocal) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/posts/:path*']
};