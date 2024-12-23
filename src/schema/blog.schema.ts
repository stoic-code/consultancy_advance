import { z } from 'zod'

export const MAX_IMAGE_SIZE = 150000000
// const MAX_IMAGE_SIZE = 15 * 1024 * 1024
export const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/webp',
  'image/png',
  'image/gif',
  'image/svg+xml',
]

export const blogSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  category: z
    .string({ required_error: 'Category is required.' })
    .min(1, { message: 'Category is required' }),
  content: z.string({ required_error: 'Description is required' }),
  tags: z
    .array(z.string(), { required_error: 'Please select at least one tag' })
    .min(1, { message: 'Please select at least one tag' }),
  author: z.string().min(1, { message: 'Author is required' }),
  image: z.union([
    z.string().url(),
    z
      .any()
      .refine(
        (file) => file !== null && file !== undefined,
        'Image is required',
      )
      .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max file size is 15MB.')
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
        'Unsupported image format. Only JPEG, PNG, and GIF are allowed.',
      ),
  ]),
})

export const blogEditSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  category: z
    .string({ required_error: 'Category is required.' })
    .min(1, { message: 'Category is required' }),
  content: z.string({ required_error: 'Description is required' }),
  tags: z
    .array(z.string(), { required_error: 'Please select at least one tag' })
    .min(1, { message: 'Please select at least one tag' }),
  author: z.string().min(1, { message: 'Author is required' }),
})

export type TBlogSchema = z.infer<typeof blogSchema>
export type TBlogEditSchema = z.infer<typeof blogEditSchema>
