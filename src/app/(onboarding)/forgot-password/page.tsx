'use client'
import PasswordChecker from '@/components/dashboard/onboarding/PasswordChecker'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { H2, P } from '@/components/typography'
import { Input } from '@/components/ui/input'
import { selected_countries } from '@/data/country-code'
import { useForgotPassword } from '@/hooks/mutations/forgotPassword.mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const NewPasswordSchema = z
  .object({
    new_password: z.string().trim().min(1, { message: 'Password is required' }),
    confirm_password: z.string().trim(),
    conuntry_code: z.string().trim(),
    phone: z
      .string({
        invalid_type_error: 'Please enter a valid number',
        required_error: 'Phone number is required.',
      })
      .min(7, { message: 'Phone number should not be less than 7 characters.' })
      .max(15, { message: 'Phone number should be of maximum 15 characters.' })
      .trim(),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .trim()
      .email({ message: 'Must be a valid email.' })
      .trim(),
  })
  .refine(
    ({ confirm_password, new_password }) => {
      return confirm_password === new_password
    },
    {
      message: 'Confirm password must match new password.',
      path: ['confirm_password'],
    },
  )

type TNewPasswordSchema = z.infer<typeof NewPasswordSchema>

export default function page() {
  const [newVisible, setNewVisible] = useState(false)
  const [suggestion, setSuggestion] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const searchParams = useSearchParams()
  const refreshToken = searchParams.get('refreshToken')
  const role = searchParams.get('role')?.toUpperCase()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
  })

  const PassVisible = () => <Eye size={20} strokeWidth={1.5} />
  const PassInVisible = () => <EyeOff size={20} strokeWidth={1.5} />

  const { isPending, mutateAsync } = useForgotPassword(role!, refreshToken!)
  const router = useRouter()

  function onSubmit(payload: TNewPasswordSchema) {
    const promise = mutateAsync({
      ...payload,
      phone: `${payload.conuntry_code},${payload.phone}`,
    }).then(() => {
      router.push('/')
    })
    toast.promise(promise, {
      loading: 'Please wait ...',
      success: 'Password changed successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }
  return (
    <section className=" b mx-auto grid   h-[100vh] overflow-hidden  xl:grid-cols-2">
      <div className="  hidden  h-[150vh] w-[150vh] -translate-x-[40%] -translate-y-[12%] place-items-center rounded-full bg-green-100 p-10 xl:block ">
        <motion.div
          initial={{
            x: -100,
            y: -500,
            opacity: 0,
            transformOrigin: 'left',
          }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: -100, y: 500, opacity: 0 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            type: 'spring',
          }}
          className="absolute -right-20  top-[20%]  h-[400px]  w-[500px]  drop-shadow-2xl"
        >
          <div className=" relative right-20">
            <h4 className=" text-left text-5xl font-semibold text-green-900">
              Let's Reset Your Password
            </h4>
            <p className=" mt-2 text-left text-lg  font-medium text-muted-foreground">
              Create a strong password for enhanced security.
            </p>
          </div>
          <img
            src={'/onboard/login.png'}
            height={500}
            width={500}
            alt="password"
          />
        </motion.div>
      </div>
      <div className=" grid max-h-[100vh] w-full place-items-center   p-4">
        <motion.div
          className="w-full  "
          key={'step1'}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            type: 'spring',
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="onboarding"
            className="mx-auto max-w-[85%]  space-y-4  sm:max-w-[50%]   xl:max-w-[70%]"
          >
            <div className=" block xl:hidden">
              <H2 className=" text-left  font-semibold  text-primary">
                Let's Reset Your Password
              </H2>
              <P>Create a strong password for enhanced security.</P>
            </div>

            <div className="w-full">
              <CompulsoryLabel>Phone</CompulsoryLabel>
              <div className="flex h-10 w-full gap-2 rounded-sm border border-neutral-300 bg-transparent px-3 py-1 text-sm transition-colors">
                <select {...register('conuntry_code')} className="outline-none">
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

            <div>
              <CompulsoryLabel>Email</CompulsoryLabel>
              <Input
                {...register('email')}
                placeholder="Enter your phone number"
              />
              <FormErr>{errors.email?.message}</FormErr>
            </div>

            <div className="relative">
              <CompulsoryLabel>New Password</CompulsoryLabel>
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
              <CompulsoryLabel>Confirm Password</CompulsoryLabel>
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
              <FormSubmitBtn
                className=" "
                isSubmitting={isSubmitting || isPending}
              >
                Submit
              </FormSubmitBtn>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
