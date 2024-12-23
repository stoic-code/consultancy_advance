import { TopBar } from '@/components/dashboard/TobBar'
import ApplicationTopCards from '@/components/dashboard/student/ApplicationTopCards'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar title="My Applications" />
      <div className="flex gap-8 px-2">
        <ApplicationTopCards />
      </div>

      <div className="pt-10">{children}</div>
    </div>
  )
}

export default layout
