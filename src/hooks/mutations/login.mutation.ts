import { postRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

type LoginTypes = 'admin' | 'student' | 'institute' | 'partner' | null

// Register mutations
export const useLoginMutation = (type: LoginTypes) => {
  const route = `/auth/${type}/signin`
  return useMutation({
    mutationFn: async (payload: any) =>
      await postRequest({ endpoint: route, payload }),
  })
}
