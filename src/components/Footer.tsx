import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer-clean">
      <div className="footer-container-clean">
        <div className="footer-grid-clean">
          <div className="footer-section-clean">
            <h4>Biabet Destek</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Size en iyi destek deneyimini sunmak için buradayız.
            </p>
            <div className="footer-social-clean">
              <a href="https://x.com/biabetresmi" target="_blank" rel="noopener noreferrer" className="footer-social-link-clean" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/biabetting" target="_blank" rel="noopener noreferrer" className="footer-social-link-clean" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a href="https://t.me/+2-GvWeHi9IAzMzc0" target="_blank" rel="noopener noreferrer" className="footer-social-link-clean" aria-label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=%2B380980559228" target="_blank" rel="noopener noreferrer" className="footer-social-link-clean" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@biabet" target="_blank" rel="noopener noreferrer" className="footer-social-link-clean" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-section-clean">
            <h4>Hızlı Linkler</h4>
            <ul className="footer-links-clean">
              <li><Link href="/category/sss">SSS</Link></li>
              <li><Link href="/category/para-yatirma-yontemleri">Para Yatırma</Link></li>
              <li><Link href="/category/iletisim">İletişim</Link></li>
              <li><Link href="/category/bonuslar">Bonuslar</Link></li>
            </ul>
          </div>
          
          <div className="footer-section-clean">
            <h4>Destek</h4>
            <ul className="footer-links-clean">
              <li><Link href="/detail/iletisim-kanallarimiz">İletişim Kanalları</Link></li>
              <li><a href="https://api.whatsapp.com/send/?phone=%2B380980559228" target="_blank" rel="noopener noreferrer">WhatsApp Destek</a></li>
              <li><a href="https://biabetlink.com" target="_blank" rel="noopener noreferrer">Güncel Adres</a></li>
            </ul>
          </div>
          
          <div className="footer-section-clean">
            <h4>Yasal</h4>
            <ul className="footer-links-clean">
              <li><Link href="/detail/gizlilik-ilkeleri">Gizlilik Politikası</Link></li>
              <li><Link href="/detail/hukum-ve-kosullar">Kullanım Şartları</Link></li>
              <li><Link href="/category/kurallar-sartlar">Kurallar & Şartlar</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom-clean">
          <p>&copy; 2024 Biabet. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}