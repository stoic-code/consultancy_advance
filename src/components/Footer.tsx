'use client'
import React from 'react'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  LinkedinIcon,
  Instagram,
  Facebook,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

import StartJourney from './StartJourney'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()

  const pathName = usePathname()
  const noFooter =
    pathName.startsWith('/students') ||
    pathName.startsWith('/onboard') ||
    pathName.startsWith('/agent') ||
    pathName.startsWith('/instutions') ||
    pathName.startsWith('/admin') ||
    pathName.startsWith('/forgot-password')

  return !noFooter ? (
    <footer
      style={{
        background: 'rgba(0,0,0,0.1) url(/footer/whole.svg) no-repeat bottom',
      }}
    >
      <div className=" relative w-full px-4 pb-8 pt-32 2xl:container md:px-16 ">
        <StartJourney />
        <div className="flex flex-col justify-between gap-y-8 py-10 xl:flex-row">
          <div className="flex flex-col items-start gap-4 md:flex-row lg:gap-2">
            <div className="mt-8 flex items-start justify-start gap-2 md:mt-0">
              <img
                width={100}
                height={100}
                src="/logo.png"
                alt="logo"
                className="w-[70px]"
              />
              <h1 className="mb-4 flex flex-col text-2xl font-bold md:hidden">
                <span className="tracking-wide">Consult Advance</span>
                <span className="text-sm font-normal">
                  Educational Consultancy Pvt. Ltd.
                </span>
              </h1>
            </div>
            <div className="flex w-full flex-col justify-between md:flex-row xl:flex-col">
              <h1 className="mb-4 hidden md:block ">
                <span className="text-3xl font-semibold tracking-widest">
                  Consult Advance
                </span>
                <br />
                <span className="text-lg font-semibold">
                  Educational Consultancy Pvt. Ltd.
                </span>
              </h1>
              <ul className="flex flex-col gap-2 text-sm">
                <li className="flex gap-2">
                  <MapPin size={16} />
                  Seoul, Korea
                </li>

                <li className="flex gap-2">
                  <Phone size={16} /> +82 10-4489-9710
                </li>

                <li className="flex gap-2">
                  <Mail size={16} />
                  info@consultadvance.com
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-8 md:mx-auto md:w-full md:flex-row md:justify-around md:gap-8 lg:gap-16 xl:mx-0 xl:w-fit">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Company</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/contact">Feedback</Link>
                </li>
                <li>
                  <Link href="/contact/partner">Partnership</Link>
                </li>
                <li>
                  <Link href="#">Terms and Conditions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Join</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Quick links</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/tos">Terms And Conditions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Join us on Social Medias
              </h3>
              <ul className="flex gap-4 text-sm">
                <li className="rounded-full border bg-white p-3 shadow-inner">
                  <Link
                    aria-label="whatsapp messaging direct link"
                    href="https://wa.me/10-4489-9710"
                    target="_blank"
                  >
                    <FaWhatsapp size={20} />
                  </Link>
                </li>
                <li className="rounded-full border bg-white p-3 shadow-inner">
                  <Link
                    aria-label="our facebook page link"
                    href=""
                    target="blank"
                  >
                    <Facebook size={20} />
                  </Link>
                </li>
                <li className="rounded-full border bg-white p-3 shadow-inner">
                  <Link
                    aria-label="our instagram facebook page link"
                    href=""
                    target="_blank"
                  >
                    <Instagram size={20} />
                  </Link>
                </li>
                <li className="rounded-full border bg-white p-3 shadow-inner">
                  <Link
                    aria-label="our linkedin page link"
                    href=""
                    target="_blank"
                  >
                    <LinkedinIcon size={20} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between gap-y-2 px-4 text-sm md:flex-row">
          <span>&copy; Copyright {year} MetaLogic. All rights reserved.</span>
          <span className="font-medium">
            Powered By:{' '}
            <a className="text-blue-500" href="https://metalogic.com.np">
              Metalogic Software
            </a>
          </span>
        </div>
      </div>
    </footer>
  ) : (
    <></>
  )
}

export default Footer
