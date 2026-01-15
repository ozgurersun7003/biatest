import { Suspense } from 'react'
import SearchResults from './SearchResults'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { generateMetadata as genMeta } from './metadata'
import type { Metadata } from 'next'

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}): Promise<Metadata> {
  const params = await searchParams
  return genMeta(params)
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchResults />
    </Suspense>
  )
}