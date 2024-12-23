'use client'
import { H1, H5, P } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { FadeIn, FadeInStagger } from '../Fade'
import { motion } from 'framer-motion'
import Link from 'next/link'

const data = [
  {
    icon: '/for-instutions/achivementpic.webp',
    title: 'Conversion Excellence',
    desc: 'Elevate enrollment with exceptional rates and outcomes.',
  },
  {
    icon: '/for-instutions/grouppic.webp',
    title: 'Diverse Community',
    desc: 'Explore global diversity for enriched educational experiences.',
  },
  {
    icon: '/for-instutions/growthpic.webp',
    title: 'Enhanced Productivity & ROI',
    desc: 'Streamline operations for maximum efficiency and impact.',
  },
]

export const Hero = () => {
  return (
    <>
      <div
        style={{
          background:
            'url(/for-instutions/hero-bg.webp) no-repeat 0% 90%/cover',
        }}
        className="grid px-4 py-10 2xl:container md:grid-cols-2 lg:py-24"
      >
        <div className="order-2  justify-center ">
          <FadeInStagger className=" flex flex-col gap-y-5 ">
            <FadeIn>
              <H1 className="text-neutral-800">
                Reach 1000+ Students Monthly !
              </H1>
            </FadeIn>
            <FadeIn>
              <P className="text-muted-foreground">
                Join 1,500+ global institutions and reach over 100,000 monthly
                student views. Expand effortlessly and connect with eager
                learners worldwide. Don't miss out on shining bright in the
                educational landscape!
              </P>
            </FadeIn>
            <FadeIn>
              <Button
                asChild
                className="flex w-fit items-center justify-center rounded-full px-6 py-6 text-lg shadow-lg"
              >
                <a href="#how-it-works">Work With Us</a>
              </Button>
            </FadeIn>
          </FadeInStagger>
        </div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
          className="grid w-full place-items-center md:order-2"
        >
          <img
            width={500}
            height={500}
            src="/for-instutions/hero-img.webp"
            alt=""
            className="lg:h-[500px]"
          />
        </motion.div>
      </div>
      <FadeInStagger className="flex flex-wrap justify-between gap-8 px-10 py-6 2xl:container md:flex-nowrap">
        {data.map((d, idx) => (
          <FadeIn key={idx} className="flex items-start gap-4">
            <img
              className="flex-shrink-0"
              height={50}
              width={50}
              src={d.icon}
              alt={d.title}
            />
            <div>
              <H5>{d.title}</H5>
              <P>{d.desc}</P>
            </div>
          </FadeIn>
        ))}
      </FadeInStagger>
    </>
  )
}
