'use client'
import AddButton from '@/components/common/AddButton'
import { H3 } from '@/components/typography'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteCourse } from '@/hooks/mutations/admin/courses.mutation'
import { useGetInstutionsCourse } from '@/hooks/query/instution.query'
import { useAuth } from '@/providers/AuthProvider'
import { Edit, Eye, Loader2, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

export default function page({ params }: { params: { id: string } }) {
  const pathname = usePathname()
  const { token } = useAuth()
  const { data, isLoading, error } = useGetInstutionsCourse(params.id)
  const { mutateAsync } = useDeleteCourse(token!)

  if (isLoading)
    return (
      <div className="flex h-[30vh] w-full items-center justify-center text-muted-foreground">
        <Loader2 className="animate-spin" />
      </div>
    )
  if (error)
    return (
      <div className="flex h-[30vh] w-full items-center justify-center text-muted-foreground">
        Error getting data
      </div>
    )

  const handleDeleteCourse = (id: string) => {
    const promise = mutateAsync(id)

    toast.promise(promise, {
      loading: 'Wait!! Deleting',
      success: 'Deleted Successfully',
      error: (err) => err.message || 'Something went wrong',
    })
  }

  return (
    <div className="pb-20">
      <div className="px-4 2xl:container">
        <div className="py-10">
          <H3>Courses Offered </H3>
        </div>
        {/* TABLE OF COURSES */}
        <AddButton title="Course" link={`/admin/instutions/${params.id}/new`} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" max-w-[50px]">SN</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right"> Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data.map((c: any, idx: number) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.level}</TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell>
                    <div className=" flex  justify-end gap-2">
                      <Link
                        href={`${pathname}/${c._id}`}
                        className=" rounded-md border p-2 hover:bg-blue-500/10"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`${pathname}/${c._id}/edit`}
                        className=" rounded-md border p-2 hover:bg-blue-500/10"
                      >
                        <Edit size={16} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
