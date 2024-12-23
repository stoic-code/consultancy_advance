'use client'
import { useGetInstutionById } from '@/hooks/query/instution.query'
import { EditForm } from './EditForm'
import PageLoadingUI from '@/components/common/loading'

const page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetInstutionById(params.id)
  if (isLoading) return <PageLoadingUI />
  return <EditForm data={data} />
}

export default page
