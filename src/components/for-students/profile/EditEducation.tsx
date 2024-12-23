'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { educationSchema, TEducationSchema } from '@/schema/students.schema'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/providers/AuthProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

export function EditEducation({
  children,
  idx,
  data,
}: {
  children: React.ReactNode
  idx: number
  data: any
}) {
  const [open, setOpen] = useState(false)
  const { token } = useAuth()
  const [currentlyStudying, setCurrentlyStudying] = useState(false)
  const { mutateAsync, isPending } = useEditStudentProfile(token!)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TEducationSchema>({
    resolver: zodResolver(educationSchema),
  })

  useEffect(() => {
    const edu = data.education[idx]
    setValue('university', edu.university)
    setValue('course', edu.course)
    setValue('faculty', edu.faculty)
    setValue('specialization', edu.specialization)
    setValue('level', edu.level)
    setValue('starting_year', edu.starting_year?.split('T')[0])
    setValue('graduation_year', edu.graduation_year?.split('T')[0])
    setValue('scoreType', edu.scoreType)

    if (typeof edu.gpa === 'string') {
      const [newGPA, outOf] = edu.gpa.split('/')

      setValue('out_of', parseFloat(outOf))
      setValue('gpa', parseFloat(newGPA))
    } else {
      setValue('gpa', edu.gpa)
    }
  }, [])

  const scoreType = watch('scoreType')

  const onSubmit = async (payload: TEducationSchema) => {
    if (currentlyStudying) {
      delete payload.graduation_year
    }

    let refinedPayload

    if (scoreType === 'gpa' && payload.gpa && payload.out_of) {
      refinedPayload = { ...payload, gpa: `${payload.gpa}/${payload.out_of}` }
    } else {
      refinedPayload = { ...payload }
    }

    try {
      const newData = { ...data }
      newData.education[idx] = refinedPayload
      await mutateAsync({ ...newData })
      toast.success('Updated education successfully !!')
      setOpen(false)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !!')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" text-primary outline-none">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
          <DialogDescription>
            Make changes to your Education here.
          </DialogDescription>
        </DialogHeader>
        <form
          id="add-education"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <div>
            <Label>Course Title</Label>
            <Input
              {...register('course')}
              placeholder="Eg: Bachelors in Business Administration"
            />
            <FormErr>{errors.course?.message}</FormErr>
          </div>
          <div>
            <Label>University</Label>
            <Input
              {...register('university')}
              placeholder="Eg: Tribhuvan University"
            />
            <FormErr>{errors.university?.message}</FormErr>
          </div>
          <div className="">
            <Label>Faculty</Label>
            <Input {...register('faculty')} placeholder="Eg: Management" />
            <FormErr>{errors.faculty?.message}</FormErr>
          </div>
          <div className="">
            <Label>Specialization</Label>
            <Input placeholder="Eg: Marketing" />
            <FormErr>{errors.specialization?.message}</FormErr>
          </div>
          <div className="">
            <Label>Level</Label>
            <Input {...register('level')} placeholder="Eg: Bachelors" />
            <FormErr>{errors.level?.message}</FormErr>
          </div>
          <div>
            <Label>Starting Year</Label>
            <input
              {...register('starting_year')}
              type="date"
              className="date"
            />
            <FormErr>{errors.starting_year?.message}</FormErr>
          </div>
          <div className="">
            {!currentlyStudying ? (
              <>
                <Label>Graduation Year</Label>
                <input
                  {...register('graduation_year')}
                  type="date"
                  className="date"
                />
                <FormErr>{errors.graduation_year?.message}</FormErr>
              </>
            ) : (
              <></>
            )}
            <div className="flex items-center gap-2 px-2 py-2">
              <input
                onChange={() => setCurrentlyStudying(!currentlyStudying)}
                value={Number(currentlyStudying)}
                type="checkbox"
                id="currently-studying"
              />
              <Label htmlFor="currently-studying">
                Currently studying here
              </Label>
            </div>
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
          <FormSubmitBtn
            isSubmitting={isSubmitting || isPending}
            form="add-education"
            className="ml-auto"
          >
            Edit Education
          </FormSubmitBtn>
        </form>
      </DialogContent>
    </Dialog>
  )
}
