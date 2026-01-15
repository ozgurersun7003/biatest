import { Metadata } from 'next'
import { getCategoryName, getCategoryFromSlug } from '@/lib/url-mapping'
import searchData from '@/../../public/search-data.json'

interface Page {
  category: string
}

export function generateMetadata(slug: string): Metadata {
  const categoryName = getCategoryName(slug)
  const categoryTitle = getCategoryFromSlug(slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  const url = `${baseUrl}/category/${slug}`
  
  const pages = searchData.pages as Page[]
  const pageCount = pages.filter(p => p.category === categoryTitle || p.category === categoryName).length

  return {
    title: categoryName,
    description: `${categoryName} kategorisinde ${pageCount} makale bulunmaktadır. ${categoryName} hakkında tüm bilgileri burada bulabilirsiniz.`,
    openGraph: {
      title: categoryName,
      description: `${categoryName} kategorisinde ${pageCount} makale`,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: categoryName,
      description: `${categoryName} kategorisi`,
    },
    alternates: {
      canonical: url,
    },
  }
}
