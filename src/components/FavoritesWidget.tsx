'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getFavorites, removeFavorite, type FavoriteArticle } from '@/lib/favorites'

export default function FavoritesWidget() {
  const [favorites, setFavorites] = useState<FavoriteArticle[]>([])

  useEffect(() => {
    setFavorites(getFavorites())
    
    const handleStorageChange = () => {
      setFavorites(getFavorites())
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleRemove = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    e.stopPropagation()
    removeFavorite(slug)
    setFavorites(getFavorites())
  }

  if (favorites.length === 0) {
    return (
      <div className="widget-card-clean" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 1rem', color: 'var(--text-tertiary)' }}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Henüz favori makale eklenmemiş</p>
      </div>
    )
  }

  return (
    <div className="widget-card-clean">
      <div className="widget-header-clean">
        <div className="widget-title-wrapper">
          <svg className="widget-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h3 className="widget-title-clean">Favorilerim ({favorites.length})</h3>
        </div>
      </div>
      <div className="widget-list-clean widget-list-scrollable">
        {favorites.map((article) => (
          <Link
            key={article.slug}
            href={article.url}
            className="widget-item-clean"
          >
            <svg className="widget-icon-clean" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="widget-text-clean">{article.title}</span>
            <button
              onClick={(e) => handleRemove(e, article.slug)}
              aria-label="Favorilerden kaldır"
              className="widget-remove-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
