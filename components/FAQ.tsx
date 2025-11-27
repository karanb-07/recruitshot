'use client'
import { useState } from 'react'

const faqs = [
  {
    q: "How does this work? Can't I just use ChatGPT or Midjourney?",
    a: "No! ChatGPT and Midjourney generate random faces, not YOUR face. We use fine-tuned AI that learns what you look like from your photos, then generates professional headshots of you specifically. It's completely different technology."
  },
  {
    q: "How long does it take?",
    a: "30-60 minutes. You'll get an email as soon as they're ready."
  },
  {
    q: "What if I don't like the results?",
    a: "If you're not happy with your headshots, we will work with you to provide a fresh set of headshots, no questions asked."
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
