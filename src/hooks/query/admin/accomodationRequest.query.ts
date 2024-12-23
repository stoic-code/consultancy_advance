import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export const useGetAccomodationReq = (token: string) => {
  return useQuery({
    queryKey: ['accomodation_requests'],
    queryFn: () =>
      getRequest({ endpoint: '/admin/missing-accomodation', token }),
  })
}
