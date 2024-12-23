'use client'
import { Eye, Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TopBar } from '@/components/dashboard/TobBar'

import PageLoadingUI from '@/components/common/loading'
import { useGetApplicantByVacancy } from '@/hooks/query/admin/admin.query'
import Link from 'next/link'
import { useAuth } from '@/providers/AuthProvider'

const page = ({ params }: { params: { id: string } }) => {
  const { token } = useAuth()
  const { data, isLoading } = useGetApplicantByVacancy(params.id, token!)

  if (isLoading) return <PageLoadingUI />

  return (
    <div>
      <Link
        className="fixed bottom-2 right-2 z-10 rounded-full bg-primary p-4 text-white"
        href="/admin/vacancy/new"
      >
        <Plus />
      </Link>
      <TopBar title="All Applicants For this job" />
      <div className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                  {d.first_name} {d.last_name}
                </TableCell>
                <TableCell>{d.contact}</TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>{d.address}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link
                      title="Applicants"
                      href={`/admin/vacancy/${params.id}/applicants/${d._id}`}
                      className="rounded-md border p-2 hover:bg-blue-500/10"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default page
