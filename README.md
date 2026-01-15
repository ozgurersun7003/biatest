# Biabet Destek - Next.js

Modern, kullanıcı dostu ve production-ready yardım merkezi. Next.js 14, TypeScript ve React ile geliştirilmiştir.

## 🚀 Özellikler

### Temel Özellikler
- ⚡ Next.js 14 (App Router)
- 🎨 Modern ve responsive tasarım
- 🌙 Dark/Light tema desteği
- 🔍 Gelişmiş arama fonksiyonu
- 📱 Mobil uyumlu
- ♿ Erişilebilirlik özellikleri (WCAG 2.1 AA)
- 🎯 SEO optimizasyonu

### Gelişmiş Özellikler
- 🔄 PWA desteği (offline çalışma)
- 📊 Google Analytics 4 entegrasyonu
- 🔔 Service Worker (caching)
- ⌨️ Keyboard shortcuts
- 📈 Reading progress indicator
- 💾 Favoriler ve son görüntülenenler
- 🔗 Social share buttons
- 📝 İletişim formu
- ❓ FAQ Accordion
- 📰 RSS Feed
- 🎯 Structured data (Schema.org)
- ⚡ Performance optimizasyonları

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Environment variables ayarla
cp .env.example .env.local
# .env.local dosyasını düzenleyin

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Production server'ı başlat
npm start

# Lint kontrolü
npm run lint
```

Proje http://localhost:3000 adresinde çalışacaktır.

### Environment Variables

`.env.local` dosyasına şunları ekleyin:

```env
NEXT_PUBLIC_SITE_URL=https://biabetdestek.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📁 Proje Yapısı

```
red/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Ana sayfa
│   │   ├── category/[slug]/    # Kategori sayfaları
│   │   ├── detail/[slug]/      # Detay sayfaları
│   │   ├── search/             # Arama sayfası
│   │   ├── offline/            # Offline sayfası
│   │   ├── api/                # API routes
│   │   ├── sitemap.ts          # Sitemap
│   │   ├── robots.ts           # Robots.txt
│   │   ├── manifest.ts         # PWA Manifest
│   │   ├── icon.tsx            # Favicon
│   │   └── layout.tsx           # Root layout
│   ├── components/             # React Components (30+)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── SearchEngine.tsx
│   │   ├── BackToTop.tsx
│   │   ├── SocialShare.tsx
│   │   ├── ReadingTime.tsx
│   │   ├── ArticleFeedback.tsx
│   │   ├── RelatedArticles.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── SearchHistory.tsx
│   │   ├── RecentArticles.tsx
│   │   ├── FavoritesWidget.tsx
│   │   ├── ArticleNavigation.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ContactForm.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── ReadingProgress.tsx
│   │   ├── KeyboardShortcuts.tsx
│   │   ├── InstallPrompt.tsx
│   │   └── ... (daha fazla)
│   └── lib/                    # Utilities
│       ├── search.ts
│       ├── url-mapping.ts
│       ├── reading-time.ts
│       ├── search-history.ts
│       ├── recent-articles.ts
│       ├── favorites.ts
│       ├── structured-data.ts
│       ├── performance.ts
│       ├── image-optimization.ts
│       └── seo-utils.ts
├── public/
│   ├── search-data.json        # Arama verileri
│   ├── page-contents.json      # HTML içerikleri
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service Worker
├── next.config.js              # Next.js config
├── .env.example                # Environment variables örneği
└── README.md
```

## 📄 Sayfalar ve Özellikler

### Ana Sayfa (`/`)
- Hero bölümü
- Kategoriler
- Öne çıkan içerikler
- Arama kutusu
- Son görüntülenenler widget
- Favoriler widget

### Kategori Sayfaları (`/category/[slug]`)
- Kategori içeriği
- İlgili sayfalar listesi
- Breadcrumb navigasyonu
- İletişim formu (`/category/iletisim`)
- FAQ Accordion (`/category/sss`)

### Detay Sayfaları (`/detail/[slug]`)
- Tam HTML içerik
- Reading time
- View counter
- Social share buttons
- Table of contents
- Related articles
- Article feedback
- Article navigation (önceki/sonraki)
- Reading progress indicator
- Favorite button

