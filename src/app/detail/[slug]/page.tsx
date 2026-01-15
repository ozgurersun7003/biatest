import { notFound } from 'next/navigation'
import Link from 'next/link'
import searchData from '@/../../public/search-data.json'
import pageContents from '@/../../public/page-contents.json'
import { getCategoryFromSlug, htmlUrlToNextRoute } from '@/lib/url-mapping'
import { generateMetadata as genMeta } from './metadata'
import SocialMediaSection from '@/components/SocialMediaSection'
import ReadingTime from '@/components/ReadingTime'
import SocialShare from '@/components/SocialShare'
import ArticleFeedback from '@/components/ArticleFeedback'
import RelatedArticles from '@/components/RelatedArticles'
import TableOfContents from '@/components/TableOfContents'
import FavoriteButton from '@/components/FavoriteButton'
import DetailPageClient from '@/components/DetailPageClient'
import ArticleNavigation from '@/components/ArticleNavigation'
import ReadingProgress from '@/components/ReadingProgress'
import ViewCounter from '@/components/ViewCounter'
import ShareButton from '@/components/ShareButton'
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from '@/lib/structured-data'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return genMeta(params.slug)
}

interface Page {
  title: string
  url: string
  category: string
  keywords?: string[]
  description?: string
  content?: string
}

const pages = searchData.pages as Page[]
const htmlContents = pageContents as Record<string, string>

function getPageBySlug(slug: string): Page | undefined {
  return pages.find((page) => {
    const pageSlug = page.url.replace(/^detail-/, '').replace(/\.html$/, '')
    return pageSlug === slug
  })
}

function getCategorySlugFromCategory(category: string): string {
  const map: Record<string, string> = {
    'S.S.S.': 'sss',
    'Bonuslar & Etkinlikler': 'bonuslar',
    'Para Yatırma': 'para-yatirma-yontemleri',
    'Para Çekme': 'para-cekme-yontemleri',
    'Hesabım': 'hesabim',
    'İletişim': 'iletisim',
    'Kurallar & Şartlar': 'kurallar-sartlar',
    'Canlı Casino & Slot Oyunları': 'canli-casino-slot-oyunlari',
  }
  return map[category] || category.toLowerCase().replace(/\s+/g, '-')
}

function sanitizeHTML(html: string): string {
  // Basic HTML sanitization - remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/href="#"/gi, 'href="#" onclick="return false;"')
}

export default function DetailPage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  // Get HTML content from page-contents.json, fallback to search-data content
  const htmlContent = htmlContents[params.slug] || page.content || ''
  const hasHtmlContent = !!htmlContents[params.slug]
  
  // Content for TableOfContents (sanitized HTML)
  const contentForTOC = hasHtmlContent && htmlContent 
    ? sanitizeHTML(htmlContent)
    : htmlContent || page.content || ''

  // Structured data
  const articleStructuredData = generateArticleStructuredData({
    title: page.title,
    description: page.description || `${page.title} hakkında bilgiler`,
    url: `/detail/${params.slug}`,
    category: page.category,
  })

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Ana Sayfa', url: '/' },
    { name: page.category, url: `/category/${getCategorySlugFromCategory(page.category)}` },
    { name: page.title, url: `/detail/${params.slug}` },
  ])

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <section className="detail-header">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <Link href={`/category/${getCategorySlugFromCategory(page.category)}`}>{page.category}</Link>
            <span>/</span>
            <span>{page.title}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h1 className="page-title">{page.title}</h1>
              <p className="page-subtitle">{page.description || page.category}</p>
            </div>
            <FavoriteButton 
              slug={params.slug} 
              title={page.title}
              url={`/detail/${params.slug}`}
            />
          </div>
        </div>
      </section>
      <DetailPageClient 
        slug={params.slug}
        title={page.title}
        url={`/detail/${params.slug}`}
      />

      <main className="detail-content">
        <div className="container">
          <div className="detail-layout">
            <div className="detail-main">
              <div className="detail-meta">
                <div className="detail-meta-left">
                  <ReadingTime content={htmlContent || page.content || ''} />
                  <ViewCounter slug={params.slug} title={page.title} />
                </div>
                <div className="detail-meta-right">
                  <ShareButton 
                    title={page.title}
                    url={`/detail/${params.slug}`}
                    text={page.description}
                  />
                  <SocialShare 
                    title={page.title} 
                    url={`/detail/${params.slug}`}
                    description={page.description}
                  />
                </div>
              </div>

              <article className="detail-body">
                {hasHtmlContent && htmlContent ? (
                  <div
                    className="detail-content-html"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(htmlContent),
                    }}
                  />
                ) : htmlContent ? (
                  <div
                    className="detail-content-html"
                    dangerouslySetInnerHTML={{
                      __html: htmlContent
                        .split('\n')
                        .map((line) => {
                          if (line.startsWith('###')) {
                            return `<h3>${line.replace(/^###\s*/, '')}</h3>`
                          }
                          if (line.startsWith('##')) {
                            return `<h2>${line.replace(/^##\s*/, '')}</h2>`
                          }
                          if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                            return `<li>${line.replace(/^[-\*]\s+/, '')}</li>`
                          }
                          if (line.trim()) {
                            return `<p>${line}</p>`
                          }
                          return line
                        })
                        .join(''),
                    }}
                  />
                ) : (
                  <p>{page.description || 'İçerik yakında eklenecektir.'}</p>
                )}
              </article>

              <ArticleFeedback slug={params.slug} title={page.title} />

              {params.slug === '33-size-nasil-ulasabilirim' && (
                <SocialMediaSection />
              )}

              <ArticleNavigation 
                currentSlug={params.slug}
                category={page.category}
              />

              <RelatedArticles 
                currentSlug={params.slug} 
                category={page.category}
              />

              <div className="detail-navigation">
                <Link href={`/category/${getCategorySlugFromCategory(page.category)}`} className="nav-link-btn">
                  ← Kategoriye Dön
                </Link>
              </div>
            </div>

            <aside className="detail-sidebar">
              <TableOfContents content={contentForTOC} />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
