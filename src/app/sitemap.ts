import { MetadataRoute } from 'next'
import searchData from '@/../../public/search-data.json'
import { getCategorySlug, getDetailSlug, getCategoryFromSlug } from '@/lib/url-mapping'

interface Page {
  title: string
  url: string
  category: string
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  
  const pages = searchData.pages as Page[]
  
  // Ana sayfa
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Kategori sayfaları
  const categorySlugs = new Set<string>()
  pages.forEach((page) => {
    const category = page.category
    // Category mapping'den slug bul
    const categoryMap: Record<string, string> = {
      'S.S.S.': 'sss',
      'Bonuslar & Etkinlikler': 'bonuslar',
      'Para Yatırma': 'para-yatirma-yontemleri',
      'Para Çekme': 'para-cekme-yontemleri',
      'Hesabım': 'hesabim',
      'İletişim': 'iletisim',
      'Kurallar & Şartlar': 'kurallar-sartlar',
      'Canlı Casino & Slot Oyunları': 'canli-casino-slot-oyunlari',
      'Biabet İletişim': 'biabet-iletisim',
    }
    const slug = categoryMap[category] || category.toLowerCase().replace(/\s+/g, '-')
    if (slug) {
      categorySlugs.add(slug)
    }
  })

  categorySlugs.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Detail sayfaları
  pages.forEach((page) => {
    if (page.url.startsWith('detail-')) {
      const slug = getDetailSlug(page.url)
      routes.push({
        url: `${baseUrl}/detail/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  })

  return routes
}
