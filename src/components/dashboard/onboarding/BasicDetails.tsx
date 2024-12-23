import React, { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import BackBtn from './BackBtn'
import { useForm } from 'react-hook-form'
import { TAboutMeSchema, aboutMeSchema } from '@/schema/students.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { useAuth } from '@/providers/AuthProvider'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { motion, useInView } from 'framer-motion'
import FormAnimateWrapper from '@/components/onboard/FormAnimateWrapper'
import { ChevronLeft, MoveLeft } from 'lucide-react'

export const BasicDetails = () => {
  const { token } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const urlSearchParams = useSearchParams()
  const searchParams = new URLSearchParams(urlSearchParams)
  searchParams.set('step', '3')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const { data } = useGetStudentProfile(token!)
  const { mutateAsync, isPending } = useEditStudentProfile(token!)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TAboutMeSchema>({
    resolver: zodResolver(aboutMeSchema),
  })

  const onSubmit = async (payload: TAboutMeSchema) => {
    try {
      await mutateAsync({ ...data, ...payload, onboard: 2 })
      toast.success('Updated basic information.')
      searchParams.delete('back')
      router.push(`${pathName}?${searchParams.toString()}`)
    } catch (err: any) {
      toast.success(err.message || 'Something went wrong.')
    }
  }

  useEffect(() => {
    setValue('highest_education', data?.highest_education)
    setValue('birth_date', data?.birth_date?.split('T')[0])
    setValue('nationality', data?.nationality)
    setValue('address', data?.address)
  }, [data])

  const handleBack = () => {
    searchParams.set('back', 'true')
    searchParams.set('step', '1')
    router.push(`${pathName}?${searchParams.toString()}`)
  }
  return (
    <FormAnimateWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="onboarding"
        className=" space-y-4"
      >
        <div>
          <CompulsoryLabel>Address</CompulsoryLabel>
          <Input
            {...register('address')}
            placeholder="Eg: Kathmandu-01, Nepal"
          />
          <FormErr>{errors.address?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Date of Birth</CompulsoryLabel>
          <input {...register('birth_date')} type="date" className="date" />
          <FormErr>{errors.birth_date?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Nationality</CompulsoryLabel>
          <Input {...register('nationality')} placeholder="Eg: Nepalese" />
          <FormErr>{errors.nationality?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Highest Education</CompulsoryLabel>
          <Input {...register('highest_education')} placeholder="Eg: Masters" />
          <FormErr>{errors.highest_education?.message}</FormErr>
        </div>

        <div className=" flex items-center justify-between  text-muted-foreground">
          <button
            type="button"
            onClick={handleBack}
            className="group flex items-center gap-[3px] "
          >
            <ChevronLeft
              size={20}
              className=" relative right-0 transition-all duration-100  ease-linear group-hover:right-1 group-hover:scale-105 "
            />
            Back
          </button>
          <FormSubmitBtn className=" " isSubmitting={isSubmitting || isPending}>
            Next
          </FormSubmitBtn>
        </div>
      </form>
    </FormAnimateWrapper>
  )
}
