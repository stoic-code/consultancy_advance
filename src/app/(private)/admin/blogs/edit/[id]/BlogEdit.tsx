'use client'
import RichTextEditor from '@/components/common/RichTextEditor'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import FormErr from '@/components/form/FormErr'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Skeleton } from '@/components/ui/skeleton'
import { useEditBlog } from '@/hooks/mutations/blogs.mutation'
import { useAuth } from '@/providers/AuthProvider'
import {
  TBlogEditSchema,
  TBlogSchema,
  blogEditSchema,
  blogSchema,
} from '@/schema/blog.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full rounded-sm"></Skeleton>,
})
const Creatable = dynamic(() => import('react-select/creatable'), {
  ssr: false,
  loading: () => <Skeleton className=" h-10 w-full rounded-sm"></Skeleton>,
})
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const Categoryoptions = [
  {
    value: 'programming',
    label: 'Programming',
  },
  {
    value: 'health',
    label: 'Health',
  },
  {
    value: 'travel',
    label: 'Travel',
  },
  {
    value: 'finance',
    label: 'Finance',
  },
  {
    value: 'lifestyle',
    label: 'Lifestyle',
  },
  {
    value: 'webDevelopment',
    label: 'Web Development',
  },
  {
    value: 'mobileDevelopment',
    label: 'Mobile Development',
  },
  {
    value: 'technology',
    label: 'Technology',
  },
  {
    value: 'education',
    label: 'Education',
  },
  {
    value: 'food',
    label: 'Food',
  },
]

const TagsOption = [
  {
    value: 'javascript',
    label: 'JavaScript',
  },
  {
    value: 'fitness',
    label: 'Fitness',
  },
  {
    value: 'vacation',
    label: 'Vacation',
  },
  {
    value: 'investment',
    label: 'Investment',
  },
  {
    value: 'mindfulness',
    label: 'Mindfulness',
  },
  {
    value: 'css',
    label: 'CSS',
  },
  {
    value: 'ios',
    label: 'iOS',
  },
  {
    value: 'ai',
    label: 'Artificial Intelligence',
  },
  {
    value: 'onlineLearning',
    label: 'Online Learning',
  },
  {
    value: 'recipes',
    label: 'Recipes',
  },
]

export default function BlogEdit({ data, id }: { data: any; id: any }) {
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
  } = useForm<TBlogEditSchema>({
    resolver: zodResolver(blogEditSchema),
    defaultValues: {
      ...data,
      category: data?.category,
      tags: data?.tags,
    },
  })
  const router = useRouter()

  const { mutateAsync } = useEditBlog(id, token!)

  const onSubmit = (formData: TBlogSchema) => {
    const promise = mutateAsync(formData).then(() => {
      router.push('/admin/blogs')
    })
    toast.promise(promise, {
      loading: 'Adding Blog',
      success: 'Successfully updated blog',
      error: (err) => err.message || 'Something went wrong !',
    })
  }

  return (
    <div className=" mx-auto max-w-3xl px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
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
              defaultValue={{
                value: data?.category || '', // Provide a default value for category
                label: data?.category || '', // Provide a default label for category
              }}
              // defaultInputValue={SingleBlogObject.category}
              {...register('category')}
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
            {...register('tags')}
            defaultValue={data?.tags.map((tag: any) => ({
              value: tag,
              label: tag,
            }))}
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
