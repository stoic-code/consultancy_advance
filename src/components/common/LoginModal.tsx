'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { handleModalStateFromURL } from '@/helpers/modal.helper'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useLoginMutation } from '@/hooks/mutations/login.mutation'
import FormSubmitBtn from '../form/FormSubmitBtn'
import toast from 'react-hot-toast'
import { useAuth } from '@/providers/AuthProvider'
import { getRouteBasedOnRole } from '@/helpers/role.helper'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string().trim(),
})

const LoginModal = () => {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const paramName = 'login'
  const loginModal = searchParams.get(paramName)

  const loginTypes = ['admin', 'student', 'agent', 'instution']
  const isOpen = loginTypes.includes(loginModal!)

  const isStudent = loginModal === 'student'
  const isAdmin = loginModal === 'admin'
  const isInstution = loginModal === 'instution'
  const isAgent = loginModal === 'agent'

  const [visible, setVisible] = useState(false)

  const route = isStudent
    ? 'student'
    : isAdmin
      ? 'admin'
      : isInstution
        ? 'institute'
        : 'agent'

  // @ts-ignore
  const { mutateAsync, isPending } = useLoginMutation(route)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const { email, password } = data
    try {
      const { user, accessToken, refreshToken } = await mutateAsync({
        email: email.trim(),
        password: password.trim(),
      })
      login({ user, accessToken, refreshToken })
      const route = getRouteBasedOnRole(user.role)

      if (!pathName.startsWith('/university')) {
        if (user.role === 'STUDENT' && user.onboard < 1) {
          router.push(`/onboard`)
        } else if (user.role === 'STUDENT' && user.onboard >= 1) {
          router.push(`${route}/profile`)
        } else {
          router.push(`${route}/dashboard`)
        }
      }

      handleModalStateFromURL({
        searchParams,
        paramName,
        router,
        pathName,
        action: 'close',
      })
      toast.success('LoggedIn Successfully!!')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !!')
    }
  }

  return (
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
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <Label>Email</Label>
            <Input {...register('email')} placeholder="Enter your email" />
          </div>
          <div>
            <Label>Password</Label>
            <div className="input">
              <input
                {...register('password')}
                type={visible ? 'text' : 'password'}
                placeholder="Enter your password"
                className="flex-1 outline-none"
              />
              <button onClick={() => setVisible(!visible)} type="button">
                {visible ? (
                  <EyeOff strokeWidth={1.5} size={20} />
                ) : (
                  <Eye strokeWidth={1.5} size={20} />
                )}
              </button>
            </div>
          </div>
          <div>
            <Link
              href={`?user=${loginModal}&${loginModal}=forgotpassword`}
              className="text-blue-600"
            >
              Forgot Password ?
            </Link>
          </div>
          <FormSubmitBtn
            className="w-full"
            isSubmitting={isSubmitting || isPending}
          >
            Login
          </FormSubmitBtn>
          {isStudent && (
            <p className="text-sm">
              Don't have an account ?{' '}
              <Link
                href="?student-registration=open"
                className="text-primary underline underline-offset-2"
              >
                Register
              </Link>
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
