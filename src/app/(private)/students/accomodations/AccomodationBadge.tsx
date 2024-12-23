import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CircleDot } from 'lucide-react'
import React from 'react'

const getColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-500'
    case 'waiting':
      return 'bg-gray-200 text-gray-500'
    case 'approved':
      return 'bg-green-100 text-green-500'
    case 'rejected':
      return 'bg-red-100 text-red-500'
    default:
      return ''
  }
}

const AccomodationBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="none"
      className={cn(
        'flex w-fit gap-2 rounded-full border px-2 py-1 shadow-none',
        getColor(status),
      )}
    >
      <CircleDot size={18} />
      {status}
    </Badge>
  )
}

export default AccomodationBadge
