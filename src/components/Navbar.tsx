'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/#categories', label: 'Kategoriler' },
    { href: '/category/sss', label: 'SSS' },
    { href: '/category/iletisim', label: 'İletişim' },
  ]

  return (
    <nav className="navbar-clean" role="navigation" aria-label="Ana navigasyon">
      <div className="navbar-container-clean">
        <Link href="/" className="navbar-brand-clean" aria-label="Ana sayfaya dön">
          <span className="brand-accent">Biabet</span> Destek
        </Link>
        
        <div className="navbar-menu-clean" id="navMenu" role="menubar">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link-clean ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              role="menuitem"
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="navbar-actions-clean">
          <button 
            className="btn-secondary-clean" 
            onClick={() => window.location.href = 'https://biabetlink.com'}
            aria-label="Giriş yap sayfasına git"
            style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}
          >
            Giriş Yap
          </button>
          <button 
            className="btn-primary-clean" 
            onClick={() => window.location.href = 'https://biabetlink.com'}
            aria-label="Kayıt ol sayfasına git"
            style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}
          >
            Kayıt Ol
          </button>
          <ThemeToggle />
          <button
            className="mobile-menu-btn-clean"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileMenuOpen}
            aria-controls="navMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </nav>
  )
}