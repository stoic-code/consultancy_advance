'use client'
import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { TApplicationSchema, applicationSchema } from '@/schema/public.schema'
import FormErr from '@/components/form/FormErr'
import RichTextEditor from '@/components/common/RichTextEditor'
import { useApplyForVacancy } from '@/hooks/mutations/application.mutation'
import { useAuth } from '@/providers/AuthProvider'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useRouter } from 'next/navigation'

const Application = ({ jobId }: { jobId: string }) => {
  const router = useRouter()
  const { token } = useAuth()

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TApplicationSchema>({ resolver: zodResolver(applicationSchema) })

  const { mutateAsync } = useApplyForVacancy(jobId, token!)

  const onSubmit = async (data: TApplicationSchema) => {
    try {
      const formData = new FormData()
      formData.append('file', data.resume)
      const res = await fetch('/api/docs', {
        method: 'POST',
        body: formData,
      })

      const res_data = await res.json()
      const cv_url = res_data[0].url

      await mutateAsync({ ...data, cv_url })
      toast.success('Application submitted successfully !!')
      router.push('/careers')

      // if (res.status === 200) router.push('/careers')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-2">
      <h3 className="py-2 text-xl font-bold">Fill the form to apply</h3>
      <div className="flex gap-3">
        <div className="flex-1">
          <CompulsoryLabel>First Name</CompulsoryLabel>
          <Input {...register('first_name')} placeholder="Eg: John" />
          <FormErr>{errors.first_name?.message}</FormErr>
        </div>
        <div className="flex-1">
          <CompulsoryLabel>Last Name</CompulsoryLabel>
          <Input {...register('last_name')} placeholder="Eg: Doe" />
          <FormErr>{errors.last_name?.message}</FormErr>
        </div>
      </div>

      <div className="flex-1">
        <CompulsoryLabel>Email</CompulsoryLabel>
        <Input {...register('email')} placeholder="Eg: JohnDoe@gmail.com" />
        <FormErr>{errors.email?.message}</FormErr>
      </div>

      <div className="flex flex-col flex-nowrap gap-4 md:flex-row ">
        <div className="flex-1">
          <CompulsoryLabel>Current Address</CompulsoryLabel>
          <Input
            {...register('address')}
            placeholder="Eg: New Baneshwor, Kathmandu, Nepal"
          />
          <FormErr>{errors.address?.message}</FormErr>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <CompulsoryLabel>Contact</CompulsoryLabel>
          <Input
            type="string"
            {...register('contact')}
            placeholder="Eg: 98xxxxxxxx"
          />
          <FormErr>{errors.contact?.message}</FormErr>
        </div>
        <div className="flex-1">
          <Label>LinkedIn Profile</Label>
          <Input
            {...register('linkedin_profile')}
            placeholder="Eg: https://linkedin.com/user"
          />
          <FormErr>{errors.linkedin_profile?.message}</FormErr>
        </div>
      </div>

      <div>
        <CompulsoryLabel>Upload Resume </CompulsoryLabel>
        <Input
          // {...register("resume")}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0]
              setValue('resume', file)
              trigger('resume')
            }
          }}
          accept=".pdf, .txt"
          type="file"
        />
        <FormErr>{errors.resume?.message}</FormErr>
      </div>

      <div>
        <CompulsoryLabel>Cover Letter</CompulsoryLabel>
        <p className="text-ui-400 pb-2 text-xs font-normal">
          You can select text and format as you wish.
        </p>
        <RichTextEditor
          name="cover_letter"
          value={watch('cover_letter')}
          setValue={setValue}
          trigger={trigger}
        />
        <FormErr>{errors.cover_letter?.message}</FormErr>
      </div>
      <FormSubmitBtn isSubmitting={isSubmitting}>Apply</FormSubmitBtn>
    </form>
  )
}

export default Application
