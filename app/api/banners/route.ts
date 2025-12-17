import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import type { Banner, BannerInsert } from '@/lib/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  const now = new Date().toISOString()

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

  // Incrementar views
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

export async function POST(request: NextRequest) {
  try {
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
