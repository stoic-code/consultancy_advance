'use client'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import { H3 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { removeEmptyStrings } from '@/lib/object'
import { cn } from '@/lib/utils'
import { TBasicInfoSchema, basicInfoSchema } from '@/schema/public.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const BasicInformation = () => {
  const router = useRouter()
  const [partner, setPartner] = useLocalStorage<any>('partner')

  const businessTypes = [
    'Private Limited',
    'Public Limited',
    'Proprietorship',
    'Partnership',
    'Freelance',
  ]

  const onSubmit = (data: any) => {
    const refinedData = removeEmptyStrings(data)

    if (partner) {
      setPartner({ ...partner, ...refinedData })
    } else {
      setPartner(refinedData)
    }

    router.push('?step=2')
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TBasicInfoSchema>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: partner as TBasicInfoSchema,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-10">
      <H3>Basic Information</H3>
      {/*NAME AND REGISTRATION NUMBER*/}
      <div className="grid gap-x-8 gap-y-4 pb-4 sm:grid-cols-2">
        <div className="w-full">
          <CompulsoryLabel>Organization Name</CompulsoryLabel>
          <Input
            {...register('org_name')}
            placeholder="Eg: Consult Advance Education Pvt. Ltd."
          />
          <FormErr>{errors.org_name?.message}</FormErr>
        </div>

        <div className="w-full">
          <Label>
            Registration Number{' '}
            <span className="text-xs text-muted-foreground">
              (If Applicable)
            </span>
          </Label>
          <Input
            {...register('registration_no')}
            placeholder="Enter your registration number"
          />
          <FormErr>{errors.registration_no?.message}</FormErr>
        </div>

        <div className="w-full">
          <CompulsoryLabel>Business Type</CompulsoryLabel>
          <select
            {...register('business_type')}
            className={cn('select w-full')}
            defaultValue=""
          >
            <option value="" disabled>
              Please select business type
            </option>
            {businessTypes.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
          <FormErr>{errors.business_type?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Year of Establishment</CompulsoryLabel>
          <div className="input">
            <input
              className="w-full outline-none"
              {...register('estd')}
              type="date"
              placeholder="Eg: 1920"
            />
          </div>
          <FormErr>{errors.estd?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Country</CompulsoryLabel>
          <Input {...register('country')} placeholder="Eg: Nepal" />
          <FormErr>{errors.country?.message}</FormErr>
        </div>

        <div>
          <Label>City</Label>
          <Input {...register('city')} placeholder="Eg: Lalitpur" />
          <FormErr>{errors.city?.message}</FormErr>
        </div>

        <div>
          <Label>Town</Label>
          <Input {...register('town')} placeholder="Eg: Sadak Marga" />
          <FormErr>{errors.town?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Address</CompulsoryLabel>
          <Input
            {...register('address')}
            placeholder="Eg: Lalitpur-10, Nepal"
          />
          <FormErr>{errors.address?.message}</FormErr>
        </div>

        <div>
          <Label>Postal / Zip Code</Label>
          <Input {...register('postal_code')} placeholder="Eg: 44100" />
          <FormErr>{errors.postal_code?.message}</FormErr>
        </div>

        <div>
          <CompulsoryLabel>Phone</CompulsoryLabel>
          <Input {...register('org_phone')} placeholder="Eg: 98xxxxxxxx" />
          <FormErr>{errors.org_phone?.message}</FormErr>
        </div>

        <div>
          <Label>Primary Website</Label>{' '}
          <span className="text-xs text-muted-foreground">(If Applicable)</span>
          <Input
            {...register('primary_website')}
            placeholder="Eg: www.consultadvance.com"
          />
        </div>

        <div>
          <Label>
            Secondary Website{' '}
            <span className="text-xs text-muted-foreground">
              (If Applicable)
            </span>
          </Label>
          <Input
            {...register('secondary_website')}
            placeholder="Eg: www.consultadvance.com"
          />
        </div>
      </div>
      <Button className="ml-auto block">Next</Button>
    </form>
  )
}

export default BasicInformation
