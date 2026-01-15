import { SearchPage, SearchResult } from '@/lib/search'

export const mockSearchPages: SearchPage[] = [
  {
    title: 'Bonus Nasıl Alınır?',
    url: 'detail-bonus-nasil-alinir.html',
    category: 'Bonuslar & Etkinlikler',
    keywords: ['bonus', 'kampanya', 'promosyon'],
    description: 'Bonus alma rehberi',
    content: 'Bonus almak için...',
  },
  {
    title: 'Para Yatırma Yöntemleri',
    url: 'detail-para-yatirma-yontemleri.html',
    category: 'Para Yatırma',
    keywords: ['para yatırma', 'ödeme', 'deposit'],
    description: 'Para yatırma rehberi',
    content: 'Para yatırmak için...',
  },
]

export const mockSearchResults: SearchResult[] = mockSearchPages.map((page) => ({
  ...page,
  score: 1.0,
}))

export const mockCategories = [
  { href: '/category/bonuslar', title: 'Bonuslar & Etkinlikler' },
  { href: '/category/sss', title: 'Sıkça Sorulan Sorular' },
  { href: '/category/iletisim', title: 'İletişim' },
]
