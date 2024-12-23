'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const CareerTabs = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'details'
  const isApply = tab === 'apply'

  return (
    <div className="sticky top-20 space-x-4 bg-white px-2 py-4 text-lg font-medium">
      <Link
        href={`?tab=details`}
        className={cn(
          'px-2',
          !isApply ? 'border-b-2 border-primary text-primary' : '',
        )}
      >
        Job Details
      </Link>
      <Link
        className={cn(
          'px-2',
          isApply ? 'border-b-2 border-primary text-primary' : '',
        )}
        href={`?tab=apply`}
      >
        Apply
      </Link>
    </div>
  )
}
