import type { Metadata } from 'next'

export function generateMetadata(searchParams?: { q?: string }): Metadata {
  const query = searchParams?.q || ''
  const hasQuery = query.trim().length > 0

  if (hasQuery) {
    return {
      title: `"${query}" Arama Sonuçları`,
      description: `"${query}" için arama sonuçları. Sorularınızın cevaplarını hızlıca bulun.`,
      openGraph: {
        title: `"${query}" Arama Sonuçları`,
        description: `"${query}" için arama sonuçları`,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: `"${query}" Arama Sonuçları`,
        description: `"${query}" için arama sonuçları`,
      },
    }
  }

  return {
    title: 'Arama - Biabet Destek',
    description: 'Sorularınızın cevaplarını hızlıca bulun. Gelişmiş arama motoru ile istediğiniz bilgiye anında ulaşın.',
    openGraph: {
      title: 'Arama - Biabet Destek',
      description: 'Sorularınızın cevaplarını hızlıca bulun',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Arama - Biabet Destek',
      description: 'Sorularınızın cevaplarını hızlıca bulun',
    },
  }
}
