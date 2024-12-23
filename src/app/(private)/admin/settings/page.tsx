'use client'
import { TopBar } from '@/components/dashboard/TobBar'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdatePassword } from '@/hooks/mutations/settings.mutation'
import { useAuth } from '@/providers/AuthProvider'
import { TSecuritySchema, securitySchema } from '@/schema/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const page = () => {
  const { token } = useAuth()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TSecuritySchema>({
    resolver: zodResolver(securitySchema),
  })
  const { isPending, mutateAsync } = useUpdatePassword(token!)

  async function handleSecurityForm(payload: TSecuritySchema) {
    try {
      await mutateAsync(payload)
      toast.success('Password Changed Successfully')
      reset()
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong')
    }
  }

  return (
    <div>
      <TopBar title="Settings" />
      <form
        onSubmit={handleSubmit(handleSecurityForm)}
        className="w-full p-2 md:px-10 "
      >
        <div className="space-y-3">
          <div className="">
            <Label>Current Password</Label>
            <Input
              className="max-w-sm"
              {...register('password')}
              type="password"
              placeholder="Enter your old password"
            />
            <FormErr>{errors?.password?.message}</FormErr>
          </div>

          <div>
            <Label>New Password</Label>
            <Input
              {...register('new_password')}
              type="password"
              placeholder="Enter a new password"
              className="max-w-sm"
            />
            <FormErr>{errors?.new_password?.message}</FormErr>
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input
              {...register('confirm_password')}
              type="password"
              placeholder="Enter a new password"
              className="max-w-sm"
            />
            <FormErr>{errors?.confirm_password?.message}</FormErr>
          </div>

          <FormSubmitBtn isSubmitting={isPending}>
            <Save className="inline w-4" />
            Save
          </FormSubmitBtn>
        </div>
      </form>
    </div>
  )
}

export default page
