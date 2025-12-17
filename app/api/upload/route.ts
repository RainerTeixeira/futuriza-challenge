import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`

  const { data, error } = await supabaseServer.storage
    .from('banners')
    .upload(fileName, file, {
      contentType: file.type,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabaseServer.storage.from('banners').getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl, path: data.path }, { status: 201 })
}
