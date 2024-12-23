import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_FILE_TYPES = ['application/pdf', 'text/plain']

export const applicationSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
  email: z
    .string()
    .email({ message: 'Must be a valid email.' })
    .min(1, { message: 'Emaill is required.' }),
  address: z.string().min(1, { message: 'Current address is required.' }),
  contact: z.string().min(7, { message: 'Must be a valid contact.' }),
  linkedin_profile: z.string().optional(),
  cover_letter: z.string({ required_error: 'Coverletter is required.' }),
  resume: z
    .any()
    .refine(
      (file) => file !== null && file !== undefined,
      'Resume is required.',
    )
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.type),
      '.pdf, .doc and .docx, .txt files are accepted.',
    ),
})

// PARTNERSHIP SCHEMA

/* 1. Basic Information */
export const basicInfoSchema = z.object({
  org_name: z
    .string()
    .min(1, { message: 'Organization name is required.' })
    .trim(),
  registration_no: z.string().optional(),
  business_type: z.string().min(1, { message: 'Business type is required.' }),
  estd: z.coerce
    .date({
      invalid_type_error: 'Please enter a valid date.',
      required_error: 'Established date is requred.',
    })
    .refine(
      (date) => {
        const now = new Date()
        return !date || date < now
      },
      {
        message: 'Est Date should be in past.',
      },
    ),
  country: z.string().min(3, { message: 'Country name is too short.' }),
  city: z.string().optional(),
  town: z.string().optional(),
  address: z
    .string()
    .min(1, { message: 'Address is required.' })
    .min(3, { message: 'Address is too small.' }),
  postal_code: z.string().optional(),
  org_phone: z
    .string({
      invalid_type_error: 'Please enter a valid number',
      required_error: 'Phone number is required.',
    })
    .min(7, { message: 'Phone number should not be less than 7 characters.' })
    .max(15, { message: 'Phone number should be of maximum 15 characters.' })
    .trim(),
  primary_website: z.string().optional(),
  secondary_website: z.string().optional(),
})

export const pointOfContactSchema = z.object({
  user_name: z.string().min(1, { message: 'Name of the owner is required.' }),
  user_email: z.string().email({ message: 'Please enter a valid email.' }),
  user_phone: z
    .string({
      invalid_type_error: 'Please enter a valid number',
      required_error: 'Phone number is required.',
    })
    .min(7, { message: 'Phone number should not be less than 7 characters.' })
    .max(15, { message: 'Phone number should be of maximum 15 characters.' })
    .trim(),
  user_facebook: z.string(),
  user_linkedin: z.string(),
})

export const servicesSchema = z.object({
  services: z.array(z.string()).optional(),
})

export type TPointOfContact = z.infer<typeof pointOfContactSchema>
export type TBasicInfoSchema = z.infer<typeof basicInfoSchema>
export type TApplicationSchema = z.infer<typeof applicationSchema>
