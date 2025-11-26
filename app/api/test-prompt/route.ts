import { NextRequest, NextResponse } from 'next/server'

const ASTRIA_API_KEY = process.env.ASTRIA_API_KEY!

export async function GET(req: NextRequest) {
  const tuneId = "3661169"  // ← Your good tune ID
  
  const response = await fetch(`https://api.astria.ai/tunes/${tuneId}/prompts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ASTRIA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: "ohwx man, linkedin profile photo, professional clothing, neutral background, friendly, smiling, high quality, 8k",
      num_images: 2,
      super_resolution: true,
      inpaint_faces: true,
      callback: `https://recruitshot.vercel.app/api/generation-complete?email=recruitshot@gmail.com`,
    }),
  })

  const data = await response.json()
  return NextResponse.json({ success: true, data })
}