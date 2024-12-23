'use client'
import PageLoadingUI from '@/components/common/loading'

import { H3, P } from '@/components/typography'
import { usePostImage } from '@/hooks/mutations/admin/courses.mutation'
import { useGetCourse } from '@/hooks/query/admin/course.query'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'

import {
  ArrowLeft,
  Camera,
  Clock,
  GraduationCap,
  Loader2,
  Pencil,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function page({
  params,
}: {
  params: { [key: string]: string }
}) {
  const [preview, setPreview] = useState<any>(null)
  const [ImageFile, setImageFile] = useState<File | null>(null)
  const { token } = useAuth()
  const router = useRouter()
  const CourseId = params.course
  const InstituteId = params.id
  const { data, isLoading } = useGetCourse(CourseId!)

  //   IMAGE UPLOADER ONDROP
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader()
    file.onload = function () {
      setPreview(file.result)
    }
    file.readAsDataURL(acceptedFiles[0])
    setImageFile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const { mutateAsync, isPending } = usePostImage(token!, CourseId, InstituteId)

  useEffect(() => {
    if (preview) {
      onSubmit()
    }
  }, [preview])
  const onSubmit = () => {
    const fd = new FormData()

    fd.append('image', ImageFile!)

    const promise = mutateAsync(fd)

    toast.promise(promise, {
      loading: 'Uploading Image',
      success: 'Successfully Uploaded Image',
      error: (err) => err.message || 'Something went wrong !',
    })
  }

  if (isLoading) return <PageLoadingUI />
  const hasCoverPic = data.image?.secure_url

  return (
    <section className=" place-items-left  grid max-w-3xl gap-4  overflow-hidden p-8">
      {/* IMage upload */}
      <div
        onClick={() => router.back()}
        className=" flex  w-fit cursor-pointer items-center gap-2 text-primary"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </div>
      <div
        className={cn(
          ' relative  grid h-[20vh]   cursor-pointer place-items-center  overflow-hidden rounded-md    bg-gray-100  text-muted-foreground sm:h-[30vh] md:h-[50vh]',
          !hasCoverPic && 'border-2 border-dashed border-primary',
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {hasCoverPic ? (
          <Image
            height={500}
            width={500}
            alt="course image"
            className=" h-full w-full   cursor-pointer rounded-lg  object-cover object-center"
            src={data.image?.secure_url || preview}
          />
        ) : (
          ''
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
              <br />
              Image must be less than 10 mb
            </p>
          )
        )}
        <button className=" absolute bottom-0 right-0 rounded-br-xl rounded-tl-xl bg-blue-500  p-2 text-white">
          <Pencil size={20} />
        </button>
      </div>

      <div className=" space-y-4">
        <div className="space-y-2">
          <H3>{data.title}</H3>

          <P className=" text-base text-muted-foreground">{data.level}</P>
          <div className=" flex items-center gap-2 ">
            <span className=" flex items-center gap-2 text-orange-700">
              <Clock size={16} />
              <span>{data.duration} years</span>
            </span>
            <span className=" flex items-center gap-2 text-green-700">
              <GraduationCap size={16} />
              <span>{data.faculty} </span>
            </span>
          </div>
        </div>
        <p
          className="editor mt-4 overflow-hidden text-wrap text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></p>
      </div>
    </section>
  )
}
