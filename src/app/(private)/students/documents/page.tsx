'use client'
import React, { Suspense, useState } from 'react'
import { DownloadIcon, Eye, Plus, Trash } from 'lucide-react'
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TopBar } from '@/components/dashboard/TobBar'
import { DocumentUploadDialog } from '@/components/dashboard/student/DocumentUploadDialog'

import { useGetStudentProfile } from '@/hooks/query/students/profile.query'
import { useAuth } from '@/providers/AuthProvider'
import PageLoadingUI from '@/components/common/loading'
import { DialogTrigger } from '@/components/ui/dialog'
import toast from 'react-hot-toast'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'

const page = () => {
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const { data, isLoading, error } = useGetStudentProfile(token!)
  const { mutateAsync, isPending } = useEditStudentProfile(token!)

  if (isLoading) return <PageLoadingUI />
  if (error) return 'err'

  const handleDownload = async (url: string, fileName: string) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const href = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = href
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
      toast.error('Error downloading file.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (idx: number) => {
    const newData = { ...data }
    newData.files.splice(idx, 1)
    const promise = mutateAsync({ ...newData })
    toast.promise(promise, {
      loading: 'Deleting file please wait...',
      success: 'Deleted file successfully !!',
      error: (err: any) => err.message || 'Something went wrong.',
    })
  }

  return (
    <div>
      <TopBar title="My Documents" />
      <Suspense>
        <DocumentUploadDialog data={data}>
          <DialogTrigger asChild>
            <button className="mx-2 mb-2 flex w-fit items-center gap-1 text-nowrap  rounded-full border-2 border-primary  px-4  py-2  text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
              <Plus size={16} /> Add Document
            </button>
          </DialogTrigger>
        </DocumentUploadDialog>
      </Suspense>

      <div className="px-2">
        <Table>
          {data.files && data.files.length === 0 && (
            <TableCaption>You havent uploaded any files now.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead className="">Document Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.files &&
              data.files.map((d: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                    {d.name}
                  </TableCell>
                  <TableCell>{d.type}</TableCell>
                  <TableCell>{(d.size / 1024 / 1024).toFixed(2)} MB</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <a
                        href={d.url}
                        target="_blank"
                        className="rounded-md border p-2 hover:bg-blue-500/10"
                      >
                        <Eye size={16} />
                      </a>
                      <button
                        disabled={loading}
                        onClick={() => handleDownload(d.url, d.name)}
                        className="rounded-md border p-2 hover:bg-primary/10"
                      >
                        <DownloadIcon size={16} />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            disabled={isPending}
                            className="rounded-md border p-2 hover:bg-red-500/10"
                          >
                            <Trash size={16} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your document and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(idx)}
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
    </div>
  )
}

export default page
