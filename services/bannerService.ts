/**
 * @fileoverview Banner service for client-side API interactions
 * @module services/bannerService
 */

import type { Banner, BannerInsert, BannerUpdate } from '@/lib/types'

/**
 * Banner service object containing all banner-related API operations
 * @namespace bannerService
 */
export const bannerService = {
  /**
   * Retrieves a banner by target URL
   * @async
   * @function getByUrl
   * @param {string} url - The target URL to search for
   * @returns {Promise<Banner | null>} The banner if found, null otherwise
   */
  async getByUrl(url: string): Promise<Banner | null> {
    const res = await fetch(`/api/banners?url=${encodeURIComponent(url)}`)
    if (!res.ok) return null
    return res.json()
  },

  /**
   * Retrieves a banner by its unique ID
   * @async
   * @function getById
   * @param {string} id - The unique banner ID
   * @returns {Promise<Banner | null>} The banner if found, null otherwise
   */
  async getById(id: string): Promise<Banner | null> {
    const res = await fetch(`/api/banners/${id}`)
    if (!res.ok) return null
    return res.json()
  },

  /**
   * Creates a new banner
   * @async
   * @function create
   * @param {BannerInsert} data - Banner data for creation
   * @returns {Promise<Banner>} The created banner
   * @throws {Error} When banner creation fails
   */
  async create(data: BannerInsert): Promise<Banner> {
    const res = await fetch('/api/banners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create banner')
    return res.json()
  },

  /**
   * Updates an existing banner
   * @async
   * @function update
   * @param {string} id - The banner ID to update
   * @param {BannerUpdate} data - Partial banner data for update
   * @returns {Promise<Banner>} The updated banner
   * @throws {Error} When banner update fails
   */
  async update(id: string, data: BannerUpdate): Promise<Banner> {
    const res = await fetch(`/api/banners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update banner')
    return res.json()
  },

  /**
   * Permanently deletes a banner
   * @async
   * @function delete
   * @param {string} id - The banner ID to delete
   * @returns {Promise<void>}
   * @throws {Error} When banner deletion fails
   */
  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete banner')
  },

  /**
   * Deactivates a banner (sets active to false)
   * @async
   * @function deactivate
   * @param {string} id - The banner ID to deactivate
   * @returns {Promise<void>}
   * @throws {Error} When banner deactivation fails
   */
  async deactivate(id: string): Promise<void> {
    const res = await fetch(`/api/banners?id=${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to deactivate banner')
  },
}
