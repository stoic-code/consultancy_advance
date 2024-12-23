'use client'
import React from 'react'

import { Check, Eye, Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useAuth } from '@/providers/AuthProvider'
import { useGetAllNewBookings } from '@/hooks/query/admin/admin.query'
import PageLoadingUI from '@/components/common/loading'
import { formatDate } from '@/lib/date'
import { convertToKoreanLocale } from '@/helpers/locale'
import { cn } from '@/lib/utils'
import { useVerifyBooking } from '@/hooks/mutations/admin/students.mutation'
import toast from 'react-hot-toast'

const page = () => {
  const { token } = useAuth()
  const { data, isLoading } = useGetAllNewBookings(token!)
  const { mutateAsync } = useVerifyBooking(token!)

  const handleBookingClick = (id: string) => {
    toast.promise(mutateAsync(id), {
      loading: 'Verifying booking...',
      success: 'Verified booking successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

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
              <TableCell>
                <div className="flex justify-end gap-2">
                  <button className="rounded-md border p-2 hover:bg-blue-500/10">
                    <Eye size={16} />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        title="Verify Booking"
                        className={cn(
                          'rounded-md border p-2 text-green-600 hover:bg-green-800/10',
                        )}
                      >
                        <Check size={18} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          change the status of booking. The property will be
                          booked in the name of student.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleBookingClick(d._id)}
                        >
                          Book
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default page
