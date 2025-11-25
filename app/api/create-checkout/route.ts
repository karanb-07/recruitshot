import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia'
})

export async function POST(req: NextRequest) {
  try {
    const { package: packageType, email, photoCount } = await req.json()

    const price = packageType === 'premium' ? 2900 : 1900 // in cents
    const photoCountText = packageType === 'premium' ? '15-20' : '8-10'

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `AI Headshot Generator - ${packageType.charAt(0).toUpperCase() + packageType.slice(1)}`,
              description: `${photoCountText} professional headshots delivered in 30-60 minutes`,
              images: ['https://your-domain.com/og-image.png'], // Add your logo
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/upload?package=${packageType}`,
      customer_email: email,
      metadata: {
        package: packageType,
        photoCount: photoCount.toString(),
        email,
      },
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
