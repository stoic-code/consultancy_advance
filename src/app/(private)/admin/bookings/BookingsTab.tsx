'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BookingsTab = () => {
  const pathName = usePathname()
  const isNewRequestTab = pathName === '/admin/bookings'
  const isStudentReqTab = pathName === '/admin/bookings/students-request'
  const isOldRequestTab = pathName === '/admin/bookings/old'

  return (
    <div className="space-x-2 px-4 py-2 text-sm font-medium">
      <Link
        href="/admin/bookings"
        className={cn(
          'rounded-full bg-secondary px-2 py-1',
          isNewRequestTab ? 'bg-primary text-white' : '',
        )}
      >
        New Requests
      </Link>
      <Link
        href="/admin/bookings/old"
        className={cn(
          'rounded-full bg-secondary px-2 py-1',
          isOldRequestTab ? 'bg-primary text-white' : '',
        )}
      >
        Approved Requests
      </Link>
      <Link
        href="/admin/bookings/students-request"
        className={cn(
          'rounded-full bg-secondary px-2 py-1',
          isStudentReqTab ? 'bg-primary text-white' : '',
        )}
      >
        Student Requests
      </Link>
    </div>
  )
}

export default BookingsTab
