'use client'
import { useState } from 'react'
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
import { CirclePlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TEducationSchema, educationSchema } from '@/schema/students.schema'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'

export const AddEducationModal = ({ func }: { func: any }) => {
  const [open, setOpen] = useState(false)
  const [currentlyStudying, setCurrentlyStudying] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TEducationSchema>({ resolver: zodResolver(educationSchema) })

  const onSubmit = (data: TEducationSchema) => {
    func(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <CirclePlus size={20} className="text-blue-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
          <DialogDescription>
            Add education details here. Click save when you're done.
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
            <Label>University / School</Label>
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

          <FormSubmitBtn isSubmitting={isSubmitting} form="add-education">
            Add
          </FormSubmitBtn>
        </form>
      </DialogContent>
    </Dialog>
  )
}
