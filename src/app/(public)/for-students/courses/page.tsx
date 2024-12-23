'use client'
import Sidebar from '@/components/for-students/courses/SideBar'
import CoursesList from '@/components/for-students/courses/CoursesList'
import { H4 } from '@/components/typography'
import { useGetInstutions } from '@/hooks/query/instution.query'

export default function page() {
  const { data } = useGetInstutions()
  return (
    <>
      <section className="mt-8 min-h-screen px-4 2xl:container">
        <H4 className="text-primary">Browse Courses</H4>

        <div className="mt-8 grid h-full min-h-screen w-full grid-cols-3 gap-2">
          <div className="col-span-3 h-full 2xl:container lg:col-span-1 lg:block">
            <div className="mb-4">
              <h4 className="  text-lg font-semibold">
                {data?.length} universities
              </h4>
            </div>
            <Sidebar />
          </div>

          <div className="col-span-3 h-full lg:col-span-2">
            <CoursesList />
          </div>
        </div>
      </section>
    </>
  )
}
