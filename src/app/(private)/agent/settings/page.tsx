// 'use client'
// import FormErr from '@/components/form/FormErr'
// import FormSubmitBtn from '@/components/form/FormSubmitBtn'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
// import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
// import { useAuth } from '@/providers/AuthProvider'
// import { TBasicDetailSchema, basicDetailSchema } from '@/schema/settings.schema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Save } from 'lucide-react'
// import { useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'
//
// const page = () => {
//   const { token } = useAuth()
//   const { data: userDetail } = useGetStudentProfile(token!)
//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TBasicDetailSchema>({
//     resolver: zodResolver(basicDetailSchema),
//   })
//   const { isPending, mutateAsync } = useEditStudentProfile(token!)
//
//   // DISPLAY USER DETAIL
//   useEffect(() => {
//     reset(userDetail)
//   }, [userDetail])
//
//   async function handleBasicDetailSubmit(data: TBasicDetailSchema) {
//     try {
//       const payload = {
//         ...userDetail,
//         ...data,
//       }
//       const res = await mutateAsync(payload)
//
//       toast.success('Details Updated Successfully')
//     } catch (err: any) {
//       toast.error(err?.message || 'Something went wrong')
//     }
//   }
//
//   // basicDetailSchema
//   return (
//     <form onSubmit={handleSubmit(handleBasicDetailSubmit)}>
//       <div className="max-w-xl flex-1 space-y-3 px-2">
//         <div className="flex flex-col gap-4 sm:flex-row">
//           <div className="w-full">
//             <Label>First Name</Label>
//             <Input
//               {...register('first_name')}
//               name="first_name"
//               placeholder="Your First Name"
//             />
//             <FormErr>{errors?.first_name?.message}</FormErr>
//           </div>
//           <div className="w-full">
//             <Label>Middle Name</Label>
//             <Input
//               {...register('middle_name')}
//               name="middle_name"
//               placeholder="Your Middle Name"
//             />
//             <FormErr>{errors?.middle_name?.message}</FormErr>
//           </div>
//           <div className="w-full">
//             <Label>Last Name</Label>
//             <Input
//               {...register('last_name')}
//               name="last_name"
//               placeholder="Your Last Name"
//             />
//             <FormErr>{errors?.last_name?.message}</FormErr>
//           </div>
//         </div>
//         <div>
//           <Label>Phone</Label>
//           <Input
//             {...register('phone')}
//             name="phone"
//             placeholder="Your Phone Here"
//           />
//           <FormErr>{errors?.phone?.message}</FormErr>
//
//           <button className="text-xs text-blue-700">Verify</button>
//         </div>
//         <FormSubmitBtn isSubmitting={isPending}>
//           <Save className="inline w-4" />
//           Save
//         </FormSubmitBtn>
//       </div>
//     </form>
//   )
// }
//
// export default page

'use client'
import { TopBar } from '@/components/dashboard/TobBar'
import PasswordChecker from '@/components/dashboard/onboarding/PasswordChecker'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { Label } from '@/components/ui/label'
import { useUpdatePassword } from '@/hooks/mutations/settings.mutation'
import { useAuth } from '@/providers/AuthProvider'
import { TSecuritySchema, securitySchema } from '@/schema/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const page = () => {
  const { token } = useAuth()

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TSecuritySchema>({
    resolver: zodResolver(securitySchema),
  })
  const { isPending, mutateAsync } = useUpdatePassword(token!)

  const [currentVisible, setCurrentVisible] = useState(false)
  const [newVisible, setNewVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [suggestion, setSuggestion] = useState(false)

  const PassVisible = () => <Eye size={20} strokeWidth={1.5} />
  const PassInVisible = () => <EyeOff size={20} strokeWidth={1.5} />

  async function onSubmit(payload: TSecuritySchema) {
    try {
      await mutateAsync(payload)
      toast.success('Password Changed Successfully')
      reset()
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong')
    }
  }

  return (
    <>
      <TopBar title="Settings" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="onboarding"
        className="max-w-sm space-y-4 px-2 pt-2"
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
              className="bottom-10 py-2"
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
          <FormSubmitBtn isSubmitting={isPending}>Next</FormSubmitBtn>
        </div>
      </form>
    </>
  )
}

export default page
