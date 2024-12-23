'use client'
import { Categoryoptions, TagsOption } from '@/__mockdata__/admin/blogs'
import RichTextEditor from '@/components/common/RichTextEditor'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Skeleton } from '@/components/ui/skeleton'
import { useAddBlog } from '@/hooks/mutations/blogs.mutation'
import { useAuth } from '@/providers/AuthProvider'
import { TBlogSchema, blogSchema } from '@/schema/blog.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full rounded-sm"></Skeleton>,
})
const Creatable = dynamic(() => import('react-select/creatable'), {
  ssr: false,
  loading: () => <Skeleton className=" h-10 w-full rounded-sm"></Skeleton>,
})
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function page() {
  const router = useRouter()
  const [preview, setPreview] = useState<any>(null)
  const [ImageFile, setImageFile] = useState<File | null>(null)
  const { token } = useAuth()
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<TBlogSchema>({
    resolver: zodResolver(blogSchema),
  })

  const { mutateAsync, isPending } = useAddBlog(token!)

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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const onSubmit = (formData: TBlogSchema) => {
    const fd = new FormData()

    fd.append('image', ImageFile!)
    fd.append('title', formData.title)
    fd.append('content', formData.content)
    formData.tags.forEach((tag) => fd.append('tags', tag))
    fd.append('category', formData.category)
    fd.append('author', formData.author)

    const promise = mutateAsync(fd).then((data) => {
      router.push('/admin/blogs')
    })

    toast.promise(promise, {
      loading: 'Adding Blog',
      success: 'Successfully posted blog',
      error: (err) => err.message || 'Something went wrong !',
    })
  }

  return (
    <div className=" mx-auto max-w-3xl px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className=" rounded-md border-2 border-dashed border-primary bg-gray-100 p-4 text-muted-foreground">
          <div {...getRootProps()}>
            <input {...register('image')} {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <p>Drag 'n' drop a image here, or click to select files</p>
            )}
            {preview && <img className=" rounded-lg" src={preview} />}
          </div>
        </div>
        <FormErr>{errors.image?.message}</FormErr>

        <div>
          <CompulsoryLabel>Title</CompulsoryLabel>
          <Input {...register('title')} placeholder="Blog title here..." />
          <FormErr>{errors.title?.message}</FormErr>
        </div>

        <div className="min-h-[9rem]">
          <CompulsoryLabel>Content</CompulsoryLabel>
          <RichTextEditor
            value={watch('content')}
            setValue={setValue}
            trigger={trigger}
            name="content"
          />
          <FormErr>{errors.content?.message}</FormErr>
        </div>
        <section className=" grid grid-cols-2 gap-4">
          <div className=" ">
            <CompulsoryLabel>Category</CompulsoryLabel>
            <Select
              isMulti={false}
              onChange={(data: any) => {
                setValue('category', data.value), trigger('category')
              }}
              options={Categoryoptions}
            />
            <FormErr>{errors.category?.message}</FormErr>
          </div>

          <div>
            <CompulsoryLabel>Author</CompulsoryLabel>
            <Input {...register('author')} placeholder="Author name" />
            <FormErr>{errors.author?.message}</FormErr>
          </div>
        </section>
        <div className=" ">
          <CompulsoryLabel>Tags</CompulsoryLabel>

          <Creatable
            isMulti
            onChange={(e: any) => {
              setValue(
                'tags',
                e.map((d: any) => d.value),
              )
              trigger('tags')
            }}
            options={TagsOption}
          />
          <FormErr>{errors.tags?.message}</FormErr>
        </div>
        <Button type="submit" disabled={false}>
          Submit
        </Button>
      </form>
    </div>
  )
}
