import FeaturedCarousel from './FeaturedCarousel'

interface FeaturedItem {
  href: string
  image?: string
  badge: string
  badgeColor: 'yellow' | 'red' | 'blue' | 'purple' | 'green' | 'orange'
  title: string
  description: string
  date: string
  hasPlaceholder?: boolean
}

const featured: FeaturedItem[] = [
  {
    href: '/detail/31-evolution-euro-kick-off-etkinligi',
    image: '/img/eurokickoff_etkinlik2.png',
    badge: 'Yeni',
    badgeColor: 'yellow',
    title: 'Evolution Euro Kick Off Etkinliği',
    description: 'Evolution Gaming\'in özel turnuvalarında büyük ödüller kazanın!',
    date: 'Son Güncelleme: Bugün',
    hasPlaceholder: false
  },
  {
    href: '/detail/209-100000-tl-odullu-ilk-max-win-yarismasi',
    image: '/img/maxwin_yarisma.png',
    badge: 'Sıcak',
    badgeColor: 'red',
    title: '100.000 TL Ödüllü İlk Max Win Yarışması',
    description: 'İlk Max Win\'i yapan oyunculara dev ödül havuzu!',
    date: 'Aktif',
    hasPlaceholder: false
  },
  {
    href: '/detail/210-biabet-bonus-savaslari-basladi',
    badge: 'Aktif',
    image: '/img/eurokickoff_etkinlik2.png',
    badgeColor: 'blue',
    title: 'Biabet Bonus Savaşları Başladı',
    description: 'Haftalık bonus yarışmasında yerinizi alın, kazanmaya başlayın!',
    date: 'Devam Ediyor',
    hasPlaceholder: true
  },
  {
    href: '/detail/211-her-yatirima-freespin-kampanyasi',
    image: '/img/maxwin_yarisma.png',
    badge: 'Sürekli',
    badgeColor: 'purple',
    title: 'Her Yatırıma FreeSpin Kampanyası',
    description: 'Her para yatırma işleminizde hediye freespin kazanın!',
    date: 'Sürekli',
    hasPlaceholder: true
  },
]

export default function Featured() {
  return (
    <section className="featured-clean">
      <div className="container-clean">
        <div className="section-header-clean">
          <h2 className="section-title-clean">Öne Çıkanlar</h2>
          <p className="section-subtitle-clean">
            En güncel kampanyalar ve özel teklifler
          </p>
        </div>
        <FeaturedCarousel items={featured} autoPlayInterval={5000} />
      </div>
    </section>
  )
}

export function FeaturedGrid() {
  return (
    <FeaturedCarousel items={featured} autoPlayInterval={5000} />
  )
}