import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Featured from '@/components/Featured'
import RecentArticles from '@/components/RecentArticles'
import FavoritesWidget from '@/components/FavoritesWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biabet Destek - Yardım Merkezi',
  description: 'Sorularınızın cevaplarını hızlıca bulun. Bonuslar, para yatırma, para çekme ve daha fazlası hakkında bilgi alın.',
  keywords: ['biabet', 'destek', 'yardım', 'bonus', 'para yatırma', 'para çekme', 'sss'],
}

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Categories />
      <section className="widgets-section-clean">
        <div className="container-clean">
          <div className="widgets-grid-clean">
            <RecentArticles />
            <FavoritesWidget />
          </div>
        </div>
      </section>
    </>
  )
}
