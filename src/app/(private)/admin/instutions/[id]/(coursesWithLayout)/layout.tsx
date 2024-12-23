'use client'
import InstitutionTab from '@/components/for-instutions/InstitutionTab'
import { Camera, GraduationCap, Loader2, Pencil } from 'lucide-react'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import EditProfilePic from './EditProfilePic'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { useEditCoverPicture } from '@/hooks/mutations/admin/instution.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import { useGetInstutionById } from '@/hooks/query/instution.query'
import PageLoadingUI from '@/components/common/loading'

type Params = {
  id: string
}

export default function layout({
  children,
  params,
}: {
  children: ReactNode
  params: Params
}) {
  const [preview, setPreview] = useState<any>(null)
  const [ImageFile, setImageFile] = useState<File | null>(null)
  const { token } = useAuth()

  const instituteId = params.id

  const { data, isLoading } = useGetInstutionById(instituteId)
  const { mutateAsync, isPending } = useEditCoverPicture(instituteId, token!)

  //   IMAGE UPLOADER ONDROP
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader()
    file.onload = function () {
      setPreview(file.result)
    }
    file.readAsDataURL(acceptedFiles[0])
    setImageFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  useEffect(() => {
    if (preview) {
      onSubmit()
    }
  }, [preview])
  function onSubmit() {
    const fd = new FormData()

    fd.append('image', ImageFile!)

    if (data.cover_image?.secure_url) {
      fd.append('public_id', data.cover_image?.public_id)
    }

    const promise = mutateAsync(fd).then((data) => {})

    toast.promise(promise, {
      loading: 'Uploading Image',
      success: 'Successfully Uploaded Image',
      error: (err) => err.message || 'Something went wrong !',
    })
  }

  if (isLoading) return <PageLoadingUI />

  const hasCoverPic = data.cover_image?.secure_url
  const hasProfilePic = data.profile_image?.secure_url

  return (
    <div>
      <div className="">
        <div className="group relative h-[20vh] sm:h-[30vh]  md:h-[50vh]">
          <div
            className={cn(
              ' relative mx-auto grid h-[20vh] w-full cursor-pointer place-items-center overflow-hidden rounded-md bg-gray-100 text-muted-foreground sm:h-[30vh] md:h-[50vh]',
              !hasCoverPic && 'border-2 border-dashed border-primary',
            )}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {hasCoverPic && (
              <img
                className="h-full w-full cursor-pointer rounded-lg object-cover object-center"
                src={data.cover_image?.secure_url || preview}
              />
            )}
            {preview && isPending && (
              <div className=" absolute inset-0 bg-black/50">
                <div className="grid h-full place-items-center">
                  <Loader2 className="animate-spin text-muted" />
                </div>
              </div>
            )}

            {!preview && isDragActive ? (
              <p className=" cursor-pointer text-center">
                Drop the cover image of Institution here ...
              </p>
            ) : (
              !preview &&
              !hasCoverPic && (
                <p className=" cursor-pointer  text-center">
                  <Camera
                    className=" mx-auto text-center text-muted-foreground"
                    size={40}
                  />
                  Drag 'n' drop a cover photo here,
                  <br /> or click to select a cover photo of a Institution
                </p>
              )
            )}
            <button className=" absolute bottom-0 right-0 rounded-tl-xl bg-blue-500  p-2 text-white">
              <Pencil size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className=" relative space-y-4   px-4 pt-12 2xl:container lg:px-20">
        <div className="  absolute bottom-4 left-8 z-10 bg-white  shadow-xl sm:-top-32 md:left-20 ">
          <div className=" group absolute inset-0 z-0   transition-colors duration-100 ease-linear hover:bg-black/60 ">
            <div className="  hidden h-full place-items-center group-hover:grid">
              <EditProfilePic data={data} />
            </div>
          </div>
          {!data.profile_image?.secure_url ? (
            <div className="mx-auto grid  h-20   w-20  place-items-center text-muted-foreground  sm:h-40 sm:w-36">
              <GraduationCap strokeWidth={1} size={100} />
            </div>
          ) : (
            <div className="p-2">
              <div
                className=" group  h-20  w-20 bg-no-repeat   sm:h-40  sm:w-36"
                style={{
                  background: `url(${data.profile_image?.secure_url}) center/contain no-repeat`,
                  padding: '0rem',
                }}
              ></div>
            </div>
          )}
          <button className=" absolute bottom-0 right-0 rounded-tl-xl bg-blue-500  p-2 text-white">
            <Pencil size={16} />
          </button>
        </div>
      </div>

      <div className=" ">
        <div>
          <InstitutionTab id={params.id} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
