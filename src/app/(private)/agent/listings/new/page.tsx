'use client'
import { Input } from '@/components/ui/input'
import React from 'react'
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
import RichTextEditor from '@/components/common/RichTextEditor'
import { useAddProperty } from '@/hooks/mutations/agents.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import { TopBar } from '@/components/dashboard/TobBar'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'

interface OptionType {
  value: string
  label: string
}

const amenitiesOptions: OptionType[] = Object.keys(Amenities).map((key) => ({
  value: Amenities[key as keyof typeof Amenities],
  label: Amenities[key as keyof typeof Amenities],
}))

const propertyTypes = ['House (집)', 'Appartment (아파트)', 'Room (방)']

const page = () => {
  const router = useRouter()
  const { token } = useAuth()
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<TPropertySchema>({
    resolver: zodResolver(propertySchema),
  })

  const { mutateAsync, isPending } = useAddProperty(token!)

  const onSubmit = (data: TPropertySchema) => {
    const promise = mutateAsync(data).then((data) =>
      router.push(`/agent/listings/${data._id}`),
    )
    toast.promise(promise, {
      loading: 'Adding property...',
      success: 'Successfully added property !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  return (
    <>
      <TopBar title="Add Property (속성 추가)" />
      <div className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl space-y-4 py-4"
          id="form"
        >
          <div>
            <CompulsoryLabel>Title (제목)</CompulsoryLabel>
            <Input
              {...register('title')}
              placeholder="Eg: Delany Aveneue, Burwood (예: 딜레이니 애비뉴, 버우드)"
            />
            <FormErr>{errors.title?.message}</FormErr>
          </div>

          <div className="min-h-[8.85rem]">
            <CompulsoryLabel>Description (설명)</CompulsoryLabel>
            <RichTextEditor
              value={watch('description')}
              setValue={setValue}
              trigger={trigger}
              name="description"
            />
            <FormErr>{errors.description?.message}</FormErr>
          </div>

          <div>
            <CompulsoryLabel>Property Type (부동산 유형)</CompulsoryLabel>
            <select
              {...register('type')}
              defaultValue=""
              className="select block w-full"
            >
              <option value="" disabled>
                Choose Property Type (부동산 유형 선택)
              </option>
              {propertyTypes.map((p, idx) => (
                <option key={idx} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <FormErr>{errors.type?.message}</FormErr>
          </div>

          <div>
            <CompulsoryLabel>Amenities (예의)</CompulsoryLabel>
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
            />
            <FormErr>{errors.amenities?.message}</FormErr>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <div>
              <CompulsoryLabel>Province (주)</CompulsoryLabel>
              <select
                {...register('state')}
                defaultValue=""
                className="select block w-full"
              >
                <option value="" disabled>
                  Choose Location (위치 선택)
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
              <CompulsoryLabel>City (도시)</CompulsoryLabel>
              <Input {...register('city')} placeholder="Eg: Busan" />
              <FormErr>{errors.city?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Address (주소) (주소)</CompulsoryLabel>
              <Input
                {...register('address')}
                placeholder="123-456, Myeong-dong"
              />
              <FormErr>{errors.address?.message}</FormErr>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <CompulsoryLabel>Minimum Deposit (최소 입금액)</CompulsoryLabel>
              <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
                <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                  ₩
                </span>
                <input
                  type="number"
                  step="0.01"
                  className="h-full flex-1 pl-1 outline-none"
                  placeholder="Eg: 300,000"
                  {...register('minimum_deposit')}
                />
              </div>
              <FormErr>{errors.minimum_deposit?.message}</FormErr>
            </div>
            <div className="w-full">
              <CompulsoryLabel>Cost (비용)</CompulsoryLabel>
              <div className="flex h-10 items-center rounded-sm border pr-1 text-sm">
                <span className="flex h-full items-center justify-center bg-secondary p-4 text-xl font-bold">
                  ₩
                </span>
                <input
                  type="number"
                  step="0.01"
                  className="h-full flex-1 pl-1 outline-none"
                  placeholder="Eg: 300,000"
                  {...register('cost')}
                />
                <span className="text-nowrap text-muted-foreground">
                  /Per Month (/달마다)
                </span>
              </div>
              <FormErr>{errors.cost?.message}</FormErr>
            </div>
          </div>

          <div className="w-full">
            <CompulsoryLabel>Area (영역)</CompulsoryLabel>
            <div className="flex h-10 items-center rounded-sm border text-sm">
              <input
                type="number"
                step="0.01"
                className="h-full flex-1 pl-1 outline-none"
                placeholder="Eg: 400"
                {...register('area')}
              />

              <span className="flex h-full items-center justify-center bg-secondary p-4">
                Sq. Ft. (평방 피트)
              </span>
            </div>
            <FormErr>{errors.minimum_deposit?.message}</FormErr>
          </div>

          <div className="w-full">
            <Label>Youtube Video URl (YouTube 동영상 URL)</Label>
            <Input
              {...register('video_url')}
              placeholder="Eg: https://www.youtube.com/watch?v=22mrSjknDHI"
            />
            <FormErr>{errors.video_url?.message}</FormErr>
          </div>

          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default page
