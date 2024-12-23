import { z } from 'zod'

const COORDINATES_REGEX =
  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/

const YOUTUBE_REGEX = /(?:watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/

export const agentSchema = z.object({
  name: z.string().min(1, { message: 'Agent name is required.' }),
  email: z.string().email({ message: 'Must be a valid email.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone should be min of 10 characters.' }),
})

export const propertySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.string().min(1, { message: 'Property type is required.' }),

  description: z.string({ required_error: 'Description is required.' }),
  state: z.string().min(2, { message: 'Provience is required' }),
  cost: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .min(1, { message: 'Cost is required' }),
  minimum_deposit: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number' })
    .min(1, { message: 'Minimum Depoist is required.' }),
  area: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number' })
    .min(1, { message: 'Area is required.' }),
  address: z.string().min(1, { message: 'Address is required' }),
  city: z.string().min(1, { message: 'City is required' }),

  video_url: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || YOUTUBE_REGEX.test(val), {
      message:
        'Youtube video url look like this: https://www.youtube.com/watch?v=22mrSjknDHI',
    }),

  amenities: z
    .array(z.string(), {
      required_error: 'Please select at least an amenitiy.',
    })
    .min(1, { message: 'Please select at least an amenitiy.' }),
})

export type TPropertySchema = z.infer<typeof propertySchema>
export type TAgentSchema = z.infer<typeof agentSchema>
