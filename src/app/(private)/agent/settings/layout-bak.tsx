import React, { ReactNode } from 'react'
import SideBar from '@/components/dashboard/student/SettingsSide'
import { TopBar } from '@/components/dashboard/TobBar'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar title="My Setting" />
      <div className="flex flex-col px-2 md:flex-row">
        <SideBar type="agent" />
        {children}
      </div>
    </div>
  )
}

export default layout
