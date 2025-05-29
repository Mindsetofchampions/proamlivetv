import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/admin',
    '/creator/dashboard',
    '/account',
    '/viewer/dashboard'
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if trying to access admin routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isProtectedRoute && !session) {
    // Redirect to login if not authenticated
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminRoute && session) {
    // Get user roles
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!userData) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role:roles(name)')
      .eq('user_id', userData.id)
      .single();

    // Redirect non-admin users
    if (!roleData?.role?.name || roleData.role.name !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If accessing /admin directly, redirect to dashboard
    if (request.nextUrl.pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/creator/:path*',
    '/account/:path*',
    '/viewer/:path*'
  ]
};