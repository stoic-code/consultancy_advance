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
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CirclePlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TWorkExpSchema, workExperienceSchema } from '@/schema/students.schema'
import FormErr from '@/components/form/FormErr'

export const AddWorkModal = ({ func }: { func: any }) => {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TWorkExpSchema>({ resolver: zodResolver(workExperienceSchema) })

  const onSubmit = (data: TWorkExpSchema) => {
    func(data)
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center justify-center">
          <CirclePlus size={20} className="text-blue-500" />
        </DialogTrigger>
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
          </form>
          <DialogFooter>
            <Button form="work-exp" type="submit">
              Add Work
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
