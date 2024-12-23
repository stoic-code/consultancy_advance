'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function InstitutionTab({ id }: { id: string }) {
  const pathname = usePathname()
  const isCoursePage = pathname.includes('courses')

  return (
    <div className=" flex gap-x-4 px-4 text-lg font-medium ">
      <Link
        className={cn('relative overflow-hidden px-2')}
        href={`/admin/instutions/${id}`}
      >
        Overview
        <hr
          className={` ${!isCoursePage ? ' bottom-0 left-2' : 'bottom-0 left-28'}  absolute z-30 h-[3px]  w-20 rounded-2xl bg-primary transition-all duration-200 ease-linear`}
        />
      </Link>
      <Link
        href={`/admin/instutions/${id}/courses`}
        className={cn('relative overflow-hidden px-2 ')}
      >
        Courses
        <hr
          className={` ${isCoursePage ? ' bottom-0 left-1' : '-left-28 bottom-0'}  absolute z-30 h-[3px] w-20  rounded-2xl bg-primary transition-all delay-100 duration-200 ease-linear`}
        />
      </Link>
    </div>
  )
}
