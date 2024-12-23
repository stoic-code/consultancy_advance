'use client'
import { useDisableNumberInputScroll } from '@/hooks/useDisableInputScroll'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { Input } from '@/components/ui/input'
import {
  TInstutionRegSchema,
  instutionRegSchema,
} from '@/schema/instution.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormErr from '@/components/form/FormErr'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/common/RichTextEditor'
import { Label } from '@/components/ui/label'
import { useEditInstution } from '@/hooks/mutations/admin/instution.mutation'

export const EditForm = ({ data }: { data: any }) => {
  const router = useRouter()
  const { token } = useAuth()
  const { mutateAsync, isPending } = useEditInstution(token!)

  useDisableNumberInputScroll()
  const {
    handleSubmit,
    setValue,
    trigger,
    register,
    watch,
    formState: { errors },
  } = useForm<TInstutionRegSchema>({
    resolver: zodResolver(instutionRegSchema),
    defaultValues: { ...data, name: data.institute_name },
  })

  const onSubmit = async (payload: TInstutionRegSchema) => {
    try {
      await mutateAsync({
        id: data._id,
        payload: { ...payload, institute_name: payload.name },
      })
      toast.success('Institution added successfully.')
      router.back()
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong.')
    }
  }

  return (
    <div className="px-4 pb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
        <div>
          <CompulsoryLabel>Institution Name</CompulsoryLabel>
          <Input
            {...register('name')}
            placeholder="Eg: Hardward University"
            className="capitalize"
          />
          <FormErr>{errors.name?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Institution Official Email</CompulsoryLabel>
          <Input {...register('email')} placeholder="Eg: admin@hardward.edu" />
          <FormErr>{errors.email?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Institution Phone</CompulsoryLabel>
          <Input {...register('phone')} placeholder="Eg: 01-xxxxxx" />
          <FormErr>{errors.phone?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Description</CompulsoryLabel>
          <RichTextEditor
            value={watch('about')}
            setValue={setValue}
            trigger={trigger}
            name="about"
            modules={['heading', 'table']}
          />
          <FormErr>{errors.about?.message}</FormErr>
        </div>

        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          <div>
            <Label>No of students</Label>
            <Input
              type="number"
              {...register('student_count')}
              placeholder="Eg: 3000"
            />
          </div>
          <div>
            <Label>Avg Tuition Fees</Label>
            <Input
              type="number"
              step="0.01"
              {...register('average_fee')}
              placeholder="Eg: 30000000"
            />
          </div>
        </div>

        <FormSubmitBtn isSubmitting={isPending}>Edit Institution</FormSubmitBtn>
      </form>
    </div>
  )
}
