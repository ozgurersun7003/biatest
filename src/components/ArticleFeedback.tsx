'use client'

import { useState } from 'react'

interface ArticleFeedbackProps {
  slug: string
  title: string
}

export default function ArticleFeedback({ slug, title }: ArticleFeedbackProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleFeedback = async (value: 'helpful' | 'not-helpful') => {
    if (submitted) return

    setFeedback(value)
    setSubmitted(true)

    // Analytics event gönder
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'article_feedback', {
        article_slug: slug,
        article_title: title,
        feedback: value,
      })
    }

    // API'ye gönder (opsiyonel)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, title, feedback: value }),
      })
    } catch (error) {
      console.error('Feedback gönderme hatası:', error)
    }
  }

  if (submitted) {
    return (
      <div className="article-feedback submitted">
        <p>Geri bildiriminiz için teşekkürler! 💙</p>
      </div>
    )
  }

  return (
    <div className="article-feedback">
      <p className="article-feedback-question">Bu makale yararlı mıydı?</p>
      <div className="article-feedback-buttons">
        <button
          onClick={() => handleFeedback('helpful')}
          className={`article-feedback-btn ${feedback === 'helpful' ? 'active' : ''}`}
          aria-label="Yararlı"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
          <span>Evet</span>
        </button>
        <button
          onClick={() => handleFeedback('not-helpful')}
          className={`article-feedback-btn ${feedback === 'not-helpful' ? 'active' : ''}`}
          aria-label="Yararlı değil"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
          </svg>
          <span>Hayır</span>
        </button>
      </div>
    </div>
  )
}
