'use client'
import {
  CalendarCheck,
  CalendarClock,
  Edit,
  Eye,
  Plus,
  Trash2,
  Users,
} from 'lucide-react'

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
import { TopBar } from '@/components/dashboard/TobBar'

import PageLoadingUI from '@/components/common/loading'
import { useGetAllVacancy } from '@/hooks/query/admin/admin.query'
import Link from 'next/link'
import {
  useDeleteVacancy,
  useExpireVacancy,
} from '@/hooks/mutations/admin/agents.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import AddButton from '@/components/common/AddButton'

const page = () => {
  const { token } = useAuth()
  const { data, isLoading } = useGetAllVacancy()
  const { mutateAsync } = useDeleteVacancy(token!)
  const expiryMutation = useExpireVacancy(token!)

  const handleDelete = (id: string) => {
    const promise = mutateAsync(id)
    toast.promise(promise, {
      loading: 'Please wait ...',
      success: 'Deleted vacancy successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  const toggleExpiry = (id: string) => {
    toast.promise(expiryMutation.mutateAsync(id), {
      loading: 'Please wait ...',
      success: 'Changed expiry status successfully !!',
      error: (err) => err.message || 'Changed expiry status successfully !!',
    })
  }

  if (isLoading) return <PageLoadingUI />

  return (
    <div>
      <TopBar title="All Applicants" />
      <div className="px-2">
        <AddButton title="Vacancy" link={`/admin/vacancy/new`} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>No of Vacancy</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                  {d.job_title}
                </TableCell>
                <TableCell>{d.count}</TableCell>
                <TableCell>{d.type}</TableCell>
                <TableCell>{d.location}</TableCell>
                <TableCell>
                  {d.expired ? (
                    <span className="text-destructive">Expired</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link
                      title="Applicants"
                      href={`/admin/vacancy/${d._id}/applicants`}
                      className="rounded-md border p-2 hover:bg-blue-500/10"
                    >
                      <Users size={16} />
                    </Link>

                    {!d.expired && (
                      <Link
                        title="View vacancy post"
                        href={`/careers/${d._id}`}
                        className="rounded-md border p-2 hover:bg-blue-500/10"
                      >
                        <Eye size={16} />
                      </Link>
                    )}

                    <Link
                      href={`/admin/vacancy/${d._id}/edit`}
                      title="Expire Vacancy"
                      className="rounded-md border p-2 text-primary hover:bg-primary/10"
                    >
                      <Edit size={16} />
                    </Link>

                    <button
                      onClick={() => toggleExpiry(d._id)}
                      title="Unexpire"
                      className={cn(
                        'rounded-md border p-2',
                        d.expired
                          ? 'text-green-500 hover:bg-green-600/10'
                          : 'text-destructive hover:bg-destructive/10',
                      )}
                    >
                      {d.expired ? (
                        <CalendarCheck size={16} />
                      ) : (
                        <CalendarClock size={16} />
                      )}
                    </button>

                    {d.expired && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="rounded-md border p-2 hover:bg-red-500/10">
                            <Trash2 size={16} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will expire the vacancy and people won't be
                              able to apply to your job post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(d._id)}
                              className="border border-destructive bg-white text-destructive shadow-none hover:bg-destructive hover:text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
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
