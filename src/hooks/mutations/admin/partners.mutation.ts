import { deleteRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//Delete partner
export const useDeletePartner = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: any) => {
      await deleteRequest({ endpoint: `/sth/sth/${id}`, token })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partners'] }),
  })
}
