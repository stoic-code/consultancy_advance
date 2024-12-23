import { patchRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// MARK SINGLE NOTIFICATION READ
export const useMarkNotificationRead = (id: string, token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await patchRequest({
        endpoint: `/admin/notification/${id}`,
        token,
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['admin', 'notification'] }),
  })
}

// MARK ALL NOTIFICATION READ
export const useMarkAllNotificationRead = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await patchRequest({ endpoint: `/admin/notification/all`, token })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['admin', 'notification'] }),
  })
}
