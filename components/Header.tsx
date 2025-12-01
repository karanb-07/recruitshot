import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Image 
              src="/logo.png" 
              alt="RecruitShot Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-slate-900">
              Recruit<span className="text-blue-600">Shot</span>
            </span>
          </Link>

          {/* Nav (optional) */}
          <nav className="flex items-center gap-6">
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900">
              How It Works
            </a>
            <Link 
              href="/upload"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}