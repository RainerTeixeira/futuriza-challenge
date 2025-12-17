/**
 * @fileoverview TypeScript type definitions for banner entities
 * @module lib/types
 */

/**
 * Banner entity interface representing a promotional banner
 * @interface Banner
 */
export interface Banner {
  /** @description Unique identifier for the banner */
  id: string
  /** @description URL-friendly slug for the banner */
  slug: string | null
  /** @description Target URL where the banner should be displayed */
  url: string
  /** @description Public URL of the banner image */
  image_url: string | null
  /** @description Whether the image is publicly accessible */
  image_public: boolean
  /** @description ISO string of when the banner should start showing */
  start_time: string | null
  /** @description ISO string of when the banner should stop showing */
  end_time: string | null
  /** @description Whether the banner is currently active */
  active: boolean
  /** @description Number of times the banner has been viewed */
  views: number
  /** @description ISO string of when the banner was created */
  created_at: string
  /** @description ISO string of when the banner was last updated */
  updated_at: string
}

/**
 * Type for inserting new banners (excludes auto-generated fields)
 * @typedef {Omit<Banner, 'id' | 'created_at' | 'updated_at' | 'views'>} BannerInsert
 */
export type BannerInsert = Omit<Banner, 'id' | 'created_at' | 'updated_at' | 'views'>

/**
 * Type for updating existing banners (all fields optional)
 * @typedef {Partial<BannerInsert>} BannerUpdate
 */
export type BannerUpdate = Partial<BannerInsert>
