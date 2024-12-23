import { getRequest } from '@/lib/fetch'
import { ResolvingMetadata } from 'next'
import React from 'react'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const blog = await getRequest({
    endpoint: `/public/blog/${params.id}`,
  })
  return {
    title: blog?.title,
    keywords: blog?.tags?.toString(),
  }
}

export default function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
