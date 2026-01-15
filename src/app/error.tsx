'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/components/GoogleAnalytics'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Track error to analytics (safely)
    try {
      if (typeof window !== 'undefined') {
        trackEvent('error_occurred', 'error', error.message || 'Unknown error')
      }
    } catch (err) {
      // Silently fail if analytics tracking fails
      console.error('Analytics tracking failed:', err)
    }
  }, [error])

  return (
    <div className="error-page">
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div className="error-content">
          <div className="error-icon-large">⚠️</div>
          <h1 className="error-title">Bir hata oluştu</h1>
          <p className="error-message">
            {error.message || 'Beklenmeyen bir hata meydana geldi.'}
          </p>
          {error.digest && (
            <p className="error-digest">
              Hata Kodu: {error.digest}
            </p>
          )}
          <div className="error-actions">
            <button onClick={() => reset()} className="btn-primary">
              Tekrar Dene
            </button>
            <Link href="/" className="btn-secondary">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
