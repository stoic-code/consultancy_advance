'use client'
import { handleModalStateFromURL } from '@/helpers/modal.helper'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import CompulsoryLabel from '../form/CompulsoryLabel'
import { courses } from '@/data/courses'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '@/hooks/mutations/students.mutation'
import {
  TStudentRegSchema,
  studentRegistrationSchema,
} from '@/schema/students.schema'

import Select from 'react-select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import FormSubmitBtn from '../form/FormSubmitBtn'
import FormErr from '../form/FormErr'
import toast from 'react-hot-toast'
import { removeEmptyStrings } from '@/lib/object'
import { selected_countries } from '@/data/country-code'
import { cn } from '@/lib/utils'

const tests = ['IELTS', 'PTE', 'TOFEL']

export function RegistrationModal() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const paramName = 'student-registration'
  const registrationMutation = useRegisterMutation()
  const isOpen = searchParams.get(paramName) === 'open'

  // HOOK FORM INITIALIZATION
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TStudentRegSchema>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      gpa: undefined,
      birth_date: undefined,
      passout_date: undefined,
      scoreType: 'gpa',
    },
  })

  const scoreType = watch('scoreType')

  // FORM SUBMIT HANDLER
  const onSubmit = async (payload: TStudentRegSchema) => {
    const { phone, country_code, gpa, out_of } = payload

    let refinedData = {
      ...payload,
      phone: `${country_code},${phone}`,
      gpa: `${gpa},${out_of}`,
    }

    if (payload.test_score !== undefined) {
      const key = payload.test_type?.toLowerCase()
      const value = payload.test_score
      //@ts-ignore
      refinedData = { ...refinedData, test: { [key]: value } }
    }

    const filteredData = removeEmptyStrings(refinedData)

    try {
      await registrationMutation.mutateAsync(filteredData)
      toast.success('Registration Successful. Please check your email !')
      handleModalStateFromURL({
        searchParams,
        paramName,
        router,
        pathName,
        action: 'close',
      })
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !!')
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() =>
        handleModalStateFromURL({
          searchParams,
          paramName,
          router,
          pathName,
          action: 'close',
        })
      }
    >
      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register As Student</DialogTitle>
          <DialogDescription>
            Once registerd you will get an email containing username and
            password of your account.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="student-registration-form"
          className="space-y-4 pt-2"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <div>
              <CompulsoryLabel>First Name</CompulsoryLabel>
              <Input
                {...register('first_name')}
                placeholder="Your First Name"
              />
              <FormErr>{errors.first_name?.message}</FormErr>
            </div>
            <div>
              <Label>Middle Name</Label>
              <Input
                {...register('middle_name')}
                placeholder="Your Middle Name"
              />
              <FormErr>{errors.middle_name?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Last Name</CompulsoryLabel>
              <Input {...register('last_name')} placeholder="Your Last Name" />
              <FormErr>{errors.last_name?.message}</FormErr>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 md:flex-row">
            <div className="w-full">
              <CompulsoryLabel>Email</CompulsoryLabel>
              <Input {...register('email')} placeholder="Your Email" />
              <FormErr>{errors.email?.message}</FormErr>
            </div>

            <div className="w-full">
              <CompulsoryLabel>Phone</CompulsoryLabel>
              <div className="flex h-10 w-full gap-2 rounded-sm border border-neutral-300 bg-transparent px-3 py-1 text-sm transition-colors">
                <select {...register('country_code')} className="outline-none">
                  {selected_countries.map((d, idx) => (
                    <option value={d.dial_code} key={idx}>
                      {d.flag} {d.dial_code}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  {...register('phone')}
                  placeholder="Enter Your Phone"
                  className="w-full flex-1 outline-none"
                  // onFocus={(e) =>
                  //   e.target.addEventListener(
                  //     'wheel',
                  //     function (e) {
                  //       e.preventDefault()
                  //     },
                  //     { passive: false },
                  //   )
                  // }
                />
              </div>

              <FormErr>{errors.phone?.message}</FormErr>
            </div>
          </div>

          <div>
            <Label>Date of Birth</Label>
            <input
              {...register('birth_date')}
              type="date"
              className="block h-10 w-full rounded-sm border px-2 text-sm text-muted-foreground outline-none"
            />
            <FormErr>{errors.birth_date?.message}</FormErr>
          </div>

          <div>
            <CompulsoryLabel>Course Preference</CompulsoryLabel>
            <Select
              onChange={(e) => {
                setValue(
                  'course_preference',
                  e.map((d) => d.value),
                )
                trigger('course_preference')
              }}
              isMulti
              options={courses}
              className="border-none"
            />
            <FormErr>{errors.course_preference?.message}</FormErr>
          </div>

          <div>
            <CompulsoryLabel>Passout Date</CompulsoryLabel>
            <input
              {...register('passout_date')}
              type="date"
              className="block h-10 w-full rounded-sm border px-2 text-sm text-muted-foreground outline-none"
            />
            <FormErr>{errors.passout_date?.message}</FormErr>
          </div>

          <div>
            <Label>English Proficiency Test</Label>
            <div className="flex h-10 w-full gap-2 rounded-sm border border-neutral-300 bg-transparent text-sm transition-colors">
              <select
                {...register('test_type')}
                className="h-full rounded-sm bg-secondary outline-none"
              >
                {tests.map((d, idx) => (
                  <option key={idx} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <input
                type="number"
                {...register('test_score')}
                placeholder="Enter your score"
                className="w-full flex-1 outline-none"
                step="0.01"
                onFocus={(e) =>
                  e.target.addEventListener(
                    'wheel',
                    function (e) {
                      e.preventDefault()
                    },
                    { passive: false },
                  )
                }
              />
            </div>
            <FormErr>{errors.test_score?.message}</FormErr>
          </div>

          <div
            className={cn(
              'grid gap-2',
              scoreType === 'gpa' ? 'grid-cols-2' : '',
            )}
          >
            <div>
              <Label>GPA / Percentage</Label>
              <div className="flex h-10 w-full items-center justify-between gap-2 rounded-sm border border-neutral-300 bg-transparent text-sm transition-colors">
                <select
                  {...register('scoreType')}
                  className="h-full rounded-sm bg-secondary outline-none"
                >
                  <option value="gpa">GPA</option>
                  <option value="percentage">Percent</option>
                </select>
                <input
                  type="number"
                  {...register('gpa')}
                  placeholder={
                    scoreType === 'gpa'
                      ? 'Enter your GPA'
                      : 'Enter your percentage'
                  }
                  step="0.01"
                  className="w-full flex-1 outline-none"
                  onFocus={(e) =>
                    e.target.addEventListener(
                      'wheel',
                      function (e) {
                        e.preventDefault()
                      },
                      { passive: false },
                    )
                  }
                />
              </div>
              <FormErr>{errors.gpa?.message}</FormErr>
            </div>
            {scoreType === 'gpa' && (
              <div>
                <Label>Out Of</Label>
                <Input
                  className="input"
                  placeholder="Out Of"
                  type="number"
                  step="0.01"
                  {...register('out_of')}
                />
                <FormErr>{errors.out_of?.message}</FormErr>
              </div>
            )}
          </div>
        </form>
        <DialogFooter>
          <FormSubmitBtn
            form="student-registration-form"
            isSubmitting={registrationMutation.isPending || isSubmitting}
          >
            Register
          </FormSubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
