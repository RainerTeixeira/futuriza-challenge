/**
 * @fileoverview API routes for banner operations (GET, POST, DELETE)
 * @module app/api/banners/route
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import type { Banner, BannerInsert } from '@/lib/types'

/**
 * Retrieves an active banner for a specific URL with time-based filtering
 * @async
 * @function GET
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with banner data or error
 * @description Finds active banners matching the URL parameter, respects start/end times, and increments view count
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  /** @type {string} Current timestamp in ISO format for time-based filtering */
  const now = new Date().toISOString()

  /** @type {string[]} Array of URL variations to match (handles file:// protocol case sensitivity) */
  const urlsToMatch = [url]
  const fileDriveMatch = url.match(/^file:\/\/\/([a-zA-Z]):\//)
  if (fileDriveMatch) {
    const drive = fileDriveMatch[1]
    const upper = url.replace(/^file:\/\/\/[a-zA-Z]:\//, `file:///${drive.toUpperCase()}:/`)
    const lower = url.replace(/^file:\/\/\/[a-zA-Z]:\//, `file:///${drive.toLowerCase()}:/`)
    if (!urlsToMatch.includes(upper)) urlsToMatch.push(upper)
    if (!urlsToMatch.includes(lower)) urlsToMatch.push(lower)
  }

  const { data, error } = await supabaseServer
    .from('banners')
    .select('*')
    .in('url', urlsToMatch)
    .eq('active', true)
    .or(`start_time.is.null,start_time.lte.${now}`)
    .or(`end_time.is.null,end_time.gte.${now}`)
    .limit(1)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  /** @type {number} Incremented view count */
  const nextViews = (data.views || 0) + 1

  const { data: updated, error: updateError } = await supabaseServer
    .from('banners')
    .update({ views: nextViews })
    .eq('id', data.id)
    .select('*')
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json(updated)
}

/**
 * Creates a new banner
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request object with banner data
 * @returns {Promise<NextResponse>} JSON response with created banner or error
 * @description Validates required fields and inserts new banner into database
 */
export async function POST(request: NextRequest) {
  try {
    /** @type {BannerInsert} Banner data from request body */
    const body: BannerInsert = await request.json()

    if (!body.url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const { data, error } = await supabaseServer
      .from('banners')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}

/**
 * Deactivates a banner by setting active to false
 * @async
 * @function DELETE
 * @param {NextRequest} request - The incoming request object with banner ID
 * @returns {Promise<NextResponse>} JSON response with success message or error
 * @description Soft deletes banner by setting active flag to false instead of permanent deletion
 */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  const { error } = await supabaseServer
    .from('banners')
    .update({ active: false })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Banner deactivated successfully' })
}
