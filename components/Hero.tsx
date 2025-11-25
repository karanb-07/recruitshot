import Link from 'next/link'

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

        <div className="flex gap-4 justify-center mb-12 flex-wrap">
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Before</p>
                  <div className="aspect-square bg-slate-200 rounded flex items-center justify-center text-slate-400">
                    Photo {i}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">After</p>
                  <div className="aspect-square bg-blue-100 rounded flex items-center justify-center text-blue-400">
                    Pro {i}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">Example Customer</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-600 flex-wrap">
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
