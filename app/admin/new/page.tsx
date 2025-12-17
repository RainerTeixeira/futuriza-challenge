'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { bannerService } from '@/services/bannerService'
import { BannerPreview } from '@/components/BannerPreview'

export default function NewBannerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [formData, setFormData] = useState({
    url: '',
    slug: '',
    start_time: '',
    end_time: '',
    active: true,
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const payload = new FormData()
      payload.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: payload,
      })

      if (!res.ok) {
        throw new Error('Upload failed')
      }

      const { publicUrl } = await res.json()
      console.log('Image uploaded:', publicUrl)
      setImageUrl(publicUrl)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('Preview imageUrl:', imageUrl)
  }, [imageUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.url) {
      alert('URL é obrigatória')
      return
    }

    setLoading(true)
    try {
      await bannerService.create({
        url: formData.url,
        slug: formData.slug || null,
        image_url: imageUrl || null,
        image_public: true,
        start_time: formData.start_time || null,
        end_time: formData.end_time || null,
        active: formData.active,
      })
      router.push('/admin')
    } catch (error) {
      alert('Erro ao criar banner')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Banner</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL *</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="https://exemplo.com/produto/123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="banner-promocional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data/Hora Início</label>
            <input
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data/Hora Fim</label>
            <input
              type="datetime-local"
              value={formData.end_time}
              onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="active" className="text-sm font-medium">Ativo</label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Criar Banner'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="border px-4 py-2 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>

        <div>
          <h2 className="text-lg font-medium mb-4">Preview</h2>
          <BannerPreview imageUrl={imageUrl} url={formData.url} />
        </div>
      </div>
    </div>
  )
}
