import React, { ReactNode, Suspense } from 'react'
import SideNav from '@/components/dashboard/sidenav'
import ProgressBar from '@/components/ProgressBar'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense>
        <ProgressBar />
        <div className="relative flex 2xl:container">
          <SideNav />
          <div className="max-w-full flex-1">{children}</div>
        </div>
      </Suspense>
    </>
  )
}

export default layout
