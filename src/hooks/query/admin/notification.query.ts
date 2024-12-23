import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// all notification
export const useGetAllAdminNotifications = (token: string) => {
  return useQuery({
    queryKey: ['admin', 'notification'],
    queryFn: () => getRequest({ endpoint: '/admin/notifications', token }),
  })
}
