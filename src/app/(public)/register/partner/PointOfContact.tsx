'use client'
import BackBtn from '@/components/dashboard/onboarding/BackBtn'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import { H3 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TPointOfContact, pointOfContactSchema } from '@/schema/public.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const PointOfContact = () => {
  const [partner, setPartner] = useLocalStorage('partner')
  const router = useRouter()

  if (!partner) {
    router.push('/register/partner?step=1')
    return
  }

  const onSubmit = (data: TPointOfContact) => {
    setPartner({ ...partner, ...data })
    router.push('?step=3')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pointOfContactSchema),
    defaultValues: partner as TPointOfContact,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-10">
      <H3>Point of Contact</H3>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {/*NAME AND CONTACT*/}
        <div className="w-full">
          <CompulsoryLabel>Name of the Owner</CompulsoryLabel>
          <Input {...register('user_name')} placeholder="Eg: Michel Jackson" />
          <FormErr>{errors.user_name?.message}</FormErr>
        </div>

        <div className="w-full">
          <CompulsoryLabel>Phone</CompulsoryLabel>
          <Input
            {...register('user_phone')}
            type="number"
            placeholder="Eg: 98xxxxxxxxxx"
          />
          <FormErr>{errors.user_phone?.message}</FormErr>
        </div>

        <div className="w-full">
          <CompulsoryLabel>Email</CompulsoryLabel>
          <Input {...register('user_email')} placeholder="john@gmail.com" />
          <FormErr>{errors.user_email?.message}</FormErr>
        </div>

        {/*SOCIAL MEDIA*/}
        <div className="w-full">
          <Label>Facebook</Label>
          <Input
            {...register('user_facebook')}
            placeholder="Eg: https://www.facebook.com/zuck"
          />
        </div>
        <div className="w-full">
          <Label>LinkedIn</Label>
          <Input
            {...register('user_linkedin')}
            placeholder="Eg: https://www.linkedin.com/in/mark-zuckerberg-618bba58/"
          />
        </div>
      </div>

      <div className="ml-auto flex w-fit gap-2">
        <BackBtn></BackBtn>
        <Button className="block">Next</Button>
      </div>
    </form>
  )
}

export default PointOfContact
