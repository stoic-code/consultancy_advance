'use client'
import React from 'react'
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
import { Eye, Trash2 } from 'lucide-react'
import { useGetAppliedCourses } from '@/hooks/query/students/profile.query'
import { useAuth } from '@/providers/AuthProvider'
import PageLoadingUI from '@/components/common/loading'
import { convertToKoreanLocale } from '@/helpers/locale'
import { useDeleteAppliedCourse } from '@/hooks/mutations/students.mutation'
import toast from 'react-hot-toast'

const Page = () => {
  const { token } = useAuth()
  const { data, isLoading } = useGetAppliedCourses(token!)
  const { mutateAsync } = useDeleteAppliedCourse(token!)

  const handleDelete = (id: string) => {
    const promise = mutateAsync(id)
    toast.promise(promise, {
      loading: 'Please wait ...',
      success: 'Application deleted successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  if (isLoading) return <PageLoadingUI />

  return (
    <div>
      <div className="px-2">
        {data.length !== 0 ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SN</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>University Name</TableHead>
                <TableHead>Tuition</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                    {d.institute.institute_name}
                  </TableCell>
                  <TableCell className="max-w-[150px] overflow-hidden overflow-ellipsis text-nowrap">
                    {d.title}
                  </TableCell>
                  <TableCell>
                    {d.course_fee ? convertToKoreanLocale(d.course_fee) : '-'}
                  </TableCell>
                  <TableCell>{d.level}</TableCell>
                  <TableCell>
                    <div className=" flex items-end justify-end gap-2">
                      <Link
                        title="View vacancy post"
                        href={`/careers/${idx}`}
                        className="rounded-md border p-2 hover:bg-blue-500/10"
                      >
                        <Eye size={16} />
                      </Link>
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
                              This will delete the course you applied for and
                              remove it from our servers.
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-muted-foreground">
            You haven't applied for any course <br />
            <Link
              href="/for-students/courses"
              className="text-blue-700 hover:underline"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
