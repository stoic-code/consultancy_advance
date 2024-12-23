'use client'
import { cn } from '@/lib/utils'
import { H2, H3, P } from '../typography'
import { Button } from '../ui/button'
import SearchInput from '../ui/search'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ArrowUpRightFromSquare, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { useGetAllVacancy } from '@/hooks/query/admin/admin.query'
import PageLoadingUI from '../common/loading'
import Image from 'next/image'

const locations = [
  'New York',
  'Los Angeles',
  'London',
  'Paris',
  'Tokyo',
  'Sydney',
  'Rome',
  'Berlin',
  'Dubai',
  'Rio de Janeiro',
]

const tabs = [
  'Accounts',
  'Business Development',
  'Human Resource',
  'Marketing',
  'Sales',
]

export const Openings = () => {
  const [tab, setTab] = useState('')

  const { data, isLoading } = useGetAllVacancy()

  if (isLoading) return <PageLoadingUI />
  const nonExpiredJobs = data.filter((job: any) => !job.expired)

  return (
    <div className="2xl:container">
      <div className="flex flex-col items-center justify-between gap-2 py-10 sm:flex-row sm:px-4 md:px-4">
        <H3>Current Job Openings</H3>
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput placeholder="Search Jobs..." />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          className={cn(
            'rounded-full hover:bg-primary/20',
            tab === ''
              ? 'bg-primary text-white hover:bg-primary hover:text-white'
              : '',
          )}
          size="sm"
          onClick={() => setTab('')}
        >
          All
        </Button>
        {tabs.map((t, idx: number) => (
          <Button
            variant="outline"
            className={cn(
              'rounded-full hover:bg-primary/20',
              tab === t
                ? 'bg-primary text-white hover:bg-primary hover:text-white'
                : '',
            )}
            key={idx}
            size="sm"
            onClick={() => setTab(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div>
        <div className="mx-auto grid max-w-6xl gap-8 px-2 py-10 md:grid-cols-2 lg:grid-cols-3">
          {nonExpiredJobs.map((j: any, idx: number) => {
            // if (!j.expired) {
            return (
              <Link key={idx} href={`/careers/${j._id}`}>
                <Card className="group relative w-full flex-shrink-0 transition-all duration-300 hover:bg-primary/10 hover:text-primary">
                  <ArrowUpRightFromSquare
                    size={18}
                    className="absolute right-3 top-3 hidden text-primary transition-all duration-300 group-hover:inline"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl">{j.job_title}</CardTitle>
                    <CardDescription className="flex flex-nowrap justify-between pt-4 group-hover:text-primary/80">
                      <span>
                        <MapPin size={18} className="inline" /> {j.location}
                      </span>
                      <span>
                        <Users size={18} className="inline" /> {j.count}
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
            // }
          })}
        </div>
        {nonExpiredJobs.length === 0 && (
          <div className="  grid place-items-center   pb-10">
            <div className="  w-52  ">
              <Image
                src={'/vacancy/novacancy.png'}
                height={200}
                width={200}
                alt="vacancy not found"
                className=" mx-auto h-40 w-40"
              />
              <p className=" text-wrap text-center text-muted-foreground">
                No jobs available at the moment. Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
