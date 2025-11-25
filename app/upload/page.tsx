'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function UploadContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const packageType = searchParams.get('package') || 'standard'
  
  const [files, setFiles] = useState<File[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/')
      )
      setFiles(prev => [...prev, ...newFiles].slice(0, 10))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      )
      setFiles(prev => [...prev, ...newFiles].slice(0, 10))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (files.length < 5) {
      alert('Please upload at least 5 photos')
      return
    }

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: packageType,
          email: email,
          photoCount: files.length
        })
      })

      const { sessionId, uploadUrl } = await response.json()

      // Upload files
      const formData = new FormData()
      formData.append('sessionId', sessionId)
      files.forEach(file => formData.append('photos', file))

      await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      // Redirect to Stripe checkout
      const stripe = await (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      await stripe.redirectToCheckout({ sessionId })
      
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const price = packageType === 'premium' ? 29 : 19
  const photoCount = packageType === 'premium' ? '15-20' : '8-10'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Upload Your Photos
            </h1>
            <p className="text-lg text-slate-600">
              Upload 5-10 clear photos of yourself to get started
            </p>
            
            <div className="mt-6 inline-block bg-blue-50 px-6 py-3 rounded-lg">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-blue-600">
                  {packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package
                </span>
                {' '}• {photoCount} headshots • ${price}
              </p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-6xl mb-4">📸</div>
              <p className="text-lg font-semibold text-slate-900 mb-2">
                Drag and drop your photos here
              </p>
              <p className="text-slate-600 mb-4">or</p>
              <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-slate-500 mt-4">
                Upload 5-10 photos (JPEG, PNG) • Max 5MB each
              </p>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold mb-4">
                  {files.length} photo{files.length !== 1 ? 's' : ''} uploaded
                  {files.length < 5 && (
                    <span className="text-red-600 ml-2">
                      (Minimum 5 required)
                    </span>
                  )}
                </p>
                <div className="grid grid-cols-5 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Email Input */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Email Address
            </label>
            <p className="text-sm text-slate-600 mb-4">
              We'll send your headshots here (usually within 30 minutes)
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-slate-900 mb-3">
              📝 Tips for best results:
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Use photos with good lighting (natural light is best)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Include close-ups and shoulders-up shots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Show your face from different angles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">✗</span>
                <span>Avoid group photos, sunglasses, or heavily filtered images</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || files.length < 5 || !email}
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Processing...'
            ) : (
              `Continue to Payment ($${price})`
            )}
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Secure payment via Stripe • Money-back guarantee
          </p>
        </div>
      </div>
      
      {/* Stripe Script */}
      <script src="https://js.stripe.com/v3/"></script>
    </div>
  )
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadContent />
    </Suspense>
  )
}