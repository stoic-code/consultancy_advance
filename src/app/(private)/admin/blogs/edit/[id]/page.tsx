'use client'
import PageLoadingUI from '@/components/common/loading'

import React from 'react'
import { useGetSingleBlog } from '@/hooks/query/admin/blogs.query'
import BlogEdit from './BlogEdit'

const page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetSingleBlog(params.id)

  if (isLoading) return <PageLoadingUI />

  return (
    <div>
      <BlogEdit data={data} id={params.id} />
    </div>
  )
}

export default page
