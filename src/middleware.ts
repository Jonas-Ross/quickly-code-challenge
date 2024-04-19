import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('middleware.ts');
  // Check if we have an access token in the cookies. Otherwise, return an error.
  if (!request.cookies.has('accessToken')) {
    return NextResponse.rewrite(new URL('/401', request.url));
  }
}

export const config = {
  matcher: ['/profile'],
};
