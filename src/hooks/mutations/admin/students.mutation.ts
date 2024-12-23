import { deleteRequest, patchRequest } from '@/lib/fetch'
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

//Delete student
export const useDeleteStudent = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: any) => {
      await deleteRequest({ endpoint: `/sth/sth/${id}`, token })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  })
}

//Verify Booking Status
export const useVerifyBooking = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) =>
      await patchRequest({ endpoint: `/admin/booking/${id}`, token }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['booking', 'new'],
      }),
  })
}

// Handle status change
export const useChangeStudentStatus = (token: string) => {
  const queryClient = useQueryClient()

  const toInvalidate = [
    ['students', 'PENDING'],
    ['students', 'APPROVED'],
    ['students', 'FAILED'],
  ]

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      await patchRequest({
        endpoint: `/admin/student/${id}/status?status=${status}`,
        token,
      }),
    onSuccess: () => {
      toInvalidate.forEach((key) => {
        queryClient.invalidateQueries(key as InvalidateQueryFilters)
      })
    },
  })
}
