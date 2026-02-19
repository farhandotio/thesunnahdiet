import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const secretKey = process.env.ADMIN_SECRET_KEY;

    if (!adminToken || adminToken !== secretKey) {
      if (path !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    if (adminToken === secretKey && path === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/products', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
