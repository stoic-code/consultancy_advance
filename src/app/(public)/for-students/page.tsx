import { FAQ, Hero, Support, Universities } from '@/components/for-students'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'For Students - Your Guide to Abroad Studies | Consult Advance Educational Consultancy Pvt Ltd',
  description:
    'Explore resources, support, and universities for students planning to study abroad. Get answers to frequently asked questions and find comprehensive guidance.',
  keywords:
    'abroad studies,study korea,korean, study abroad, universities, consultancy, frequently asked questions, support, resources',
}

const page = () => {
  return (
    <div className="pb-52">
      <Hero />
      <Support />
      <Universities />
      <FAQ />
    </div>
  )
}

export default page
