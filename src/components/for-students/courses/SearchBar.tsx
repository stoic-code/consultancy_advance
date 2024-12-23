'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Search } from 'lucide-react'

export default function Searchbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const oldQuery = searchParams.get('query')
  const [query, setQuery] = useState(oldQuery ? oldQuery : '')

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('query', query)
    router.push(`${pathName}?${newSearchParams.toString()}`)
  }, [query])

  return (
    <>
      <div className="flex gap-4">
        <div className="flex h-10 w-full items-center gap-2 rounded-md border pl-2 focus-within:ring-1 focus-within:ring-primary/50">
          <Search className="text-muted-foreground" size={20} />
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query ? query : ''}
            placeholder="Search course here..."
            className="h-full w-full outline-none"
          />
        </div>
      </div>
    </>
  )
}
