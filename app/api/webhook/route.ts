import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('Payment successful:', session.id)

    // TODO: Trigger AI generation
    // You'll call your Astria API here to start generating headshots
    
    const { package: packageType, email, photoCount } = session.metadata!

    try {
      // Call generation API
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          email,
          package: packageType,
          photoCount: parseInt(photoCount)
        })
      })

      console.log('Generation started for:', email)
    } catch (error) {
      console.error('Generation error:', error)
    }
  }

  return NextResponse.json({ received: true })
}

// IMPORTANT: Disable body parsing for webhooks

