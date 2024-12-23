import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// Institutions query
export const useGetStudents = (status: string, token: string) => {
  return useQuery({
    queryKey: ['students', status],
    queryFn: () =>
      getRequest({ endpoint: `/admin/student?status=${status}`, token }),
  })
}

// Institutions query
export const useGetStudentsById = (id: string, token: string) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => getRequest({ endpoint: `/admin/student/${id}`, token }),
  })
}
