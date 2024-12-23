'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'
import CompulsoryLabel from '../form/CompulsoryLabel'
import { Input } from '../ui/input'
import FormErr from '../form/FormErr'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import RichTextEditor from '../common/RichTextEditor'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TAccomodationReq,
  accomodationReqSchema,
} from '@/schema/accomodationRequest.schema'
import { useAccomodationReq } from '@/hooks/mutations/accomodationRequest.mutation'
import toast from 'react-hot-toast'
import { useAuth } from '@/providers/AuthProvider'
import FormSubmitBtn from '../form/FormSubmitBtn'

export default function AccomodationRequirementModal() {
  const { token } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { mutateAsync, isPending } = useAccomodationReq(token!)
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TAccomodationReq>({
    resolver: zodResolver(accomodationReqSchema),
  })

  function onSubmit(formdata: any) {
    const promise = mutateAsync(formdata).then(() => setIsOpen(false))

    toast.promise(promise, {
      loading: 'Submitting your request',
      success: 'Submittted Successfully',
      error: (err) => err.message || 'Something went wrong',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="h-10 rounded-full border-primary text-primary shadow-xl hover:bg-primary/10 hover:text-primary"
        >
          Submit Your Requirements
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>Accommodation Request Form</DialogHeader>
          <DialogDescription>
            We will contact you shortly with further details
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[80vh] space-y-4 overflow-auto pt-2"
        >
          <div>
            <CompulsoryLabel>Location</CompulsoryLabel>
            <Input {...register('location')} placeholder="City or Address" />
            <FormErr>{errors.location?.message}</FormErr>
          </div>
          <div>
            <CompulsoryLabel>Institute</CompulsoryLabel>
            <Input {...register('institute')} placeholder="Desired Institute" />
            <FormErr>{errors.institute?.message}</FormErr>
          </div>
          <div className="w-full">
            <CompulsoryLabel>Monthly Budget</CompulsoryLabel>
            <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
              <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                ₩
              </span>
              <input
                type="number"
                step="0.01"
                className="h-full flex-1 pl-1 outline-none"
                placeholder="Eg: 100,000"
                {...register('monthly_budget')}
              />
            </div>
            <FormErr>{errors.monthly_budget?.message}</FormErr>
          </div>
          <div className="w-full">
            <CompulsoryLabel>Security Deposit</CompulsoryLabel>
            <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
              <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                ₩
              </span>
              <input
                type="number"
                step="0.01"
                className="h-full flex-1 pl-1 outline-none"
                placeholder="Eg: 100,000"
                {...register('security_deposit')}
              />
            </div>
            <FormErr>{errors.security_deposit?.message}</FormErr>
          </div>
          <div className="  min-h-[9rem]">
            <CompulsoryLabel>Message</CompulsoryLabel>
            <RichTextEditor
              value={watch('message')}
              setValue={setValue}
              trigger={trigger}
              name="message"
            />
            <FormErr>{errors.message?.message}</FormErr>
          </div>
          <FormSubmitBtn isSubmitting={isPending}>Submit</FormSubmitBtn>
        </form>
      </DialogContent>
    </Dialog>
  )
}
