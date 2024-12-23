import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// Register mutations
export const useGetAllProperty = (query: string) => {
  return useQuery({
    queryKey: ['properties', query],
    queryFn: () => getRequest({ endpoint: `/student/properties?${query}` }),
  })
}

// Register mutations
export const useGetPropertyById = (id: string) => {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => getRequest({ endpoint: `/student/property/${id}` }),
  })
}

// Get My Booking
export const useGetMyBookingDetails = (token: string) => {
  return useQuery({
    queryKey: ['booking'],
    queryFn: () => getRequest({ endpoint: `/student/booking`, token }),
    retry: false,
  })
}
