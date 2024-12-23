'use client'
import RichTextEditor from '@/components/common/RichTextEditor'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import Select from 'react-select'
const Select = dynamic(() => import('react-select'), {
  ssr: false,
})

import { useForm } from 'react-hook-form'
import { courses } from '@/data/courses'
import { useRouter } from 'next/navigation'
import { MoveLeft } from 'lucide-react'
import dynamic from 'next/dynamic'
import { zodResolver } from '@hookform/resolvers/zod'
import { TCoursesSchema, coursesSchema } from '@/schema/courses.schema'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import { removeEmptyStrings } from '@/lib/object'

import React from 'react'
import { useEditCourse } from '@/hooks/mutations/admin/courses.mutation'

export default function EditCourse({ data, id }: { data: any; id: string }) {
  const router = useRouter()
  const { token } = useAuth()
  const { mutateAsync, isPending } = useEditCourse({ token, id })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    setValue,
  } = useForm<TCoursesSchema>({
    resolver: zodResolver(coursesSchema),
    defaultValues: {
      ...data,
      level: data?.level,
    },
  })

  const onSubmit = (data: TCoursesSchema) => {
    const filteredData = removeEmptyStrings(data)
    const promise = mutateAsync(filteredData).then(() => router.back())
    toast.promise(promise, {
      loading: 'Please wait ...',
      success: 'Course Edited Successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  return (
    <section>
      <button
        onClick={() => router.back()}
        className="flex scale-90 gap-2 rounded-full px-2 pb-4 text-primary"
      >
        <MoveLeft />
        Back
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl space-y-4  px-4 pb-10"
      >
        <div>
          <CompulsoryLabel>Course Title</CompulsoryLabel>
          <Input
            {...register('title')}
            placeholder="Eg: Bachelors in Engineer"
          />
          <FormErr>{errors.title?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Course Description</CompulsoryLabel>
          <RichTextEditor
            modules={['heading']}
            value={watch('description')}
            setValue={setValue}
            name="description"
            trigger={trigger}
          />
          <FormErr>{errors.description?.message}</FormErr>
        </div>
        <div className=" flex gap-2">
          <div className=" w-full">
            <CompulsoryLabel>Level</CompulsoryLabel>
            <Select
              {...register('level')}
              defaultValue={{
                value: data?.level || '',
                label: data?.level || '',
              }}
              onChange={(e: any) => {
                setValue('level', e.value)
                trigger('level')
              }}
              options={courses}
              className="border-none"
            />
            <FormErr>{errors.level?.message}</FormErr>
          </div>

          <div className=" w-full">
            <CompulsoryLabel>Tuition Fee</CompulsoryLabel>
            <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
              <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                ₩
              </span>
              <input
                type="number"
                className="h-full flex-1 pl-1 outline-none"
                placeholder="Eg: 300,000"
                {...register('course_fee')}
              />
            </div>
            <FormErr>{errors.course_fee?.message}</FormErr>
          </div>
        </div>

        <div className="flex gap-2">
          <div className=" w-full">
            <Label>Faculty</Label>
            <Input {...register('faculty')} placeholder="Eg: Finance" />
            <FormErr>{errors.faculty?.message}</FormErr>
          </div>
          <div className="w-full">
            <Label>Application Fee</Label>
            <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
              <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                ₩
              </span>
              <input
                type="number"
                className="h-full flex-1 pl-1 outline-none"
                placeholder="Eg: 300,000"
                {...register('application_fee')}
              />
            </div>
            <FormErr>{errors.application_fee?.message}</FormErr>
          </div>
        </div>

        <div>
          <Label>Duration</Label>
          <Input
            type="number"
            {...register('duration')}
            step="0.01"
            placeholder="Eg: 0.5 or 4"
          />
          <FormErr>{errors.duration?.message}</FormErr>
        </div>
        <div>
          <Label>Course University URL</Label>
          <Input
            {...register('url')}
            placeholder="Eg: https://www.harvard.edu/programs/architecture-landscape-architecture-and-urban-planning/#graduate"
          />
          <FormErr>{errors.url?.message}</FormErr>
        </div>

        <FormSubmitBtn isSubmitting={isPending}>Submit</FormSubmitBtn>
      </form>
    </section>
  )
}
