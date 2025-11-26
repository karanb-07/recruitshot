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
    for (const photo of photos) {
      // Force .jpg extension
      const filename = `${sessionId}/${Date.now()}.jpg`
      
      const blob = await put(filename, photo, {
        access: 'public',
        contentType: 'image/jpeg',
        cacheControlMaxAge: 31536000,
      })
      
      uploadedUrls.push(blob.url)
    }

    console.log(`Uploaded ${uploadedUrls.length} photos`)

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