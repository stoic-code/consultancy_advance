'use client'
import Steps from '@/components/register/Steps'
import { H2, P } from '@/components/typography'
import { useSearchParams } from 'next/navigation'

import dynamic from 'next/dynamic'
// Dynamic import for all components
const BasicInformation = dynamic(() => import('./BasicInformation'), {
  ssr: false,
})
const PointOfContact = dynamic(() => import('./PointOfContact'), {
  ssr: false,
})
const ServicesOffered = dynamic(() => import('./ServiceOffered'), {
  ssr: false,
})
const References = dynamic(() => import('./References'), {
  ssr: false,
})

const page = () => {
  const searchParams = useSearchParams()
  const stepNo = searchParams.get('step')
  const isStep2 = stepNo === '2'
  const isStep3 = stepNo === '3'
  const isStep4 = stepNo === '4'

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <div>
        <H2>Register as Partner</H2>
        <p className="pt-2 text-base text-muted-foreground">
          Unlock new opportunities for growth and collaboration by becoming a
          valued partner
        </p>
      </div>
      <div className="py-5">
        <Steps />
        {isStep2 ? (
          <PointOfContact />
        ) : isStep3 ? (
          <ServicesOffered />
        ) : isStep4 ? (
          <References />
        ) : (
          <BasicInformation />
        )}
      </div>
    </div>
  )
}

export default page
