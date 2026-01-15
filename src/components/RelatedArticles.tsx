import Link from 'next/link'
import searchData from '@/../../public/search-data.json'
import { getDetailSlug } from '@/lib/url-mapping'

interface Page {
  title: string
  url: string
  category: string
  description?: string
}

interface RelatedArticlesProps {
  currentSlug: string
  category: string
  limit?: number
}

export default function RelatedArticles({ currentSlug, category, limit = 4 }: RelatedArticlesProps) {
  const pages = searchData.pages as Page[]
  
  // Aynı kategorideki diğer makaleleri bul
  const relatedPages = pages
    .filter((page) => {
      const pageSlug = page.url.replace(/^detail-/, '').replace(/\.html$/, '')
      return page.category === category && pageSlug !== currentSlug
    })
    .slice(0, limit)

  if (relatedPages.length === 0) {
    return null
  }

  return (
    <div className="related-articles">
      <h3 className="related-articles-title">İlgili Makaleler</h3>
      <div className="related-articles-grid">
        {relatedPages.map((page) => {
          const slug = getDetailSlug(page.url)
          return (
            <Link
              key={page.url}
              href={`/detail/${slug}`}
              className="related-article-card"
            >
              <div className="related-article-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h4 className="related-article-title">{page.title}</h4>
              {page.description && (
                <p className="related-article-description">{page.description}</p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
