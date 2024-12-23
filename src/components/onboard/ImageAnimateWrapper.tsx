'use client'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode } from 'react'

export default function ImageAnimateWrapper({
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
      className=" absolute -right-20  top-[20%]  h-[400px]  w-[500px]  drop-shadow-2xl "
      // key={'step1'}
      initial={{
        x: -100,
        y: isBack ? 500 : -500,
        opacity: 0,
        transformOrigin: 'left',
      }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: -100, y: isBack ? -500 : 500, opacity: 0 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.5,
        type: 'spring',
      }}
    >
      {children}
    </motion.div>
  )
}

//  initial={{ y: 100, opacity: 0, scale: 0.5 }}
//       animate={{ y: 0, opacity: 1, scale: 1 }}
//       exit={{ y: -100, opacity: 0, scale: 0.5 }}
