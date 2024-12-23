import { Hero, HowItWorks, Contact } from '@/components/for-instutions'
import { GlobalPresence } from '@/components/for-instutions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    "Partner with Us for Studying in Korea - Expand Your Institution's Reach with Consult Advance Educational Consultancy Pvt Ltd",
  description:
    "Discover partnership opportunities with Consult Advance Education Consultancy Pvt Ltd for institutions interested in studying in Korea. Partner with us to enhance your institution's visibility, connect with Korean universities, and provide valuable educational opportunities to students interested in pursuing education in Korea.",
  keywords:
    'institution partnerships, studying in Korea, Korean universities, Korea education, academic collaboration, international partnerships, educational opportunities',
}
const page = () => {
  return (
    <div className="pb-52">
      <Hero />
      <GlobalPresence />
      <HowItWorks />
      {/* <Contact /> */}
    </div>
  )
}

export default page
