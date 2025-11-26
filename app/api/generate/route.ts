import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { v2 as cloudinary } from 'cloudinary'

const resend = new Resend(process.env.RESEND_API_KEY)

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Astria API Configuration
const ASTRIA_API_KEY = process.env.ASTRIA_API_KEY!
const ASTRIA_API_URL = 'https://api.astria.ai/tunes'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, email, package: packageType, photoCount } = await req.json()

    console.log('Starting generation for:', email, packageType)

    // Step 1: Get image URLs from Cloudinary
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: `headshots/${sessionId}`,
      max_results: 20,
    })

    const imageUrls = result.resources.map((resource: any) => resource.secure_url)
    
    console.log('Cloudinary images found:', imageUrls.length)
    console.log('Image URLs:', imageUrls)

    // Step 2: Create fine-tuning job on Astria with prompts
    const payload = {
      tune: {
        title: `Headshot ${Date.now()}`,
        name: "man",
        token: "ohwx",
        branch: "flux1",
        base_tune_id: 1504944,
        model_type: "lora",
        steps: 300,
        face_crop: true,
        preset: "flux-lora-portrait",
        image_urls: imageUrls.slice(0, Math.min(photoCount, 10)),
        callback: `https://recruitshot.vercel.app/api/generation-complete?email=${encodeURIComponent(email)}`,
        prompts_attributes: [
          {
            text: "ohwx man, professional business headshot, wearing suit and tie, office background, corporate style, high quality, detailed, 8k",
            negative_prompt: "cartoon, anime, illustration, low quality, blurry, distorted, deformed, ugly",
            num_images: 2,
            super_resolution: true,
            inpaint_faces: true,
            face_correct: true,
            face_swap: true,
            callback: `https://recruitshot.vercel.app/api/generation-complete?email=${encodeURIComponent(email)}`,
          },
          {
            text: "ohwx man, professional headshot, business casual, modern office, natural lighting, high quality, 8k",
            negative_prompt: "cartoon, anime, illustration, low quality, blurry, distorted, deformed, ugly",
            num_images: 2,
            super_resolution: true,
            inpaint_faces: true,
            face_correct: true,
            face_swap: true,
            callback: `https://recruitshot.vercel.app/api/generation-complete?email=${encodeURIComponent(email)}`,
          },
          {
            text: "ohwx man, executive portrait, formal attire, elegant office, professional, detailed, 8k",
            negative_prompt: "cartoon, anime, illustration, low quality, blurry, distorted, deformed, ugly",
            num_images: 2,
            super_resolution: true,
            inpaint_faces: true,
            face_correct: true,
            face_swap: true,
            callback: `https://recruitshot.vercel.app/api/generation-complete?email=${encodeURIComponent(email)}`,
          },
          {
            text: "ohwx man, linkedin profile photo, professional clothing, neutral background, friendly, 8k",
            negative_prompt: "cartoon, anime, illustration, low quality, blurry, distorted, deformed, ugly",
            num_images: 2,
            super_resolution: true,
            inpaint_faces: true,
            face_correct: true,
            face_swap: true,
            callback: `https://recruitshot.vercel.app/api/generation-complete?email=${encodeURIComponent(email)}`,
          },
        ],
      }
    }

    console.log('Sending to Astria:', JSON.stringify(payload, null, 2))

    const tuneResponse = await fetch(ASTRIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ASTRIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    console.log('Astria HTTP status:', tuneResponse.status)
    console.log('Astria status text:', tuneResponse.statusText)

    const tuneData = await tuneResponse.json()
    console.log('Full Astria response:', tuneData)
    
    if (!tuneResponse.ok) {
      throw new Error(`Astria API error: ${JSON.stringify(tuneData)}`)
    }
    
    const tuneId = tuneData.id
    console.log('Astria tune created:', tuneId)

    // Step 3: Send confirmation email
    const numHeadshots = packageType === 'premium' ? 20 : 10
    await resend.emails.send({
      from: 'AI Headshots <onboarding@resend.dev>',
      to: email,
      subject: 'Your AI Headshots are Being Generated! 🎉',
      html: `
        <h2>Thanks for your order!</h2>
        <p>We're generating your ${numHeadshots} professional headshots right now.</p>
        <p><strong>You'll receive your headshots within 30-60 minutes.</strong></p>
        <p>We'll email you as soon as they're ready to download.</p>
        <hr />
        <p style="color: #666; font-size: 14px;">
          Questions? Just reply to this email.
        </p>
      `,
    })

    return NextResponse.json({ 
      success: true,
      tuneId,
    })
  } catch (error: any) {
    console.error('Generation error:', error)
    
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}