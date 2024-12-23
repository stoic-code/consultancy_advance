'use client'
import React from 'react'
import { Eye, SquarePenIcon, Trash } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import Link from 'next/link'

import { useGetInstutions } from '@/hooks/query/instution.query'
import PageLoadingUI from '@/components/common/loading'
import AddButton from '@/components/common/AddButton'
import { useDeleteInstution } from '@/hooks/mutations/admin/instution.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'

const page = () => {
  const { token } = useAuth()
  const { data, isLoading } = useGetInstutions()
  const { mutateAsync } = useDeleteInstution(token!)
  if (isLoading) return <PageLoadingUI />

  const handleDelete = async (id: string) => {
    const promise = mutateAsync(id)
    toast.promise(promise, {
      success: 'Deleted institution successfully !!',
      loading: 'Please wait ...',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  return (
    <div className="px-2">
      <AddButton title="Institution" link="/admin/instutions/new" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">SN</TableHead>
            <TableHead className="">Institution Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Courses Offered</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                {d.institute_name}
              </TableCell>
              <TableCell>{d.email}</TableCell>
              <TableCell>{d.courses.length}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/instutions/${d._id}`}
                    className="rounded-md border p-2 hover:bg-blue-500/10"
                  >
                    <Eye size={16} />
                  </Link>
                  <Link
                    className="rounded-md border p-2 hover:bg-primary/10"
                    href={`/admin/instutions/${d._id}/edit`}
                  >
                    <SquarePenIcon size={16} />
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger className="rounded-md border p-2 hover:bg-destructive/10">
                      <Trash size={16} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(d._id)}>
                          Continue
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
