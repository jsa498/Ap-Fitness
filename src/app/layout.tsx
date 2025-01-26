import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import PaymentOverlay from '@/components/PaymentOverlay'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ap-fitness.ca'),
  title: {
    default: 'AP Fitness - Professional Personal Training & Wellness Services',
    template: '%s | AP Fitness'
  },
  description: 'AP Fitness offers professional personal training, group fitness classes, boxing, kickboxing, and wellness services by certified kinesiologists in a state-of-the-art facility in Surrey, BC.',
  keywords: ['personal training', 'fitness classes', 'boxing', 'kickboxing', 'gym surrey', 'wellness services', 'certified kinesiologists', 'fitness trainer', 'workout', 'fitness goals'],
  authors: [{ name: 'AP Fitness', url: 'https://apfitness.ca' }],
  creator: 'AP Fitness',
  publisher: 'AP Fitness',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AP Fitness - Professional Personal Training & Wellness Services',
    description: 'Transform your life with professional personal training, group fitness classes, boxing, and wellness services at AP Fitness. Expert guidance from certified kinesiologists.',
    url: 'https://apfitness.ca',
    siteName: 'AP Fitness',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AP Fitness Facility',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Fitness - Professional Personal Training & Wellness Services',
    description: 'Transform your life with professional personal training and wellness services at AP Fitness. Expert guidance from certified kinesiologists.',
    images: ['/images/twitter-image.jpg'],
    creator: '@apfitness',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'fitness',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="theme-color" content="#000000" />
        {/* Schema.org markup for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsActivityLocation',
              name: 'AP Fitness',
              description: 'Professional personal training and wellness services by certified kinesiologists in Surrey, BC.',
              image: 'https://apfitness.ca/images/og-image.jpg',
              '@id': 'https://apfitness.ca',
              url: 'https://apfitness.ca',
              telephone: '+16044017917',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '8160 120 St',
                addressLocality: 'Surrey',
                addressRegion: 'BC',
                postalCode: 'V3W 3N3',
                addressCountry: 'CA'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 49.1234567,
                longitude: -122.1234567
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '06:00',
                  closes: '22:00'
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday', 'Sunday'],
                  opens: '08:00',
                  closes: '20:00'
                }
              ],
              sameAs: [
                'https://www.facebook.com/apfitness',
                'https://www.instagram.com/apfitness',
                'https://twitter.com/apfitness'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Fitness Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Personal Training',
                      description: 'One-on-one personal training sessions'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Group Fitness Classes',
                      description: 'Group workout sessions'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Boxing & Kickboxing',
                      description: 'Boxing and kickboxing training'
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <PaymentOverlay />
          <Navbar />
          {children}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
} 