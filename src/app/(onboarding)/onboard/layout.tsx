'use client'

import ImageAnimateWrapper from '@/components/onboard/ImageAnimateWrapper'
import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const step = searchParams.get('step')

  return (
    <div className="h-[100vh] overflow-hidden bg-opacity-40 backdrop-blur-lg">
      <section className="mx-auto grid h-[100vh] xl:grid-cols-2">
        {/* IMAGE SECTION */}
        <div
          className={`hidden h-[150vh] w-[150vh] -translate-x-[40%] -translate-y-[12%]  place-items-center  rounded-full transition-colors duration-500 ease-in-out  xl:block  ${step == '2' ? 'bg-green-100' : step == '3' ? 'bg-indigo-100' : step == '4' ? 'bg-gray-200' : step == '5' ? 'bg-purple-100' : 'bg-[#2152f8]/20'}  p-10  `}
        >
          <AnimatePresence mode="wait">
            {step == '2' ? (
              <ImageAnimateWrapper key={'step2'}>
                <div className=" relative right-20">
                  <h4 className=" text-left text-5xl font-semibold text-green-900">
                    Let's Update Your Personal Details
                  </h4>
                  <p className=" mt-2 text-left text-lg  font-medium text-muted-foreground">
                    Keep your profile fresh and relevant by providing the latest
                    information.
                  </p>
                </div>
                <img
                  src={'/onboard/profile2.svg'}
                  height={500}
                  width={500}
                  alt="password"
                />
              </ImageAnimateWrapper>
            ) : step == '3' ? (
              <ImageAnimateWrapper key={'step3'}>
                <div className=" relative right-8">
                  <h4 className=" text-left   text-5xl font-semibold text-[#171d8f] ">
                    Let's Update Your Test Results
                  </h4>
                  <p className=" mt-2 text-left text-lg  font-medium text-muted-foreground">
                    Please enter your test scores below to record your
                    achievements.
                  </p>
                </div>
                <img
                  src={'/onboard/result.png'}
                  height={500}
                  width={500}
                  alt="password"
                />
              </ImageAnimateWrapper>
            ) : step == '4' ? (
              <ImageAnimateWrapper key={'step4'}>
                <div className=" relative right-20">
                  <h4 className=" text-left text-5xl  font-semibold text-gray-900 ">
                    Let's Update Your Education Details
                  </h4>
                  <p className=" mt-2 text-left text-lg  font-medium text-muted-foreground">
                    Update your educational background and qualifications for a
                    complete profile.
                  </p>
                </div>
                <img
                  src={'/onboard/education3.svg'}
                  height={500}
                  width={500}
                  alt="password"
                />
              </ImageAnimateWrapper>
            ) : step == '5' ? (
              <ImageAnimateWrapper key={'step5'}>
                <div className="  relative right-6">
                  <h4 className="  text-left text-5xl font-semibold text-[#570b7f]">
                    Let's Update Your Work Experience
                  </h4>
                  <p className=" mt-2 text-left text-lg  font-medium text-muted-foreground">
                    Have your professional journey by updating your work
                    experience.
                  </p>
                </div>
                <img
                  src={'/onboard/achievement.png'}
                  height={500}
                  width={500}
                  alt="password"
                />{' '}
              </ImageAnimateWrapper>
            ) : (
              <ImageAnimateWrapper key={'step1'}>
                <div className=" relative right-8">
                  <h4 className="   text-left text-5xl font-semibold text-purple-900">
                    Let's Change Your Password
                  </h4>
                  <p className=" mt-2 text-left text-lg  font-medium text-muted-foreground">
                    Update your password for enhanced security.
                  </p>
                </div>
                <img
                  src={'/onboard/login.png'}
                  height={500}
                  width={500}
                  alt="password"
                />
              </ImageAnimateWrapper>
            )}
          </AnimatePresence>
        </div>

        {children}
      </section>
    </div>
  )
}
