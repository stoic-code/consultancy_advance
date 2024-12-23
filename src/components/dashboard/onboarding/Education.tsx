'use state'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, GraduationCap, Trash2 } from 'lucide-react'
import { AddEducationModal } from './AddEducationModal'
import {
  FaBuilding,
  FaCalendar,
  FaChalkboardTeacher,
  FaCube,
  FaGraduationCap,
  FaUserCog,
} from 'react-icons/fa'
import toast from 'react-hot-toast'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import { useAuth } from '@/providers/AuthProvider'
import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { Button } from '@/components/ui/button'
import { useInView } from 'framer-motion'
import FormAnimateWrapper from '@/components/onboard/FormAnimateWrapper'

export const Education = () => {
  const { token } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const urlSearchParams = useSearchParams()
  const searchParams = new URLSearchParams(urlSearchParams)
  searchParams.set('step', '5')

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [educations, setEducations] = useState<any[]>([])

  const { data } = useGetStudentProfile(token!)
  const { mutateAsync, isPending } = useEditStudentProfile(token!)

  const onSubmit = async () => {
    if (educations.length < 1) {
      toast('Please add at least one education details')
      return
    }
    try {
      await mutateAsync({
        ...data,
        education: [...educations],
        onboard: 4,
      })
      toast.success('Updated education successfully !!')
      searchParams.delete('back')
      router.push(`${pathName}?${searchParams.toString()}`)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  const addEducation = (data: {}) => {
    setEducations([...educations, data])
  }

  const handleDelete = (idx: number) => {
    const updated = [...educations]
    updated.splice(idx, 1)
    setEducations(updated)
  }

  useEffect(() => {
    setEducations(data?.education)
  }, [data])

  const handleBack = () => {
    searchParams.set('back', 'true')
    searchParams.set('step', '3')
    router.push(`${pathName}?${searchParams.toString()}`)
  }

  return (
    <FormAnimateWrapper>
      <div className="h-full w-full   space-y-3 pb-12">
        {educations?.length < 1 ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border p-10 text-muted-foreground">
              <GraduationCap size={20} /> Add Educatin Details
              <AddEducationModal func={addEducation} />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {educations?.map((d, idx) => (
              <div
                key={idx}
                className="relative rounded-xl border bg-muted p-2"
              >
                <button
                  onClick={() => handleDelete(idx)}
                  className="absolute right-2 top-2 text-red-500"
                >
                  <Trash2 size={20} />
                </button>
                <h4 className="pb-4 font-semibold">{d.course}</h4>
                <div
                  key={idx}
                  className="relative grid grid-cols-2 justify-center gap-4 gap-y-4 p-2"
                >
                  {d.university && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        <FaBuilding className="inline" /> University / School
                      </p>
                      <p className="text-[0.9rem]">{d.university}</p>
                    </div>
                  )}

                  {d.specialization && (
                    <div>
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        <FaUserCog className="inline" /> Specialization
                      </p>
                      <p className="text-[0.9rem]">{d.specialization}</p>
                    </div>
                  )}

                  {d.faculty && (
                    <div>
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        <FaChalkboardTeacher className="inline" /> Faculty
                      </p>
                      <p className="text-[0.9rem]">{d.faculty}</p>
                    </div>
                  )}
                  {d.level && (
                    <div>
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        <FaCube className="inline" /> Level of Education
                      </p>
                      <p className="text-[0.9rem]">{d.level || '-'}</p>
                    </div>
                  )}

                  {d.graduation_year && (
                    <div>
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        <FaCalendar className="inline" /> Year of Graduation
                      </p>
                      <p className="text-[0.9rem]">{d.graduation_year}</p>
                    </div>
                  )}
                  {d.gpa && (
                    <div>
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        <FaGraduationCap className="inline" /> CGPA/Percentage
                      </p>
                      <p className="text-[0.9rem]">{d.gpa}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 py-4">
              Add More <AddEducationModal func={addEducation} />
            </div>
          </div>
        )}

        <div className="flex  w-full items-center  justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="group flex items-center gap-[3px] text-muted-foreground "
          >
            <ChevronLeft
              size={20}
              className=" relative right-0 transition-all duration-100  ease-linear group-hover:right-1 group-hover:scale-105 "
            />
            Back
          </button>
          <FormSubmitBtn
            onClick={onSubmit}
            className=""
            isSubmitting={isPending}
          >
            Next
          </FormSubmitBtn>
        </div>
      </div>
    </FormAnimateWrapper>
  )
}
