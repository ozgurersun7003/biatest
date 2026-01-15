import { notFound } from 'next/navigation'
import Link from 'next/link'
import searchData from '@/../../public/search-data.json'
import { getCategoryFromSlug, getCategoryName, getDetailSlug } from '@/lib/url-mapping'
import { generateMetadata as genMeta } from './metadata'
import ContactForm from '@/components/ContactForm'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return genMeta(params.slug)
}

interface Page {
  title: string
  url: string
  category: string
  keywords?: string[]
  description?: string
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categorySlug = params.slug
  const categoryTitle = getCategoryFromSlug(categorySlug)
  const categoryDisplayName = getCategoryName(categorySlug) || categoryTitle

  const pages = (searchData.pages as Page[]).filter(
    (page) => page.category === categoryTitle || page.category === categoryDisplayName
  )

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Anasayfa</Link>
            <span>/</span>
            <span>{categoryTitle}</span>
          </nav>
          <h1 className="page-title">{categoryDisplayName}</h1>
          <p className="page-subtitle">
            {pages.length > 0 ? 'Kategori içeriği' : 'Bu kategoride henüz içerik bulunmamaktadır'}
          </p>
        </div>
      </section>

      <main className="page-content">
        <div className="container">
          {categorySlug === 'iletisim' ? (
            <div className="contact-page-content">
              <div className="contact-info">
                <h2>Bize Ulaşın</h2>
                <p>Sorularınız, önerileriniz veya destek talepleriniz için aşağıdaki formu doldurun. En kısa sürede size dönüş yapacağız.</p>
              </div>
              <ContactForm />
            </div>
          ) : pages.length > 0 ? (
            <div className="categories-grid" style={{ marginTop: '32px' }}>
              {pages.map((page) => (
                <Link
                  key={page.url}
                  href={`/detail/${getDetailSlug(page.url)}`}
                  className="category-card"
                >
                  <div className="card-icon">
                    <svg width="32" height="32" viewBox="0 0 20 18.4" fill="none">
                      <path
                        d="M17.25 0H2.75A2.753 2.753 0 000 2.75v8.874a2.753 2.753 0 002.74 2.75v4.027l5.787-4.027h8.723a2.753 2.753 0 002.75-2.75V2.75A2.753 2.753 0 0017.25 0z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="card-title">{page.title}</h3>
                  <p className="card-description">{page.description || page.category}</p>
                  <div className="card-arrow">→</div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 24px',
              color: 'var(--text-secondary)'
            }}>
              <svg 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ margin: '0 auto 24px', opacity: 0.5 }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <h2 style={{ 
                fontSize: '24px', 
                marginBottom: '16px',
                color: 'var(--text-primary)'
              }}>
                İçerik Bulunamadı
              </h2>
              <p style={{ marginBottom: '32px' }}>
                Bu kategoride henüz içerik eklenmemiştir. Lütfen daha sonra tekrar kontrol edin.
              </p>
              <Link href="/" className="btn-primary">
                Ana Sayfaya Dön
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}