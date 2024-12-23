import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CircleDot } from 'lucide-react'
import React from 'react'

const getColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-600'
    case 'APPROVED':
      return 'bg-green-100 text-green-700'
    case 'FAILED':
      return 'bg-red-100 text-red-600'
    default:
      return ''
  }
}

const StudentBadge = ({
  status,
  size,
}: {
  status: string
  size?: 'sm' | 'lg'
}) => {
  return (
    <Badge
      variant="none"
      className={cn(
        'flex w-fit gap-2 rounded-full border-none px-2 py-1 shadow-none',
        getColor(status),
        size === 'sm' ? 'py-[3px] text-xs' : '',
      )}
    >
      <CircleDot size={18} />
      {status}
    </Badge>
  )
}

export default StudentBadge
