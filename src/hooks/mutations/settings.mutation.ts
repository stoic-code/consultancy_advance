import { patchRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

export const useUpdatePassword = (token: string) => {
  const route = '/auth/update-password'
  return useMutation({
    mutationFn: async (payload: any) => {
      return await patchRequest({ endpoint: route, payload, token })
    },
  })
}
