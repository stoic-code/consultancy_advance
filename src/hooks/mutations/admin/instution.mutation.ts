import { deleteRequest, patchRequest, postRequest } from '@/lib/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//Delete instution
export const useDeleteInstution = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: any) => {
      await deleteRequest({ endpoint: `/admin/institute/${id}`, token })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['instutions'] }),
  })
}

//Edit instution
export const useEditInstution = (token: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, payload }: any) => {
      await patchRequest({
        endpoint: `/institute/institute/${id}`,
        token,
        payload,
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['instutions'] }),
  })
}

//Edit instution
export const useAddCourse = (id: string, token: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      await postRequest({
        endpoint: `/institute/course/${id}`,
        token,
        payload,
      })
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['courses', id],
      }),
  })
}

//Edity institutuion profile picture
export const useEditProfilePicture = (
  instituteId: string | string[],
  token: string,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      await postRequest({
        endpoint: `/institute/institute/profile-image/${instituteId}`,
        token,
        payload,
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['instutions', instituteId] }),
  })
}

//Edit Cover picture of institution

export const useEditCoverPicture = (
  instituteId: string | string[],
  token: string,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      await postRequest({
        endpoint: `/institute/institute/cover-image/${instituteId}`,
        token,
        payload,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instutions', instituteId] })
    },
  })
}
