import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// Get all listing
export const useGetListings = (token: string) => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: () => getRequest({ endpoint: '/agent/property', token }),
  })
}

export const useGetListingById = (id: string, token: string) => {
  return useQuery({
    queryKey: ['listings', id],
    queryFn: () => getRequest({ endpoint: `/agent/property/${id}`, token }),
  })
}
