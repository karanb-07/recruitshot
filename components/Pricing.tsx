'use client'

export default function Pricing() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-slate-600 mb-16">
          Professional photographer: $200-500 • AI Headshots: $19
        </p>

        <div className="max-w-md mx-auto">
          <div className="rounded-xl p-8 border-2 border-blue-600 bg-blue-50 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Only Option
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Professional Package</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$19</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="font-semibold">8 professional headshots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="font-semibold">30-60 minute delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>4 different professional styles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>High-resolution downloads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Quality depends on photo input</span>
              </li>
            </ul>

            <button
              onClick={() => window.location.href = '/upload'}
              className="w-full py-3 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Upload varied photos with different angles and lighting for best results
        </p>
      </div>
    </section>
  )
}