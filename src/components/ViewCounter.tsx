'use client'

import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  title: string
}

export default function ViewCounter({ slug, title }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // Get views from localStorage
    const viewKey = `views-${slug}`
    const storedViews = localStorage.getItem(viewKey)
    
    if (storedViews) {
      setViews(parseInt(storedViews, 10))
    } else {
      setViews(0)
    }

    // Increment view count
    const newViews = (parseInt(storedViews || '0', 10) + 1)
    localStorage.setItem(viewKey, newViews.toString())
    setViews(newViews)

    // Track view in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'page_view', {
        page_title: title,
        page_location: `/detail/${slug}`,
      })
    }
  }, [slug, title])

  if (views === null || views === 0) return null

  return (
    <div className="view-counter">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>{views} görüntüleme</span>
    </div>
  )
}
