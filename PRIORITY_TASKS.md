# 🎯 Öncelik Sırasına Göre Yapılacaklar Listesi

**Tarih:** 2024  
**Proje:** Biabet Destek Web Sitesi  
**Durum:** %70 Tamamlandı → %100 Production-Ready

---

## 🔴 FAZ 1: KRİTİK ÖNCELİK (Hemen Yapılmalı)

### ⚡ 1.1 Testing Infrastructure (2-3 hafta)
**Öncelik:** 🔴🔴🔴 EN YÜKSEK  
**Neden:** Production'da hatalar tespit edilemiyor, refactoring riskli

**Görevler:**
- [ ] Jest + React Testing Library kurulumu
- [ ] Playwright E2E test kurulumu
- [ ] Test utilities oluşturma (`tests/utils/`)
- [ ] Kritik component testleri (Navbar, SearchEngine, ContactForm)
- [ ] API route testleri (contact, feedback)
- [ ] E2E test senaryoları (ana akışlar)
- [ ] GitHub Actions CI/CD pipeline
- [ ] Pre-commit hooks (Husky + lint-staged)
- [ ] Test coverage raporlama (%80+ hedef)

**Komutlar:**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @playwright/test
npm install --save-dev @types/jest ts-jest
npx playwright install
```

**Dosyalar:**
- `jest.config.js`
- `playwright.config.ts`
- `tests/components/`
- `tests/api/`
- `tests/e2e/`
- `.github/workflows/ci.yml`

---

### ⚡ 1.2 Error Tracking & Monitoring (1 hafta)
**Öncelik:** 🔴🔴🔴 EN YÜKSEK  
**Neden:** Production hataları görünmüyor, kullanıcı deneyimi etkileniyor

**Görevler:**
- [ ] Sentry SDK kurulumu
- [ ] Sentry configuration (client + server)
- [ ] Error boundary'leri Sentry'ye bağlama
- [ ] Performance monitoring setup
- [ ] Custom error tracking utilities
- [ ] Error alerting configuration
- [ ] Production error dashboard kurulumu
- [ ] Console.log'ları production'da kaldırma

**Komutlar:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Dosyalar:**
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `src/lib/sentry.ts`
- `.sentryclirc`

---

### ⚡ 1.3 Database & Data Persistence (2-3 hafta)
**Öncelik:** 🔴🔴🔴 EN YÜKSEK  
**Neden:** Veri kaybı riski, ölçeklenebilirlik sorunu, feedback/contact verileri kaydedilmiyor

**Görevler:**
- [ ] Database seçimi (PostgreSQL önerilir)
- [ ] Prisma ORM kurulumu
- [ ] Schema tasarımı (Articles, Categories, Feedback, Contacts, Users)
- [ ] Migration dosyaları oluşturma
- [ ] API routes'ları database'e bağlama
- [ ] JSON dosyalarından database'e migration script
- [ ] Data seeding scripts
- [ ] Backup strategy (otomatik yedekleme)
- [ ] Connection pooling configuration

**Komutlar:**
```bash
npm install prisma @prisma/client
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```

**Dosyalar:**
- `prisma/schema.prisma`
- `prisma/migrations/`
- `src/lib/db.ts`
- `scripts/migrate-json-to-db.ts`
- `scripts/seed.ts`

**Schema Örneği:**
```prisma
model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  category    String
  keywords    String[]
  description String?
  views       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  feedbacks   Feedback[]
}

model Feedback {
  id        String   @id @default(cuid())
  articleId String
  article   Article  @relation(fields: [articleId], references: [id])
  helpful   Boolean
  comment   String?
  createdAt DateTime @default(now())
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  status    String   @default("pending") // pending, replied, closed
  createdAt DateTime @default(now())
}
```

---

### ⚡ 1.4 Email Service Integration (1 hafta)
**Öncelik:** 🔴🔴 YÜKSEK  
**Neden:** Kullanıcı mesajları ulaşmıyor, contact form çalışmıyor

**Görevler:**
- [ ] Email service provider seçimi (Resend önerilir)
- [ ] Resend API key configuration
- [ ] Email template oluşturma (React Email)
- [ ] Contact form email entegrasyonu
- [ ] Email validation iyileştirmeleri
- [ ] Spam protection (reCAPTCHA veya hCaptcha)
- [ ] Email queue system (opsiyonel - BullMQ)
- [ ] Email delivery tracking

**Komutlar:**
```bash
npm install resend
npm install react-email @react-email/components
```

**Dosyalar:**
- `src/lib/email.ts`
- `src/templates/email/contact.tsx`
- `src/app/api/contact/route.ts` (güncelleme)
- `.env` (RESEND_API_KEY)

**Email Template Örneği:**
```tsx
// src/templates/email/contact.tsx
import { Html, Head, Body, Container, Section, Text } from '@react-email/components'

