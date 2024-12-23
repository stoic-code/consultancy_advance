'use client'
import * as React from 'react'
import { Search } from 'lucide-react'
import { InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex h-8 w-fit items-center rounded-md border border-neutral-300 bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <input
          type={type}
          className={cn('w-full text-base outline-none', className)}
          ref={ref}
          {...props}
        />
        <Search size={20} />
      </div>
    )
  },
)

export default SearchInput
