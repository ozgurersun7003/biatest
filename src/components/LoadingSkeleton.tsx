export default function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line skeleton-short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line skeleton-short"></div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="skeleton-line skeleton-card-title"></div>
      <div className="skeleton-line skeleton-card-description"></div>
      <div className="skeleton-line skeleton-card-description short"></div>
    </div>
  )
}

export function SearchSkeleton() {
  return (
    <div className="search-skeleton">
      <div className="skeleton-line skeleton-search-item"></div>
      <div className="skeleton-line skeleton-search-item"></div>
      <div className="skeleton-line skeleton-search-item short"></div>
    </div>
  )
}
