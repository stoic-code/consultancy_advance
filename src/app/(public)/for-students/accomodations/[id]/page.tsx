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
import { notFound } from 'next/navigation'
import { Details } from '@/app/(private)/agent/listings/[id]/Details'
import { cn } from '@/lib/utils'
import { useGetPropertyById } from '@/hooks/query/students/properties.query'
import { ChevronDown, ChevronUp, Images } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getEmbadedurl } from '@/helpers/youtube'

const page = ({ params }: { params: { id: string } }) => {
  const [showMore, setShowMore] = useState(false)
  const [divHeight, setDivHeight] = useState(0)

  const { data, error, isLoading } = useGetPropertyById(params.id)
  const divRef = useRef<HTMLDivElement>(null)

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
  if (error) return notFound()

  return (
    <>
      <div className="min-h-screen px-2 pb-20">
        <div className="mt-4 grid gap-x-8 px-4 md:grid-cols-2">
          <div className="flex w-full flex-col gap-10">
            {data.images.length > 0 ? (
              <Carousel
                opts={{ loop: true }}
                className="h-[50vh] rounded-xl border bg-white "
              >
                <CarouselContent>
                  {data.images.map((img: any, idx: number) => (
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

                  {data.video_url ? (
                    <CarouselItem>
                      <iframe
                        src={getEmbadedurl(data.video_url)}
                        className="h-full w-full object-cover object-center"
                        aria-controls="0"
                      ></iframe>
                    </CarouselItem>
                  ) : null}
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
              <Details data={data} />
            </div>
          </div>

          <div className=" hidden md:block">
            <Details data={data} />
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
                dangerouslySetInnerHTML={{ __html: data.description }}
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
  )
}

export default page
