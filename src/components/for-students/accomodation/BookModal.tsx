'use client'
import React, { ReactNode, useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import { useDisableNumberInputScroll } from '@/hooks/useDisableInputScroll'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormErr from '@/components/form/FormErr'
import { useBookAccomodation } from '@/hooks/mutations/students.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'

const BookModal = ({
  children,
  id,
  minDeposit,
}: {
  children: ReactNode
  id: string
  minDeposit: number
}) => {
  useDisableNumberInputScroll()
  const { token } = useAuth()
  const [open, setOpen] = useState(false)

  const { mutateAsync, isPending } = useBookAccomodation(id, token!)

  const bookingSchema = z.object({
    deposit: z.coerce.number().min(minDeposit, {
      message: `Minimum deposit amount should be ${minDeposit}`,
    }),
  })
  type TBookinSchema = z.infer<typeof bookingSchema>

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TBookinSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { deposit: minDeposit + 1 },
  })

  // ON SUBMIT
  const onSubmit = (payload: TBookinSchema) => {
    const promise = mutateAsync(payload).then(() => {
      reset()
      setOpen(false)
    })
    toast.promise(promise, {
      success: 'Booking request sent successfully !',
      loading: 'Please wait ...',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Book Accomodation</DialogTitle>
          <DialogDescription>
            Insert amount that you are willing to deposite to book the
            accomodation.
          </DialogDescription>
        </DialogHeader>

        <form id="submit-form" onSubmit={handleSubmit(onSubmit)}>
          <CompulsoryLabel>Deposite Amount</CompulsoryLabel>
          <div className="input flex items-center gap-2">
            <span className="text-xl font-bold text-muted-foreground">₩</span>
            <input
              {...register('deposit')}
              type="number"
              placeholder="Eg: 3000000"
              className="h-full w-full outline-none"
            />
          </div>
          <FormErr>{errors.deposit?.message}</FormErr>
        </form>

        <FormSubmitBtn form="submit-form" isSubmitting={isPending}>
          Submit
        </FormSubmitBtn>
      </DialogContent>
    </Dialog>
  )
}

export default BookModal
