import { deleteRequest, patchRequest, postRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Register mutations
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      await postRequest({
        endpoint: '/student/submit-form',
        payload,
        token: payload.token,
      })
    },
  })
}

export const useEditStudentProfile = (token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) =>
      patchRequest({ endpoint: '/student/update-profile', payload, token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  })
}

export const useBookAccomodation = (id: string, token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) =>
      postRequest({ endpoint: `/student/booking/${id}`, payload, token }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['properties', id] }),
  })
}

export const useCancelBooking = (token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) =>
      deleteRequest({ endpoint: `/student/booking/${id}`, token }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['booking'],
      }),
  })
}

export const useApplyCourse = (token: string) => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await patchRequest({
        endpoint: `/student/apply-course/${id}`,
        token,
      })
    },
  })
}

export const useDeleteAppliedCourse = (token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteRequest({
        endpoint: `/student/course/${id}`,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  })
}
