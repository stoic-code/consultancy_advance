import React from 'react'
import { Openings } from '@/components/career'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Career Opportunities for Studying in Korea - Unlock Your Potential with Consult Advance Educational Consultancy Pvt Ltd',
  description:
    'Explore exciting career opportunities for students studying in Korea with Consult Advance Educational Consultancy Pvt Ltd. Discover vacancies, internships, and opportunities tailored for students and job seekers interested in pursuing education in Korea. Unlock your potential and take the next step towards a rewarding career in Korea.',
  keywords:
    'career opportunities, studying in Korea, job vacancies, internships, student jobs, Korean universities, Korean education, job seekers, career development, professional growth, employment opportunities',
}

const page = () => {
  return (
    <div>
      <Openings />
    </div>
  )
}

export default page
