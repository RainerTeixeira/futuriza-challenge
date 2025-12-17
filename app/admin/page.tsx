import { supabaseServer } from '@/lib/supabaseServer'
import Link from 'next/link'
import { BannerList } from './BannerList'

export default async function AdminPage() {
  const { data: banners } = await supabaseServer
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel de Banners</h1>
        <Link
          href="/admin/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Criar Banner
        </Link>
      </div>
      <BannerList banners={banners || []} />
    </div>
  )
}
