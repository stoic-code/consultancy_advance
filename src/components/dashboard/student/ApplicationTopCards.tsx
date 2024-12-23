'use client'
import { BookmarkCheck, GraduationCap, MoveRight } from 'lucide-react'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ApplicationTopCards = () => {
  const pathName = usePathname()
  const isSavedPage = pathName === '/students/application/saved'

  return (
    <>
      <Link
        href="/for-students/courses"
        className="group flex w-fit items-center gap-4 rounded-xl bg-blue-100/50 p-4 shadow-none transition-colors"
      >
        <CardHeader className="space-y-3 p-0">
          <div className="w-fit rounded-xl bg-pink-200 p-1">
            <GraduationCap size={30} strokeWidth={1.5} />
          </div>

          <CardTitle className="transition-colors group-hover:text-primary">
            Browse All Courses
          </CardTitle>
          <CardDescription className="flex gap-2">
            See all the courses that our <br /> universities offer
            <MoveRight className="text-blue-500 transition-transform duration-500 group-hover:translate-x-2" />
          </CardDescription>
        </CardHeader>
      </Link>

      {/* {!isSavedPage && (
        <Link
          href="/students/application/saved"
          className="group flex w-fit items-center gap-4 rounded-xl bg-red-100/50 p-4 shadow-none transition-all duration-300"
        >
          <CardHeader className="space-y-3 p-0">
            <div className="w-fit rounded-xl bg-green-200 p-1">
              <BookmarkCheck size={30} strokeWidth={1.5} />
            </div>
            <CardTitle className="transition-colors group-hover:text-primary">
              View Saved Courses
            </CardTitle>
            <CardDescription className="flex gap-2">
              See all the courses that you <br /> have saved
              <MoveRight className="text-blue-500 transition-transform duration-500 group-hover:translate-x-2" />
            </CardDescription>
          </CardHeader>
        </Link>
      )} */}
    </>
  )
}

export default ApplicationTopCards
