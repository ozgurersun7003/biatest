# Featured Card Component - Yatay Tasarım

**Versiyon:** 1.0  
**Tarih:** 15 Ocak 2026  
**Tasarım:** Modern, yatay (horizontal) kart tasarımı

---

## 📋 GENEL BAKIŞ

Modern, yatay featured card component'i. Görsel sol tarafta, içerik sağ tarafta. Responsive, glassmorphism badge'li, hover animasyonlu.

**Özellikler:**
- ✅ Yatay (horizontal) layout
- ✅ Görsel + İçerik yan yana
- ✅ Glassmorphism badge
- ✅ Hover animasyonları
- ✅ Responsive (mobilde vertical'e dönüşür)
- ✅ Dark/Light theme desteği
- ✅ Placeholder desteği (görsel yoksa gradient)
- ❌ İkon YOK (kaldırıldı)

---

## 🎨 GÖRSEL ÖNIZLEME

```
┌─────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  │          │  ┃ 🏷️ Yeni                            ┃  │
│  │          │  ┃                                     ┃  │
│  │  GÖRSEL  │  ┃ Evolution Euro Kick Off Etkinliği  ┃  │
│  │          │  ┃ Büyük ödüllerle dolu etkinlik      ┃  │
│  │          │  ┃                                     ┃  │
│  │          │  ┃ Son Güncelleme: Bugün          →   ┃  │
│  └──────────┘  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 COMPONENT KODU

### TypeScript/React Component

```tsx
// FeaturedCardHorizontal.tsx

import Link from 'next/link'
import Image from 'next/image'

interface FeaturedCardProps {
  href: string
  badge: string
  badgeColor: 'yellow' | 'red' | 'blue' | 'purple' | 'green' | 'orange'
  title: string
  description: string
  date: string
  image?: string
  hasPlaceholder?: boolean
}

export default function FeaturedCardHorizontal({
  href,
  badge,
  badgeColor,
  title,
  description,
  date,
  image,
  hasPlaceholder = false
}: FeaturedCardProps) {
  return (
    <Link 
      href={href} 
      className="featured-card-horizontal"
    >
      {/* Sol Taraf - Görsel/Placeholder */}
      <div className="featured-card-image">
        {hasPlaceholder || !image ? (
          // Placeholder gradient background
          <div 
            className="featured-card-placeholder" 
            data-color={badgeColor}
          >
            <div className="placeholder-pattern"></div>
          </div>
        ) : (
          // Gerçek görsel
          <Image 
            src={image} 
            alt={title}
            fill
            className="featured-card-img"
            style={{ objectFit: 'cover' }}
          />
        )}
        
        {/* Badge - Sol üst köşe */}
        <div 
          className="featured-card-badge" 
          data-color={badgeColor}
        >
          {badge}
        </div>
      </div>
      
      {/* Sağ Taraf - İçerik */}
      <div className="featured-card-content">
        <h3 className="featured-card-title">{title}</h3>
        <p className="featured-card-description">{description}</p>
        
        <div className="featured-card-footer">
          <span className="featured-card-date">{date}</span>
          <span className="featured-card-arrow">→</span>
        </div>
      </div>
    </Link>
  )
}
```

---

## 🎨 CSS STYLES

### Tam CSS Kodu

```css
/* ============================================
   FEATURED CARD HORIZONTAL
   Modern yatay kart tasarımı
   ============================================ */

/* Ana Container */
.featured-card-horizontal {
  display: flex;
  flex-direction: row;
  gap: 0;
  background: var(--card-bg, #ffffff);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08),
              0 2px 4px 0 rgba(0, 0, 0, 0.04);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.08);
  height: 180px;
}

.featured-card-horizontal:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.12),
              0 8px 16px 0 rgba(0, 0, 0, 0.08),
              0 4px 16px rgba(255, 215, 0, 0.25);
  border-color: rgba(255, 215, 0, 0.5);
}

/* ============================================
   SOL TARAF - GÖRSEL
   ============================================ */

.featured-card-image {
  position: relative;
  width: 280px;
  flex-shrink: 0;
  overflow: hidden;
}

