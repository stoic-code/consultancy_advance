import { TopBar } from '@/components/dashboard/TobBar'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TopBar title="Registered Students" />
      {children}
    </>
  )
}

export default layout
