'use client'
import RichTextEditor from '@/components/common/RichTextEditor'
import { TopBar } from '@/components/dashboard/TobBar'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateVacancy } from '@/hooks/mutations/admin/vacancy.mutation'
import { useDisableNumberInputScroll } from '@/hooks/useDisableInputScroll'
import { useAuth } from '@/providers/AuthProvider'
import { TVacancySchema, vacancySchema } from '@/schema/admin.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const page = () => {
  const { token } = useAuth()
  const { mutateAsync, isPending } = useCreateVacancy(token!)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<TVacancySchema>({
    resolver: zodResolver(vacancySchema),
    defaultValues: { type: '', category: '' },
  })

  const onSubmit = (payload: TVacancySchema) => {
    const promise = mutateAsync(payload).then(() => {
      router.push('/admin/vacancy')
    })
    toast.promise(promise, {
      loading: 'Adding vacancy...',
      success: 'Vacancy added successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  useDisableNumberInputScroll()

  return (
    <div>
      <TopBar title="Create a New Vacancy" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl space-y-4 px-4"
      >
        <div>
          <CompulsoryLabel>Vacancy Title</CompulsoryLabel>
          <Input
            {...register('job_title')}
            placeholder="Eg: Software Engineer"
          />
          <FormErr>{errors.job_title?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Location</CompulsoryLabel>
          <Input {...register('location')} placeholder="Eg: Seoul, Korea" />
          <FormErr>{errors.location?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>No of Vacancy</CompulsoryLabel>
          <Input type="number" {...register('count')} placeholder="Eg: 10" />
          <FormErr>{errors.count?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Type</CompulsoryLabel>
          <select {...register('type')} className="select w-full">
            <option value="" disabled>
              Select Vacancy Type
            </option>
            <option value="on-site">On Site</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <FormErr>{errors.type?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Category</CompulsoryLabel>
          <select {...register('category')} className="select w-full">
            <option value="" disabled>
              Select Category
            </option>
            <option value="marketing">Marketing</option>
            <option value="business">Business Development</option>
            <option value="front">Front Office</option>
            <option value="hr">Human Resource</option>
            <option value="it">IT</option>
          </select>
          <FormErr>{errors.category?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Job Description</CompulsoryLabel>
          <RichTextEditor
            modules={['heading']}
            value={watch('description')}
            setValue={setValue}
            name="description"
            trigger={trigger}
          />
          <FormErr>{errors.description?.message}</FormErr>
        </div>

        <Button disabled={isPending}>Add Vacancy</Button>
      </form>
    </div>
  )
}

export default page