.featured-card-img {
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card-horizontal:hover .featured-card-img {
  transform: scale(1.05);
}

/* Placeholder Gradients */
.featured-card-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.featured-card-placeholder[data-color="yellow"] {
  background: linear-gradient(135deg, #FFD700 0%, #FDB813 100%);
}

.featured-card-placeholder[data-color="red"] {
  background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
}

.featured-card-placeholder[data-color="blue"] {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
}

.featured-card-placeholder[data-color="purple"] {
  background: linear-gradient(135deg, #A855F7 0%, #7C3AED 100%);
}

.featured-card-placeholder[data-color="green"] {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}

.featured-card-placeholder[data-color="orange"] {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
}

/* Placeholder Pattern (optional decoration) */
.placeholder-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

/* Badge - Glassmorphism */
.featured-card-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 16px;
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  z-index: 2;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;
}

.featured-card-badge[data-color="yellow"] {
  background: rgba(255, 215, 0, 0.95);
  color: #0A4D52;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.featured-card-badge[data-color="red"] {
  background: rgba(239, 68, 68, 0.95);
  color: white;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.featured-card-badge[data-color="blue"] {
  background: rgba(59, 130, 246, 0.95);
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.featured-card-badge[data-color="purple"] {
  background: rgba(168, 85, 247, 0.95);
  color: white;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.featured-card-badge[data-color="green"] {
  background: rgba(16, 185, 129, 0.95);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.featured-card-badge[data-color="orange"] {
  background: rgba(245, 158, 11, 0.95);
  color: white;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.featured-card-horizontal:hover .featured-card-badge {
  transform: scale(1.05);
}

/* ============================================
   SAĞ TARAF - İÇERİK
   ============================================ */

.featured-card-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--card-bg, #ffffff);
}

.featured-card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 8px;
  color: var(--text-primary, #171717);
  transition: color 0.25s ease;
}

.featured-card-horizontal:hover .featured-card-title {
  color: #FFD700;
}

.featured-card-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary, #525252);
  margin-bottom: 16px;
  flex: 1;
}

/* Footer */
.featured-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.featured-card-date {
  font-size: 12px;
  color: var(--text-tertiary, #737373);
  font-weight: 600;
}

.featured-card-arrow {
  font-size: 24px;
  color: var(--text-tertiary, #737373);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card-horizontal:hover .featured-card-arrow {
  color: #FFD700;
  transform: translateX(4px);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

/* ============================================
   DARK THEME
   ============================================ */

[data-theme="dark"] .featured-card-horizontal {
  background: rgba(26, 95, 122, 0.3);
  border-color: rgba(255, 215, 0, 0.15);
}

[data-theme="dark"] .featured-card-content {
  background: rgba(26, 95, 122, 0.3);
}

[data-theme="dark"] .featured-card-title {
  color: #F9FAFB;
}

[data-theme="dark"] .featured-card-description {
  color: #E5E7EB;
}

[data-theme="dark"] .featured-card-date {
  color: #9CA3AF;
}

[data-theme="dark"] .featured-card-arrow {
  color: #9CA3AF;
}

[data-theme="dark"] .featured-card-horizontal:hover {
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.5),
              0 8px 16px 0 rgba(0, 0, 0, 0.3),
              0 4px 16px rgba(255, 215, 0, 0.25);
}

/* ============================================
   RESPONSIVE - MOBILE
   ============================================ */

@media (max-width: 768px) {
  /* Mobilde vertical'e dön */
  .featured-card-horizontal {
    flex-direction: column;
    height: auto;
  }
  
  .featured-card-image {
    width: 100%;
    height: 200px;
  }
  
  .featured-card-content {
    padding: 20px;
  }
  
  .featured-card-title {
    font-size: 18px;
  }
  
  .featured-card-description {
    font-size: 13px;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .featured-card-image {
    width: 240px;
  }
  
  .featured-card-content {
    padding: 20px;
  }
}
```

---

## 📦 KULLANIM ÖRNEKLERİ

### Örnek 1: Gerçek Görsel ile

```tsx
<FeaturedCardHorizontal
  href="/detail/31-evolution-euro-kick-off-etkinligi"
  badge="Yeni"
  badgeColor="yellow"
  title="Evolution Euro Kick Off Etkinliği"
  description="Büyük ödüllerle dolu etkinlik"
  date="Son Güncelleme: Bugün"
  image="/img/eurokickoff_etkinlik.png"
  hasPlaceholder={false}
/>
```

### Örnek 2: Placeholder ile (Görsel Yok)

```tsx
<FeaturedCardHorizontal
  href="/detail/209-100000-tl-odullu-yarismasi"
  badge="🔥 Sıcak"
  badgeColor="red"
  title="100.000 TL Ödüllü Yarışma"
  description="İlk Max Win yarışması başladı!"
  date="Aktif"
  hasPlaceholder={true}
/>
```

### Örnek 3: Liste Halinde

```tsx
const featuredItems = [
  {
    href: '/detail/1',
    badge: 'Yeni',
    badgeColor: 'yellow',
    title: 'Evolution Euro Kick Off',
    description: 'Büyük ödüllerle dolu etkinlik',
    date: 'Bugün',
    image: '/img/eurokickoff.png'
  },
  {
    href: '/detail/2',
    badge: '🔥 Sıcak',
    badgeColor: 'red',
    title: '100.000 TL Ödüllü Yarışma',
    description: 'Max Win yarışması!',
    date: 'Aktif',
    hasPlaceholder: true
  },
  // ...
]

// Render
<div className="featured-cards-grid">
  {featuredItems.map((item) => (
    <FeaturedCardHorizontal key={item.href} {...item} />
  ))}
</div>
```

### Grid CSS

```css
.featured-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin: 40px 0;
}

@media (min-width: 1024px) {
  .featured-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 🎨 BADGE RENK REFERANSı

| Renk | Kullanım | Gradient |
|------|----------|----------|
| `yellow` | Yeni, Özel | Gold gradient |
| `red` | Sıcak, Acil | Orange-Red gradient |
| `blue` | Bilgi, Aktif | Blue gradient |
| `purple` | Premium, Sürekli | Purple gradient |
| `green` | Başarı, Onay | Green gradient |
| `orange` | Dikkat, Trend | Orange gradient |

---

## 📐 BOYUTLAR VE SPACING

```
Desktop:
┌─────────────────────────────┐
│ Height: 180px               │
│ Image Width: 280px          │
│ Content Padding: 24px       │
│ Gap: 0 (seamless)           │
│ Border Radius: 20px         │
└─────────────────────────────┘

Mobile:
┌───────────┐
│ Height:   │
│ auto      │
│ Image:    │
│ 200px     │
│ Content:  │
│ 20px pad  │
└───────────┘
```

---

## 🔧 ÖZELLEŞTİRME

### Kart Yüksekliğini Değiştirmek

```css
.featured-card-horizontal {
  height: 200px; /* 180px → 200px */
}

@media (max-width: 768px) {
  .featured-card-horizontal {
    height: auto; /* Mobile'da otomatik */
  }
}
```

### Görsel Genişliğini Değiştirmek

```css
.featured-card-image {
  width: 320px; /* 280px → 320px */
}
```

### Badge Pozisyonunu Değiştirmek

```css
.featured-card-badge {
  top: 20px;    /* 16px → 20px */
  left: 20px;   /* 16px → 20px */
  /* VEYA sağ üst köşe için: */
  right: 20px;
  left: auto;
}
```

### Hover Animasyonunu Değiştirmek

```css
.featured-card-horizontal:hover {
  transform: translateY(-8px); /* -4px → -8px (daha fazla) */
}

.featured-card-horizontal:hover .featured-card-img {
  transform: scale(1.1); /* 1.05 → 1.1 (daha fazla zoom) */
}
```

---

## ♿ ACCESSIBILITY

### HTML Attributes (Eklenebilir)

```tsx
<Link 
  href={href} 
  className="featured-card-horizontal"
  aria-label={`${title} - ${description}`}
  role="article"
>
  {/* ... */}
</Link>
```

### Keyboard Navigation

```css
.featured-card-horizontal:focus-visible {
  outline: 2px solid #FFD700;
  outline-offset: 2px;
}
```

---

## 🧪 TEST CHECKLIST

- [ ] Desktop görünüm (1920x1080)
- [ ] Tablet görünüm (768x1024)
- [ ] Mobile görünüm (375x667)
- [ ] Hover animasyonları
- [ ] Dark mode
- [ ] Görsel yükleme (lazy loading)
- [ ] Placeholder görünümü
- [ ] Badge renkleri (6 varyant)
- [ ] Link çalışıyor
- [ ] Keyboard navigation
- [ ] Screen reader uyumu

---

## 📊 PERFORMANS

### Optimizasyon İpuçları

1. **Image Optimization:**
   ```tsx
   <Image
     src={image}
     alt={title}
     width={280}
     height={180}
     loading="lazy"
     placeholder="blur"
   />
   ```

2. **CSS Containment:**
   ```css
   .featured-card-horizontal {
     contain: layout style paint;
   }
   ```

3. **GPU Acceleration:**
   ```css
   .featured-card-horizontal {
     will-change: transform;
   }
   
   .featured-card-img {
     transform: translateZ(0); /* GPU'ya zorla */
   }
   ```

---

## 🐛 TROUBLESHOOTING

### Görsel Yüklenmiyor

```tsx
// Next.js Image component için
// next.config.js'de:
module.exports = {
  images: {
    domains: ['yourdomain.com'],
  },
}
```

### Dark Mode Çalışmıyor

```tsx
// Body'ye data-theme attribute eklenmiş mi kontrol et
<body data-theme="dark">
```

### Hover Animasyonları Laggy

```css
/* Sadece transform ve opacity kullan (GPU accelerated) */
.featured-card-horizontal:hover {
  transform: translateY(-4px); /* ✅ */
  box-shadow: ...; /* ✅ (composited) */
  /* ❌ width, height, top, left kullanma */
}
```

---

## 📚 DEPENDENCIES

### Required:
- Next.js (Image component için)
- React 18+

### Optional:
- TypeScript (type safety için)

### CSS Variables Gerekli:
```css
:root {
  --card-bg: #ffffff;
  --text-primary: #171717;
  --text-secondary: #525252;
  --text-tertiary: #737373;
}

[data-theme="dark"] {
  --card-bg: rgba(26, 95, 122, 0.3);
  --text-primary: #F9FAFB;
  --text-secondary: #E5E7EB;
  --text-tertiary: #9CA3AF;
}
```

---

## 🎓 BEST PRACTICES

1. **Always provide alt text** for images
2. **Use semantic HTML** (article, heading hierarchy)
3. **Keyboard accessible** (focus states)
4. **Mobile-first** responsive design
5. **Performance optimized** (lazy loading, GPU acceleration)
6. **Accessible colors** (WCAG AA contrast ratios)

---

## 📝 CHANGELOG

**v1.0 (15 Ocak 2026)**
- ✅ Initial release
- ✅ Yatay (horizontal) layout
- ✅ İkonlar kaldırıldı
- ✅ Glassmorphism badge
- ✅ 6 renk varyantı
- ✅ Dark theme desteği
- ✅ Responsive design
- ✅ Hover animasyonları

---

## 💡 ÖRNEK FULL SAYFA

```tsx
// pages/featured-demo.tsx

import FeaturedCardHorizontal from '@/components/FeaturedCardHorizontal'

export default function FeaturedDemo() {
  const items = [
    {
      href: '/detail/1',
      badge: 'Yeni',
      badgeColor: 'yellow' as const,
      title: 'Evolution Euro Kick Off Etkinliği',
      description: 'Büyük ödüllerle dolu etkinlik',
      date: 'Son Güncelleme: Bugün',
      image: '/img/eurokickoff_etkinlik.png'
    },
    {
      href: '/detail/2',
      badge: '🔥 Sıcak',
      badgeColor: 'red' as const,
      title: '100.000 TL Ödüllü Yarışma',
      description: 'İlk Max Win yarışması başladı!',
      date: 'Aktif',
      hasPlaceholder: true
    },
    {
      href: '/detail/3',
      badge: '⚔️ Aktif',
      badgeColor: 'blue' as const,
      title: 'Biabet Bonus Savaşları',
      description: 'Kazanma zamanı geldi!',
      date: 'Devam Ediyor',
      hasPlaceholder: true
    },
    {
      href: '/detail/4',
      badge: '🎉 Sürekli',
      badgeColor: 'purple' as const,
      title: 'Her Yatırıma FreeSpin',
      description: 'Her yatırımda bonus kazan',
      date: 'Sürekli',
      hasPlaceholder: true
    }
  ]

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '40px' }}>
        Öne Çıkanlar
      </h2>
      
      <div className="featured-cards-grid">
        {items.map((item) => (
          <FeaturedCardHorizontal key={item.href} {...item} />
        ))}
      </div>
    </div>
  )
}
```

---

## 🚀 QUICK START

1. **Component'i kopyala:** `FeaturedCardHorizontal.tsx`
2. **CSS'i ekle:** Proje CSS dosyasına kopyala
3. **CSS Variables'ı ekle:** Theme sistem varsa kullan
4. **Import et ve kullan:**
   ```tsx
   import FeaturedCardHorizontal from './FeaturedCardHorizontal'
   
   <FeaturedCardHorizontal
     href="/detail/1"
     badge="Yeni"
     badgeColor="yellow"
     title="Başlık"
     description="Açıklama"
     date="Bugün"
     image="/img/image.jpg"
   />
   ```

---

**Hazırlayan:** UI/UX Tasarım Agent  
**Tarih:** 15 Ocak 2026  
**Versiyon:** 1.0  
**License:** MIT

**Not:** Bu component production-ready ve başka projelere kolayca entegre edilebilir şekilde tasarlanmıştır. İkonlar kaldırılmış, yatay layout kullanılmıştır.
