'use client'

import AddButton from '@/components/common/AddButton'
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
import { useDeleteBlog } from '@/hooks/mutations/blogs.mutation'
import { useGetBlogs } from '@/hooks/query/admin/blogs.query'
import { formatDate } from '@/lib/date'
import { useAuth } from '@/providers/AuthProvider'
import { Edit, Eye, Plus, SquarePenIcon, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const { token } = useAuth()

  const { data: AllBlogs } = useGetBlogs()
  const { mutateAsync, isPending } = useDeleteBlog(token!)
  const router = useRouter()

  //delete blog
  const handleDeleteBlog = (id: string) => {
    const promise = mutateAsync(id).then(() => router.push('/admin/blogs'))

    toast.promise(promise, {
      loading: 'Deleting the blog.',
      success: 'Deleted Successfully!!!',
      error: (err) => err.message || 'Something Went Wrong!!',
    })
  }

  return (
    <div>
      <AddButton title="Blog" link={`/admin/blogs/new`} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className=" text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllBlogs &&
            AllBlogs.map((blog: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>

                <TableCell>{blog.title}</TableCell>
                <TableCell>{formatDate(blog.createdAt)}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.category}</TableCell>

                <TableCell>
                  <div className=" flex justify-end gap-2">
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="rounded-md border p-2 hover:bg-blue-500/10"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      className="rounded-md border p-2 hover:bg-primary/10"
                      href={`/admin/blogs/edit/${blog._id}`}
                    >
                      <Edit size={16} />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button className="rounded-md border p-2 hover:bg-red-500/10">
                          <Trash size={16} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your blog and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteBlog(blog._id)}
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
    </div>
  )
}

export default page
