'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getRecentArticles, clearRecentArticles, type RecentArticle } from '@/lib/recent-articles'

export default function RecentArticles() {
  const [articles, setArticles] = useState<RecentArticle[]>([])

  useEffect(() => {
    setArticles(getRecentArticles())
  }, [])

  const handleClear = () => {
    clearRecentArticles()
    setArticles([])
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="widget-card-clean">
      <div className="widget-header-clean">
        <div className="widget-title-wrapper">
          <svg className="widget-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <h3 className="widget-title-clean">Son Görüntülenenler</h3>
        </div>
        <button onClick={handleClear} className="widget-clear-btn">
          Temizle
        </button>
      </div>
      <div className="widget-list-clean widget-list-scrollable">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={article.url}
            className="widget-item-clean"
          >
            <svg className="widget-icon-clean" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="widget-text-clean">{article.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
