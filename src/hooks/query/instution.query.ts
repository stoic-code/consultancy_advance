import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// Institutions query
export const useGetInstutions = () => {
  return useQuery({
    queryKey: ['instutions'],
    queryFn: () => getRequest({ endpoint: '/public/institute' }),
  })
}

// Institutions query
export const useGetInstutionById = (id: string) => {
  return useQuery({
    queryKey: ['instutions', id],
    queryFn: () => getRequest({ endpoint: `/public/institute/${id}` }),
    retry: false,
  })
}

// Institutions query
export const useGetInstutionsCourse = (id: string) => {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: () => getRequest({ endpoint: `/public/courses/${id}` }),
  })
}
