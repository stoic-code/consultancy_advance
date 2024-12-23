'use client'
import Link from 'next/link'

import {
  BookOpen,
  Briefcase,
  CirclePlus,
  File,
  GraduationCap,
  MapPin,
  SquarePen,
  Trash2,
  User,
} from 'lucide-react'
import {
  FaBuilding,
  FaCalendar,
  FaChalkboardTeacher,
  FaCube,
  FaEye,
  FaGraduationCap,
  FaPassport,
} from 'react-icons/fa'
import { LuListTodo } from 'react-icons/lu'

import { TopBar } from '@/components/dashboard/TobBar'
import AddEducationDialog from '@/components/dashboard/student/EducationAddModal'
import { DialogTrigger } from '@/components/ui/dialog'

import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { useAuth } from '@/providers/AuthProvider'
import { formatDate } from '@/lib/date'
import PageLoadingUI from '@/components/common/loading'

import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import toast from 'react-hot-toast'
import { AddWorkExperience } from '@/components/dashboard/student/AddWorkExp'
import { DeleteAlert } from '@/components/for-students/profile/DeleteAlert'
import EditAboutMe from '@/components/for-students/profile/EditAboutMe'
import { EditEducation } from '@/components/for-students/profile/EditEducation'
import { EditTestResult } from '@/components/for-students/profile/EditTestResult'
import { EditWorkExperience } from '@/components/for-students/profile/EditWorkExperience'

const tests = [
  { title: 'IELTS', value: 'ielts' },
  { title: 'TOFEL', value: 'tofel' },
  { title: 'PTE', value: 'pte' },
  { title: 'SAT', value: 'sta' },
  { title: 'GRE', value: 'gre' },
  { title: 'GMAT', value: 'gmat' },
]

