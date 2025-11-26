import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
      // Convert File to Buffer
      const arrayBuffer = await photo.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString('base64')
      const dataURI = `data:${photo.type};base64,${base64}`
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: `headshots/${sessionId}`,
        resource_type: 'image',
        format: 'jpg',  // ← Force convert to JPEG
        quality: 'auto',
      })
      
      uploadedUrls.push(result.secure_url)
      console.log('Uploaded to Cloudinary:', result.secure_url)
    }

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