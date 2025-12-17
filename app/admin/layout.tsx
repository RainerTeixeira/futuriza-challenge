'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

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
