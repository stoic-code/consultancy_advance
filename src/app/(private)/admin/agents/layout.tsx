import { TopBar } from '@/components/dashboard/TobBar'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar title="Real Estate Agents" />
      {children}
    </div>
  )
}

export default layout
