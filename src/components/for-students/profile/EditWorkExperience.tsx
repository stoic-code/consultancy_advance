'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TWorkExpSchema, workExperienceSchema } from '@/schema/students.schema'
import FormErr from '@/components/form/FormErr'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'

export const EditWorkExperience = ({
  children,
  data,
  idx,
}: {
  children: ReactNode
  data: any
  idx: number
}) => {
  const [open, setOpen] = useState(false)
  const { token } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TWorkExpSchema>({
    resolver: zodResolver(workExperienceSchema),
  })

  useEffect(() => {
    setValue('company_name', data.work[idx].company_name)
    setValue('job_title', data.work[idx].job_title)
    setValue('starting_date', data.work[idx].starting_date?.split('T')[0])
    setValue('end_date', data.work[idx].end_date?.split('T')[0])
  }, [])

  const { mutateAsync, isPending } = useEditStudentProfile(token!)

  const onSubmit = async (payload: TWorkExpSchema) => {
    try {
      const newData = { ...data }
      newData.work[idx] = { ...payload }
      await mutateAsync({ ...newData })
      setOpen(false)
      toast.success('Edited work experience successfully !')
    } catch (err: any) {
      toast.success(err.message || 'Something went wrong !')
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Work Experience</DialogTitle>
            <DialogDescription>
              Click on Add after you filling up the form
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="work-exp"
            className="space-y-3"
          >
            <div className="">
              <Label htmlFor="company_name" className="text-right">
                Company Name
              </Label>
              <Input
                {...register('company_name')}
                placeholder="Eg: Microsoft Inc"
              />
              <FormErr>{errors.company_name?.message}</FormErr>
            </div>
            <div className="">
              <Label htmlFor="job_title" className="text-right">
                Job Title
              </Label>
              <Input
                {...register('job_title')}
                placeholder="Eg: Software Engineer L9"
              />
              <FormErr>{errors.job_title?.message}</FormErr>
            </div>
            <div className="">
              <Label htmlFor="starting_date" className="text-right">
                Starting Date
              </Label>
              <input
                {...register('starting_date')}
                type="date"
                className="date"
              />
              <FormErr>{errors.starting_date?.message}</FormErr>
            </div>
            <div className="">
              <Label htmlFor="end_date" className="text-right">
                End Date
              </Label>
              <Input {...register('end_date')} type="date" className="date" />
              <FormErr>{errors.end_date?.message}</FormErr>
            </div>
            <FormSubmitBtn className="ml-auto" isSubmitting={isPending}>
              Edit Work Experience
            </FormSubmitBtn>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
