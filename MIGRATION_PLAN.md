# Next.js Migrasyon Planı

## Durum Analizi
- **Toplam HTML dosyası:** 93
- **Kategori sayfaları:** 14
- **Detail sayfaları:** 76+
- **Diğer:** index.html, search.html, search-api.html

## Tamamlananlar ✅
1. Next.js projesi oluşturuldu
2. Temel componentler (Navbar, Footer, Hero, Categories, Featured, SearchEngine)
3. Dynamic routes (/category/[slug], /detail/[slug])
4. CSS aktarıldı
5. search-data.json kopyalandı
6. Ana sayfa oluşturuldu

## Yapılacaklar

### 1. HTML İçerik Veritabanı Oluşturma
- [ ] Tüm detail sayfalarının HTML içeriklerini extract et
- [ ] HTML içerikleri için ayrı bir JSON dosyası oluştur (page-contents.json)
- [ ] Veya search-data.json'u genişlet

### 2. Detail Sayfası Component Güncelleme
- [ ] HTML içeriklerini güvenli şekilde render eden component
- [ ] HTML parser/cleaner utility
- [ ] Markdown veya HTML sanitization

### 3. Kategori Sayfaları
- [ ] Tüm kategori slug'larını mapping'e ekle
- [ ] Kategori sayfalarını search-data.json'dan dinamik oluştur
- [ ] Eksik kategorileri ekle

### 4. URL Mapping
- [ ] HTML URL → Next.js route mapping fonksiyonu
- [ ] category-XX → /category/slug
- [ ] detail-XX → /detail/slug

### 5. Link Dönüşümü
- [ ] Tüm internal link'leri Next.js Link'e çevir
- [ ] Breadcrumb link'leri
- [ ] Navigation link'leri
- [ ] Footer link'leri

### 6. Metadata & SEO
- [ ] Her sayfa için metadata
- [ ] Dynamic metadata generation
- [ ] Open Graph tags
- [ ] JSON-LD structured data

### 7. Test & Debug
- [ ] Tüm sayfaları test et
- [ ] Link'leri kontrol et
- [ ] Responsive tasarımı kontrol et
- [ ] Performance optimizasyonu

## Strateji

### Yaklaşım 1: HTML İçerikleri JSON'da Tut
- Avantaj: Hızlı, tek kaynak
- Dezavantaj: Büyük JSON dosyası

### Yaklaşım 2: HTML Dosyalarını Public'e Kopyala ve Fetch Et
- Avantaj: Orijinal HTML korunur
- Dezavantaj: Client-side fetch gerekir

### Yaklaşım 3: HTML'den React Component'lerine Dönüştür
- Avantaj: En performanslı
- Dezavantaj: Çok fazla manuel iş

**Önerilen:** Yaklaşım 1 + 2 karışımı
- search-data.json'da metadata
- HTML içeriklerini ayrı bir JSON'da tut veya HTML'leri public'e kopyala
- Detail sayfasında HTML'i render et
