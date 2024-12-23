'use client'
import { useGetStudents } from '@/hooks/query/admin/students.query'
import { useAuth } from '@/providers/AuthProvider'
import PageLoadingUI from '@/components/common/loading'
import { useSearchParams } from 'next/navigation'
import StudentTable from '../../StudentTable'

const page = () => {
  const { token } = useAuth()
  const { data, isLoading } = useGetStudents('APPROVED', token!)

  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  if (isLoading && !data) return <PageLoadingUI />

  const filteredData =
    data &&
    data.filter((d: any) => {
      if (query && query !== '') {
        return (
          d.first_name.toLowerCase().includes(query.toLowerCase()) ||
          d.last_name.toLowerCase().includes(query.toLowerCase()) ||
          d.middle_name?.toLowerCase().includes(query.toLowerCase()) ||
          d.phone.toString().includes(query.toLowerCase()) ||
          d.email.includes(query.toLowerCase())
        )
      } else {
        return []
      }
    })

  return (
    <div className="px-2">
      <StudentTable data={filteredData} />
    </div>
  )
}

export default page
