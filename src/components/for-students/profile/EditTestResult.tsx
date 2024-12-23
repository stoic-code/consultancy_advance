import React, { ReactNode, useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TtestSchema, testSchema } from '@/schema/students.schema'
import { useAuth } from '@/providers/AuthProvider'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import FormErr from '@/components/form/FormErr'
import { removeEmptyStrings } from '@/lib/object'
import toast from 'react-hot-toast'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

export const EditTestResult = ({
  children,
  data,
}: {
  children: ReactNode
  data: any
}) => {
  const [open, setOpen] = useState(false)
  const { token } = useAuth()
  const urlSearchParams = useSearchParams()
  const searchParams = new URLSearchParams(urlSearchParams)
  searchParams.set('step', '4')

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
      if (data.test) {
        await mutateAsync({
          ...data,
          test: { ...data.test, ...filteredData },
          onboard: 3,
        })
      } else {
        await mutateAsync({
          ...data,
          test: filteredData,
          onboard: 3,
        })
      }
      toast.success('Updated test results successfully !!')
      setOpen(false)
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogHeader>Edit Test Results</DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="onboarding"
          className="space-y-3"
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

          <div className="flex justify-end gap-2">
            <FormSubmitBtn
              className=""
              isSubmitting={isSubmitting || isPending}
            >
              Save
            </FormSubmitBtn>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