### Arama Sayfası (`/search`)
- Arama sonuçları
- Kategori filtreleme
- Arama geçmişi
- Popüler aramalar
- Loading skeletons

### Diğer Sayfalar
- `/offline` - Offline sayfası
- `/sitemap.xml` - Sitemap
- `/robots.txt` - Robots.txt
- `/rss.xml` - RSS Feed

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS (globals.css)
- **Fonts**: Inter (Google Fonts, next/font)
- **Analytics**: Vercel Analytics, Google Analytics 4
- **PWA**: Service Worker, Web App Manifest
- **SEO**: Sitemap, Robots.txt, Structured Data, RSS Feed

## 📊 İstatistikler

- **Toplam Sayfa**: 76+ detail sayfası
- **Kategori**: 8 kategori
- **Component**: 30+ component
- **Utility Library**: 6+ utility
- **API Endpoints**: 3 endpoint
- **HTML İçerik**: 76 sayfa HTML içeriği
- **CSS Satırları**: 3300+
- **Özellikler**: 33+ özellik

## 🔄 İçerik Yönetimi

İçerikler şu dosyalarda tutulmaktadır:
- `public/search-data.json`: Sayfa metadata ve arama verileri
- `public/page-contents.json`: HTML içerikleri

İçerik güncellemeleri için bu dosyaları düzenleyin.

## 📝 Önemli Notlar

### İçerik Yönetimi
- Tüm HTML içerikler `page-contents.json` dosyasından gelmektedir
- Arama fonksiyonu `search-data.json` kullanmaktadır
- İçerik güncellemeleri için bu dosyaları düzenleyin

### Özellikler
- Dark/Light tema localStorage'da saklanır
- Favoriler, son görüntülenenler ve arama geçmişi localStorage'da saklanır
- Responsive tasarım mobil, tablet ve desktop için optimize edilmiştir
- PWA desteği aktif (production'da)
- Service Worker offline desteği sağlar

### SEO
- Sitemap otomatik oluşturulur (`/sitemap.xml`)
- Robots.txt otomatik oluşturulur (`/robots.txt`)
- RSS Feed mevcuttur (`/rss.xml`)
- Structured data (Schema.org) tüm sayfalarda

### Performance
- Image optimization (next/image)
- Code splitting
- Lazy loading
- Bundle optimization
- Security headers

## ⌨️ Keyboard Shortcuts

- **⌘/Ctrl + K**: Arama kutusunu aç
- **Esc**: Açık menüleri kapat
- **⌘/Ctrl + /**: Klavye kısayolları yardımı

## 🔒 Security Headers

Next.js config'de aşağıdaki security headers eklendi:
- X-DNS-Prefetch-Control
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## 🐛 Sorun Giderme

### Build Hatası
Eğer build hatası alırsanız:
```bash
rm -rf .next
npm run build
```

### Port Kullanımda
Farklı bir port kullanmak için:
```bash
PORT=3001 npm run dev
```

### Service Worker Sorunları
Service Worker'ı temizlemek için:
```bash
# Tarayıcı DevTools > Application > Service Workers > Unregister
```

### Cache Sorunları
Cache'i temizlemek için:
```bash
rm -rf .next
npm run dev
```

## 📚 Dokümantasyon

Detaylı dokümantasyon için:
- `DEVELOPMENT_ROADMAP.md` - Geliştirme planı
- `PRIORITY_TASKS.md` - Öncelikli görevler
- `IMPLEMENTATION_SUMMARY.md` - Uygulama özeti
- `FINAL_IMPLEMENTATION_SUMMARY.md` - Final özet

## 🚀 Production Deployment

### Vercel (Önerilen)
```bash
# Vercel CLI ile
vercel

# GitHub ile otomatik deploy
# Vercel dashboard'dan GitHub repo'yu bağla
```

### Environment Variables
Production'da şunları ayarlayın:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`

### Build
```bash
npm run build
npm start
```

## 📄 Lisans

Bu proje özel bir projedir.

---

**Versiyon**: 1.0.0  
**Son Güncelleme**: 2024
