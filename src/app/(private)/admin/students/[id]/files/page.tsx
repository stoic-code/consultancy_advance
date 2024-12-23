'use client'
import React, { useState } from 'react'
import { DownloadIcon, Eye } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useAuth } from '@/providers/AuthProvider'
import PageLoadingUI from '@/components/common/loading'
import toast from 'react-hot-toast'
import { useGetStudentsById } from '@/hooks/query/admin/students.query'

const page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const { data, isLoading, error } = useGetStudentsById(params.id, token!)

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

  return (
    <div className="px-2">
      <Table>
        {data.files && data.files.length === 0 && (
          <TableCaption>Student haven't uploaded any files.</TableCaption>
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
