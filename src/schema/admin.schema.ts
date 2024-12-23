import { z } from 'zod'

export const vacancySchema = z.object({
  job_title: z.string().min(1, { message: 'Job title is required.' }),
  type: z.string().min(1, { message: 'Vacancy type is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  description: z.string({ required_error: 'Job description is required.' }),
  count: z.coerce.number().min(1, { message: 'Count is required.' }),
  expired: z.boolean().default(false),
})

export type TVacancySchema = z.infer<typeof vacancySchema>
