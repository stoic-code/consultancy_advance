import { z } from 'zod'

// REGEX
const CAPITAL_REGEX = /[A-Z]/
const NUMBER_REGEX = /[0-9]/

export const basicDetailSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required.' }).trim(),
  middle_name: z.string().trim().optional(),
  last_name: z.string().min(1, { message: 'Last name is required.' }).trim(),
  country_code: z.string().trim(),
  phone: z
    .string({
      invalid_type_error: 'Please enter a valid number',

      required_error: 'Phone number is required',
    })
    .min(1, { message: 'Phone number is required.' })
    .min(7, { message: 'Phone number should be of minimum 7 digits.' })
    .max(14, { message: "Phone no shouldn't be more than 14 digits." })
    .refine(
      (data) => {
        return /^\d+$/.test(data)
      },
      {
        message: 'Phone number  must contain only numeric digits (0-9)',
      },
    ),
})

export type TBasicDetailSchema = z.infer<typeof basicDetailSchema>

export const securitySchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'Old password is required.' })
      .trim(),
    new_password: z
      .string()
      .trim()
      .min(1, { message: 'New password is required.' })
      .min(8, {
        message: 'New password should be at least 8 characters long.',
      })
      .regex(CAPITAL_REGEX, {
        message: 'Password must contain at least a capital letter.',
      })
      .regex(NUMBER_REGEX, {
        message: 'Password must contain at least a number.',
      }),
    confirm_password: z.string().trim(),
  })
  .refine(
    ({ confirm_password, new_password }) => {
      return confirm_password === new_password
    },
    {
      message: 'Confirm password must match new password.',
      path: ['confirm_password'],
    },
  )

export type TSecuritySchema = z.infer<typeof securitySchema>
