'use client'
import PageLoadingUI from '@/components/common/loading'
import { TopBar } from '@/components/dashboard/TobBar'
import { useGetApplicantData } from '@/hooks/query/admin/admin.query'
import { useAuth } from '@/providers/AuthProvider'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = ({ params }: { params: { applicant: string } }) => {
  const router = useRouter()
  const { token } = useAuth()
  const { data, isLoading } = useGetApplicantData(params.applicant, token!)

  if (isLoading) return <PageLoadingUI />

  return (
    <div className="px-4">
      <TopBar title="Applicant Details" />

      <button
        onClick={() => router.back()}
        className="mb-5 flex gap-2 text-primary"
      >
        <MoveLeft /> Go Back
      </button>

      <div className="pb-20">
        <div className="flex justify-between">
          <div className="">
            <h2 className="text-2xl font-bold">{`${data.first_name} ${data.last_name}`}</h2>

            <ul className="py-4">
              <li>
                <span className="font-bold">Email :</span> {data.email}
              </li>
              <li>
                <span className="font-bold">Contact :</span> {data.contact}
              </li>
              <li>
                <span className="font-bold">Address :</span> {data.address}
              </li>
              <li>
                <span className="font-bold">LinkedIn :</span> {data.linkedin}
              </li>
            </ul>

            <div>
              <p>{data.coverletter}</p>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold">Cover Letter</h3>
        <div
          className="editor space-y-5"
          dangerouslySetInnerHTML={{ __html: '' }}
        />
        <embed src={data.cv_url} width="100%" height="720px" />
      </div>
    </div>
  )
}

export default page
