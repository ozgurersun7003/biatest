# 🚀 Hızlı Başlangıç Kılavuzu

## ⚡ 5 Dakikada Başlayın

### 1. Kurulum
```bash
npm install
```

### 2. Environment Variables
`.env.local` dosyası oluştur:
```env
NEXT_PUBLIC_SITE_URL=https://biabetdestek.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Development
```bash
npm run dev
```

### 4. Production Build
```bash
npm run build
npm start
```

---

## 📋 Önemli Dosyalar

### İçerik Dosyaları
- `public/search-data.json` - Sayfa metadata
- `public/page-contents.json` - HTML içerikleri

### Config Dosyaları
- `next.config.js` - Next.js ayarları
- `.env.local` - Environment variables

### Component'ler
- `src/components/` - Tüm componentler
- `src/lib/` - Utility fonksiyonlar

---

## 🎯 Hızlı Özellikler

### Arama
- ⌘/Ctrl + K ile arama aç
- Arama geçmişi otomatik kaydedilir
- Kategori filtreleme mevcut

### Makale Özellikleri
- Reading time gösterilir
- View counter çalışır
- Social share butonları
- Related articles
- Table of contents

### Kullanıcı Özellikleri
- Favoriler (kalıcı)
- Son görüntülenenler
- Arama geçmişi

### PWA
- Mobilde install edilebilir
- Offline çalışır
- Service Worker aktif

---

## 🔧 Yaygın İşlemler

### Yeni İçerik Ekleme
1. `public/search-data.json`'a metadata ekle
2. `public/page-contents.json`'a HTML içerik ekle
3. Sitemap otomatik güncellenir

### Tema Değiştirme
- Sağ üstteki tema butonu
- localStorage'da saklanır

### Analytics
- Vercel Analytics otomatik
- GA4 için `NEXT_PUBLIC_GA_ID` gerekli

---

## 📞 Destek

Sorun yaşarsanız:
1. `README.md` dosyasını kontrol et
2. `PROJECT_COMPLETE.md` dosyasına bak
3. Development roadmap'i incele

---

**Hızlı Başlangıç**: ✅ Hazır!
