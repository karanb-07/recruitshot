import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RecruitShot - Professional AI Headshots for $19',
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
        <Header />
        {children}
        <script src="https://js.stripe.com/v3/"></script>
      </body>
    </html>
  )
}