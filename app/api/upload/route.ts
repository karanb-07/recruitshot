import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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

    // Create upload directory
    const uploadDir = path.join(process.cwd(), 'uploads', sessionId)
    await mkdir(uploadDir, { recursive: true })

    // Save all photos
    const savedFiles = []
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i]
      const bytes = await photo.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const filename = `photo_${i + 1}_${Date.now()}.${photo.name.split('.').pop()}`
      const filepath = path.join(uploadDir, filename)
      
      await writeFile(filepath, buffer)
      savedFiles.push(filename)
    }

    console.log(`Saved ${savedFiles.length} photos for session ${sessionId}`)

    return NextResponse.json({ 
      success: true,
      files: savedFiles,
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