import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    // Get email from URL params
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')
    
    if (!email) {
      console.log('No email in callback')
      return NextResponse.json({ error: 'No email provided' }, { status: 400 })
    }

    // Get callback data from Astria
    const data = await req.json()
    
    console.log('Generation complete callback for:', email)
    console.log('Callback data:', JSON.stringify(data, null, 2))

    // Extract generated image URLs from correct location
    const images = data.prompt?.images || data.images || []
    
    console.log('Extracted images:', images)
    
    if (images.length === 0) {
      console.log('No images in callback')
      return NextResponse.json({ success: false, message: 'No images generated yet' })
    }

    // Create HTML with download links
    const imageHTML = images
      .map((imgUrl: string, index: number) => `
        <div style="margin: 20px 0;">
          <img src="${imgUrl}" style="max-width: 400px; border-radius: 8px; display: block; margin-bottom: 10px;" />
          <a href="${imgUrl}" download style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Download Headshot ${index + 1}
          </a>
        </div>
      `)
      .join('')

    // Send email with headshots
    await resend.emails.send({
      from: 'AI Headshots <onboarding@resend.dev>',
      to: email,
      subject: 'Your AI Headshots are Ready! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Your Professional Headshots Are Ready!</h2>
          <p style="color: #4b5563; font-size: 16px;">
            Here are your AI-generated professional headshots. Click the download buttons below each image to save them.
          </p>
          
          ${imageHTML}
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
          
          <p style="color: #6b7280; font-size: 14px;">
            Need different styles or have questions? Just reply to this email.
          </p>
          
          <p style="color: #6b7280; font-size: 14px;">
            Thanks for using AI Headshots!
          </p>
        </div>
      `,
    })

    console.log('Email sent successfully to:', email)

    return NextResponse.json({ success: true })
    
  } catch (error: any) {
    console.error('Callback error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}