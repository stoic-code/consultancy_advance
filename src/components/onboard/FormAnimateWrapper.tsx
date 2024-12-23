'use client'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode } from 'react'
import { H2, P } from '../typography'

export default function FormAnimateWrapper({
  children,
}: {
  children: ReactNode
}) {
  const searchParams = useSearchParams()
  const isBack = searchParams.get('back') === 'true'
  const stepNo = searchParams.get('step')

  const isStep1 = stepNo === '1'
  const isStep2 = stepNo === '2'
  const isStep3 = stepNo === '3'
  const isStep4 = stepNo === '4'
  const isStep5 = stepNo === '5'

  return (
    <motion.div
      className="w-full  "
      key={'step1'}
      initial={{ x: isBack ? -50 : 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: isBack ? 50 : -50, opacity: 0 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.5,
        type: 'spring',
      }}
    >
      <div className=" mb-8  block xl:hidden">
        <H2 className=" text-left  font-semibold  text-primary">
          {isStep2
            ? "Let's Update Your Details"
            : isStep3
              ? "Let's Update Your Test Results "
              : isStep4
                ? "Let's Update Your Education Details"
                : isStep5
                  ? "Let's Update Your Work Experience"
                  : "Let's Change Your Password"}
        </H2>
        <P className=" mt-2 text-left   font-medium text-muted-foreground">
          {isStep2
            ? 'Keep your profile fresh and relevant by providing the latest information.'
            : isStep3
              ? 'Please enter your test scores below to record your achievements. '
              : isStep4
                ? 'Update your educational background and qualifications for a complete profile.'
                : isStep5
                  ? 'Have your professional journey by updating your work experience.'
                  : 'Update your password for enhanced security.'}
        </P>
      </div>
      {children}
    </motion.div>
  )
}
