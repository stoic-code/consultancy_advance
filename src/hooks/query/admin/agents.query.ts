import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// Agent Query
export const useGetAgents = (token: string) => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: () => getRequest({ endpoint: '/admin/agent', token }),
  })
}

// Agent Query
export const useGetAgentListings = (id: string, token: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getRequest({ endpoint: `/admin/property/${id}`, token }),
  })
}
