import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Proteção básica para /admin em desenvolvimento
  // Em produção, use Supabase Auth
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminToken = process.env.ADMIN_TOKEN
    
    if (adminToken) {
      const token = request.cookies.get('admin_token')?.value
      
      if (token !== adminToken) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
