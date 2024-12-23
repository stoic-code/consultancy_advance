'use client'
import PageLoadingUI from '@/components/common/loading'
import { H3 } from '@/components/typography'
import { useGetInstutionById } from '@/hooks/query/instution.query'
import { GraduationCap, Mail, Phone } from 'lucide-react'
import React from 'react'

type Params = {
  [key: string]: string
}

const page = ({ params }: { params: Params }) => {
  const { id } = params

  const { data, isLoading } = useGetInstutionById(id)

  if (isLoading) return <PageLoadingUI />

  return (
    <>
      <div>
        {/* DESCRIPTION OF UNI */}
        <div className="relative space-y-4 px-4 pt-12 2xl:container lg:px-20">
          <H3>About University</H3>
          <div className="relative">
            <p
              className="editor"
              dangerouslySetInnerHTML={{
                __html: data.about,
              }}
            ></p>
          </div>
        </div>
        {/* CAPSULES */}
        <div className="mx-auto grid max-w-4xl gap-4 px-4  py-10 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-4">
          <div className="rounded-xl border p-4">
            <div className="flex gap-2 font-semibold">
              <Mail size={16} />
              Email
            </div>
            <p className="text-muted-foreground">{data.email}</p>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex gap-2 font-semibold">
              <Phone size={16} />
              Phone
            </div>
            <p className="text-muted-foreground">{data.phone}</p>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex gap-2 font-semibold">
              <GraduationCap size={16} />
              No of Courses
            </div>
            <p className="text-muted-foreground">{data.courses.length}</p>
          </div>

          {/* uni?.details.map((d: any, index: number) => (
            <div key={index} className="rounded-xl border p-4">
              <div className="flex gap-2 font-semibold">
                {d.icon}
                {d.title}
              </div>
              <p className="text-muted-foreground">{d.value}</p>
            </div>
          )) */}
        </div>
        {/* <UniDetail uni={universities[0]} /> */}
      </div>
    </>
  )
}

export default page
