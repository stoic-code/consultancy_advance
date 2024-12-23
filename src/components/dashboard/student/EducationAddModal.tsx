'use client'
import { useEffect, useState } from 'react'
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
import { CirclePlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TEducationSchema, educationSchema } from '@/schema/students.schema'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { useAuth } from '@/providers/AuthProvider'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import toast from 'react-hot-toast'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import { cn } from '@/lib/utils'

const AddEducationDialog = () => {
  const { token } = useAuth()
  const [open, setOpen] = useState(false)
  const [currentlyStudying, setCurrentlyStudying] = useState(false)

  const { data } = useGetStudentProfile(token!)
  const { mutateAsync, isPending } = useEditStudentProfile(token!)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TEducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      scoreType: 'gpa',
    },
  })

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
      await mutateAsync({
        ...data,
        education: [...data.education, refinedPayload],
      })
      reset()
      toast.success('Added education successfully !')
      setOpen(false)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <CirclePlus size={20} className="text-blue-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
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
            <CompulsoryLabel>Course Title</CompulsoryLabel>
            <Input
              className="capitalize"
              {...register('course')}
              placeholder="Eg: Bachelors in Business Administration OR High School"
            />
            <FormErr>{errors.course?.message}</FormErr>
          </div>
          <div>
            <CompulsoryLabel>University / School</CompulsoryLabel>
            <Input
              className="capitalize"
              {...register('university')}
              placeholder="Eg: Tribhuvan University"
            />
            <FormErr>{errors.university?.message}</FormErr>
          </div>
          <div className="">
            <Label>Faculty</Label>
            <Input
              className="capitalize"
              {...register('faculty')}
              placeholder="Eg: Management"
            />
            <FormErr>{errors.faculty?.message}</FormErr>
          </div>
          <div className="">
            <Label>Specialization</Label>
            <Input className="capitalize" placeholder="Eg: Marketing" />
            <FormErr>{errors.specialization?.message}</FormErr>
          </div>
          <div className="">
            <Label>Level</Label>
            <Input
              className="capitalize"
              {...register('level')}
              placeholder="Eg: Bachelors"
            />
            <FormErr>{errors.level?.message}</FormErr>
          </div>
          <div>
            <CompulsoryLabel>Starting Year</CompulsoryLabel>
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
        </form>
        <DialogFooter>
          <FormSubmitBtn
            isSubmitting={isSubmitting || isPending}
            form="add-education"
          >
            Add Education
          </FormSubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default AddEducationDialog
