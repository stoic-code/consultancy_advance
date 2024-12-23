import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// Institutions query
export const useGetPartners = (token: string) => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: () => getRequest({ endpoint: '/admin/partner-request', token }),
  })
}
