/**
 * @fileoverview Admin dashboard page for managing banners
 * @module app/admin/page
 */

import { supabaseServer } from '@/lib/supabaseServer'
import Link from 'next/link'
import { BannerList } from './BannerList'

// Force dynamic rendering and disable cache for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Admin dashboard page component
 * @async
 * @function AdminPage
 * @returns {Promise<JSX.Element>} The admin dashboard page
 */
export default async function AdminPage() {
  console.log('Iniciando carregamento dos banners...')
  
  // Primeiro, vamos contar quantos banners existem no total
  const { count: totalBanners } = await supabaseServer
    .from('banners')
    .select('*', { count: 'exact', head: true })
    
  console.log(`Total de banners no banco de dados: ${totalBanners || 0}`)
  
  // Agora buscamos todos os banners
  const { data: banners, error } = await supabaseServer
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao carregar banners:', error)
    console.error('Detalhes do erro:', JSON.stringify(error, null, 2))
  } else {
    console.log(`Banners carregados: ${banners?.length || 0}`)
    console.log('Lista de banners carregados:', 
      banners?.map(b => ({
        id: b.id,
        slug: b.slug,
        url: b.url,
        active: b.active,
        created_at: b.created_at
      })) || []
    )
  }

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
