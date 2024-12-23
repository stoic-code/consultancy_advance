'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TAboutMeSchema, aboutMeSchema } from '@/schema/students.schema'
import FormErr from '@/components/form/FormErr'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'

export default function EditAboutMe({
  data,
  children,
}: {
  data: any
  children: React.ReactNode
}) {
  const { token } = useAuth()
  const { isPending, mutateAsync } = useEditStudentProfile(token!)
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TAboutMeSchema>({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: { ...data, birth_date: data.birth_date?.split('T')[0] },
  })

  const onSubmit = async (payload: TAboutMeSchema) => {
    try {
      await mutateAsync({ ...data, ...payload })
      toast.success('Profile update successfully !!')
      setOpen(false)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-primary outline-none">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit About Me</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form
          id="about-me-edit"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="">
            <CompulsoryLabel>Address</CompulsoryLabel>
            <Input {...register('address')} placeholder="Enter your address" />
            <FormErr>{errors.address?.message}</FormErr>
          </div>
          <div>
            <CompulsoryLabel>Date of Birth</CompulsoryLabel>
            <input type="date" {...register('birth_date')} className="date" />
            <FormErr>{errors.birth_date?.message}</FormErr>
          </div>
          <div className="">
            <CompulsoryLabel>Nationality</CompulsoryLabel>
            <Input {...register('nationality')} placeholder="Eg: Nepalese" />
            <FormErr>{errors.nationality?.message}</FormErr>
          </div>
          <div className="">
            <CompulsoryLabel>Highest Education</CompulsoryLabel>
            <Input
              {...register('highest_education')}
              placeholder="Eg: Bachelors"
            />
            <FormErr>{errors.highest_education?.message}</FormErr>
          </div>

          {/* 
            <div>
              <CompulsoryLabel>Course Preference</CompulsoryLabel>
              <Select
                onChange={(e) => {
                  setValue(
                    'course_preference',
                    e.map((d) => d.value!),
                  )
                  trigger('course_preference')
                }}
                isMulti
                options={courses}
                className="border-none"
              />
              <FormErr>{errors.course_preference?.message}</FormErr>
            </div> */}
        </form>
        <DialogFooter>
          <FormSubmitBtn
            form="about-me-edit"
            isSubmitting={isSubmitting || isPending}
          >
            Save Changes
          </FormSubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
