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
import { useAuth } from '@/providers/AuthProvider'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useUploadPropertyImages } from '@/hooks/mutations/agents.mutation'

export const PhotoUploadDialog = ({
  children,
  data,
}: {
  children: ReactNode
  data: any
}) => {
  const { token } = useAuth()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>()
  const [loading, setLoading] = useState(false)

  const onDrop = (files: File[]) => {
    setFiles((prev) => (prev ? [...prev, ...files] : [...files]))
  }

  const { mutateAsync } = useUploadPropertyImages(data.id, token!)

  // DELETE FILES WHILE UPLOADING
  const handleRemoveFile = (idx: number) => {
    setFiles((prev) => {
      if (!prev) return prev // If files is null or undefined, return it as is

      // Filter out the file with the given id
      const updatedFiles = prev.filter((_, index) => index !== idx)
      return updatedFiles
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  // HANDLE UPLOAD
  const handleUpload = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      files?.forEach((file) => {
        formData.append(file.name, file)
      })
      await mutateAsync(formData)
      setOpen(false)
      setFiles(undefined)
      toast.success('Images uploaded successfully !')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Photos</DialogTitle>
          <DialogDescription>Add photos to your property</DialogDescription>
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
                <span className="font-semibold text-blue-500">
                  Browse Files
                </span>
              </p>
            )}
          </div>
          <div className="w-fit space-y-2 py-4">
            {files?.map((f, idx) => (
              <div
                className="font mx-2 line-clamp-1 inline-flex justify-between gap-4  rounded-sm border bg-gray-200 px-2 py-1 text-sm"
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
          {files && files.length > 0 && (
            <FormSubmitBtn onClick={handleUpload} isSubmitting={loading}>
              Upload Document
            </FormSubmitBtn>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
