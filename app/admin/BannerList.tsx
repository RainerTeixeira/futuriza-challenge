'use client'

import { useState } from 'react'
import type { Banner } from '@/lib/types'
import { bannerService } from '@/services/bannerService'

export function BannerList({ banners: initialBanners }: { banners: Banner[] }) {
  const [banners, setBanners] = useState(initialBanners)

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
      await bannerService.delete(id)
      setBanners(banners.filter(b => b.id !== id))
    } catch (error) {
      alert('Erro ao excluir banner')
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
