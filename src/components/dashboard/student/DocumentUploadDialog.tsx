'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useDropzone } from 'react-dropzone'
import { ReactNode, useState } from 'react'
import { X } from 'lucide-react'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import toast from 'react-hot-toast'
import { useEditStudentProfile } from '@/hooks/mutations/students.mutation'
import { useAuth } from '@/providers/AuthProvider'

export const DocumentUploadDialog = ({
  children,
  data,
}: {
  children: ReactNode
  data: any
}) => {
  const { token } = useAuth()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const maxSize = 5 * 1024 * 1024 // 5 MB

  const onDrop = (acceptedFiles: File[], fileRejections: any[]) => {
    const newErrors = fileRejections.map((file) => ({
      fileName: file.file.name,
      error: 'File size exceeds the limit of 5 MB',
    }))

    setErrors(newErrors)

    const validFiles = acceptedFiles.filter((file) => file.size <= maxSize)
    setFiles((prev) => (prev ? [...prev, ...validFiles] : [...validFiles]))
  }

  const { mutateAsync } = useEditStudentProfile(token!)

  const handleRemoveFile = (idx: number) => {
    setFiles((prev) => {
      if (!prev) return prev
      const updatedFiles = prev.filter((_, index) => index !== idx)
      return updatedFiles
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
  })

  const handleUpload = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append(file.name, file)
      })
      const res = await fetch('/api/docs', { method: 'POST', body: formData })
      const resData = await res.json()
      if (data.files) {
        await mutateAsync({ ...data, files: [...data.files, ...resData] })
      } else {
        await mutateAsync({ ...data, files: [...resData] })
      }
      setOpen(false)
      setFiles([])
      toast.success('Documents uploaded successfully!')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Once uploaded you can attach documents while applying for
            universities.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div
            className="rounded-xl border border-dashed border-primary p-8 text-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag & drop documents files here, <br /> or <br />
                <span className="text-xs text-muted-foreground">
                  Max File size is <span className="font-bold">5MB</span> for
                  each file.
                </span>
                <br />
                <span className="font-semibold text-blue-500">
                  Browse Files
                </span>
              </p>
            )}
          </div>
          {errors.length > 0 && (
            <div>
              {errors.map((error, index) => (
                <p key={index} style={{ color: 'red' }}>
                  {error.fileName}: {error.error}
                </p>
              ))}
            </div>
          )}
          <div className="w-fit space-y-2 py-4">
            {files.map((f, idx) => (
              <div
                className="font mx-2 line-clamp-1 inline-flex justify-between gap-4 rounded-sm border bg-gray-200 px-2 py-1 text-sm"
                key={idx}
              >
                <p className="flex-1">{f.name}</p>
                <button onClick={() => handleRemoveFile(idx)}>
                  <X size={12} className="" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          {files.length > 0 && (
            <FormSubmitBtn onClick={handleUpload} isSubmitting={loading}>
              Upload Document
            </FormSubmitBtn>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
