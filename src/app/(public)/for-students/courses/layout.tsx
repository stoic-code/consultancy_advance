import { Metadata } from 'next'
import React, { ReactNode, Suspense } from 'react'

export const metadata: Metadata = {
  title:
    'Explore Courses for Studying in Korea - Expand Your Knowledge with Consultancy Name',
  description:
    'Discover a wide range of courses and educational opportunities for studying in Korea with Consultancy Name. Explore courses in various fields, including business, technology, healthcare, and more. Expand your knowledge and enhance your skills with our comprehensive course offerings tailored for studying in Korea.',
  keywords:
    'educational courses, studying in Korea, Korea study programs, Korean universities, Korean language courses, business courses, technology courses, healthcare courses',
}
const layout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>
}

export default layout
