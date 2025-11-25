'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (sessionId) {
      console.log('Payment successful:', sessionId)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-xl text-slate-600 mb-8">
          Your AI headshots are being generated right now
        </p>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            What happens next?
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  AI is generating your headshots
                </h3>
                <p className="text-slate-600">
                  Our AI is creating professional headshots in multiple styles. 
                  This usually takes 30-60 minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Check your email
                </h3>
                <p className="text-slate-600">
                  We will send you an email with download links as soon as your 
                  headshots are ready. Check your spam folder just in case!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Download and use
                </h3>
                <p className="text-slate-600">
                  Download your favorites and use them on LinkedIn, resumes, 
                  company websites, or anywhere you need a professional photo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-green-900 mb-2">
            💯 100% Satisfaction Guarantee
          </h3>
          <p className="text-green-800">
            If you are not happy with at least 3 of your headshots, 
            we will give you a full refund within 48 hours. No questions asked.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Home
          </a>

          <p className="text-sm text-slate-500">
            Questions? Email us at support@yourheadshots.com
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-600 mb-4">
            While you wait, why not share with friends?
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition">
              Share on LinkedIn
            </button>
            <button className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition">
              Share on Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}