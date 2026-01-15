import { CardSkeleton } from '@/components/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="categories-grid" style={{ marginTop: '32px' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
