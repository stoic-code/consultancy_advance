import React, { ReactNode, Suspense } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>
}

export default layout
