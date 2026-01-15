'use client'

import { useState, useEffect } from 'react'
import { isFavorite, toggleFavorite } from '@/lib/favorites'

interface FavoriteButtonProps {
  slug: string
  title: string
  url: string
}

export default function FavoriteButton({ slug, title, url }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    setFavorited(isFavorite(slug))
  }, [slug])

  const handleToggle = () => {
    const newState = toggleFavorite({ slug, title, url })
    setFavorited(newState)
    
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'favorite_toggle', {
        article_slug: slug,
        article_title: title,
        is_favorite: newState,
      })
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`favorite-btn ${favorited ? 'active' : ''}`}
      aria-label={favorited ? 'Favorilerden kaldır' : 'Favorilere ekle'}
      title={favorited ? 'Favorilerden kaldır' : 'Favorilere ekle'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={favorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
