'use client'

import { useState, FormEvent } from 'react'
import { trackEvent } from './GoogleAnalytics'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Track form submission
      trackEvent('contact_form_submit', 'engagement', formData.subject)

      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        trackEvent('contact_form_success', 'engagement')
      } else {
        setSubmitStatus('error')
        trackEvent('contact_form_error', 'engagement')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      trackEvent('contact_form_error', 'engagement')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form" aria-label="İletişim formu">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Adınız Soyadınız <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-posta Adresiniz <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Konu <span className="required">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="form-input"
            aria-required="true"
          >
            <option value="">Konu seçin</option>
            <option value="genel">Genel Bilgi</option>
            <option value="hesap">Hesap Sorunları</option>
            <option value="bonus">Bonus ve Promosyonlar</option>
            <option value="para-yatirma">Para Yatırma</option>
            <option value="para-cekme">Para Çekme</option>
            <option value="teknik">Teknik Destek</option>
            <option value="diger">Diğer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Mesajınız <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="form-input form-textarea"
            aria-required="true"
          />
        </div>

        {submitStatus === 'success' && (
          <div className="form-message success" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="form-message error" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary form-submit"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
    </div>
  )
}
