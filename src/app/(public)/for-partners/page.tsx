import { GlobalPresence, Hero, Process } from '@/components/for-partners'
import WhyPartner from '@/components/for-partners/WhyPartner'
import { Universities } from '@/components/for-students'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Partnership Opportunities for Studying in Korea - Collaborate with Advance Education Consultancy Pvt Ltd',
  description:
    'Explore partnership opportunities with Advance Education Consultancy Pvt Ltd for studying in Korea. Join forces with us to support students pursuing education in Korea, unlock new opportunities, and drive innovation in the Korean education landscape.',
  keywords:
    'partnership opportunities, studying in Korea, Korea education, Korean universities, Korean language programs, international partnerships, academic collaboration',
}
const page = () => {
  return (
    <>
      <Hero />
      <WhyPartner />
      <Universities />
      <GlobalPresence />
      <Process />
    </>
  )
}

export default page
