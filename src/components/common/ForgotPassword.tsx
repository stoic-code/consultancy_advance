'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { handleModalStateFromURL } from '@/helpers/modal.helper'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import FormSubmitBtn from '../form/FormSubmitBtn'
import { useForgotPassword } from '@/hooks/mutations/password.mutation'
import toast from 'react-hot-toast'
import FormErr from '../form/FormErr'
import CompulsoryLabel from '../form/CompulsoryLabel'
import { selected_countries } from '@/data/country-code'

const ForgotPwSchema = z.object({
  email: z.string().trim().email(),
  country_code: z.string(),

  phone: z
    .string({
      invalid_type_error: 'Please enter a valid number',
      required_error: 'Phone number is required.',
    })
    .min(7, { message: 'Phone number should not be less than 7 characters.' })
    .max(15, { message: 'Phone number should be of maximum 15 characters.' })
    .trim(),
})

type TForgotPwSchema = z.infer<typeof ForgotPwSchema>

export default function ForgotPassword() {
  const router = useRouter()
  const pathName = usePathname()
  const paramName = 'user'
  const loginTypes = ['admin', 'student', 'agent', 'instution']

  const searchParams = useSearchParams()
  const loginModal = searchParams.get(paramName)
  const isOpen = loginTypes.includes(loginModal!)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TForgotPwSchema>({
    resolver: zodResolver(ForgotPwSchema),
  })

  const { mutateAsync } = useForgotPassword()

  const handleFormSubmit = (formdata: any) => {
    const fdata = {
      email: formdata.email,
      phone: `${formdata.country_code},${formdata.phone}`,
      role:
        loginModal === 'instution' ? 'INSTITUTE' : loginModal!.toUpperCase(),
    }
    const promise = mutateAsync(fdata).then(() => router.push('/'))
    toast.promise(promise, {
      loading: 'Please wait...',
      success: 'Password reset link sent in email',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  return (
    // <div>
    <Dialog
      open={isOpen}
      onOpenChange={() =>
        handleModalStateFromURL({
          searchParams,
          paramName,
          router,
          pathName,
          action: 'close',
        })
      }
    >
      <DialogContent className=" max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Forgot Password? </DialogTitle>
          <small className="text-muted-foreground">
            No worries! Just enter your email address below, and we'll send you
            a link to reset your password.
          </small>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="  space-y-4">
          <div>
            <CompulsoryLabel>Email</CompulsoryLabel>
            <Input {...register('email')} placeholder="Enter your email" />
            <FormErr>{errors.email?.message}</FormErr>
          </div>
          <div className="w-full">
            <CompulsoryLabel>Phone</CompulsoryLabel>
            <div className="flex h-10 w-full gap-2 rounded-sm border border-neutral-300 bg-transparent px-3 py-1 text-sm transition-colors">
              <select {...register('country_code')} className="outline-none">
                {selected_countries.map((d, idx) => (
                  <option value={d.dial_code} key={idx}>
                    {d.flag} {d.dial_code}
                  </option>
                ))}
              </select>
              <input
                type="number"
                {...register('phone')}
                placeholder="Enter Your Phone"
                className="w-full flex-1 outline-none"
              />
            </div>

            <FormErr>{errors.phone?.message}</FormErr>
          </div>

          <FormSubmitBtn isSubmitting={isSubmitting}>Submit</FormSubmitBtn>
        </form>
      </DialogContent>
    </Dialog>
    // </div>
  )
}
