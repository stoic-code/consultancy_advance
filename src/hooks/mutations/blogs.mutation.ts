import { deleteRequest, patchRequest, postRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//post blog
export const useAddBlog = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/admin/blog',
        payload,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
}

//UPdate blog
export const useEditBlog = (id: string, token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: any) => {
      return await patchRequest({
        endpoint: `/admin/blog/${id}`,
        payload,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
}

//Delete blog
export const useDeleteBlog = (token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteRequest({
        endpoint: `/admin/blog/${id}`,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
}
