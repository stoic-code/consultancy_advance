'use client'
import PageLoadingUI from '@/components/common/loading'
import { TopBar } from '@/components/dashboard/TobBar'
import { useGetVacancyById } from '@/hooks/query/admin/admin.query'
import React from 'react'
import EditVacancy from './VacancyEdit'

const page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetVacancyById(params.id)

  if (isLoading) return <PageLoadingUI />

  return (
    <div>
      <TopBar title="Edit Vacancy" />
      <EditVacancy data={data} />
    </div>
  )
}

export default page
