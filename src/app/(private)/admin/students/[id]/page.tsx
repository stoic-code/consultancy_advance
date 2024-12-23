'use client'
import { dummyApplications } from '@/__mockdata__/application'
import StudentBadge from '@/components/StudentBadge'
import PageLoadingUI from '@/components/common/loading'
import { useGetStudentsById } from '@/hooks/query/admin/students.query'
import { formatDate } from '@/lib/date'
import { useAuth } from '@/providers/AuthProvider'
import { DownloadIcon, Eye } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const tests = [
  { title: 'IELTS', value: 'ielts' },
  { title: 'TOFEL', value: 'tofel' },
  { title: 'PTE', value: 'pte' },
  { title: 'SAT', value: 'sta' },
  { title: 'GRE', value: 'gre' },
  { title: 'GMAT', value: 'gmat' },
]

const page = ({ params }: { params: { id: string } }) => {
  const { token } = useAuth()
  const { data, isLoading } = useGetStudentsById(params.id, token!)
  const [loading, setLoading] = useState(false)

  const handleDownload = async (url: string, fileName: string) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const href = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = href
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
      toast.error('Error downloading file.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) return <PageLoadingUI />

  return (
    <div className="mx-auto max-w-7xl space-y-10 rounded-lg bg-white p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <img
          src="/avatar.avif"
          height={150}
          width={150}
          alt=""
          className="h-[150px] w-[150px] object-cover object-center"
        />
        <div className="mb-6 flex overflow-auto">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="border px-4 py-2">Name</td>
                <td className="border px-4 py-2">
                  {data.first_name} {data.middle_name} {data.last_name}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Email</td>
                <td className="border px-4 py-2">{data.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Phone</td>
                <td className="border px-4 py-2">
                  {data.phone.split(',').join('-')}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Passout Date</td>
                <td className="border px-4 py-2">
                  {data.passout_date ? formatDate(data.passout_date) : '-'}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Processing Status</td>
                <td className="border px-4 py-2">
                  {data.process_status ? (
                    <StudentBadge size="sm" status={data.process_status} />
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Nationality</td>
                <td className="border px-4 py-2">
                  {data.nationality ? data.nationality : '-'}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2">Address</td>
                <td className="border px-4 py-2">
                  {data.highest_education ? data.highest_education : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {data.education?.length > 0 && (
        <div className="mb-6 overflow-auto">
          <h2 className="mb-2 text-xl font-semibold">Education Details</h2>
          <table className="min-w-full rounded border bg-white">
            <thead className="bg-gray-200 text-left text-gray-600">
              <tr>
                <th className="border px-2 py-2">Institution</th>
                <th className="border px-2 py-2">Degree</th>
                <th className="border px-2 py-2">Field of Study</th>
                <th className="border px-2 py-2">Starting Year</th>
                <th className="border px-2 py-2">Year of Graduation</th>
                <th className="border px-2 py-2">GPA/Percent</th>
              </tr>
            </thead>
            <tbody>
              {data.education.map((d: any, idx: number) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{d.university}</td>
                  <td className="border px-4 py-2">{d.course}</td>
                  <td className="border px-4 py-2">{d.faculty}</td>
                  <td className="border px-4 py-2">{d.starting_year}</td>
                  <td className="border px-4 py-2">{d.graduation_year}</td>
                  <td className="border px-4 py-2">{d.university}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.test && (
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">
            English Proficiency Tests
          </h2>
          <table>
            <thead className="bg-gray-200 text-left text-gray-600">
              <tr>
                <th className="border px-2 py-2">Name</th>
                <th className="border px-2 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {tests.map(
                (t, idx) =>
                  data.test &&
                  data.test[t.value] && (
                    <tr key={idx}>
                      <td className="border px-4 py-2">{t.title}</td>
                      <td className="border px-4 py-2">{data.test[t.value]}</td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
      )}

      {data.work?.length > 0 && (
        <div className="mb-6 overflow-auto">
          <h2 className="mb-2 text-xl font-semibold">Work Experience</h2>
          <table className="min-w-full rounded border bg-white">
            <thead className="bg-gray-200 text-left text-gray-600">
              <tr>
                <th className="border px-4 py-2">Company</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Start</th>
                <th className="border px-4 py-2">End</th>
              </tr>
            </thead>
            <tbody>
              {data.work.map((d: any, idx: number) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{d.company_name}</td>
                  <td className="border px-4 py-2">{d.job_title}</td>
                  <td className="border px-4 py-2">
                    {formatDate(d.starting_date)}
                  </td>
                  <td className="border px-4 py-2">
                    {d.end_date ? formatDate(d.end_date) : 'Currently Working'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.files?.length > 0 && (
        <div className="mb-6 overflow-auto">
          <h2 className="mb-2 text-xl font-semibold">Document Lists</h2>
          <table className="min-w-full rounded border bg-white">
            <thead className="bg-gray-200 text-left text-gray-600">
              <tr>
                <th className="border px-4 py-2">Document Name</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.files.map((d: any, idx: number) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{d.name}</td>
                  <td className="border px-4 py-2">{d.type}</td>
                  <td className="border px-4 py-2">{d.size}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <a
                        href={d.url}
                        target="_blank"
                        className="rounded-md p-2 hover:text-blue-500"
                      >
                        <Eye size={16} />
                      </a>
                      <button
                        disabled={loading}
                        onClick={() => handleDownload(d.url, d.name)}
                        className="rounded-md p-2 hover:text-blue-500"
                      >
                        <DownloadIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.applied_courses?.length > 0 && (
        <div className="mb-6 overflow-auto">
          <h2 className="mb-2 text-xl font-semibold">Applied Courses</h2>
          <table className="min-w-full rounded border bg-white">
            <thead className="bg-gray-200 text-left text-gray-600">
              <tr>
                <th className="border px-4 py-2">Course Name</th>
                <th className="border px-4 py-2">University Name</th>
                <th className="border px-4 py-2">Level</th>
                <th className="border px-4 py-2">Duration</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.applied_courses?.map((d: any, idx: number) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{d.title}</td>
                  <td className="border px-4 py-2">
                    {d.institute.institute_name}
                  </td>
                  <td className="border px-4 py-2">{d.level}</td>
                  <td className="border px-4 py-2">{d.duration} Yrs</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={'/'}
                        className="rounded-md p-2 hover:text-blue-500"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default page
