'use client'

/**
 * @fileoverview Banner list component for the admin dashboard
 * @module app/admin/BannerList
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Banner } from '@/lib/types'
import { bannerService } from '@/services/bannerService'

/**
 * Displays a list of banners with options to toggle active status and delete
 * @component
 * @param {Object} props - Component props
 * @param {Banner[]} props.banners - Array of banner objects to display
 * @returns {JSX.Element} The rendered banner list component
 */
export function BannerList({ banners: initialBanners }: { banners: Banner[] }) {
  const [banners, setBanners] = useState(initialBanners)
  const router = useRouter()

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await bannerService.update(id, { active: !currentActive })
      setBanners(banners.map(b => b.id === id ? { ...b, active: !currentActive } : b))
    } catch (error) {
      alert('Erro ao atualizar banner')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este banner?')) return
    try {
      console.log('Deletando banner:', id)
      await bannerService.delete(id)
      setBanners(banners.filter(b => b.id !== id))
      router.refresh()
      alert('Banner excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir banner:', error)
      alert(`Erro ao excluir banner: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  if (banners.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhum banner cadastrado
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {banners.map((banner) => (
        <div key={banner.id} className="border rounded-lg p-4 flex gap-4">
          {banner.image_url && (
            <img src={banner.image_url} alt="Banner" className="w-32 h-20 object-cover rounded" />
          )}
          <div className="flex-1">
            <div className="font-medium">{banner.url}</div>
            {banner.slug && <div className="text-sm text-muted-foreground">Slug: {banner.slug}</div>}
            <div className="text-sm text-muted-foreground">Views: {banner.views}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {banner.start_time && `Início: ${new Date(banner.start_time).toLocaleString()}`}
              {banner.end_time && ` | Fim: ${new Date(banner.end_time).toLocaleString()}`}
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <button
              onClick={() => handleToggleActive(banner.id, banner.active)}
              className={`px-3 py-1 rounded text-sm ${
                banner.active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {banner.active ? 'Ativo' : 'Inativo'}
            </button>
            <button
              onClick={() => handleDelete(banner.id)}
              className="px-3 py-1 rounded text-sm bg-red-100 text-red-700 hover:bg-red-200"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
