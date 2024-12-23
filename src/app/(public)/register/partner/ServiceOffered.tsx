'use client'
import BackBtn from '@/components/dashboard/onboarding/BackBtn'
import { H3 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const servicesOffered = [
  'Educational Counselling',
  'Course Selection',
  'University Selection',
  'Offers & Admissions in Universities / Colleges',
  'Visa Assistance',
  'Scholarship Assistance',
  'Study Abroad Loan Assistance',
  'Pre Departure and Post Arrival Services',
  'Airport Assistance',
  'Accommodation Services',
  'Part Time Job Guidance',
  'Psychometric testing',
  'Entrance Exams- Coaching Classes',
  'English language classes',
  'Registration for Entrance and English tests',
  'Immigration assistance',
  'Visitor Visas',
  'Overseas Work permits',
  'Collaboration Services to Institutions',
]

const ServicesOffered = () => {
  const router = useRouter()
  const [partner, setPartner] = useLocalStorage<any>('partner')

  if (!partner) {
    router.push('/register/partner?step=1')
    return null
  }

  const [services, setServices] = useState<string[]>(
    partner.services ? partner.services : [],
  )

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    setServices((prevServices) => {
      if (checked) {
        return [...prevServices, value]
      } else {
        return prevServices.filter((service) => service !== value)
      }
    })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPartner({ ...partner, services })
    router.push('?step=4')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 pt-10">
      <div>
        <H3>
          Services Offered to Students{' '}
          <span className="text-xs font-normal text-muted-foreground">
            (Select all that Apply)
          </span>
        </H3>
        <p className="text-sm text-muted-foreground">
          Provide us information about the services you provide to students.
        </p>
      </div>
      {/* ALL SERVICES */}

      <div className="grid gap-3 sm:grid-cols-2">
        {servicesOffered.map((service, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              id={service}
              type="checkbox"
              value={service}
              onChange={handleCheckboxChange}
              checked={services.includes(service)}
            />
            <Label htmlFor={service}>{service}</Label>
          </div>
        ))}
      </div>

      <div className="ml-auto flex w-fit gap-2">
        <BackBtn />
        <Button className="block">
          {services.length === 0 ? 'Skip' : 'Next'}
        </Button>
      </div>
    </form>
  )
}

export default ServicesOffered
