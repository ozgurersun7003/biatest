// URL mapping utilities for converting HTML URLs to Next.js routes

export const categoryMapping: Record<string, string> = {
  'category-10-diger-bonuslar-ve-etkinlikler.html': 'diger-bonuslar-ve-etkinlikler',
  'category-11-sikca-sorulan-sorular.html': 'sikca-sorulan-sorular',
  'category-13-bonuslar.html': 'bonuslar',
  'category-14-para-yatirma-yontemleri.html': 'para-yatirma-yontemleri',
  'category-20-iletisim.html': 'iletisim',
  'category-21-sss.html': 'sss',
  'category-23-para-yatirma-yontemleri.html': 'para-yatirma-yontemleri',
  'category-24-para-cekme-yontemleri.html': 'para-cekme-yontemleri',
  'category-25-etkinlikler.html': 'etkinlikler',
  'category-26-kurallar-sartlar.html': 'kurallar-sartlar',
  'category-27-biabet.html': 'biabet',
  'category-28-biabet-iletisim.html': 'biabet-iletisim',
  'category-29-hesabim.html': 'hesabim',
  'category-30-canli-casino-slot-oyunlari.html': 'canli-casino-slot-oyunlari',
}

export const categoryNameMapping: Record<string, string> = {
  'diger-bonuslar-ve-etkinlikler': 'Diğer Bonuslar ve Etkinlikler',
  'sikca-sorulan-sorular': 'Sıkça Sorulan Sorular',
  'bonuslar': 'Bonuslar',
  'para-yatirma-yontemleri': 'Para Yatırma Yöntemleri',
  'iletisim': 'İletişim',
  'sss': 'S.S.S.',
  'para-cekme-yontemleri': 'Para Çekme Yöntemleri',
  'etkinlikler': 'Etkinlikler',
  'kurallar-sartlar': 'Kurallar & Şartlar',
  'biabet': 'Hakkımızda',
  'biabet-iletisim': 'Biabet İletişim',
  'hesabim': 'Hesabım',
  'canli-casino-slot-oyunlari': 'Canlı Casino & Slot Oyunları',
}

export function getCategorySlug(htmlUrl: string): string {
  return categoryMapping[htmlUrl] || htmlUrl.replace(/^category-/, '').replace(/\.html$/, '')
}

export function getCategoryName(slug: string): string {
  return categoryNameMapping[slug] || slug
}

export function getDetailSlug(htmlUrl: string): string {
  return htmlUrl.replace(/^detail-/, '').replace(/\.html$/, '')
}

export function htmlUrlToNextRoute(htmlUrl: string): string {
  if (htmlUrl.startsWith('category-')) {
    const slug = getCategorySlug(htmlUrl)
    return `/category/${slug}`
  }
  if (htmlUrl.startsWith('detail-')) {
    const slug = getDetailSlug(htmlUrl)
    return `/detail/${slug}`
  }
  if (htmlUrl === 'index.html' || htmlUrl === '/') {
    return '/'
  }
  return htmlUrl
}

export function getCategoryFromSlug(slug: string): string {
  // Map slug to category name used in search-data.json
  const map: Record<string, string> = {
    'sss': 'S.S.S.',
    'sikca-sorulan-sorular': 'S.S.S.',
    'bonuslar': 'Bonuslar & Etkinlikler',
    'diger-bonuslar-ve-etkinlikler': 'Bonuslar & Etkinlikler',
    'etkinlikler': 'Bonuslar & Etkinlikler',
    'para-yatirma-yontemleri': 'Para Yatırma',
    'para-cekme-yontemleri': 'Para Çekme',
    'hesabim': 'Hesabım',
    'iletisim': 'İletişim',
    'biabet-iletisim': 'Biabet İletişim',
    'biabet': 'Biabet İletişim',
    'kurallar-sartlar': 'Kurallar & Şartlar',
    'canli-casino-slot-oyunlari': 'Canlı Casino & Slot Oyunları',
  }
  return map[slug] || getCategoryName(slug)
}