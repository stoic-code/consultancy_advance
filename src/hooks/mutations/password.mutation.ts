import { postRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await postRequest({
        endpoint: '/auth/forgot-password',
        payload: data,
      })
    },
  })
}
