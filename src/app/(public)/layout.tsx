import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { RegistrationModal } from '@/components/for-students/RegistrationModal'
import LoadingSkeleton from '@/components/nav/LoadingSkeleton'

import { Suspense } from 'react'
import LoginModal from '@/components/common/LoginModal'
import ForgotPassword from '@/components/common/ForgotPassword'

const ProgressBar = dynamic(() => import('@/components/ProgressBar'), {
  ssr: false,
})
const Navigation = dynamic(() => import('@/components/nav'), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
})

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense>
        <RegistrationModal />
        <LoginModal />
        <ForgotPassword />
      </Suspense>
      <ProgressBar />
      {/* <LoadingSkeleton /> */}
      <Navigation />
      {children}
    </>
  )
}

export default layout
