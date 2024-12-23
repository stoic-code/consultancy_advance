import React, { ReactNode, Suspense } from 'react'
import { StudentFilter } from '@/components/StudentFilter'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <StudentFilter />
      {children}
    </Suspense>
  )
}

export default layout
