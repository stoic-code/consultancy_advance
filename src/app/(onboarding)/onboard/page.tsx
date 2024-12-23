'use client'
import { BasicDetails } from '@/components/dashboard/onboarding/BasicDetails'
import { ChangePassword } from '@/components/dashboard/onboarding/ChangePassword'
import { Education } from '@/components/dashboard/onboarding/Education'
import { TestResults } from '@/components/dashboard/onboarding/TestsResults'
import { WorkExperience } from '@/components/dashboard/onboarding/WorkExperience'
import Steps from '@/components/for-students/Steps'
import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function page() {
  const searchParams = useSearchParams()
  const stepNo = searchParams.get('step')

  const isStep1 = stepNo === '1'
  const isStep2 = stepNo === '2'
  const isStep3 = stepNo === '3'
  const isStep4 = stepNo === '4'
  const isStep5 = stepNo === '5'

  return (
    <div className="max-h-[100vh] p-4">
      <div
        className={cn(
          'custom-scrollbar mx-auto h-full max-h-[100%] space-y-10 overflow-y-auto overflow-x-hidden pt-20 sm:max-w-[60%]',
          !stepNo ? 'grid place-items-center' : '',
        )}
      >
        {stepNo !== null && <Steps />}

        <AnimatePresence mode="wait">
          {isStep2 ? (
            <BasicDetails />
          ) : isStep3 ? (
            <TestResults />
          ) : isStep4 ? (
            <Education />
          ) : isStep5 ? (
            <WorkExperience />
          ) : (
            <ChangePassword />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
