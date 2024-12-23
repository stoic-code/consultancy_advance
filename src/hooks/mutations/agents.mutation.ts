import { deleteRequest, patchRequest, postRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Register mutations
export const useRegAgentMutation = (token: string) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      await postRequest({
        endpoint: '/admin/agent',
        payload,
        token,
      })
    },
  })
}

// Add Listing
export const useAddProperty = (token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: '/agent/property',
        payload,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['listings'] }),
  })
}

// UPDATE Listing
export const useUpdateListing = (id: string, token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      return await patchRequest({
        endpoint: `/agent/property/${id}`,
        payload,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['listings'] }),
  })
}

export const useUploadPropertyImages = (id: string, token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      return await patchRequest({
        endpoint: `/agent/property/images/${id}`,
        payload,
        token,
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['listings', id] }),
  })
}

export const useDeletePropertyImage = (id: string, token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (publicId: string) => {
      return await deleteRequest({
        endpoint: `/agent/property/image/${id}/${publicId}`,
        token,
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['listings', id] }),
  })
}

export const useDeleteProperty = (token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteRequest({
        endpoint: `/agent/property/${id}`,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['listings'] }),
  })
}
