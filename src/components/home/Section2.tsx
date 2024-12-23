import React from 'react'
import { H2, H4, H5, P } from '../typography'
import { data } from './data'
import { FadeIn, FadeInStagger } from '../Fade'
import Animation from './Animation'
import './animation.css'

export const Section2 = () => {
  return (
    <div
      style={{
        background: 'url(/home/section2-bg.svg) no-repeat 10% 50%/50%',
      }}
    >
      <div className="grid min-h-screen bg-white px-2 2xl:container md:grid-cols-2 md:bg-transparent">
        <Animation />
        {/* 
        <FadeIn className="hidden min-h-[300px] place-items-center md:grid">
          <img
            src="/home/section2-front.webp"
            width={500}
            height={500}
            alt=""
          />
        </FadeIn> */}

        <div>
          <FadeIn className="py-10">
            <H4 className="text-red-500">Why Us ?</H4>
            <H2>
              Guiding <span className="text-blue-700">Dreams</span>, <br />{' '}
              Building <span className="text-green-600">Futures</span>
            </H2>

            <div className="grid min-h-[300px] max-w-[300px] place-items-center py-10 md:hidden">
              <img
                src="/home/section2-front.webp"
                width={500}
                height={500}
                alt=""
              />
            </div>

            <P className="pt-3 text-muted-foreground">
              Our mission at Consult Advance is to empower students worldwide to
              pursue their educational dreams by providing expert guidance and
              personalized support throughout their journey.
            </P>
          </FadeIn>

          <FadeInStagger faster className="grid gap-x-4 gap-y-8 sm:grid-cols-2">
            {data.map((d, idx) => (
              <FadeIn
                key={idx + 100}
                className="flex flex-nowrap items-start gap-2"
              >
                <img
                  src={d.icon}
                  alt={d.title}
                  width={40}
                  height={40}
                  className="animation-icon rounded-md border border-black p-2"
                />
                <div>
                  <H5>{d.title}</H5>
                  <P className="text-muted-foreground">{d.desc}</P>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </div>
  )
}
