import { Metadata } from 'next'
import React, { ReactNode, Suspense } from 'react'

export const metadata: Metadata = {
  title:
    'Find Accommodation for Studying in Korea - Comfortable Living with Consult Advance Educational Consultancy Pvt Ltd',
  description:
    'Discover comfortable accommodation options for studying in Korea with Consult Advance Educational Consultancy Pvt Ltd. Explore a variety of housing options, including dormitories, apartments, and homestays. Find the perfect place to stay and enjoy a comfortable living experience while pursuing your education in Korea.',
  keywords:
    'student accommodation, studying in Korea, Korea housing options, dormitories, apartments, homestays, comfortable living, temporary housing',
}

const layout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>
}

export default layout
