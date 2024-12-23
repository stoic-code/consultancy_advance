import { z } from 'zod'

export const coursesSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z
    .string()
    .min(100, { message: 'Description must be minimum of 200 characters.' }),
  level: z.string({
    invalid_type_error: 'Please select at least a type.',
    required_error: 'Please select at least a type.',
  }),
  faculty: z.string().optional(),
  course_fee: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .min(1, { message: 'Tuition Fee is required' }),
  application_fee: z.coerce.number({
    invalid_type_error: 'Please enter a valid number',
  }),
  duration: z.coerce.number(),
  url: z.string().optional(),
})

export type TCoursesSchema = z.infer<typeof coursesSchema>
