import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const sessionId = formData.get('sessionId') as string
    const photos = formData.getAll('photos') as File[]

    if (!sessionId || photos.length === 0) {
      return NextResponse.json(
        { error: 'Missing sessionId or photos' },
        { status: 400 }
      )
    }

    const uploadedUrls = []
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i]
      const filename = `${sessionId}/photo_${i + 1}.${photo.name.split('.').pop()}`
      
      const blob = await put(filename, photo, {
        access: 'public',
      })
      
      uploadedUrls.push(blob.url)
    }

    console.log(`Uploaded ${uploadedUrls.length} photos to Blob`)

    return NextResponse.json({ 
      success: true,
      urls: uploadedUrls,
      sessionId 
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}