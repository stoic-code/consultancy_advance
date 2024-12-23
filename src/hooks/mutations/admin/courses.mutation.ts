import { deleteRequest, patchRequest, postRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const usePostImage = (
  token: string,
  courseId: string,
  instituteId: string,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      return await postRequest({
        endpoint: `/institute/course/image/${instituteId}/${courseId}`,
        token,
        payload,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  })
}

//Update course
export const useEditCourse = ({
  id,
  token,
}: {
  id: string
  token: string | undefined
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: any) => {
      return await patchRequest({
        endpoint: `/institute/course/${id}`,
        payload,
        token,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  })
}

// /delete course

export const useDeleteCourse = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteRequest({
        token,
        endpoint: `/institute/course/${id}`,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  })
}
