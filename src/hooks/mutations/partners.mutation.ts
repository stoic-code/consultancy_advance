import { postRequest } from '@/lib/fetch'
import { useMutation } from '@tanstack/react-query'

// Register mutations
export const useRegPartnerMutation = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      await postRequest({ endpoint: '/public/partner', payload })
    },
  })
}
