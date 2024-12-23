import React from 'react'
import { H1, P } from '../typography'
import { FadeIn, FadeInStagger } from '../Fade'

const data = [
  {
    icon: '/for-partners/icons/uni.svg',
    title: 'A Wealth of Options',
    desc: 'Offer more to your students from 800+ universities globally',
  },
  {
    icon: '/for-partners/icons/payment.svg',
    title: 'Trusted and Transparent Payments',
    desc: 'We pay you at multiple stages of the application and enrollment process.',
  },
  {
    icon: '/for-partners/icons/assistance.svg',
    title: 'Immediate Assistance',
    desc: 'Create a strong system to attract high-caliber students from our feeder schools.',
  },
  {
    icon: '/for-partners/icons/custom.svg',
    title: 'Customized Solutions',
    desc: 'Customized student recruitment solutions to match your market and requirements.',
  },
]

const WhyPartner = () => {
  return (
    <div
      style={{ background: 'url(/for-partners/stars.svg) no-repeat 1% 10%' }}
    >
      <div className="grid gap-8 bg-white px-4 py-10 2xl:container md:grid-cols-2 md:py-20 lg:bg-transparent lg:py-32">
        <FadeInStagger className="space-y-3 self-end">
          <FadeIn>
            <H1 className="text-[#392761]">
              Why partner <br /> with us?
            </H1>
          </FadeIn>
          <FadeIn>
            <P className="text-muted-foreground">
              Partnering with Consult Advance means accessing growth
              opportunities, transparent payments, a global network, exclusive
              offerings, and industry insights. Let&apos;s collaborate for your
              success in education recruitment
            </P>
          </FadeIn>
        </FadeInStagger>

        <FadeInStagger className="grid gap-8 sm:grid-cols-2">
          {data.map((d, idx) => (
            <FadeIn key={idx} className="space-y-2">
              <div className="flex aspect-square w-fit items-center justify-center rounded-full border bg-white p-2 shadow">
                <img src={d.icon} alt="" width={32} height={32} />
              </div>
              <p className="font-semibold">{d.title}</p>
              <p className="font-thin">{d.desc}</p>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </div>
  )
}

export default WhyPartner
