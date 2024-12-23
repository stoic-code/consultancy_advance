import React from 'react'
import { Badge } from '@/components/ui/badge'
import { CircleDot } from 'lucide-react'

//InComplete xa haiii
export default function CustomBadge({ status }: { status: string }) {
  return (
    <Badge
      className={`${status == 'Opened' ? 'border-green-500 text-green-500 ' : 'border-red-500 text-red-500'} gap-x-1 rounded-full border  bg-transparent  hover:bg-transparent `}
    >
      <CircleDot size={12} />
      {status}
    </Badge>
  )
}
