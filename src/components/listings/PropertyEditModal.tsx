'use client'
import { Input } from '@/components/ui/input'
import React, { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema, TPropertySchema } from '@/schema/agent.schema'
import FormErr from '@/components/form/FormErr'
import { Button } from '@/components/ui/button'
import { Amenities, PROVINCES } from '@/constants/accomodation'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full rounded-sm"></Skeleton>,
})
import Editor from '@/components/common/PropertyDesc'
import {
  useAddProperty,
  useUpdateListing,
} from '@/hooks/mutations/agents.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '../ui/label'

interface OptionType {
  value: string
  label: string
}

const amenitiesOptions: OptionType[] = Object.keys(Amenities).map((key) => ({
  value: Amenities[key as keyof typeof Amenities],
  label: Amenities[key as keyof typeof Amenities],
}))

export const PropertyEditModal = ({
  children,
  data,
}: {
  children: ReactNode
  data: any
}) => {
  const { token } = useAuth()
  const [open, setOpen] = useState(false)
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<TPropertySchema>({
    resolver: zodResolver(propertySchema),
    defaultValues: { ...data },
  })

  const { mutateAsync, isPending } = useUpdateListing(data._id, token!)

  const onSubmit = (data: TPropertySchema) => {
    const promise = mutateAsync(data).then(() => setOpen(false))
    toast.promise(promise, {
      loading: 'Updating property...',
      success: 'Successfully updated property !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  const oldAmenities = amenitiesOptions.filter((option) =>
    data.amenities.includes(option.value),
  )
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="m-0 max-h-[90vh] overflow-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl space-y-4"
            id="form"
          >
            <div>
              <CompulsoryLabel>Title</CompulsoryLabel>
              <Input
                {...register('title')}
                placeholder="Eg: Delany Aveneue, Burwood"
              />
              <FormErr>{errors.title?.message}</FormErr>
            </div>
            <div className="min-h-[8.85rem]">
              <CompulsoryLabel>Description</CompulsoryLabel>
              <Editor
                value={watch('description')}
                setValue={setValue}
                trigger={trigger}
              />
              <FormErr>{errors.description?.message}</FormErr>
            </div>

            <div>
              <CompulsoryLabel>Amenities</CompulsoryLabel>
              <Select
                onChange={(e: any) => {
                  setValue(
                    'amenities',
                    e.map((d: any) => d.value),
                  )
                  trigger('amenities')
                }}
                isMulti
                options={amenitiesOptions}
                className="border-none"
                defaultValue={oldAmenities}
              />
              <FormErr>{errors.amenities?.message}</FormErr>
            </div>

            <div className="grid gap-2 md:grid-cols-3">
              <div>
                <CompulsoryLabel>Province</CompulsoryLabel>
                <select
                  {...register('state')}
                  defaultValue=""
                  className="select block w-full"
                >
                  <option value="" disabled>
                    Choose Location
                  </option>
                  {PROVINCES.map((p, idx) => (
                    <option key={idx} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <FormErr>{errors.state?.message}</FormErr>
              </div>
              <div>
                <CompulsoryLabel>City</CompulsoryLabel>
                <Input {...register('city')} placeholder="Eg: Busan" />
                <FormErr>{errors.city?.message}</FormErr>
              </div>
              <div>
                <CompulsoryLabel>Address</CompulsoryLabel>
                <Input
                  {...register('address')}
                  placeholder="123-456, Myeong-dong"
                />
                <FormErr>{errors.address?.message}</FormErr>
              </div>
            </div>

            <div>
              <span>
                <CompulsoryLabel>Map Coordinates</CompulsoryLabel>{' '}
                <span className="text-xs">
                  <a
                    href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop#:~:text=of%20a%20place-,On%20your%20computer%2C%20open%20Google%20Maps.,decimal%20format%20at%20the%20top."
                    target="_blank"
                    className="text-blue-500"
                  >
                    See Here
                  </a>{' '}
                  to view coordinates of your place
                </span>
              </span>
              <Input
                {...register('address')}
                placeholder="Eg: 38.328116, 127.269150"
              />
              <FormErr>{errors.address?.message}</FormErr>
            </div>

            <div className="w-full">
              <CompulsoryLabel>Minimum Deposit</CompulsoryLabel>
              <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
                <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                  ₩
                </span>
                <input
                  type="number"
                  className="h-full flex-1 pl-1 outline-none"
                  placeholder="Eg: 300,000"
                  {...register('minimum_deposit')}
                />
              </div>
              <FormErr>{errors.minimum_deposit?.message}</FormErr>
            </div>

            <div className="w-full">
              <CompulsoryLabel>Cost</CompulsoryLabel>
              <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
                <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                  ₩
                </span>
                <input
                  type="number"
                  className="h-full flex-1 pl-1 outline-none"
                  placeholder="Eg: 300,000"
                  {...register('cost')}
                />
                <span className="text-nowrap text-muted-foreground">
                  /Per Month
                </span>
              </div>
              <FormErr>{errors.cost?.message}</FormErr>
            </div>

            <div className="w-full">
              <Label>Youtube Video URl</Label>
              <Input
                {...register('video_url')}
                placeholder="Eg: https://www.youtube.com/watch?v=22mrSjknDHI"
              />
              <FormErr>{errors.video_url?.message}</FormErr>
            </div>

            <Button
              className="ml-auto block"
              type="submit"
              disabled={isPending}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
