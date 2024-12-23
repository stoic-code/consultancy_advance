import { deleteRequest, postRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

// Register mutations
export const useRegInstutionMutation = (token: string) => {
  const route = '/admin/institute'
  return useMutation({
    mutationFn: async (payload: any) =>
      await postRequest({ endpoint: route, payload, token }),
  })
}
