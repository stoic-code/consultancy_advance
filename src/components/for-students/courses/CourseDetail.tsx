import { P } from '@/components/typography'
import { useGetInstutionById } from '@/hooks/query/instution.query'

import Image from 'next/image'

export function CourseDetail({
  index,
  title,
  course,
  university,
}: {
  index: number
  title: string
  university: string
  course: any
}) {
  const { data, isLoading } = useGetInstutionById(university)

  if (isLoading) return // Should return skeleton

  return (
    <>
      <div className="border-none pt-2  shadow-none  ">
        <div className="flex gap-2 sm:gap-4">
          <Image
            src={`/for-students/courses/svg${index + 1}.svg`}
            className=" h-8 w-8 md:h-[40px] md:w-[40px] "
            height={40}
            width={40}
            alt="logo"
          />
          <div>
            <P
              className=" text-sm text-muted-foreground
            "
            >
              {title}
            </P>
            <P className=" text-sm font-medium tracking-wide"></P>
          </div>
        </div>
      </div>
    </>
  )
}
