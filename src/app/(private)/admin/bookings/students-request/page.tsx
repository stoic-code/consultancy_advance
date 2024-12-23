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
import { useGetAccomodationReq } from '@/hooks/query/admin/accomodationRequest.query'

const page = () => {
  const { token } = useAuth()
  const { data, isLoading } = useGetAccomodationReq(token!)

  if (isLoading) return <PageLoadingUI />

  return (
    <div className="px-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">SN</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Institute</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead className="text-right">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                {d.location}
              </TableCell>
              <TableCell>{d.institute}</TableCell>
              <TableCell>{convertToKoreanLocale(d.budget)}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger>
                    <button className="rounded-md border p-2 hover:bg-blue-500/10">
                      <Eye size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Message</DialogTitle>
                    </DialogHeader>
                    <div
                      className=" editor"
                      dangerouslySetInnerHTML={{ __html: d.message }}
                    ></div>
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
