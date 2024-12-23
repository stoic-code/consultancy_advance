'use client'
import { H2 } from '@/components/typography'
import { Building, MapPin, Users } from 'lucide-react'
import Application from '../Application'
import Details from '../Details'
import { useGetVacancyById } from '@/hooks/query/admin/admin.query'
import PageLoadingUI from '@/components/common/loading'

const page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error } = useGetVacancyById(params.id)

  if (isLoading) return <PageLoadingUI />

  return (
    <div className="relatiive w-full">
      <div
        style={{ background: 'url(/career-bg.webp) no-repeat center/cover' }}
        className="w-full"
      >
        <div className="flex min-h-[50vh] w-full flex-col justify-center gap-2 bg-gradient-to-r from-black/80 px-2 text-white">
          <H2>{data.job_title}</H2>
          <div className="flex gap-4">
            <div className="capitalize">
              <Building className="inline" size={16} /> {data.type}
            </div>
            <div className="capitalize">
              <MapPin className="inline" size={16} /> {data.location}
            </div>
            <div className="capitalize">
              <Users className="inline" size={16} /> {data.category}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-20 px-10 py-10 2xl:container">
        <Details html={data.description} />
        <Application jobId={data._id} />
      </div>
    </div>
  )
}

export default page
