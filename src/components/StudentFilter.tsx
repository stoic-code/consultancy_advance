'use client'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const StudentFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const pathName = usePathname()

  const isNewRequestTab = pathName === '/admin/students'
  const isSuccessTab = pathName === '/admin/students/success'
  const isFailedTab = pathName === '/admin/students/failed'

  useEffect(() => {
    router.replace(`${pathName}?query=${query}`, { scroll: false })
  }, [query])

  return (
    <div className="flex items-center justify-between px-2 py-5">
      <div className="space-x-2 px-4 py-2 text-sm font-medium">
        <Link
          href="/admin/students"
          className={cn(
            'rounded-full bg-secondary px-2 py-1',
            isNewRequestTab ? 'bg-primary text-white' : '',
          )}
        >
          New Students
        </Link>
        <Link
          href="/admin/students/success"
          className={cn(
            'rounded-full bg-secondary px-2 py-1',
            isSuccessTab ? 'bg-primary text-white' : '',
          )}
        >
          Old Succeed Students
        </Link>

        <Link
          href="/admin/students/failed"
          className={cn(
            'rounded-full bg-secondary px-2 py-1',
            isFailedTab ? 'bg-primary text-white' : '',
          )}
        >
          Old Failed Students
        </Link>
      </div>

      <div
        className={cn(
          'flex h-10 w-fit items-center justify-between rounded-sm border border-neutral-300 bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed',
        )}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-full w-full outline-none"
          placeholder="Search students..."
        />
        <Search size={18} className="text-muted-foreground" />
      </div>
    </div>
  )
}
