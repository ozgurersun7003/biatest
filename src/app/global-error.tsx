'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="tr">
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px', color: '#ef4444' }}>
            ⚠️ Kritik Hata
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '24px', color: '#64748b' }}>
            {error.message || 'Beklenmeyen bir hata meydana geldi.'}
          </p>
          {error.digest && (
            <p style={{ fontSize: '14px', marginBottom: '24px', color: '#94a3b8' }}>
              Hata Kodu: {error.digest}
            </p>
          )}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => reset()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#FFD700',
                color: '#0A4D52',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Tekrar Dene
            </button>
            <Link
              href="/"
              style={{
                padding: '12px 24px',
                backgroundColor: '#1A5F7A',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
