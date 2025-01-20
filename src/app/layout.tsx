import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AP Fitness - Professional Personal Training & Wellness Services',
  description: 'AP Fitness offers professional personal training, group fitness classes, boxing, kickboxing, and wellness services by certified kinesiologists in a state-of-the-art facility.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Navbar />
          {children}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
} 