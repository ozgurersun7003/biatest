'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) {
    return (
      <div className="page-content">
        <div className="container">
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 24px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '24px'
            }}>
              ✅
            </div>
            <h1 style={{ 
              fontSize: '32px', 
              marginBottom: '16px',
              fontWeight: 400
            }}>
              Bağlantı Yenilendi
            </h1>
            <p style={{ 
              marginBottom: '32px',
              color: 'var(--md-on-surface-variant, #5F6368)'
            }}>
              İnternet bağlantınız yeniden kuruldu. Sayfayı yenileyebilirsiniz.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Offline</h1>
          <p className="page-subtitle">İnternet Bağlantısı Yok</p>
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
              lineHeight: 1
            }}>
              📡
            </div>
            <h2 style={{ 
              fontSize: '32px', 
              marginBottom: '16px',
              fontWeight: 400,
              color: 'var(--md-on-surface, #202124)'
            }}>
              İnternet Bağlantısı Yok
            </h2>
            <p style={{ 
              marginBottom: '32px',
              fontSize: '16px',
              color: 'var(--md-on-surface-variant, #5F6368)',
              lineHeight: 1.6
            }}>
              Şu anda internet bağlantınız bulunmuyor. Lütfen bağlantınızı kontrol edin ve tekrar deneyin.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Tekrar Dene
              </button>
              <Link href="/" className="btn-secondary">
                Ana Sayfaya Dön
              </Link>
            </div>
            <div style={{ 
              marginTop: '32px',
              padding: '16px',
              background: 'var(--md-surface-variant, #F8F9FA)',
              borderRadius: '12px',
              fontSize: '14px',
              color: 'var(--md-on-surface-variant, #5F6368)'
            }}>
              <p style={{ margin: 0 }}>
                💡 <strong>Not:</strong> Bazı içerikler offline olarak görüntülenebilir.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
