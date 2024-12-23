'use client'
import { H1, P } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { FadeIn, FadeInStagger } from '../Fade'
import Link from 'next/link'

export const Hero = () => {
  return (
    <div
      style={{
        background:
          'url(/for-partners/partner-hero-bg.webp) no-repeat center/cover',
      }}
      className="grid overflow-hidden px-4 py-10 2xl:container md:grid-cols-2 lg:py-36"
    >
      <FadeInStagger className="order-2 flex flex-col justify-center gap-y-5">
        <FadeIn>
          <H1 className="text-4xl">Your Success is Our Mission</H1>
        </FadeIn>

        <FadeIn>
          <P className="text-muted-foreground">
            Join forces with us to ensure the continued success and growth of
            your business. Together, we&apos;ll unlock new opportunities, drive
            innovation, and achieve remarkable results that propel your business
            towards a prosperous future
          </P>
        </FadeIn>

        <FadeIn className="flex flex-wrap gap-2">
          <Button
            asChild
            className="flex w-fit items-center justify-center rounded-full px-6 py-6 text-lg shadow-lg"
          >
            <Link href="/register/partner">Become A Partner</Link>
          </Button>
        </FadeIn>
      </FadeInStagger>
      <div className="relative hidden w-full items-center justify-center md:order-2 md:flex md:-translate-y-8 md:translate-x-8">
        <img
          className="absolute left-0 top-0 animate-circle-50"
          width={50}
          height={100}
          src="/for-partners/megaphone.webp"
          alt=""
        />
        <img
          className="absolute bottom-0 left-20 animate-circle-100"
          width={50}
          height={80}
          src="/for-partners/check.webp"
          alt=""
        />
        <img
          className="absolute -bottom-32 animate-circle-80"
          width={50}
          height={80}
          src="/for-partners/target.webp"
          alt=""
        />

        <img
          width={400}
          height={400}
          className="h-[400px] w-[400px]"
          src="/for-partners/for-partner-hero.webp"
          alt=""
        />
      </div>
    </div>
  )
}
