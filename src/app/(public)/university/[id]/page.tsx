'use client'
import Link from 'next/link'
import { UniDetail } from '@/components/for-students/UniversityDetail'
import { H2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { useGetInstutionById } from '@/hooks/query/instution.query'
import PageLoadingUI from '@/components/common/loading'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'
import { GraduationCap } from 'lucide-react'

type Params = {
  [key: string]: string
}

const page = ({ params }: { params: Params }) => {
  const { id } = params
  const { token } = useAuth()
  const { data, isLoading } = useGetInstutionById(id)

  if (isLoading) return <PageLoadingUI />

  return (
    <>
      <UniDetail uni={data} />

      <H2 className="px-2 py-10 md:px-4">About University</H2>

      <div
        style={{
          background: `url(/universities/student.svg) no-repeat 95% 0%/20%, url(/universities/document.svg) no-repeat 95% 40%/20%`,
        }}
      >
        <div className="relative bg-white px-2 md:px-8 lg:bg-transparent">
          <div
            className="editor max-w-4xl pb-10"
            dangerouslySetInnerHTML={{
              __html: token ? data.about : data.about.substring(0, 500),
            }}
          ></div>

          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-b from-transparent to-white pb-10',
              token ? 'hidden' : '',
            )}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 py-10">
        {!token && (
          <Button variant="secondary" asChild>
            <Link scroll={false} href="?login=student">
              Login To View More
            </Link>
          </Button>
        )}

        <Button asChild>
          <Link
            className="flex gap-2 text-primary"
            href={`/for-students/courses?university=${data._id}`}
          >
            View Courses <GraduationCap size={20} />
          </Link>
        </Button>
      </div>
    </>
  )
}

export default page
