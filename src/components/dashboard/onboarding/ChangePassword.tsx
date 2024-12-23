import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TSecuritySchema, securitySchema } from '@/schema/settings.schema'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useAuth } from '@/providers/AuthProvider'
import { useUpdatePassword } from '@/hooks/mutations/settings.mutation'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import FormAnimateWrapper from '@/components/onboard/FormAnimateWrapper'
import { AnimatePresence } from 'framer-motion'
import PasswordChecker from './PasswordChecker'

export const ChangePassword = () => {
  const { token } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const urlSearchParams = useSearchParams()
  const searchParams = new URLSearchParams(urlSearchParams)

  const [currentVisible, setCurrentVisible] = useState(false)
  const [newVisible, setNewVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [suggestion, setSuggestion] = useState(false)

  const { isPending, mutateAsync } = useUpdatePassword(token!)

  const PassVisible = () => <Eye size={20} strokeWidth={1.5} />
  const PassInVisible = () => <EyeOff size={20} strokeWidth={1.5} />

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TSecuritySchema>({ resolver: zodResolver(securitySchema) })

  useEffect(() => {
    if (watch('confirm_password') !== '') {
      trigger('confirm_password')
    }
  }, [watch('confirm_password')])

  const onSubmit = async (payload: TSecuritySchema) => {
    try {
      await mutateAsync({ ...payload, onboard: 1 })
      toast.success('Password Changed Successfully')

      if (searchParams.get('step') !== null) {
        searchParams.set('step', '2')
        searchParams.delete('back')
        router.push(`${pathName}?${searchParams.toString()}`)
      } else {
        router.push('/students/profile')
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !!')
    }
  }

  return (
    <FormAnimateWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="onboarding"
        className="w-full space-y-4"
      >
        <div>
          <Label className=" ">Old Password</Label>
          <div className="input">
            <input
              {...register('password')}
              type={currentVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              className="flex-1 outline-none"
            />
            <button
              onClick={() => setCurrentVisible(!currentVisible)}
              type="button"
              tabIndex={-1}
            >
              {currentVisible ? <PassInVisible /> : <PassVisible />}
            </button>
          </div>
          <FormErr>{errors.password?.message}</FormErr>
        </div>
        <div className="relative">
          <Label className=" ">New Password</Label>
          <div className="input">
            <input
              {...register('new_password')}
              type={newVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              className="flex-1 outline-none"
              onFocus={() => setSuggestion(true)}
              onBlur={() => setSuggestion(false)}
            />
            <button
              tabIndex={-1}
              onClick={() => setNewVisible(!newVisible)}
              type="button"
            >
              {newVisible ? <PassInVisible /> : <PassVisible />}
            </button>
          </div>
          <AnimatePresence>
            <PasswordChecker
              password={watch('new_password')}
              suggestion={suggestion}
            />
          </AnimatePresence>
          <FormErr>{errors.new_password?.message}</FormErr>
        </div>
        <div>
          <Label className=" ">Confirm Password</Label>
          <div className="input">
            <input
              {...register('confirm_password')}
              type={confirmVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              className="flex-1 outline-none"
            />
            <button
              onClick={() => setConfirmVisible(!confirmVisible)}
              type="button"
              tabIndex={-1}
            >
              {confirmVisible ? <PassInVisible /> : <PassVisible />}
            </button>
          </div>
          <FormErr>{errors.confirm_password?.message}</FormErr>
        </div>

        <div className=" flex items-center justify-end   ">
          <FormSubmitBtn className=" " isSubmitting={isSubmitting || isPending}>
            Next
          </FormSubmitBtn>
        </div>
      </form>
    </FormAnimateWrapper>
  )
}
