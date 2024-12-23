import { Metadata } from 'next'
import React, { ReactNode, Suspense } from 'react'

export const metadata: Metadata = {
  title:
    'Partner Registration - Join Us to Support Studying in Korea with Consult Advance Educational Consultancy Pvt Ltd',
  description:
    "Register as a partner with Consult Advance Educational Consultancy Pvt Ltd to support studying in Korea. Join us in providing valuable services, resources, and opportunities for students interested in pursuing education in Korea. Together, let's empower students to achieve their academic goals in Korea.",
  keywords:
    'partner registration, studying in Korea, Korean education, educational partnerships, Korean universities, academic support, student resources, Korea study programs',
}
const layout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>
}

export default layout
