'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import PageLoadingUI from '@/components/common/loading'
import { Details } from '@/app/(private)/agent/listings/[id]/Details'
import { cn } from '@/lib/utils'
import { useGetMyBookingDetails } from '@/hooks/query/students/properties.query'
import { ChevronDown, ChevronUp, CircleDot, Images } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TopBar } from '@/components/dashboard/TobBar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAuth } from '@/providers/AuthProvider'
import { formatDate } from '@/lib/date'
import { useCancelBooking } from '@/hooks/mutations/students.mutation'
import toast from 'react-hot-toast'
import Link from 'next/link'

const page = () => {
  const [showMore, setShowMore] = useState(false)
  const [divHeight, setDivHeight] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  const { token } = useAuth()
  const { data, isLoading } = useGetMyBookingDetails(token!)
  const { mutateAsync } = useCancelBooking(token!)

  const handleCancelBooking = (id: string) => {
    const promise = mutateAsync(id)
    toast.promise(promise, {
      loading: 'Please wait ...',
      success: 'Booking canceled successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  useEffect(() => {
    // Function to measure the height of the div element
    const measureDivHeight = () => {
      if (divRef.current) {
        const height = divRef.current.getBoundingClientRect().height
        setDivHeight(height)
      }
    }

    measureDivHeight()
  }, [showMore, data!])

  const isDivLong = divHeight > 100

  if (isLoading) return <PageLoadingUI />

  return (
    <>
      {data.booking ? (
        <>
          <TopBar title="My Accomodation" />
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-2">
              <span className="font-bold">Status :</span>
              {data.booking.verified_status ? (
                <div className="flex w-fit gap-2 rounded-full bg-green-100 px-2 py-1 text-sm font-bold text-green-800">
                  <CircleDot size={20} /> Approved
                </div>
              ) : (
                <div className="flex w-fit gap-2 rounded-full bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-800">
                  <CircleDot size={20} /> Pending
                </div>
              )}
            </div>

            {!data.booking.verified_status && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="rounded-full border border-destructive px-2 py-1 text-xs font-semibold text-destructive outline-none transition hover:bg-destructive hover:text-white">
                    Cancel Request
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will delete your
                      booking and you will have to book new property if needed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleCancelBooking(data.booking._id)}
                      className="bg-destructive hover:bg-destructive/80"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <ul className="px-2 py-2">
            <li>
              <span className="font-semibold">Booking Date</span> :{' '}
              <span className="text-sm text-muted-foreground">
                {formatDate(data.booking.createdAt)}
              </span>
            </li>
          </ul>

          <div className="min-h-screen px-2 pb-20">
            <div className="mt-4 grid gap-x-8 px-4 md:grid-cols-2">
              <div className="flex w-full flex-col gap-10">
                {data.property.images.length > 0 ? (
                  <Carousel
                    opts={{ loop: true }}
                    className="h-[50vh] rounded-xl border bg-white "
                  >
                    <CarouselContent>
                      {data.property.images.map((img: any, idx: number) => (
                        <CarouselItem key={idx} className="relative">
                          <Image
                            height={600}
                            width={400}
                            src={img.secure_url}
                            alt="bed"
                            className="h-[50vh] w-full object-cover"
                            placeholder="blur"
                            blurDataURL="/blur.avif"
                          />
                        </CarouselItem>
                      ))}

                      <CarouselItem>
                        <iframe
                          src="https://www.youtube.com/embed/tgbNymZ7vqY"
                          className="h-full w-full object-cover object-center"
                          aria-controls="0"
                        ></iframe>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="left-1" />
                    <CarouselNext className="right-1" />
                  </Carousel>
                ) : (
                  <div className="flex h-[300px] max-w-[90vw] flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-muted-foreground md:h-[400px]">
                    <span>No Photos to show</span>
                    <Images size={80} />
                  </div>
                )}

                {/* ROOM DESCRIPTION FOR SMALL SCREEN */}
                <div className="block md:hidden">
                  <Details data={data.property} />
                </div>
              </div>

              <div className=" hidden md:block">
                <Details data={data.property} />
              </div>

              {/* ROOM DESCRIPTION */}
              <div>
                <div
                  className={cn(
                    'relative h-[100px] overflow-hidden transition-height  duration-500 ease-linear',

                    showMore
                      ? 'editor h-auto space-y-3 transition-all duration-300'
                      : 'editor h-[100px] transition-all duration-300',
                  )}
                >
                  <div
                    ref={divRef}
                    className={cn(
                      ' max-w-2xl py-4 text-start text-sm text-muted-foreground',
                    )}
                    dangerouslySetInnerHTML={{
                      __html: data.property.description,
                    }}
                  ></div>
                  {isDivLong && (
                    <div
                      className={`absolute inset-0 z-10 ${!showMore && 'bg-gradient-to-b from-transparent from-50% to-white '} `}
                    ></div>
                  )}
                </div>
                {isDivLong && (
                  <div className="mx-auto">
                    <Button
                      variant="secondary"
                      size="sm"
                      className=" font-medium mx-auto mt-2 flex max-w-32 cursor-pointer items-center gap-x-1 text-sm text-muted-foreground"
                      onClick={() => setShowMore(!showMore)}
                    >
                      Show {showMore ? 'Less' : 'More'}
                      {showMore ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen">
          <TopBar title="My Accomodation" />
          <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
            You Have No Bookings
            <p>Explore accomodations to book</p>
            <Link className="text-blue-600" href="/for-students/accomodations">
              View Accomodations
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default page
