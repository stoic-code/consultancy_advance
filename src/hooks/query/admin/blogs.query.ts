import { getRequest } from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'

//all  blogs query
export const useGetBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () => getRequest({ endpoint: '/public/blog' }),
  })
}

// signle blog

export const useGetSingleBlog = (id: string | string[]) => {
  return useQuery({
    queryKey: ['blog'],
    queryFn: () => getRequest({ endpoint: `/public/blog/${id}` }),
  })
}
