'use client'
import { H3, H5, P } from '../typography'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { useRef, useState } from 'react'

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState(0)
  const { scrollYProgress, scrollY } = useScroll({ target: containerRef })

  const path = useTransform(scrollYProgress, [0, 1], [0, 1])
  const circle1 = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const circle2 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const circle3 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])

  const image1 = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  useMotionValueEvent(scrollY, 'change', () => {
    setScroll(scrollYProgress.get())
  })

  return (
    <div
      ref={containerRef}
      style={{
        background:
          'url(/for-partners/multi-color-bg.svg) no-repeat center/cover',
      }}
      className="max-w-full space-y-6 overflow-hidden px-2 pb-72 pt-20"
    >
      <img
        className="mx-auto block"
        width={50}
        height={50}
        src="/stairs.svg"
        alt="stairs"
      />
      <H3 className="text-center font-medium">
        A simple, yet powerful and efficient process
      </H3>

      <div className="relative mx-auto max-w-3xl space-y-20">
        <svg
          width="3"
          height="500"
          viewBox="0 0 3 696"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-1/2 hidden -translate-x-1/2 transform md:top-16 md:block"
        >
          <motion.line
            pathLength={path}
            x1="1.6499"
            y1="-3.27835e-08"
            x2="1.64993"
            y2="696"
            stroke="#E38676"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
        </svg>

        <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{
              x: scroll >= 0.2 ? 0 : -50,
              opacity: scroll >= 0.1 ? 1 : 0,
              transition: { duration: 0.5 },
            }}
            src="/for-partners/process/1.svg"
            alt=""
            height={200}
            width={200}
          />
          <motion.div
            style={{ opacity: circle1, scale: circle1 }}
            className="z-10 hidden aspect-square w-10 place-items-center rounded-full border-4 border-blue-500 bg-white md:grid"
          >
            1
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: scroll >= 0.2 ? 0 : 50,
              opacity: scroll >= 0.2 ? 1 : 0,
              transition: { duration: 0.5 },
            }}
          >
            <H5>Exploration</H5>
            <p className="text-sm">
              Begin by thoroughly understanding each other&apos;s strengths,
              values, and objectives. Identify areas where collaboration can
              bring mutual benefits and ensure alignment in vision and goals.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{
              x: scroll >= 0.4 ? 0 : -50,
              opacity: scroll >= 0.4 ? 1 : 0,
              transition: { duration: 0.5 },
            }}
          >
            <H5>Agreement</H5>
            <p className="text-sm">
              Draft a comprehensive partnership agreement, outlining roles,
              responsibilities, and shared objectives to establish a strong
              foundation for collaboration.
            </p>
          </motion.div>
          <motion.div
            style={{ opacity: circle2, scale: circle2 }}
            className="z-10 hidden aspect-square w-10 place-items-center rounded-full border-4 border-blue-500 bg-white md:grid"
          >
            2
          </motion.div>
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: scroll >= 0.4 ? 0 : 50,
              opacity: scroll >= 0.4 ? 1 : 0,
              transition: { duration: 0.5 },
            }}
            src="/for-partners/process/2.svg"
            alt=""
            height={200}
            width={200}
          />
        </div>

        <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{
              x: scroll >= 0.8 ? 0 : -50,
              opacity: scroll >= 0.8 ? 1 : 0,
              transition: { duration: 0.5 },
            }}
            src="/for-partners/process/3.svg"
            alt=""
            height={200}
            width={200}
          />

          <motion.div
            style={{ opacity: circle3, scale: circle3 }}
            className="z-10 hidden aspect-square w-10 place-items-center rounded-full border-4 border-blue-500 bg-white md:grid"
          >
            3
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: scroll >= 0.8 ? 0 : 50,
              opacity: scroll >= 0.8 ? 1 : 0,
              transition: { duration: 0.5 },
            }}
          >
            <H5>Execution, Growth & Scale</H5>
            <p className="text-sm">
              Implement strategies collaboratively, fostering agility and
              adaptability to drive sustained growth and scale the
              partnership&apos;s impact effectively.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
