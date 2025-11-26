import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import sharp from 'sharp'

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
      
      // Convert File to Buffer
      const arrayBuffer = await photo.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // Compress with Sharp
      const compressed = await sharp(buffer)
        .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer()
      
      console.log(`Compressed photo ${i + 1}: ${(buffer.length / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB`)
      
      // Upload to Blob
      const filename = `${sessionId}/photo_${i + 1}.jpg`
      const blob = await put(filename, compressed, {
        access: 'public',
        contentType: 'image/jpeg',
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