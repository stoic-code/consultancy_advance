import { deleteRequest, patchRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//Delete agent
export const useDeleteAgent = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: any) => {
      await deleteRequest({ endpoint: `/sth/sth/${id}`, token })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  })
}

//Edit agent
export const useEditAgent = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, payload }: any) => {
      await patchRequest({ endpoint: `/sth/sth/${id}`, token, payload })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  })
}

// DELETE A SINGLE VACANCY
export const useDeleteVacancy = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) =>
      await deleteRequest({ endpoint: `/admin/vacancy/${id}`, token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vacancies'] }),
  })
}

// DELETE A SINGLE VACANCY
export const useExpireVacancy = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) =>
      await patchRequest({ endpoint: `/admin/vacancy/${id}/expired`, token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vacancies'] }),
  })
}
