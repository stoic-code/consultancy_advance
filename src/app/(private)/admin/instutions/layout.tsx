import { TopBar } from '@/components/dashboard/TobBar'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar title="Institutions" />
      {children}
    </div>
  )
}

export default layout
