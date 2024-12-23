'use state'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import Searchbar from './SearchBar'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { PiCertificateLight } from 'react-icons/pi'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowUpRightFromSquare,
  CircleDollarSign,
  Clock,
  GraduationCap,
} from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  useGetInstutionById,
  useGetInstutionsCourse,
} from '@/hooks/query/instution.query'

import Image from 'next/image'
import { SquareArrowOutUpRight } from 'lucide-react'
import { H3, H4 } from '@/components/typography'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/AuthProvider'
import { useApplyCourse } from '@/hooks/mutations/students.mutation'
import toast from 'react-hot-toast'

export default function CoursesList() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const university = searchParams.get('university')

  if (!university) {
    return (
      <div className="h-full text-center text-muted-foreground">
        You Haven't selected any University
      </div>
    )
  } else {
    return <List university={university} query={query} />
  }
}

const List = ({
  university,
  query,
}: {
  university: string
  query: string | null
}) => {
  const { data, isLoading } = useGetInstutionsCourse(university)
  const { data: uniData, isLoading: universityLoading } =
    useGetInstutionById(university)
  const { token, user } = useAuth()
  const { mutateAsync, isPending } = useApplyCourse(token!)

  const isStudent = user?.role === 'STUDENT'
  const pathname = usePathname()
  const isOtherPage = pathname.startsWith('/agent')
  const isAdminPage = pathname.startsWith('/admin')
  const isStudentPage = pathname === '/for-students/courses'

  const handleApplyCourse = (id: string) => {
    const promise = mutateAsync(id)
    toast.promise(promise, {
      loading: 'Please wait ...',
      success: 'Applied successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  const filteredData =
    query !== null
      ? data?.filter((d: any) =>
          d.title.toLowerCase().includes(query.toLowerCase()),
        )
      : data

  if (isLoading || universityLoading) return // SHould be returning skeleton
  return (
    <section className="w-full space-y-8  2xl:container">
      <Searchbar />

      <section
        className={`flex w-full flex-col gap-4 overflow-auto pb-10 pr-0 md:w-auto md:pr-4`}
      >
        {filteredData.map((d: any, idx: number) => (
          <Drawer key={idx}>
            <DrawerTrigger>
              <div key={idx} className={`cursor-pointer`}>
                <Card className={`w-full hover:border hover:border-primary`}>
                  <CardHeader>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      {/* COURSE TITLE AND FACULTY */}
                      <CardTitle className="flex-1 text-left text-base font-semibold">
                        {d.title}
                      </CardTitle>

                      {/* ICONS AND DETAILS */}
                      <div className=" flex items-center gap-4">
                        <div className="flex flex-col items-center gap-2 sm:flex-row">
                          <Clock className=" text-orange-400" />
                          <p className=" text-sm text-muted-foreground">
                            {d.duration} years
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 sm:flex-row">
                          <PiCertificateLight className=" text-2xl font-semibold text-violet-400" />
                          <p className=" text-sm text-muted-foreground">
                            {d.level}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 sm:flex-row">
                          <CircleDollarSign className=" text-green-300" />
                          <p className=" text-sm text-muted-foreground">
                            41,156
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh] border-none outline-none">
              <div className="grid h-full overflow-y-auto px-2 pt-5 md:grid-cols-2">
                <div className="md:overflow-y-auto">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/70 to-transparent"></div>
                    <Image
                      src={
                        d.image
                          ? d.image.secure_url
                          : 'https://media.istockphoto.com/id/1371896330/photo/happy-asian-woman-in-his-graduation-day.jpg?s=612x612&w=0&k=20&c=Ur3moWl1fKFms-6UACseglMjoYAynYKzsanZpgK8lFk='
                      }
                      height={500}
                      width={1000}
                      className="rounded-2xl object-cover md:h-80"
                      alt="uni"
                    />

                    <div className="absolute bottom-2 left-2 flex items-start gap-2 text-white">
                      <Image
                        src={
                          uniData.profile_image
                            ? uniData.profile_image.secure_url
                            : 'https://media.istockphoto.com/id/1371896330/photo/happy-asian-woman-in-his-graduation-day.jpg?s=612x612&w=0&k=20&c=Ur3moWl1fKFms-6UACseglMjoYAynYKzsanZpgK8lFk='
                        }
                        height={60}
                        width={60}
                        alt="uni"
                        className="h-8 w-8 rounded-full border md:h-[60px] md:w-[60px] "
                      />
                      <div className="text-sm font-medium">
                        <h1 className="text-2xl">Hardward University</h1>
                        <Link href="" className="flex gap-1 text-blue-200">
                          <SquareArrowOutUpRight size={16} />
                          View University Website
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="w-fit space-y-2 px-2 pt-4">
                      <H3>{d.title}</H3>
                      <p
                        className="space-y-5 pb-10"
                        dangerouslySetInnerHTML={{ __html: d.description }}
                      ></p>
                    </div>
                  </div>
                </div>
                <div className="px-2 pb-10 md:px-10">
                  <div className="grid grid-cols-2  gap-x-2 gap-y-4 md:gap-x-8">
                    <DetailsCard
                      icon={<Clock size={32} />}
                      title="Duration"
                      content={`${d.duration} Years`}
                      ClassName="bg-fuchsia-50 text-fuchsia-900"
                    />

                    <DetailsCard
                      icon={<GraduationCap size={32} />}
                      title="Level"
                      content={`${d.level} Years`}
                      ClassName="bg-green-50 text-green-900"
                    />

                    {d.faculty && (
                      <DetailsCard
                        icon={<GraduationCap size={32} />}
                        title="Faculty"
                        content={`${d?.faculty} `}
                        ClassName="bg-orange-50 text-orange-900"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-5 pt-10">
                    {isAdminPage ? (
                      <>
                        <Button size="lg">Edit Details</Button>
                      </>
                    ) : isStudent && token ? (
                      <>
                        <Button
                          disabled={isPending}
                          onClick={() => handleApplyCourse(d._id)}
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </>
                    ) : token && !isStudent ? (
                      <span className="w-fit rounded-full border border-destructive p-2 text-xs text-destructive">
                        Only Available for Students
                      </span>
                    ) : (
                      <Button asChild size="lg">
                        <Link href={'?login=student'}>Login to Apply </Link>
                      </Button>
                    )}

                    <Link
                      href=""
                      className="flex items-center gap-2 text-blue-600"
                    >
                      Learn More
                      <ArrowUpRightFromSquare size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </section>
    </section>
  )
}

const DetailsCard = ({
  icon,
  title,
  content,
  ClassName,
}: {
  icon: ReactNode
  title: string
  content: string
  ClassName: string
}) => {
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-3xl px-4 py-5 md:py-10',
        ClassName,
      )}
    >
      <div className="pt-1">{icon}</div>
      <div>
        <H4>{title}</H4>
        <div className="text-muted-foreground">{content}</div>
      </div>
    </div>
  )
}
