// Content validation utilities

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validatePageContent(content: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Check if content is empty
  if (!content || content.trim().length === 0) {
    errors.push('İçerik boş olamaz')
  }

  // Check minimum length
  if (content && content.length < 50) {
    warnings.push('İçerik çok kısa (minimum 50 karakter önerilir)')
  }

  // Check for HTML tags
  const htmlTagRegex = /<[^>]+>/g
  const hasHtmlTags = htmlTagRegex.test(content)
  
  if (!hasHtmlTags && content.length > 100) {
    warnings.push('İçerik HTML formatında olmalı')
  }

  // Check for script tags (security)
  if (content.includes('<script')) {
    errors.push('Script tag\'leri güvenlik nedeniyle kullanılamaz')
  }

  // Check for iframe tags (security)
  if (content.includes('<iframe')) {
    errors.push('Iframe tag\'leri güvenlik nedeniyle kullanılamaz')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export function validatePageMetadata(title: string, description?: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Title validation
  if (!title || title.trim().length === 0) {
    errors.push('Başlık boş olamaz')
  } else if (title.length < 10) {
    warnings.push('Başlık çok kısa (minimum 10 karakter önerilir)')
  } else if (title.length > 60) {
    warnings.push('Başlık çok uzun (maksimum 60 karakter önerilir)')
  }

  // Description validation
  if (description) {
    if (description.length < 50) {
      warnings.push('Açıklama çok kısa (minimum 50 karakter önerilir)')
    } else if (description.length > 160) {
      warnings.push('Açıklama çok uzun (maksimum 160 karakter önerilir)')
    }
  } else {
    warnings.push('Açıklama eklenmesi önerilir')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export function sanitizeContent(content: string): string {
  // Remove dangerous tags and attributes
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}
