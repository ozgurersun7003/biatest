// Analytics event tracking utilities

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  [key: string]: any
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if ((window as any).gtag) {
    ;(window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event,
    })
  }

  // Vercel Analytics (automatic)
  // Custom events can be sent via fetch if needed
}

// Predefined event helpers
export const AnalyticsEvents = {
  // Search events
  search: (query: string, resultsCount: number) => {
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
      search_term: query,
      results_count: resultsCount,
    })
  },

  // Article events
  articleView: (slug: string, title: string) => {
    trackEvent({
      action: 'page_view',
      category: 'content',
      label: title,
      article_slug: slug,
      article_title: title,
    })
  },

  articleFeedback: (slug: string, helpful: boolean) => {
    trackEvent({
      action: 'article_feedback',
      category: 'engagement',
      label: slug,
      feedback: helpful ? 'helpful' : 'not_helpful',
    })
  },

  articleShare: (slug: string, platform: string) => {
    trackEvent({
      action: 'share',
      category: 'social',
      label: platform,
      article_slug: slug,
      method: platform,
    })
  },

  // Navigation events
  categoryView: (category: string) => {
    trackEvent({
      action: 'view_item_list',
      category: 'navigation',
      label: category,
      category_name: category,
    })
  },

  // User interaction events
  favoriteToggle: (slug: string, isFavorite: boolean) => {
    trackEvent({
      action: 'favorite_toggle',
      category: 'engagement',
      label: slug,
      is_favorite: isFavorite,
    })
  },

  // Form events
  formSubmit: (formName: string, success: boolean) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'engagement',
      label: formName,
      form_name: formName,
    })
  },

  // Error events
  error: (errorMessage: string, errorType: string) => {
    trackEvent({
      action: 'exception',
      category: 'error',
      label: errorMessage,
      error_type: errorType,
      fatal: false,
    })
  },
}
