import { postRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

// Register mutations
export const useApplyForVacancy = (id: string, token: string) => {
  return useMutation({
    mutationFn: async (payload: any) =>
      await postRequest({
        endpoint: `/public/apply/${id}`,
        payload,
        token,
      }),
  })
}
