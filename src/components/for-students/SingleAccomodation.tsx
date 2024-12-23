'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '../ui/badge'
import { generateIcons } from '@/helpers/accomodation'
import { convertToKoreanLocale } from '@/helpers/locale'
import { Images, MapPin } from 'lucide-react'

const SingleAccomodation = ({ data }: { data: any }) => {
  return (
    <div className="group flex w-72 flex-col overflow-hidden rounded-xl shadow-xl transition-all duration-300">
      <Carousel
        opts={{ loop: true }}
        className="h-32 overflow-hidden rounded-xl border bg-white"
      >
        <CarouselContent>
          {data.images.length !== 0 ? (
            data.images.map((img: any, idx: number) => (
              <CarouselItem key={idx} className="relative">
                <div>
                  {data.isNew && (
                    <Badge
                      className="absolute left-5 top-1"
                      variant="secondary"
                    >
                      New
                    </Badge>
                  )}
                  <Image
                    src={img.secure_url}
                    alt=""
                    width={500}
                    height={500}
                    className="object-cover object-center"
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="h-32">
              <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                {data.isNew && (
                  <Badge className="absolute left-5 top-1" variant="secondary">
                    New
                  </Badge>
                )}
                <Images />
                No Images Aavailable
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="left-0 border-transparent bg-transparent text-white" />
        <CarouselNext className="right-0 border-transparent bg-transparent text-white" />
      </Carousel>

      <div className="flex-1 p-4">
        <h1
          title="Accomodation Name Longer one"
          className="line-clamp-1 text-xl font-semibold underline-offset-2 transition-all duration-300 group-hover:underline"
        >
          <Link href={`/for-students/accomodations/${data._id}`}>
            {data.title}
          </Link>
        </h1>
        <h2 className="py-2 font-bold underline-offset-2 transition-all duration-300">
          {convertToKoreanLocale(data.cost)}
        </h2>

        <div className="line-clamp-3 text-sm text-muted-foreground">
          <MapPin className="inline" size={16} /> {data.address}, {data.city},{' '}
          {data.state}
        </div>

        <div className="flex gap-2 pt-5 text-muted-foreground">
          {data.amenities.map(
            (a: any, idx: number) =>
              idx < 6 && (
                <div
                  title={a}
                  key={idx}
                  className="flex items-center gap-2 rounded-md bg-neutral-200 px-2 py-1 text-xs text-muted-foreground"
                >
                  {generateIcons(a)}
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleAccomodation
