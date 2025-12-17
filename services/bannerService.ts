import type { Banner, BannerInsert, BannerUpdate } from '@/lib/types'

export const bannerService = {
  async getByUrl(url: string): Promise<Banner | null> {
    const res = await fetch(`/api/banners?url=${encodeURIComponent(url)}`)
    if (!res.ok) return null
    return res.json()
  },

  async getById(id: string): Promise<Banner | null> {
    const res = await fetch(`/api/banners/${id}`)
    if (!res.ok) return null
    return res.json()
  },

  async create(data: BannerInsert): Promise<Banner> {
    const res = await fetch('/api/banners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create banner')
    return res.json()
  },

  async update(id: string, data: BannerUpdate): Promise<Banner> {
    const res = await fetch(`/api/banners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update banner')
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete banner')
  },

  async deactivate(id: string): Promise<void> {
    const res = await fetch(`/api/banners?id=${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to deactivate banner')
  },
}
