'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import {
  ChevronDown,
  ChevronUp,
  ImagesIcon,
  Loader2,
  Trash2,
  X,
} from 'lucide-react'
import { TopBar } from '@/components/dashboard/TobBar'
import { DeleteAlert } from '@/components/for-students/profile/DeleteAlert'
import { useGetListingById } from '@/hooks/query/agent/agent.query'
import { useAuth } from '@/providers/AuthProvider'
import PageLoadingUI from '@/components/common/loading'
import { notFound } from 'next/navigation'
import { Details } from './Details'
import { Button } from '@/components/ui/button'
import {
  useDeletePropertyImage,
  useUploadPropertyImages,
} from '@/hooks/mutations/agents.mutation'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { getEmbadedurl } from '@/helpers/youtube'

const page = ({ params }: { params: { id: string } }) => {
  const [showMore, setShowMore] = useState(false)
  const [divHeight, setDivHeight] = useState(0)
  const { token } = useAuth()
  const divRef = useRef<HTMLDivElement>(null)
  const { data, error, isLoading } = useGetListingById(params.id, token!)

  const { mutateAsync, isPending } = useUploadPropertyImages(params.id, token!)
  const deleteMutation = useDeletePropertyImage(params.id, token!)

  const [files, setFiles] = useState<File[]>()
  const onDrop = (files: File[]) => {
    setFiles((prev) => (prev ? [...prev, ...files] : [...files]))
  }
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
    if (!files) return
    try {
      const formData = new FormData()
      for (const file of files) {
        formData.append('images', file)
      }
      await mutateAsync(formData)
      setFiles([])
      toast.success('Images uploaded successfully !')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong !')
    }
  }

  // Handle delete
  const handleDelete = async (publicId: string) => {
    const promise = deleteMutation.mutateAsync(publicId)
    toast.promise(promise, {
      success: 'Deleted image successfully !!',
      loading: 'Deleting image please wait ...',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  //GET DIV HEIGHT

  useEffect(() => {
    // Function to measure the height of the div element
    const measureDivHeight = () => {
      if (divRef.current) {
        const height = divRef.current.getBoundingClientRect().height
        setDivHeight(height)
      }
    }

    measureDivHeight()
  }, [showMore, data!])

  const isDivLong = divHeight > 100
  if (isLoading) return <PageLoadingUI />
  if (error) return notFound()
  return (
    <>
      <TopBar title="Edit Your Property" />
      <div className="min-h-screen px-2 pb-20">
        <div className="mt-4 grid gap-x-8 px-4 md:grid-cols-2">
          <div className="flex w-full flex-col gap-10">
            {data.images.length > 0 ? (
              <Carousel
                opts={{ loop: true }}
                className="h-[50vh] rounded-xl border bg-white "
              >
                <CarouselContent>
                  {data.images.map((img: any, idx: number) => (
                    <CarouselItem key={idx} className="relative">
                      <DeleteAlert
                        description="This action cannot be undone. This will permanently delete photo from our servers."
                        action={() => handleDelete(img.public_id)}
                      >
                        <button className="absolute right-1 top-1 rounded-sm bg-white p-1 text-red-500">
                          <Trash2 />
                        </button>
                      </DeleteAlert>
                      <Image
                        height={600}
                        width={400}
                        src={img.secure_url}
                        alt="bed"
                        className="h-[50vh] w-full object-cover"
                        placeholder="blur"
                        blurDataURL="/blur.avif"
                      />
                    </CarouselItem>
                  ))}

                  {data.video_url ? (
                    <CarouselItem>
                      <iframe
                        src={getEmbadedurl(data.video_url)}
                        className="h-full w-full object-cover object-center"
                        aria-controls="0"
                      ></iframe>
                    </CarouselItem>
                  ) : null}
                </CarouselContent>
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </Carousel>
            ) : (
              <div className="max-w-[90vw] rounded-xl border border-dashed border-primary">
                <div>
                  <div {...getRootProps()} className="p-8 text-center">
                    <input {...getInputProps()} />
                    {!!files?.length && (
                      <>
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>
                            Drag & drop photos here, <br /> or <br />
                            <span className="font-semibold text-blue-500">
                              Browse More
                            </span>
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {files?.length! > 0 ? (
                    <div>
                      <div className="flex h-[200px] max-w-full gap-4 overflow-x-auto p-4">
                        {files?.map((f, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-video h-[150px] w-[200px] bg-black object-cover"
                          >
                            <button
                              onClick={() => handleRemoveFile(idx)}
                              className="absolute right-1 top-1 rounded-full bg-white p-1 text-destructive"
                            >
                              <X size={20} />
                            </button>
                            <img
                              src={URL.createObjectURL(f)}
                              height={150}
                              width={200}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={handleUpload}
                        className="mx-auto mb-2 flex gap-2 rounded-full"
                        disabled={isPending}
                      >
                        {isPending && (
                          <Loader2 size={20} className="animate-spin" />
                        )}
                        Upload
                      </Button>
                    </div>
                  ) : (
                    <div
                      {...getRootProps()}
                      className="flex h-[200px] flex-col items-center justify-center text-muted-foreground"
                    >
                      <ImagesIcon size={48} />
                      <div className="p-8 text-center">
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>
                            Drag & drop photos here, <br /> or <br />
                            <span className="font-semibold text-blue-500">
                              Browse Files
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ROOM DESCRIPTION FOR SMALL SCREEN */}
            <div className="block md:hidden">
              <Details data={data} />
            </div>
          </div>

          <div className=" hidden md:block">
            <Details data={data} />
          </div>

          {/* ROOM DESCRIPTION */}
          <div>
            <div
              className={cn(
                'relative h-[100px] overflow-hidden transition-height  duration-500 ease-linear',
                showMore
                  ? 'editor h-auto space-y-3 transition-all duration-300'
                  : 'editor h-[100px]  transition-all duration-300',
              )}
            >
              <div
                ref={divRef}
                // onLoad={handleDivLoad}
                className={cn(
                  ' max-w-2xl  py-4 text-start text-sm text-muted-foreground',
                )}
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
              {isDivLong && (
                <div
                  className={`absolute inset-0 z-10  ${!showMore && 'bg-gradient-to-b from-transparent from-50% to-white'}  `}
                ></div>
              )}
            </div>
            {isDivLong && (
              <div className="mx-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mx-auto mt-2 flex max-w-32 cursor-pointer items-center gap-x-1 text-sm  font-medium text-muted-foreground"
                  onClick={() => setShowMore(!showMore)}
                >
                  Show {showMore ? 'Less' : 'More'}
                  {showMore ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </Button>
              </div>
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  )
}

export default page