export function ContactEmailTemplate({ name, email, subject, message }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text><strong>İsim:</strong> {name}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Konu:</strong> {subject}</Text>
            <Text><strong>Mesaj:</strong></Text>
            <Text>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

---

### ⚡ 1.5 Security & Rate Limiting (1 hafta)
**Öncelik:** 🔴🔴 YÜKSEK  
**Neden:** Spam ve güvenlik riskleri, API abuse riski

**Görevler:**
- [ ] Rate limiting middleware (Upstash Rate Limit)
- [ ] CSRF token implementation
- [ ] Input sanitization utilities iyileştirme
- [ ] Security headers güncelleme (CSP policy)
- [ ] XSS protection iyileştirmeleri
- [ ] SQL injection protection (Prisma ile otomatik)
- [ ] API authentication (JWT veya API keys)
- [ ] Security audit (npm audit, Snyk)
- [ ] Penetration testing (opsiyonel)

**Komutlar:**
```bash
npm install @upstash/ratelimit @upstash/redis
npm install csrf
npm install dompurify
npm install @types/dompurify
```

**Dosyalar:**
- `src/middleware.ts` (güncelleme)
- `src/lib/rate-limit.ts`
- `src/lib/security.ts`
- `src/lib/sanitize.ts`
- `next.config.js` (CSP headers)

**Rate Limiting Örneği:**
```typescript
// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
})
```

---

## 🟡 FAZ 2: ÖNEMLİ ÖNCELİK (Yakın Zamanda)

### 📝 2.1 Content Management System (CMS) (3-4 hafta)
**Öncelik:** 🟡🟡 ORTA  
**Neden:** İçerik güncellemeleri zor, teknik bilgi gerekiyor

**Görevler:**
- [ ] NextAuth.js kurulumu (admin authentication)
- [ ] Admin dashboard UI oluşturma
- [ ] Rich text editor (Tiptap veya Lexical)
- [ ] Media upload system (image upload)
- [ ] Content CRUD operations (Create, Read, Update, Delete)
- [ ] Content preview functionality
- [ ] Content versioning system
- [ ] Approval workflow (draft → review → published)
- [ ] Category management
- [ ] Bulk operations

**Komutlar:**
```bash
npm install next-auth
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
npm install react-dropzone
```

**Dosyalar:**
- `src/app/admin/` (dashboard, articles, categories, media)
- `src/components/admin/` (editor, media-upload, preview)
- `src/lib/cms/` (utilities)

---

### 🌍 2.2 Internationalization (i18n) (2 hafta)
**Öncelik:** 🟡🟡 ORTA  
**Neden:** Uluslararası kullanıcılar için erişilebilirlik düşük

**Görevler:**
- [ ] next-intl kurulumu
- [ ] Translation files oluşturma (TR, EN, RU)
- [ ] Language switcher component
- [ ] URL routing configuration (/tr/, /en/, /ru/)
- [ ] Content translation (mevcut içerikler)
- [ ] SEO için hreflang tags
- [ ] Date/number formatting (locale-aware)

**Komutlar:**
```bash
npm install next-intl
```

**Dosyalar:**
- `src/i18n/request.ts`
- `messages/tr.json`, `messages/en.json`, `messages/ru.json`
- `src/components/LanguageSwitcher.tsx`
- `src/middleware.ts` (i18n routing)

---

### 🔍 2.3 Advanced Search Features (2 hafta)
**Öncelik:** 🟡🟡 ORTA  
**Neden:** Arama sonuçları optimize edilebilir, fuzzy search yok

**Görevler:**
- [ ] Fuzzy search implementation (Fuse.js)
- [ ] Search suggestions API endpoint
- [ ] Search analytics tracking
- [ ] Search ranking algorithm iyileştirme
- [ ] Search result caching (Redis)
- [ ] Search autocomplete iyileştirmeleri
- [ ] Search filters (date, category, popularity)
- [ ] Search result highlighting iyileştirme

**Komutlar:**
```bash
npm install fuse.js
```

**Dosyalar:**
- `src/lib/search-advanced.ts`
- `src/app/api/search/suggestions/route.ts`
- `src/app/api/search/analytics/route.ts`

---

### 📚 2.4 Documentation (2 hafta)
**Öncelik:** 🟡 ORTA  
**Neden:** Yeni geliştiriciler için onboarding zor

**Görevler:**
- [ ] Storybook kurulumu
- [ ] Component stories yazma (kritik componentler)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Developer guide yazma
- [ ] Code comments ekleme (JSDoc)
- [ ] Architecture documentation
- [ ] Deployment guide
- [ ] Troubleshooting guide

**Komutlar:**
```bash
npx storybook@latest init
npm install swagger-jsdoc swagger-ui-react
```

**Dosyalar:**
- `.storybook/`
- `docs/` (developer-guide.md, api-docs.md, architecture.md)
- `swagger.json`

---

### 📈 2.5 Advanced Analytics (2 hafta)
**Öncelik:** 🟡 ORTA  
**Neden:** Data-driven kararlar alınamıyor

**Görevler:**
- [ ] Custom analytics dashboard UI
- [ ] User behavior tracking (heatmaps, click tracking)
- [ ] Conversion funnel tracking
- [ ] A/B testing framework (Vercel Edge Config)
- [ ] Analytics API endpoints
- [ ] Real-time analytics
- [ ] Export functionality (CSV, PDF)

**Komutlar:**
```bash
npm install @vercel/flags
npm install recharts # for charts
```

**Dosyalar:**
- `src/app/admin/analytics/` (dashboard, reports)
- `src/components/analytics/` (charts, metrics)
- `src/lib/analytics-advanced.ts`

---

## 🟢 FAZ 3: İYİLEŞTİRME (Gelecekte)

### 💬 3.1 Live Chat Support (2 hafta)
**Öncelik:** 🟢 DÜŞÜK  
**Neden:** Anlık destek sağlanamıyor

**Görevler:**
- [ ] Live chat widget (Crisp, Intercom, veya custom)
- [ ] Chatbot integration (ChatGPT API veya Dialogflow)
- [ ] Support ticket system
- [ ] Chat history
- [ ] Admin chat interface
- [ ] Offline message handling

**Komutlar:**
```bash
npm install react-live-chat-loader
# veya custom implementation
```

**Dosyalar:**
- `src/components/LiveChat.tsx`
- `src/app/api/chat/route.ts`
- `src/app/admin/tickets/` (ticket management)

---

### ⚡ 3.2 Advanced Caching (1 hafta)
**Öncelik:** 🟢 DÜŞÜK  
**Neden:** Performans daha da artırılabilir

**Görevler:**
- [ ] Redis cache integration (Upstash Redis)
- [ ] Cache utilities oluşturma
- [ ] CDN configuration (Cloudflare)
- [ ] Cache invalidation strategy
- [ ] Cache warming strategies
- [ ] ISR (Incremental Static Regeneration) optimization

**Komutlar:**
```bash
npm install @upstash/redis
```

**Dosyalar:**
- `src/lib/cache.ts`
- `src/lib/redis.ts`

---

### 🚀 3.3 Performance & Optimization (1 hafta)
**Öncelik:** 🟢 DÜŞÜK  
**Neden:** Sayfa yükleme hızı daha da artırılabilir

**Görevler:**
- [ ] Image CDN integration (Cloudinary veya Imgix)
- [ ] Font subsetting ve optimization
- [ ] Bundle analyzer setup
- [ ] Code splitting optimization
- [ ] Lazy loading improvements
- [ ] Core Web Vitals monitoring
- [ ] Lighthouse CI integration

**Komutlar:**
```bash
npm install next-cloudinary
npm install @next/bundle-analyzer
```

**Dosyalar:**
- `src/lib/image-cdn.ts`
- `next.config.js` (bundle analyzer)

---

## 📊 Öncelik Özeti

### 🔴 KRİTİK (7-9 hafta)
1. **Testing Infrastructure** (2-3 hafta) - EN YÜKSEK ÖNCELİK
2. **Error Tracking** (1 hafta) - EN YÜKSEK ÖNCELİK
3. **Database Migration** (2-3 hafta) - EN YÜKSEK ÖNCELİK
4. **Email Integration** (1 hafta) - YÜKSEK ÖNCELİK
5. **Security & Rate Limiting** (1 hafta) - YÜKSEK ÖNCELİK

### 🟡 ÖNEMLİ (11-14 hafta)
6. **CMS** (3-4 hafta)
7. **i18n** (2 hafta)
8. **Advanced Search** (2 hafta)
9. **Documentation** (2 hafta)
10. **Advanced Analytics** (2 hafta)

### 🟢 İYİLEŞTİRME (4 hafta)
11. **Live Chat** (2 hafta)
12. **Advanced Caching** (1 hafta)
13. **Performance** (1 hafta)

---

## 🎯 Hızlı Başlangıç Planı

### İlk Hafta
1. ✅ Testing infrastructure kurulumu (Jest + Playwright)
2. ✅ Sentry kurulumu ve configuration
3. ✅ Database setup (Prisma + PostgreSQL)

### İkinci Hafta
4. ✅ Email service integration (Resend)
5. ✅ Security improvements (Rate limiting)
6. ✅ İlk testler yazma

### Üçüncü Hafta
7. ✅ Database migration (JSON → PostgreSQL)
8. ✅ API routes database'e bağlama
9. ✅ Test coverage %50+

---

## 📝 Notlar

- Her görev tamamlandığında ✅ işaretleyin
- Kritik fazlar tamamlanmadan production'a deploy etmeyin
- Her faz sonunda test edin ve dokümante edin
- Production'a geçmeden önce staging environment'da test edin

---

**Son Güncelleme:** 2024  
**Versiyon:** 1.0.0
