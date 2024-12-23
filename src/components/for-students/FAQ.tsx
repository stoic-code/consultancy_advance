'use client'
import React, { useState } from 'react'
import { H2, H4 } from '../typography'

import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FadeIn, FadeInStagger } from '../Fade'

import { faqs } from './data'

export const FAQ = () => {
  const [tab, setTab] = useState(faqs[0].category)

  return (
    <section id="for-students-faq" className="py-32 2xl:container">
      <FadeIn
        style={{ background: 'url(/faq/banner-bg.svg) no-repeat center/cover' }}
        className="relative mx-auto flex min-h-[200px] w-[95%] max-w-4xl items-center justify-center gap-2 rounded-3xl font-medium text-white md:w-auto"
      >
        <H2 className="font-medium">
          I have a <strong>Question</strong>
        </H2>
      </FadeIn>
      <H4 className="py-10 text-center">Frequently Asked Questions</H4>

      <div className="mx-auto flex flex-col gap-4 space-x-20 px-10 md:w-4/5 lg:flex-row lg:gap-8">
        <div className="lg:w-[30%]">
          <FadeIn className="flex flex-col justify-center gap-2 pb-6">
            <H4>Categories</H4>
            <select
              value={tab}
              onChange={(e) => setTab(e.target.value)}
              className="select block lg:hidden"
            >
              {faqs.map((f, idx) => (
                <option
                  key={idx}
                  className={cn(
                    'rounded-lg border px-4 py-3',
                    tab === f.category
                      ? 'border-primary font-semibold text-primary'
                      : '',
                  )}
                >
                  {f.category}
                </option>
              ))}
            </select>
          </FadeIn>
          <FadeInStagger className="hidden md:space-y-3 lg:block">
            {faqs.map((f, idx) => (
              <FadeIn key={idx}>
                <button
                  onClick={() => setTab(f.category)}
                  className={cn(
                    'block w-full rounded-lg border px-4 py-3 transition-all duration-150 hover:bg-primary/5',
                    f.category === tab
                      ? 'border-primary bg-primary/10 font-semibold text-primary'
                      : '',
                  )}
                >
                  {f.category}
                </button>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
        <Accordion
          style={{ margin: '0' }}
          type="single"
          collapsible
          className="w-full space-y-5"
        >
          {faqs
            .find((f) => f.category === tab)!
            .faq.map((item, idx) => (
              <AccordionItem
                className="rounded-xl border px-4"
                key={idx}
                value={`${idx}`}
              >
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent asChild>
                  <p
                    className="list-disc"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  ></p>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  )
}
