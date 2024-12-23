'use client'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { MoveRight } from 'lucide-react'
import { H1, P } from '@/components/typography'
import { Button } from '@/components/ui/button'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { FadeIn, FadeInStagger } from '../Fade'
import Link from 'next/link'

// const images = ['/hero3.webp', '/hero4.webp']
const images = ['/img1.webp', '/img2.webp', '/img3.webp']
// const images = ['/img5.webp', '/img6.webp', '/img7.webp']

export const Hero = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="relative m-0 w-screen p-0">
        {images.map((img, i) => (
          <CarouselItem
            key={i}
            className="relative mx-0 w-screen overflow-hidden px-0"
          >
            {/* OVERLAY FOR IMAGE */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <img
              src={img}
              height={300}
              width={300}
              className="h-[90vh] w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute inset-0 flex items-center bg-black/30">
        <FadeInStagger
          faster
          className="space-y-10 px-2 text-white md:w-1/2 md:px-5"
        >
          <FadeIn>
            <H1>
              <P className="pb-4">
                <img
                  src="/south-korea.svg"
                  width={50}
                  alt=""
                  className="inline"
                />{' '}
                Study In <span className="text-red-300">South</span>{' '}
                <span className="text-blue-300">Korea</span>
              </P>
              Built On Your Trust
            </H1>
          </FadeIn>
          <FadeIn>
            <P className="md:text-2xl">
              &quot;Our commitment to reliability, credibility, and
              professionalism forms the cornerstone of our consultancy, ensuring
              your journey towards academic success is built on a foundation of
              trust.&quot;
            </P>
          </FadeIn>

          <FadeIn>
            <Button
              asChild
              size="lg"
              className="group flex w-fit gap-2 px-6 py-6 text-lg font-semibold"
            >
              <Link href={'?student-registration=open'}>
                Get Started
                <MoveRight
                  className="duration-200 group-hover:translate-x-2"
                  size={20}
                />
              </Link>
            </Button>
          </FadeIn>
        </FadeInStagger>
        <img
          src="/spiral.svg"
          className="absolute bottom-0 right-0 hidden h-full object-cover md:block"
          alt=""
        />
      </div>
    </Carousel>
  )
}
