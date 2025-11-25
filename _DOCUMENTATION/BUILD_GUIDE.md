# AI HEADSHOT GENERATOR - COMPLETE BUILD GUIDE

## IMMEDIATE ACTION ITEMS (Do These NOW)

### 1. Set Up Accounts (15 minutes)
```
☐ Stripe Account: https://stripe.com
  - Get API keys (test + live)
  - Enable payment links
  
☐ Astria.ai Account: https://www.astria.ai
  - Sign up for API access
  - Get API key
  - Test with 1 generation ($1-2)
  
☐ Vercel Account: https://vercel.com
  - Sign up with GitHub
  - Free tier is perfect
  
☐ Domain (Optional): Namecheap or Vercel
  - Something like: aiheadshots.co, headshotfast.com
  - Can skip for now, use Vercel subdomain
```

### 2. Local Development Setup (10 minutes)
```bash
# Install Node.js (if not installed)
# Download from: https://nodejs.org (v18 or v20)

# Create project
npx create-next-app@latest ai-headshots
# Choose: TypeScript ✓, Tailwind ✓, App Router ✓

cd ai-headshots
npm install stripe @stripe/stripe-js resend
npm install -D @types/node

# Create .env.local file
touch .env.local
```

### 3. Environment Variables (.env.local)
```bash
# Stripe (get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Astria.ai (get from dashboard)
ASTRIA_API_KEY=your_api_key_here

# Email (Resend - get from https://resend.com)
RESEND_API_KEY=re_...

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## PROJECT STRUCTURE

```
ai-headshots/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── upload/
│   │   └── page.tsx             # Photo upload page
│   ├── success/
│   │   └── page.tsx             # Payment success page
│   ├── api/
│   │   ├── create-checkout/
│   │   │   └── route.ts         # Stripe checkout session
│   │   ├── webhook/
│   │   │   └── route.ts         # Stripe webhook
│   │   ├── generate/
│   │   │   └── route.ts         # Astria API integration
│   │   └── upload/
│   │       └── route.ts         # File upload handler
├── components/
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   └── PhotoUpload.tsx
├── lib/
│   ├── stripe.ts
│   ├── astria.ts
│   └── email.ts
└── public/
    └── examples/                # Before/after examples
