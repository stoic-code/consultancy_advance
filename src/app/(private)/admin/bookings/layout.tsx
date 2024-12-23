import React, { ReactNode } from 'react'
import BookingsTab from './BookingsTab'
import { TopBar } from '@/components/dashboard/TobBar'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar title="All Booking Requests" />
      <BookingsTab />
      {children}
    </div>
  )
}

export default layout
