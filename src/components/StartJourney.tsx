'use client'
import { usePathname } from 'next/navigation'
import { FadeIn } from './Fade'
import { Button } from './ui/button'
import Link from 'next/link'
import { Phone } from 'lucide-react'

const includeBanner = ['/for-students', '/for-partners', '/for-instutions', '/']

const StartJourney = () => {
  const pathname = usePathname()
  const forStudents = pathname.startsWith('/for-students')
  const forPartners = pathname.startsWith('/for-partners')
  const forInstutions = pathname.startsWith('/for-instution')

  if (includeBanner.includes(pathname))
    return (
      <div className="absolute -top-48 left-0 flex w-full items-center justify-center">
        <div className="relative mx-auto flex h-52 w-[95%] translate-y-28 overflow-hidden rounded-3xl bg-gradient-to-r from-[#005EEA] via-[#1898F5] to-white shadow-lg md:w-[80%] md:translate-y-14 lg:max-w-3xl">
          <div className="flex flex-1  flex-col justify-center gap-4 rounded-l-3xl px-2 sm:px-10">
            {forStudents ? (
              <h2 className="font-bold text-white sm:text-3xl md:text-4xl">
                Start Your Study Abroad <br /> Journey With Us
              </h2>
            ) : forPartners ? (
              <h2 className="font-bold text-white sm:text-3xl md:text-4xl">
                Partner With Us: <br /> Let's Collaborate for Success
              </h2>
            ) : (
              <h2 className="font-bold text-white sm:text-3xl md:text-4xl">
                Start Your Study Abroad <br />
                Journey With Us
              </h2>
            )}
            {forInstutions ? (
              <span
                className="flex w-fit items-center gap-2 rounded-full  bg-white  px-3 py-2 font-semibold text-[#0160ea]
                "
              >
                <Phone size={16} />
                +977 98414884566
              </span>
            ) : (
              <Link
                className="flex w-fit items-center gap-2 rounded-full  bg-white  px-3 py-2 font-semibold text-[#0160ea]
                "
                href={
                  forStudents
                    ? '?student-registration=open'
                    : forPartners
                      ? '/register/partner'
                      : '?student-registration=open'
                }
              >
                {forStudents
                  ? 'Contact Us'
                  : forPartners
                    ? 'Become a Partner'
                    : 'Contact Us'}
              </Link>
            )}
            <div
              style={{ background: 'white url(/start-journey/cube.svg)' }}
              className="mask mask-invert absolute -right-28 -top-2 flex aspect-square w-60 items-center justify-center rounded-full bg-white md:-right-16"
            >
              <img
                className="w-44 -translate-x-16 -translate-y-5 sm:w-auto"
                src="/start-journey/rocket.webp"
                width={300}
                height={300}
                alt="rocket"
              />
            </div>
          </div>
        </div>
      </div>
    )

  return <></>
}

export default StartJourney
