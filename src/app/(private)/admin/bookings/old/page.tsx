'use client'
import React from 'react'

import {
  ArrowUpLeftFromSquare,
  ArrowUpRightFromSquare,
  Eye,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useAuth } from '@/providers/AuthProvider'
import { useGetAllOldBookings } from '@/hooks/query/admin/admin.query'
import PageLoadingUI from '@/components/common/loading'
import { formatDate } from '@/lib/date'
import { convertToKoreanLocale } from '@/helpers/locale'
import Link from 'next/link'

const page = () => {
  const { token } = useAuth()
  const { data, isLoading } = useGetAllOldBookings(token!)

  if (isLoading) return <PageLoadingUI />

  return (
    <div className="px-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">SN</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Property Name</TableHead>
            <TableHead>Deposite Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                {formatDate(d.createdAt)}
              </TableCell>
              <TableCell className="capitalize">
                {d.student.first_name} {d.student.middle_name}{' '}
                {d.student.last_name}
              </TableCell>
              <TableCell>{d.property.title}</TableCell>
              <TableCell>{convertToKoreanLocale(d.deposit)}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger>
                    <button className="rounded-md border p-2 hover:bg-blue-500/10">
                      <Eye size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Bookings Detail</DialogTitle>
                    </DialogHeader>
                    <ul className="space-y-3">
                      <li>
                        <span className="font-semibold">Student Name :</span>{' '}
                        {d.student.first_name} {d.student.middle_name}{' '}
                        {d.student.last_name}
                      </li>
                      <li>
                        <span className="font-semibold">Deposit Amount :</span>{' '}
                        {convertToKoreanLocale(d.deposit)}
                      </li>
                      <li>
                        <span className="font-semibold">Property Name :</span>{' '}
                        {d.property.title}
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          href={`/for-students/accomodations/${d.property._id}`}
                          className="flex items-center gap-2 text-primary underline-offset-2 hover:underline"
                        >
                          View Property <ArrowUpRightFromSquare size={16} />{' '}
                        </Link>
                      </li>
                    </ul>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default page