```

---

## COMPLETE CODE FILES

I'll provide all the code you need. Copy each file exactly.

---

## PHASE 1: LANDING PAGE (Days 1-2)

### File: app/page.tsx
```typescript
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <HowItWorks />
      <Pricing />
      <FAQ />
    </main>
  )
}
```

### File: components/Hero.tsx
```typescript
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Professional LinkedIn Headshots
          <span className="block text-blue-600">in 30 Minutes for $19</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-8">
          AI-powered professional headshots for recruiting season. 
          Skip the $200 photographer and get studio-quality photos instantly.
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <Link 
            href="/upload"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Your Headshots ($19)
          </Link>
          <a 
            href="#how-it-works"
            className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
          >
            See How It Works
          </a>
        </div>

        {/* Before/After Examples */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-slate-500 mb-1">Before</p>
                <div className="aspect-square bg-slate-200 rounded" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">After</p>
                <div className="aspect-square bg-blue-100 rounded" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">Sarah - Finance</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-slate-500 mb-1">Before</p>
                <div className="aspect-square bg-slate-200 rounded" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">After</p>
                <div className="aspect-square bg-blue-100 rounded" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">Mike - Consulting</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-slate-500 mb-1">Before</p>
                <div className="aspect-square bg-slate-200 rounded" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">After</p>
                <div className="aspect-square bg-blue-100 rounded" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">Alex - Tech</p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>30-min delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>500+ happy customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### File: components/HowItWorks.tsx
```typescript
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload 5-10 Photos</h3>
            <p className="text-slate-600">
              Upload clear photos of yourself from different angles. 
              Selfies work great!
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Does Its Magic</h3>
            <p className="text-slate-600">
              Our AI generates 8-20 professional headshots in various 
              styles and backgrounds.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Download & Use</h3>
            <p className="text-slate-600">
              Get your headshots via email in 30 minutes. 
              Use them anywhere!
            </p>
          </div>
        </div>

        <div className="mt-16 p-8 bg-slate-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">What photos should I upload?</h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Clear face shots from different angles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Good lighting (natural light works best)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Mix of close-up and shoulders-up shots</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>Group photos, sunglasses, or blurry images</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
```

### File: components/Pricing.tsx
```typescript
'use client'

export default function Pricing() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-slate-600 mb-16">
          Professional photographer: $200-500 • AI Headshots: $19-29
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Standard Package */}
          <div className="border-2 border-slate-200 rounded-xl p-8 hover:border-blue-500 transition">
            <h3 className="text-2xl font-bold mb-2">Standard</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$19</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>8-10 professional headshots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>30-60 minute delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>5 different styles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>High-resolution downloads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Money-back guarantee</span>
              </li>
            </ul>

            <button
              onClick={() => window.location.href = '/upload?package=standard'}
              className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Get Started
            </button>
          </div>

          {/* Premium Package */}
          <div className="border-2 border-blue-600 rounded-xl p-8 relative bg-blue-50">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$29</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span><strong>15-20 professional headshots</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span><strong>Priority processing (20 min)</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>8 different styles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>High-resolution downloads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Money-back guarantee</span>
              </li>
            </ul>

            <button
              onClick={() => window.location.href = '/upload?package=premium'}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Not happy? Get a full refund within 48 hours, no questions asked.
        </p>
      </div>
    </section>
  )
}
```

### File: components/FAQ.tsx
```typescript
'use client'
import { useState } from 'react'

const faqs = [
  {
    q: "How does this work? Can't I just use ChatGPT or Midjourney?",
    a: "No! ChatGPT and Midjourney generate random faces, not YOUR face. We use fine-tuned AI that learns what you look like from your photos, then generates professional headshots of you specifically. It's completely different technology."
  },
  {
    q: "How long does it take?",
    a: "Standard: 30-60 minutes. Premium: 20-30 minutes. You'll get an email as soon as they're ready."
  },
  {
    q: "What if I don't like the results?",
    a: "If you're not happy with at least 3 of your headshots, we'll give you a full refund within 48 hours. No questions asked."
  },
  {
    q: "What kind of photos should I upload?",
    a: "Upload 5-10 clear photos of your face from different angles. Selfies work great! Just make sure they're well-lit and your face is clearly visible. Avoid sunglasses or group photos."
  },
  {
    q: "Are my photos private?",
    a: "Yes! All photos are deleted from our servers after 30 days. We never share or sell your data."
  },
  {
    q: "Can I use these for LinkedIn, resumes, etc.?",
    a: "Absolutely! You own the headshots and can use them anywhere - LinkedIn, resumes, company websites, dating apps, whatever you need."
  },
  {
    q: "Why is this so much cheaper than a photographer?",
    a: "AI makes it possible! A traditional photographer charges $200-500 for their time, equipment, and studio. We use AI to generate professional-quality headshots instantly."
  },
  {
    q: "What styles do I get?",
    a: "You'll get headshots in different professional styles: business formal (suit/blazer), business casual, modern professional, outdoor professional, and creative professional backgrounds."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="container mx-auto px-4 py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition"
              >
                <span className="font-semibold text-slate-900">{faq.q}</span>
                <span className="text-2xl text-slate-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-slate-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## PHASE 2: UPLOAD & PAYMENT (Days 3-4)

I'll create the upload page, payment integration, and API routes next. 

Would you like me to continue with:
1. Photo upload page + drag-and-drop
2. Stripe payment integration
3. API routes for processing

Or would you prefer to start building what I've provided so far and come back for the next files?
