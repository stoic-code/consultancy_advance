'use client'
import { useGetCourse } from '@/hooks/query/admin/course.query'
import React from 'react'
import EditCourse from './EditCourse'
import PageLoadingUI from '@/components/common/loading'

export default function page({
  params,
}: {
  params: { [key: string]: string }
}) {
  const CourseId = params.course
  const { data, isLoading } = useGetCourse(CourseId!)

  if (isLoading) return <PageLoadingUI />

  return (
    <div className=" mt-8">
      <EditCourse data={data} id={CourseId} />
    </div>
  )
}