const page = () => {
  const { token, user } = useAuth()
  const { data, isLoading, error } = useGetStudentProfile(token!)
  const { mutateAsync } = useEditStudentProfile(token!)

  if (isLoading) return <PageLoadingUI />
  if (error) return <>Error</>

  const handleEducationDelete = (idx: number) => {
    const newData = { ...data }
    newData.education.splice(idx, 1)
    const promise = mutateAsync(data)
    toast.promise(promise, {
      error: (err: any) => err.message || 'Something went wrong !',
      success: 'Deleted education successfully !!',
      loading: 'Please wait...',
    })
  }

  const handleWorkExpDelete = (idx: number) => {
    const newData = { ...data }
    newData.work.splice(idx, 1)
    const promise = mutateAsync(data)
    toast.promise(promise, {
      error: (err: any) => err.message || 'Something went wrong !',
      success: 'Deleted work experience successfully !!',
      loading: 'Please wait...',
    })
  }

  return (
    <div>
      <TopBar title="My Profile" />
      <div className="space-y-10 px-2 py-10 md:px-10">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <img
            width={150}
            className="rounded-full"
            height={150}
            src="/avatar.avif"
            alt="user"
          />
          <div>
            <div className="space-y-2">
              <p className="text-2xl font-semibold">
                {data.first_name} {data.middle_name ? data.middle_name : ''}{' '}
                {data.last_name}{' '}
                <Link href="/students/settings" className="">
                  <SquarePen className="inline" size={16} />
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">Student</p>
              <div className="flex items-center gap-4">
                <p className="flex-1 text-muted-foreground">
                  <span className="font-bold">Email :</span>{' '}
                  <span>{user?.email}</span>
                </p>
                <div className="h-[30px] w-[2px] bg-muted-foreground md:h-[25px]"></div>
                <p className="flex-1 text-muted-foreground">
                  <span className="font-bold">Phone :</span>{' '}
                  <span>{data.phone.split(',').join('-')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl rounded-xl border">
          <div className="flex justify-between rounded-t-xl border-b bg-muted px-4 py-2">
            <h1 className="text-xl font-semibold">
              <User size={20} className="inline" /> About Me
            </h1>

            {/* EDIT BUTTON */}
            <EditAboutMe data={data}>
              <SquarePen size={16} />
            </EditAboutMe>
          </div>
          <div className="grid grid-cols-2 justify-center gap-x-4 gap-y-8 p-8 sm:grid-cols-3 md:grid-cols-4">
            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                <MapPin size={18} className="inline" /> Address
              </p>
              <p>{data?.address || '-'}</p>
            </div>

            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                <FaCalendar className="inline" /> Date of Birth
              </p>
              <p>{formatDate(data.birth_date) || '-'}</p>
            </div>

            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                <FaPassport className="inline" /> Nationality
              </p>
              <p>{data?.nationality || '-'}</p>
            </div>

            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                <FaGraduationCap className="inline" /> Higest Education
              </p>
              <p>{data.highest_education || '-'}</p>
            </div>

            <div>
              <p className="pb-1 text-sm font-semibold text-muted-foreground">
                <FaEye className="inline" /> Looking For
              </p>
              <ul className="text-sm">
                {data.course_preference.map((d: any, idx: number) => (
                  <li key={idx}>{d} </li>
                )) || '-'}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl rounded-xl border">
          <div className="flex items-center gap-2 rounded-t-xl border-b bg-muted px-4 py-2 ">
            <h1 className="text-xl font-semibold">
              <GraduationCap size={20} className="inline" /> Education
            </h1>
            <AddEducationDialog />
          </div>
          {data?.education.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No Education Added
            </div>
          ) : (
            data?.education.map((d: any, idx: number) => (
              <div className="px-8" key={idx}>
                <h4 className="flex gap-2 pt-2 font-semibold">
                  <BookOpen /> {d.course}
                </h4>
                <div
                  key={idx}
                  className="relative grid grid-cols-2 justify-center gap-y-8 border-b py-4 sm:grid-cols-3 md:grid-cols-4"
                >
                  <div className="absolute right-1 top-2 flex gap-2">
                    <EditEducation data={data} idx={idx}>
                      <SquarePen size={16} />
                    </EditEducation>
                    <DeleteAlert action={() => handleEducationDelete(idx)}>
                      <Trash2
                        size={16}
                        className="cursor-pointer text-destructive"
                      />
                    </DeleteAlert>
                  </div>
                  <div>
                    <p className="pb-1 text-sm font-semibold text-muted-foreground">
                      <FaBuilding className="inline" /> University
                    </p>
                    <p>{d.university || '-'}</p>
                  </div>
                  {d.faculty && (
                    <div>
                      <p className="pb-1 text-sm font-semibold text-muted-foreground">
                        <FaChalkboardTeacher className="inline" /> Faculty
                      </p>
                      <p>{d.faculty}</p>
                    </div>
                  )}
                  {d.level && (
                    <div>
                      <p className="pb-1 text-sm font-semibold text-muted-foreground">
                        <FaCube className="inline" /> Level of Education
                      </p>
                      <p>{d.level}</p>
                    </div>
                  )}
                  {d.starting_year && (
                    <div>
                      <p className="pb-1 text-sm font-semibold text-muted-foreground">
                        <FaCalendar className="inline" /> Starting Year
                      </p>
                      <p className="text-sm">{d.starting_year}</p>
                    </div>
                  )}
                  {d.graduation_year ? (
                    <div>
                      <p className="pb-1 text-sm font-semibold text-muted-foreground">
                        <FaCalendar className="inline" /> Year of Graduation
                      </p>
                      <p className="text-sm">{d.graduation_year}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="pb-1 text-sm font-semibold text-muted-foreground">
                        <FaCalendar className="inline" /> Year of Graduation
                      </p>
                      <p className="text-sm">Currently Studying</p>
                    </div>
                  )}
                  {!!d.gpa && (
                    <div>
                      <p className="pb-1 text-sm font-semibold text-muted-foreground">
                        <FaGraduationCap className="inline" /> CGPA/Percentage
                      </p>
                      <p>{d.gpa}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          <div className="relative flex justify-between p-4">
            <div className="flex w-full gap-8 md:gap-16">
              <div className="flex justify-between">
                <span className="block font-semibold">Tests</span>
              </div>
              <div className="flex flex-1 flex-wrap gap-8">
                {tests.map(
                  (t, idx) =>
                    data.test &&
                    data.test[t.value] && (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-semibold text-muted-foreground">
                          {t.title}
                        </span>
                        <span className="items-center rounded-full bg-gray-200 px-2 py-[1px] text-sm font-medium">
                          {data.test[t.value]}
                        </span>
                      </div>
                    ),
                )}
              </div>
            </div>
            <EditTestResult data={data}>
              <DialogTrigger
                className="absolute right-2 top-6 cursor-pointer text-primary"
                asChild
              >
                <SquarePen size={16} />
              </DialogTrigger>
            </EditTestResult>
          </div>
        </div>

        <div className="min-h-36 max-w-4xl rounded-xl border">
          <div className="flex items-center gap-2 rounded-t-xl border-b bg-muted px-4 py-2">
            <h1 className="text-xl font-semibold">
              <Briefcase size={20} className="inline" /> Work Experience
            </h1>
            <AddWorkExperience data={data}>
              <DialogTrigger className="flex items-center">
                <CirclePlus size={20} className="text-blue-500" />
              </DialogTrigger>
            </AddWorkExperience>
          </div>
          {data.work.length > 0 ? (
            data.work.map((d: any, idx: number) => (
              <div
                key={idx}
                className="relative grid grid-cols-2 justify-center gap-4 gap-y-8 border-b p-8 sm:grid-cols-3 md:grid-cols-4"
              >
                <div className="absolute right-2 top-3 flex gap-2">
                  <EditWorkExperience data={data} idx={idx}>
                    <DialogTrigger className=" text-primary">
                      <SquarePen size={16} />
                    </DialogTrigger>
                  </EditWorkExperience>
                  <DeleteAlert action={() => handleWorkExpDelete(idx)}>
                    <Trash2
                      size={16}
                      className="cursor-pointer text-destructive"
                    />
                  </DeleteAlert>
                </div>
                <div>
                  <p className="pb-1 text-sm font-semibold text-muted-foreground">
                    <FaBuilding className="inline" /> Company Name
                  </p>
                  <p className="text-sm">{d.company_name}</p>
                </div>
                <div>
                  <p className="pb-1 text-sm font-semibold text-muted-foreground">
                    <LuListTodo className="inline" /> Job Title
                  </p>
                  <p className="text-sm">{d.job_title}</p>
                </div>
                <div>
                  <p className="pb-1 text-sm font-semibold text-muted-foreground">
                    <FaCalendar className="inline" /> Starting Date
                  </p>
                  <p className="text-sm">{formatDate(d.starting_date)}</p>
                </div>
                <div>
                  <p className="pb-1 text-sm font-semibold text-muted-foreground">
                    <FaCalendar className="inline" /> End Date
                  </p>
                  <p className="text-sm">
                    {d.end_date ? formatDate(d.end_date) : 'Currently working'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full items-center justify-center py-20 text-muted-foreground">
              No work experience
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default page
