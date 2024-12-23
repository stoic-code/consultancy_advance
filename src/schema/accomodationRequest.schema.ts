import { z } from 'zod'

export const accomodationReqSchema = z.object({
  monthly_budget: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .min(1, { message: 'Minimum Budget is required.' }),
  security_deposit: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .min(1, { message: 'Security Deposit is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  institute: z.string().min(1, { message: 'Institute is requied.' }),
  message: z
    .string({ required_error: 'Message is required.' })
    .min(10, { message: 'Message is too short.' }),
})

export type TAccomodationReq = z.infer<typeof accomodationReqSchema>
