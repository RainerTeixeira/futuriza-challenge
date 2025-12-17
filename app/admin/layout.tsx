'use client'

/**
 * @fileoverview Layout component for the admin dashboard
 * @module app/admin/layout
 */

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

/**
 * Admin layout component that wraps all admin pages
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The admin layout component
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  /**
   * Handles user logout
   * @async
   * @returns {Promise<void>}
   */
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Magic Banner Admin</h1>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
          >
            Sair
          </button>
        </div>
      </header>
      {children}
    </div>
  )
}
