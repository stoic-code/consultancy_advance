'use client'
import Link from 'next/link'
import { H1, P } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FadeInStagger, FadeIn } from '../Fade'

export const Hero = () => {
  return (
    <div
      style={{
        background: 'url(/for-students/hero-bg.webp) no-repeat bottom/cover',
      }}
      className="grid items-center px-4 pb-20 pt-20 2xl:container md:grid-cols-2"
    >
      <FadeInStagger className="order-2  flex flex-col justify-center gap-y-5">
        <FadeIn>
          <H1>
            Your Dream{' '}
            <span className="relative">
              University
              <svg
                width="254"
                height="11"
                viewBox="0 0 254 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, transition: { duration: 0.8 } }}
                  d="M1 9.74479C99.4122 -1.61197 154.588 -2.214 253 9.74479"
                  stroke="#FF698D"
                  strokeWidth="2"
                />
              </svg>
            </span>{' '}
            Awaits!
          </H1>
        </FadeIn>
        <FadeIn>
          <P className="text-muted-foreground">
            Explore the world&apos;s top universities with personalized guidance
            tailored to your aspirations. Join thousands of successful students
            who have found their path to success through our expert support.
            Let&apos;s make your dream a reality together.
          </P>
        </FadeIn>
        <FadeIn>
          <Button
            asChild
            className="flex w-fit items-center justify-center rounded-full px-6 py-6 text-lg shadow-lg"
          >
            <Link href="?student-registration=open">Take the First Step</Link>
          </Button>
        </FadeIn>
      </FadeInStagger>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
        className="grid w-full justify-center md:order-2 lg:h-[500px]"
      >
        <img
          width={500}
          height={500}
          src="/for-students/hero-img.webp"
          alt=""
        />
      </motion.div>
    </div>
  )
}
