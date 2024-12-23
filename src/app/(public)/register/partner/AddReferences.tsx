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
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'

export const AddReferencesModal = ({ func }: { func: any }) => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (data: any) => {
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
          <DialogTitle>Add Reference</DialogTitle>
          <DialogDescription>
            Add reference details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          id="add-education"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <div>
            <Label>Institution Name</Label>
            <Input
              {...register('institute')}
              required
              placeholder="Eg: Consult Advance Educational Consultancy Pvt. Ltd."
            />
            <FormErr>{errors.course?.message}</FormErr>
          </div>
          <div>
            <Label>Contact Person</Label>
            <Input {...register('person')} placeholder="Eg: John Doe" />
            <FormErr>{errors.university?.message}</FormErr>
          </div>
          <div>
            <Label>Designation</Label>
            <Input {...register('designation')} placeholder="Eg: President" />
            <FormErr>{errors.university?.message}</FormErr>
          </div>
          <div className="">
            <Label>Country</Label>
            <Input {...register('country')} placeholder="Eg: Management" />
            <FormErr>{errors.faculty?.message}</FormErr>
          </div>
          <div className="">
            <Label>Phone</Label>
            <Input placeholder="Eg: 98xxxxxxxx" {...register('phone')} />
            <FormErr>{errors.specialization?.message}</FormErr>
          </div>
          <div className="">
            <Label>Email</Label>
            <Input {...register('email')} placeholder="Eg: john@gmail.com" />
            <FormErr>{errors.level?.message}</FormErr>
          </div>
          <FormSubmitBtn
            className="ml-auto"
            isSubmitting={isSubmitting}
            form="add-education"
          >
            Add
          </FormSubmitBtn>
        </form>
      </DialogContent>
    </Dialog>
  )
}
