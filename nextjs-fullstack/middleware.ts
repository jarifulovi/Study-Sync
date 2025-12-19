import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// every page under (app)/ is protected only auth user can access these
// auth is for everyone  
// app/page.tsx is open front page for everyone

const protectedPaths = [
  '/dashboard',
  '/profile', 
  '/groups',
  '/chat',
  '/files'
]

// Paths that should redirect authenticated users
const authPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password'
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session

  const { pathname } = req.nextUrl

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/groups', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}