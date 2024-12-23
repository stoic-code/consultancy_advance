import React, { useEffect, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TtestSchema, testSchema } from '@/schema/students.schema'
import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { useAuth } from '@/providers/AuthProvider'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import FormErr from '@/components/form/FormErr'
import { removeEmptyStrings } from '@/lib/object'
import toast from 'react-hot-toast'
import FormAnimateWrapper from '@/components/onboard/FormAnimateWrapper'
import { ChevronLeft } from 'lucide-react'

export const TestResults = () => {
  const { token } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const urlSearchParams = useSearchParams()
  const searchParams = new URLSearchParams(urlSearchParams)
  searchParams.set('step', '4')

  const { data } = useGetStudentProfile(token!)
  const { mutateAsync, isPending } = useEditStudentProfile(token!)

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TtestSchema>({ resolver: zodResolver(testSchema) })

  const onSubmit = async (payload: TtestSchema) => {
    try {
      const filteredData = removeEmptyStrings(payload)
      await mutateAsync({
        ...data,
        test: { ...filteredData },
        onboard: 3,
      })
      toast.success('Updated test results successfully !!')
      searchParams.delete('back')
      router.push(`${pathName}?${searchParams.toString()}`)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !')
    }
  }

  useEffect(() => {
    setValue('ielts', data?.test?.ielts)
    setValue('pte', data?.test?.pte)
    setValue('tofel', data?.test?.tofel)
    setValue('sat', data?.test?.sat)
    setValue('gmat', data?.test?.gmat)
    setValue('gre', data?.test?.gre)
  }, [data])

  const handleBack = () => {
    searchParams.set('back', 'true')
    searchParams.set('step', '2')
    router.push(`${pathName}?${searchParams.toString()}`)
  }

  return (
    <FormAnimateWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="onboarding"
        className=" space-y-3   "
      >
        <div>
          <Label>IELTS</Label>
          <Input
            type="number"
            step="0.01"
            {...register('ielts')}
            placeholder="e.g. 7.5"
          />
          <FormErr>{errors.ielts?.message}</FormErr>
        </div>
        <div>
          <Label>PTE</Label>
          <Input
            type="number"
            step="0.01"
            {...register('pte')}
            placeholder="e.g. 79"
          />
          <FormErr>{errors.pte?.message}</FormErr>
        </div>
        <div>
          <Label>TOFEL</Label>
          <Input
            type="number"
            step="0.01"
            {...register('tofel')}
            placeholder="e.g. 105"
          />
          <FormErr>{errors.tofel?.message}</FormErr>
        </div>
        <div>
          <Label>SAT</Label>
          <Input
            type="number"
            step="0.01"
            {...register('sat')}
            placeholder="e.g. 1350"
          />
          <FormErr>{errors.sat?.message}</FormErr>
        </div>
        <div>
          <Label>GMAT</Label>
          <Input
            type="number"
            step="0.01"
            {...register('gmat')}
            placeholder="e.g. 680"
          />
          <FormErr>{errors.gmat?.message}</FormErr>
        </div>
        <div>
          <Label>GRE</Label>
          <Input
            type="number"
            step="0.01"
            {...register('gre')}
            placeholder="e.g. 320"
          />
          <FormErr>{errors.gre?.message}</FormErr>
        </div>
        <div className=" flex items-center justify-between  text-muted-foreground  ">
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
