import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

//all  courses query
export const useGetCourse = (id: string) => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => getRequest({ endpoint: `/public/course/${id}` }),
  })
}
