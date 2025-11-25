'use client'

export default function Pricing() {
  const packages = [
    {
      name: "Standard",
      price: 19,
      features: [
        "8-10 professional headshots",
        "30-60 minute delivery",
        "5 different styles",
        "High-resolution downloads",
        "Money-back guarantee"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: 29,
      features: [
        "15-20 professional headshots",
        "Priority processing (20 min)",
        "8 different styles",
        "High-resolution downloads",
        "Money-back guarantee"
      ],
      popular: true
    }
  ]

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
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-xl p-8 relative ${
                pkg.popular
                  ? 'border-2 border-blue-600 bg-blue-50'
                  : 'border-2 border-slate-200 hover:border-blue-500 transition'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${pkg.price}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className={index < 2 && pkg.popular ? 'font-semibold' : ''}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => window.location.href = `/upload?package=${pkg.name.toLowerCase()}`}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  pkg.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Not happy? Get a full refund within 48 hours, no questions asked.
        </p>
      </div>
    </section>
  )
}
