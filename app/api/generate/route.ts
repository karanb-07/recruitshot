import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Astria API Configuration
const ASTRIA_API_KEY = process.env.ASTRIA_API_KEY!
const ASTRIA_API_URL = 'https://api.astria.ai/tunes'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, email, package: packageType, photoCount } = await req.json()

    console.log('Starting generation for:', email, packageType)

    // Step 1: Upload training images to Astria
    // Step 1: Get image URLs from Blob storage
    // Step 1: Get images from Blob
const { list } = await import('@vercel/blob')

const { blobs } = await list({
  prefix: sessionId,
})

console.log('Found blobs:', blobs.length)

// Step 2: Download from Blob and upload to Astria
const astriaImageUrls = []

for (let i = 0; i < blobs.length; i++) {
  const blob = blobs[i]
  
  // Download from Blob
  const imageResponse = await fetch(blob.url)
  const imageBuffer = await imageResponse.arrayBuffer()
  
  // Upload to Astria
  const formData = new FormData()
  formData.append('image', new Blob([imageBuffer], { type: 'image/jpeg' }), `photo_${i + 1}.jpg`)
  
  const uploadResponse = await fetch('https://api.astria.ai/images', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ASTRIA_API_KEY}`,
    },
    body: formData
  })
  
  const uploadData = await uploadResponse.json()
  console.log('Astria upload response:', uploadData)
  
  if (uploadData.url) {
    astriaImageUrls.push(uploadData.url)
  }
}

console.log('Astria image URLs:', astriaImageUrls)

const imageUrls = astriaImageUrls
    
    console.log('Blobs found:', blobs.length)
    console.log('Image URLs:', imageUrls)

console.log('Images from Blob:', imageUrls.length)
console.log('First URL:', imageUrls[0])

    // Step 2: Create fine-tuning job on Astria
    const tuneResponse = await fetch(ASTRIA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ASTRIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `Headshot ${Date.now()}`,
        name: `headshot${Date.now()}`,
        branch: "sd15",
        tune_type: "face",
        base_model: "realistic_vision_v5",
        image_urls: imageUrls.slice(0, Math.min(photoCount, 10)),
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/generation-complete`,
      }),
    })

    const tuneData = await tuneResponse.json()
    console.log('Full Astria response:', tuneData)
    const tuneId = tuneData.id
    
    console.log('Astria tune created:', tuneId)

    // Step 3: Generate headshots using different prompts
    const numHeadshots = packageType === 'premium' ? 20 : 10
    const prompts = [
      'professional business headshot, suit and tie, office background, corporate, high quality',
      'professional headshot, business casual, modern office, natural lighting',
      'professional portrait, smart casual attire, contemporary workspace, confident',
      'executive headshot, formal business attire, elegant office, professional',
      'modern professional headshot, stylish outfit, urban background, creative',
      'linkedin profile photo, professional clothing, neutral background, friendly',
      'corporate headshot, blazer, studio lighting, clean background',
      'professional photo, business attire, outdoor setting, natural light',
    ]

    const generations = []
    for (let i = 0; i < Math.min(numHeadshots, prompts.length); i++) {
      const genResponse = await fetch(`${ASTRIA_API_URL}/${tuneId}/prompts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ASTRIA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${prompts[i]}, professional photography, 8k, detailed`,
          negative_prompt: 'cartoon, anime, illustration, low quality, blurry, distorted',
          num_images: packageType === 'premium' ? 3 : 2,
          callback: {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/generation-complete`,
            method: 'POST'
          }
        }),
      })

      const genData = await genResponse.json()
      generations.push(genData)
    }

    // Step 4: Send confirmation email
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
      generationCount: generations.length 
    })
  } catch (error: any) {
    console.error('Generation error:', error)
    
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}