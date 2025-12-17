/**
 * @fileoverview Next.js middleware for authentication protection
 * @module middleware
 * @description Protects admin routes by checking for valid Supabase authentication session
 */

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware function to protect admin routes with authentication
 * @async
 * @function middleware
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} Response object or redirect to login
 * @description Checks for valid session on admin routes, redirects to login if not authenticated
 */
export async function middleware(request: NextRequest) {
  /** @type {NextResponse} Base response object */
  const res = NextResponse.next()
  /** @type {import('@supabase/auth-helpers-nextjs').SupabaseClient} Middleware Supabase client */
  const supabase = createMiddlewareClient({ req: request, res })

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return res
}

/**
 * Middleware configuration object
 * @type {Object}
 * @property {string} matcher - Path pattern to match for middleware execution
 */
export const config = {
  matcher: '/admin/:path*',
}
