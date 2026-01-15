import { Metadata } from 'next'
import searchData from '@/../../public/search-data.json'

interface Page {
  title: string
  url: string
  category: string
  description?: string
  keywords?: string[]
}

export function generateMetadata(slug: string): Metadata {
  const pages = searchData.pages as Page[]
  const page = pages.find((p) => {
    const pageSlug = p.url.replace(/^detail-/, '').replace(/\.html$/, '')
    return pageSlug === slug
  })

  if (!page) {
    return {
      title: 'Sayfa Bulunamadı - Biabet Destek',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  const url = `${baseUrl}/detail/${slug}`
  const description = page.description || `${page.title} hakkında bilgiler`

  return {
    title: page.title,
    description,
    keywords: page.keywords || [],
    openGraph: {
      title: page.title,
      description,
      url,
      type: 'article',
      publishedTime: new Date().toISOString(),
      authors: ['Biabet'],
      tags: page.keywords || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description,
      creator: '@biabetresmi',
    },
    alternates: {
      canonical: url,
    },
  }
}
