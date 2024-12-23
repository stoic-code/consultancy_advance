import { postRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

export const useAccomodationReq = (token: string) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/student/missing-accomodation',
        payload,
        token,
      })
    },
  })
}
