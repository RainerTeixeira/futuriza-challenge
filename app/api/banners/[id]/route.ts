/**
 * @fileoverview API routes for individual banner operations (GET, PATCH, DELETE)
 * @module app/api/banners/[id]/route
 */

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabaseServer'
import type { BannerUpdate } from '@/lib/types'

/**
 * Retrieves a specific banner by ID
 * @async
 * @function GET
 * @param {NextRequest} request - The incoming request object
 * @param {Object} context - The route context
 * @param {Promise<{id: string}>} context.params - Route parameters containing the banner ID
 * @returns {Promise<NextResponse>} The banner data or an error response
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { data, error } = await supabaseServer
    .from('banners')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

/**
 * Updates a specific banner by ID
 * @async
 * @function PATCH
 * @param {NextRequest} request - The incoming request object containing update data
 * @param {Object} context - The route context
 * @param {Promise<{id: string}>} context.params - Route parameters containing the banner ID
 * @returns {Promise<NextResponse>} The updated banner data or an error response
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: BannerUpdate = await request.json()

    const { data, error } = await supabaseServer
      .from('banners')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}

/**
 * Deletes a specific banner by ID
 * @async
 * @function DELETE
 * @param {NextRequest} request - The incoming request object
 * @param {Object} context - The route context
 * @param {Promise<{id: string}>} context.params - Route parameters containing the banner ID
 * @returns {Promise<NextResponse>} Success message or error response
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  console.log('DELETE request for banner:', id)
  
  const { data, error } = await supabaseServer
    .from('banners')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('Banner deleted:', data)
  revalidatePath('/admin')
  return NextResponse.json({ message: 'Banner deleted successfully', data })
}
