import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export const useGetStudentProfile = (token: string) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getRequest({ endpoint: '/student/profile-data', token }),
  })
}

export const useGetAppliedCourses = (token: string) => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => getRequest({ endpoint: '/student/courses/applied', token }),
  })
}
