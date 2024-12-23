import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title:
    'Insightful Blog - Stay Informed with Consult Advance Educational Consultancy Pvt Ltd',
  description:
    'Explore our insightful blog to stay informed about the latest trends, news, and tips in education, study abroad, and career development, with a focus on studying in Korea. Discover valuable insights and resources to empower your journey towards academic and professional success in Korea.',
  keywords:
    'education blog, study abroad blog, study in south Korea, south Korean universities, South Korean education, career development blog, educational insights, study tips, career advice, academic success, professional development',
}

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
