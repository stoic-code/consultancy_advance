'use client'
import { Camera } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/providers/AuthProvider'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import FormErr from '@/components/form/FormErr'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { ACCEPTED_FILE_TYPES, MAX_IMAGE_SIZE } from '@/schema/blog.schema'
import { cn } from '@/lib/utils'
import { useEditProfilePicture } from '@/hooks/mutations/admin/instution.mutation'

const ImageSchema = z.object({
  image: z.union([
    z.string().url(),
    z
      .any()
      .refine(
        (file) => file !== null && file !== undefined,
        'Image is required',
      )
      .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max file size is 15MB.')
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
        'Unsupported image format. Only JPEG, PNG, and GIF are allowed.',
      ),
  ]),
})

type TImageSchema = z.infer<typeof ImageSchema>

export default function EditProfilePic({ data }: { data: any }) {
  const [editUniProfile, setEditUniProfile] = useState(false)
  const [preview, setPreview] = useState<any>(null)
  const [ImageFile, setImageFile] = useState<File | null>(null)
  const { token } = useAuth()
  const params = useParams()
  const instituteId = params.id
  const router = useRouter()
  const { mutateAsync, isPending } = useEditProfilePicture(instituteId, token!)
  //    const CourseId = params.course
  //    const InstituteId = params.id
  //    const { data, isLoading } = useGetCourse(CourseId!)
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<TImageSchema>({
    resolver: zodResolver(ImageSchema),
  })
  //   IMAGE UPLOADER ONDROP
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader()
    file.onload = function () {
      setPreview(file.result)
    }
    file.readAsDataURL(acceptedFiles[0])
    setImageFile(acceptedFiles[0])
    setValue('image', acceptedFiles[0])
    trigger('image')
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  function onSubmit() {
    const fd = new FormData()
    if (data.profile_image?.secure_url) {
      fd.append('old_url', data.profile_image?.public_id)
    }

    fd.append('image', ImageFile!)

    const promise = mutateAsync(fd).then((data) => {})

    toast.promise(promise, {
      loading: 'Uploading Image',
      success: () => {
        setEditUniProfile(false)
        setPreview('')
        return 'Successfully Uploaded Image'
      },
      error: (err) => err.message || 'Something went wrong !',
    })
  }
  return (
    <div>
      <button
        onClick={() => setEditUniProfile(true)}
        className="  cursor-pointer self-center rounded-xl  text-center "
      >
        <Camera className=" mx-auto text-center text-white" size={40} />
        <p className=" hidden text-center text-white group-hover:block">
          Click here to <br />
          edit photo
        </p>
      </button>
      <Dialog open={editUniProfile} onOpenChange={setEditUniProfile}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit University Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="grid place-items-center gap-4 pt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid w-full place-items-end space-y-2"
            >
              <div
                className={cn(
                  'grid h-80 w-full cursor-pointer place-items-center  rounded-md border-2 border-dashed border-primary bg-gray-100 p-4 text-muted-foreground',
                  preview && 'h-auto',
                )}
                {...getRootProps()}
              >
                <input {...register('image')} {...getInputProps()} />
                {isDragActive ? (
                  <p className=" cursor-pointer text-center">
                    Drop the cover image of course here ...
                  </p>
                ) : (
                  <p className=" cursor-pointer  text-center">
                    Drag 'n' drop a cover photo here,
                    <br /> or click to select a cover photo of a course
                  </p>
                )}
                {preview && (
                  <img
                    className="h-36 w-auto cursor-pointer rounded-lg object-cover object-center"
                    src={preview}
                  />
                )}
              </div>
              <FormErr>{errors.image?.message}</FormErr>

              <FormSubmitBtn className=" " isSubmitting={isPending}>
                Submit
              </FormSubmitBtn>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
