import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

// GET ALL VACANCY
export const useGetAllVacancy = () => {
  return useQuery({
    queryKey: ['vacancies'],
    queryFn: () => getRequest({ endpoint: '/public/vacancy' }),
  })
}

// GET A SINGLE VACANCY
export const useGetVacancyById = (id: string) => {
  return useQuery({
    queryKey: ['vacancies', id],
    queryFn: () => getRequest({ endpoint: `/public/vacancy/${id}` }),
  })
}

// GET ALL APPLICANT FROM SINGLE VACANCY
export const useGetApplicantByVacancy = (id: string, token: string) => {
  return useQuery({
    queryKey: ['applicants', id],
    queryFn: () => getRequest({ endpoint: `/admin/applicants/${id}`, token }),
  })
}

// GET ALL APPLICANT FROM SINGLE VACANCY
export const useGetApplicantData = (id: string, token: string) => {
  return useQuery({
    queryKey: ['applicant', id],
    queryFn: () => getRequest({ endpoint: `/admin/applicant/${id}`, token }),
  })
}

// GET ALL BOOKINGS
export const useGetAllNewBookings = (token: string) => {
  return useQuery({
    queryKey: ['booking', 'new'],
    queryFn: () => getRequest({ endpoint: `/admin/booking/unverified`, token }),
  })
}

export const useGetAllOldBookings = (token: string) => {
  return useQuery({
    queryKey: ['booking', 'old'],
    queryFn: () => getRequest({ endpoint: `/admin/booking/verified`, token }),
  })
}
