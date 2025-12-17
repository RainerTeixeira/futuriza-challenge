/**
 * @fileoverview API endpoint for handling file uploads to Supabase Storage
 * @module app/api/upload/route
 */

import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

/**
 * Handles file upload to Supabase Storage
 * @async
 * @function POST
 * @param {Request} request - The incoming file upload request
 * @returns {Promise<NextResponse>} Response containing the public URL or an error
 * @throws {Error} If the file is missing or invalid
 */
export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`
  console.log('Uploading file:', fileName)

  const { data, error } = await supabaseServer.storage
    .from('banners')
    .upload(fileName, file, {
      contentType: file.type,
    })

  if (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabaseServer.storage.from('banners').getPublicUrl(data.path)

  console.log('File uploaded successfully:', publicUrl)
  return NextResponse.json({ publicUrl, url: publicUrl, path: data.path }, { status: 201 })
}
