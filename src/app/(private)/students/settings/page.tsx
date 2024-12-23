'use client'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { useAuth } from '@/providers/AuthProvider'
import { TBasicDetailSchema, basicDetailSchema } from '@/schema/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { selected_countries } from '@/data/country-code'

const page = () => {
  const { token } = useAuth()
  const { data: userDetail } = useGetStudentProfile(token!)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TBasicDetailSchema>({
    resolver: zodResolver(basicDetailSchema),
  })
  const { isPending, mutateAsync } = useEditStudentProfile(token!)

  // DISPLAY USER DETAIL
  useEffect(() => {
    reset({
      ...userDetail,
      phone: userDetail?.phone.split(',')[1],
      country_code: userDetail?.phone.split(',')[0],
    })
  }, [userDetail])

  async function handleBasicDetailSubmit(data: TBasicDetailSchema) {
    const { country_code, phone } = data
    try {
      const payload = {
        ...userDetail,
        ...data,
        phone: `${country_code},${phone}`,
      }
      const res = await mutateAsync(payload)

      toast.success('Details Updated Successfully')
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong')
    }
  }

  // basicDetailSchema
  return (
    <form onSubmit={handleSubmit(handleBasicDetailSubmit)}>
      <div className="max-w-xl flex-1 space-y-3 px-2">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full">
            <Label>First Name</Label>
            <Input
              {...register('first_name')}
              name="first_name"
              placeholder="Your First Name"
            />
            <FormErr>{errors?.first_name?.message}</FormErr>
          </div>
          <div className="w-full">
            <Label>Middle Name</Label>
            <Input
              {...register('middle_name')}
              name="middle_name"
              placeholder="Your Middle Name"
            />
            <FormErr>{errors?.middle_name?.message}</FormErr>
          </div>
          <div className="w-full">
            <Label>Last Name</Label>
            <Input
              {...register('last_name')}
              name="last_name"
              placeholder="Your Last Name"
            />
            <FormErr>{errors?.last_name?.message}</FormErr>
          </div>
        </div>

        <div className="w-full">
          <Label>Phone</Label>
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

          <FormErr>{errors.phone?.message}</FormErr>
        </div>

        <FormSubmitBtn isSubmitting={isPending}>Save</FormSubmitBtn>
      </div>
    </form>
  )
}

export default page
