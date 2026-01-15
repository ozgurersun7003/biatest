import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı',
  description: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">404</h1>
          <p className="page-subtitle">Sayfa Bulunamadı</p>
        </div>
      </section>
      <main className="page-content">
        <div className="container">
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 24px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{ 
              fontSize: '120px', 
              marginBottom: '24px',
              lineHeight: 1,
              fontWeight: 300,
              color: 'var(--md-on-surface-variant, #5F6368)'
            }}>
              404
            </div>
            <h2 style={{ 
              fontSize: '32px', 
              marginBottom: '16px',
              fontWeight: 400,
              color: 'var(--md-on-surface, #202124)'
            }}>
              Sayfa Bulunamadı
            </h2>
            <p style={{ 
              marginBottom: '32px', 
              fontSize: '16px',
              color: 'var(--md-on-surface-variant, #5F6368)',
              lineHeight: 1.6
            }}>
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek istediğiniz bilgiyi bulabilirsiniz.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn-primary">
                Ana Sayfaya Dön
              </Link>
              <Link href="/search" className="btn-secondary">
                Arama Yap
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}