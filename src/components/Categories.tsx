import Link from 'next/link'

const categories = [
  {
    href: '/category/bonuslar',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Bonuslar & Etkinlikler',
    description: 'Kampanyalar ve özel teklifler'
  },
  {
    href: '/category/sss',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Sıkça Sorulan Sorular',
    description: 'En çok merak edilenler'
  },
  {
    href: '/category/para-yatirma-yontemleri',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: 'Para Yatırma',
    description: 'Hızlı ve güvenli ödeme yöntemleri'
  },
  {
    href: '/category/para-cekme-yontemleri',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Para Çekme',
    description: 'Anında çekim işlemleri'
  },
  {
    href: '/category/hesabim',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Hesabım',
    description: 'Hesap yönetimi ve ayarları'
  },
  {
    href: '/category/iletisim',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'İletişim',
    description: 'Bize ulaşın, size yardımcı olalım'
  },
  {
    href: '/category/kurallar-sartlar',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Kurallar & Şartlar',
    description: 'Tüm kurallar ve koşullar'
  },
  {
    href: '/category/canli-casino-slot-oyunlari',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: 'Casino & Slot Oyunları',
    description: 'Oyunlar ve kuralları'
  },
]

export default function Categories() {
  return (
    <section className="categories-clean" id="categories">
      <div className="container-clean">
        <div className="section-header-clean">
          <h2 className="section-title-clean">Kategoriler</h2>
          <p className="section-subtitle-clean">
            Size yardımcı olmak için hazırladığımız rehberler
          </p>
        </div>
        <div className="categories-grid-clean">
          {categories.map((category) => (
            <Link 
              key={category.href} 
              href={category.href} 
              className="category-card-clean"
            >
              <div className="category-icon-clean">
                {category.icon}
              </div>
              <h3 className="category-title-clean">{category.title}</h3>
              <p className="category-description-clean">{category.description}</p>
              <span className="category-arrow-clean">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}