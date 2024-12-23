import { z } from 'zod'

export const instutionRegSchema = z.object({
  name: z.string().min(1, { message: 'Institution name is required.' }),
  email: z
    .string()
    .min(1, { message: 'Institution name is required.' })
    .email({ message: 'Must be a valid email.' }),
  phone: z
    .string()
    .min(7, { message: 'Please enter a valid phone number.' })
    .max(15, { message: 'Please enter a valid phone number.' }),
  about: z
    .string()
    .min(100, { message: 'About must be at least 100 characters.' }),
  student_count: z.coerce.number().optional(),
  average_fee: z.coerce.number().optional(),
})

export type TInstutionRegSchema = z.infer<typeof instutionRegSchema>
