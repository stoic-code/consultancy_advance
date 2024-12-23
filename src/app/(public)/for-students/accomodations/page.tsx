'use client'
import PageLoadingUI from '@/components/common/loading'
import AccomodationFilter from '@/components/for-students/AccomodationFilter'
import AccomodationRequirementModal from '@/components/for-students/AccomodationRequirementModal'
import SingleAccomodation from '@/components/for-students/SingleAccomodation'
import { H1, H4, P } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useGetAllProperty } from '@/hooks/query/students/properties.query'
import { useAuth } from '@/providers/AuthProvider'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const images = [
    '/for-students/accomodations/dorm1.webp',
    '/for-students/accomodations/dorm2.webp',
    '/for-students/accomodations/dorm3.webp',
    '/for-students/accomodations/dorm4.webp',
  ]
  const [currentIdx, setCurrentIdx] = useState(0)
  const { token, user } = useAuth()
  const searchParams = useSearchParams()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % images.length)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  const { data, isLoading } = useGetAllProperty(searchParams.toString())

  if (isLoading) return <PageLoadingUI />

  return (
    <div className="pb-10 2xl:container">
      <div
        className="transition-all duration-300"
        style={{
          background: `url(${images[currentIdx]}) no-repeat center/cover`,
        }}
      >
        <div className="w-full bg-gradient-to-r from-black/60 from-100% to-black/0 px-4  pb-10 pt-20 md:from-30%">
          <div className="max-w-3xl space-y-4 text-white">
            <H1>Discover the best accomodations for students</H1>
            <P className="text-white/80">
              Whether you're searching for cozy dormitories, fully-furnished
              apartments, or shared housing options, we have something perfect
              for every student's needs and preferences.
            </P>
          </div>
        </div>
      </div>
      <AccomodationFilter />
      <div className="mx-auto flex w-[95%] flex-wrap justify-center gap-10 gap-y-12 pt-10 md:w-[90%]  md:pt-20">
        {data.length > 0 ? (
          data.map((d: any, idx: number) => (
            <SingleAccomodation key={idx} data={d} />
          ))
        ) : (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No Accomodations to show
          </div>
        )}
      </div>
      {token && user?.role === 'STUDENT' && (
        <div className=" mt-20 text-center">
          <div className=" space-y-4">
            <div className=" space-y-1">
              <H4>Didn't Find What You're Looking For?</H4>
              <p className=" text-sm text-muted-foreground">
                If you couldn't find your desired accommodation, let us know
                your requirements, and we'll help you find the perfect place.
              </p>
            </div>
            <AccomodationRequirementModal />
          </div>
        </div>
      )}
    </div>
  )
}

export default page
