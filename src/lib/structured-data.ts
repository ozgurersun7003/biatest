import { Metadata } from 'next'

interface ArticleStructuredData {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  author?: string
  category?: string
}

export function generateArticleStructuredData(data: ArticleStructuredData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: `${baseUrl}${data.url}`,
    datePublished: data.datePublished || new Date().toISOString(),
    dateModified: data.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: data.author || 'Biabet',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Biabet',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${data.url}`,
    },
    articleSection: data.category,
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateOrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Biabet',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: 'Turkish',
    },
  }
}
