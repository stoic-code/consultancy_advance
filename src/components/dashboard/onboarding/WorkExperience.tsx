'use state'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { Briefcase, ChevronLeft, Trash2 } from 'lucide-react'
import { FaBuilding, FaCalendar, FaCube } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { AddWorkModal } from './AddWorkModal'
import { LuListTodo } from 'react-icons/lu'
import { formatDate } from '@/lib/date'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import FormAnimateWrapper from '@/components/onboard/FormAnimateWrapper'

export const WorkExperience = () => {
  const { token } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const urlSearchParams = useSearchParams()
  const searchParams = new URLSearchParams(urlSearchParams)
  searchParams.set('step', '5')
  const [workExp, setWorkExp] = useState<any[]>([])

  const { data } = useGetStudentProfile(token!)
  const { mutateAsync } = useEditStudentProfile(token!)

  const onSubmit = async () => {
    if (workExp.length === 0) {
      toast.error('Please skip if you do not want to add work experience.')
      return
    }
    try {
      await mutateAsync({
        ...data,
        work: [...workExp],
        onboard: 5,
      })
      toast.success('Updated work experience successfully !!')
      searchParams.delete('back')
      router.push(pathName)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  const handleSkip = async () => {
    const promise = mutateAsync({
      ...data,
      onboard: 5,
    }).then(() => router.push('/students/profile'))
    toast.promise(promise, {
      success: 'Successfully updated work experience.',
      loading: 'Updating status...',
      error: (err: any) => err.message || 'Something went wrong !',
    })
  }

  const addWorkExperience = (data: {}) => {
    setWorkExp([...workExp, data])
  }

  const handleDelete = (idx: number) => {
    const updatedWorkExp = [...workExp]
    updatedWorkExp.splice(idx, 1)
    setWorkExp(updatedWorkExp)
  }

  const handleBack = () => {
    searchParams.set('back', 'true')
    searchParams.set('step', '4')
    router.push(`${pathName}?${searchParams.toString()}`)
  }
  return (
    <FormAnimateWrapper>
      <div className="h-full w-full space-y-3 pb-12">
        {workExp.length < 1 ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border p-10 text-muted-foreground">
              <Briefcase size={20} /> Add Work Experience
              <AddWorkModal func={addWorkExperience} />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {workExp.map((d, idx) => (
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
                  {d.company_name && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        <FaBuilding className="inline" /> Company
                      </p>
                      <p className="text-[0.9rem]">{d.company_name}</p>
                    </div>
                  )}

                  {d.job_title && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        <LuListTodo className="inline" /> Job Title
                      </p>
                      <p className="text-[0.9rem]">{d.job_title}</p>
                    </div>
                  )}

                  {d.starting_date && (
                    <div>
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        <FaCalendar className="inline" /> Starting Date
                      </p>
                      <p className="text-[0.9rem]">
                        {formatDate(d.starting_date)}
                      </p>
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

                  {d.end_date && (
                    <div>
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        <FaCalendar className="inline" /> End Date
                      </p>
                      <p className="text-[0.9rem]">{formatDate(d.end_date)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 py-4">
              Add More <AddWorkModal func={addWorkExperience} />
            </div>
          </div>
        )}
        <div className=" flex items-center justify-between text-muted-foreground">
          <button
            type="button"
            onClick={handleBack}
            className="group flex items-center gap-[3px] "
          >
            <ChevronLeft
              size={20}
              className=" relative right-0 transition-all duration-100  ease-linear group-hover:right-1 group-hover:scale-105 "
            />
            Back
          </button>
          <div className="flex justify-end gap-2">
            {workExp.length === 0 && (
              <Button onClick={handleSkip} variant="secondary">
                Skip
              </Button>
            )}
            <FormSubmitBtn onClick={onSubmit} isSubmitting={false}>
              Next
            </FormSubmitBtn>
          </div>
        </div>
      </div>
    </FormAnimateWrapper>
  )
}
