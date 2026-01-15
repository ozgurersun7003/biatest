import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// Clean & Minimal Design System (PRIMARY)
import './clean-design.css'

// Base styles
import './globals.css'
import './globals-social-media.css'

// Component-specific updates
import './search-updates.css'
import './search-results-styles.css'
import './autocomplete-updates.css'

// Mobile optimization (last for overrides)
import './mobile-optimization.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import KeyboardShortcutsHelp from '@/components/KeyboardShortcutsHelp'
import InstallPrompt from '@/components/InstallPrompt'
import SkipToContent from '@/components/SkipToContent'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount'
import ThemeColorMeta from './theme-color-meta'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'),
  title: {
    default: 'Biabet Destek - Modern Yardım Merkezi',
    template: '%s | Biabet Destek',
  },
  description: 'Sorularınızın cevaplarını hızlıca bulun. Bonuslar, para yatırma, para çekme ve daha fazlası hakkında bilgi alın.',
  keywords: ['biabet', 'destek', 'yardım', 'bonus', 'para yatırma', 'para çekme', 'sss', 'canlı destek'],
  authors: [{ name: 'Biabet' }],
  creator: 'Biabet',
  publisher: 'Biabet',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com',
    siteName: 'Biabet Destek',
    title: 'Biabet Destek - Modern Yardım Merkezi',
    description: 'Sorularınızın cevaplarını hızlıca bulun. Bonuslar, para yatırma, para çekme ve daha fazlası hakkında bilgi alın.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Biabet Destek',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biabet Destek - Modern Yardım Merkezi',
    description: 'Sorularınızın cevaplarını hızlıca bulun',
    images: ['/og-image.jpg'],
    creator: '@biabetresmi',
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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent', // iOS status bar - göz yormayan siyah
    title: 'Biabet Destek',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  verification: {
    // Google Search Console verification code buraya eklenecek
    // google: 'verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="tr">
      <body className={inter.className}>
        <ThemeColorMeta />
        <ErrorBoundary>
          <ServiceWorkerRegistration />
          <ScrollToTopOnMount />
          <SkipToContent />
          <KeyboardShortcuts />
          <KeyboardShortcutsHelp />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BackToTop />
          <InstallPrompt />
          <Analytics />
          {gaId && <GoogleAnalytics gaId={gaId} />}
        </ErrorBoundary>
      </body>
    </html>
  )
}