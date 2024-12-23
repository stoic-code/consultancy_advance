import { cn } from '@/lib/utils'
import React from 'react'

const Details = ({ html }: { html: string }) => {
  return (
    <div
      className={cn('editor', 'space-y-5 px-2 pb-10 pt-5')}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}

export default Details
