import { postRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

export const useForgotPassword = (role: string, refreshToken: string) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const { accessToken } = await postRequest({
        endpoint: '/auth/refreshtoken',
        payload: { refreshToken, role },
      })

      return await postRequest({
        endpoint: '/auth/new-password',
        token: accessToken,
        payload: { ...payload, role },
      })
    },
  })
}
