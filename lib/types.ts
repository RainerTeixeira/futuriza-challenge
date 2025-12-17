export interface Banner {
  id: string
  slug: string | null
  url: string
  image_url: string | null
  image_public: boolean
  start_time: string | null
  end_time: string | null
  active: boolean
  views: number
  created_at: string
  updated_at: string
}

export type BannerInsert = Omit<Banner, 'id' | 'created_at' | 'updated_at' | 'views'>
export type BannerUpdate = Partial<BannerInsert>
