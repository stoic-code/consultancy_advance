'use client'
import { H3, H4 } from '@/components/typography'
import React from 'react'
import { Edit, MapPin } from 'lucide-react'
import { PropertyEditModal } from '@/components/listings/PropertyEditModal'
import { Button } from '@/components/ui/button'
import { generateIcons } from '@/helpers/accomodation'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { convertToKoreanLocale } from '@/helpers/locale'
import BookModal from '@/components/for-students/accomodation/BookModal'
import Link from 'next/link'

export function Details({ data }: { data: any }) {
  const { token, user } = useAuth()
  const isStudent = user?.role === 'STUDENT'
  const pathName = usePathname()
  const isAdminPage = pathName.startsWith('/agent')
  const isStudentPage = pathName === '/students/accomodations'

  return (
    <div className="w-full ">
      <section className="  flex flex-col gap-4 ">
        {/* ROOM LOCATION */}
        <div className=" flex flex-col  gap-2 ">
          <H3 className="tracking-wide">{data.title}</H3>
          <div className="  flex items-center  gap-2 text-muted-foreground">
            <MapPin size={20} />
            <p className="text-start">
              {data.address}, {data.city}, {data.state}
            </p>
          </div>
        </div>
        {/* ROOM PRICES */}
        <div className="flex flex-col gap-2">
          <H4 className="flex items-center gap-1">
            {convertToKoreanLocale(data.cost)}
            <span className=" text-base">/ month </span>
          </H4>
          <p>
            <span className="font-semibold">Area :</span> {data.area} Sq. Ft.
          </p>
          <p>
            <span className="font-semibold">Minimum Deposit Amount :</span>{' '}
            {convertToKoreanLocale(data.minimum_deposit)}
          </p>
        </div>

        {/* EDIT DETAILS */}
        {isAdminPage ? (
          <PropertyEditModal data={data}>
            <Button className="flex w-fit gap-2 rounded-full">
              <Edit size={16} /> Edit Details
            </Button>
          </PropertyEditModal>
        ) : token && isStudent && !isStudentPage ? (
          <BookModal id={data._id} minDeposit={data.minimum_deposit}>
            <Button className="flex w-fit gap-2 rounded-full">Book Now</Button>
          </BookModal>
        ) : token && !isStudent && !isStudentPage ? (
          <button
            disabled
            className="w-fit rounded-full border p-2 text-sm text-destructive"
          >
            Only Available for Students
          </button>
        ) : isStudentPage ? (
          <></>
        ) : (
          <Button asChild className="flex w-fit gap-2 rounded-full">
            <Link href="?login=student">Login To Book</Link>
          </Button>
        )}

        {/* AMENITIES ICONS */}

        <div className="flex flex-wrap gap-4">
          {data.amenities.map((d: any, idx: number) => (
            <span
              key={idx}
              className="flex items-center gap-2 rounded-full border-2 px-2 py-1"
            >
              {generateIcons(d)} {d}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
