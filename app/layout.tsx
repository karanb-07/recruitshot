import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Headshot Generator - Professional LinkedIn Photos for $19',
  description: 'Get professional AI-generated headshots in 30 minutes for $19. Perfect for LinkedIn, resumes, and recruiting season.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script src="https://js.stripe.com/v3/"></script>
      </body>
    </html>
  )
}
