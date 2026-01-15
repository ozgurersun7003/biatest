'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Log to analytics/error tracking service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary">
          <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
            <div className="error-boundary-content">
              <div className="error-icon">⚠️</div>
              <h1 className="error-title">Bir şeyler yanlış gitti</h1>
              <p className="error-message">
                {this.state.error?.message || 'Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin.'}
              </p>
              <div className="error-actions">
                <button
                  onClick={() => {
                    this.setState({ hasError: false, error: null })
                    window.location.reload()
                  }}
                  className="btn-primary"
                >
                  Sayfayı Yenile
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

    return this.props.children
  }
}
