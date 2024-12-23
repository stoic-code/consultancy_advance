import { deleteRequest, postRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//ADD VACANCY
export const useCreateVacancy = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({ endpoint: '/admin/vacancy', token, payload })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vacancies'] }),
  })
}
