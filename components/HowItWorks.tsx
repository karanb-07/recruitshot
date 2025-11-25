export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Upload 5-10 Photos",
      description: "Upload clear photos of yourself from different angles. Selfies work great!"
    },
    {
      number: 2,
      title: "AI Does Its Magic",
      description: "Our AI generates 8-20 professional headshots in various styles and backgrounds."
    },
    {
      number: 3,
      title: "Download & Use",
      description: "Get your headshots via email in 30 minutes. Use them anywhere!"
    }
  ]

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
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
