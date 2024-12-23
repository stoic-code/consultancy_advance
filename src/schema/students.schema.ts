import { array, string, object, z } from 'zod'

export const studentRegistrationSchema = object({
  first_name: string().min(1, { message: 'First name is required.' }).trim(),
  middle_name: string().trim().optional(),
  last_name: string().min(1, { message: 'Last name is required.' }).trim(),
  email: string()
    .min(1, { message: 'Email is required.' })
    .trim()
    .email({ message: 'Must be a valid email.' })
    .trim(),
  country_code: string(),
  phone: string({
    invalid_type_error: 'Please enter a valid number',
    required_error: 'Phone number is required.',
  })
    .min(7, { message: 'Phone number should not be less than 7 characters.' })
    .max(15, { message: 'Phone number should be of maximum 15 characters.' })
    .trim(),

  course_preference: array(string(), {
    invalid_type_error: 'Please select at least a course.',
    required_error: 'Please select at least a course.',
  }),

  birth_date: z
    .any()
    .transform((val) => {
      if (val && val !== '') {
        return new Date(val)
      }
    })
    .refine(
      (date) => {
        const now = new Date()
        return !date || date < now
      },
      {
        message: 'Birth Date should be in past.',
      },
    ),

  passout_date: z.coerce
    .date({
      invalid_type_error: 'Passed out date is required.',
      required_error: 'Passed out date is required.',
    })
    .refine(
      (date) => {
        const now = new Date()
        return !date || date < now
      },
      {
        message: 'Passout Date should be in past.',
      },
    )
    .refine(
      (date) => {
        return date.getFullYear() >= 2000
      },
      {
        message: 'Passout Year should not be less than 2000 AD.',
      },
    ),

  test_type: z.string().optional(),
  test_score: z.coerce.number().optional(),

  scoreType: z.string(),
  out_of: z.coerce
    .number()
    .max(100, { message: 'Full Marks cannot be more than 2 digit.' })
    .optional(),
  gpa: z.coerce
    .number()
    .max(100, { message: 'GPA/Percentage cannot be more than 2 digit.' })
    .optional(),
}).superRefine(({ out_of, gpa, test_type, test_score }, ctx) => {
  if (gpa !== undefined && gpa > 0 && (out_of === undefined || out_of <= 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Out of is required for GPA.',
      path: ['out_of'],
    })
  }

  if (gpa !== undefined && out_of !== undefined && gpa > out_of) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'GPA cannot be more than Full Marks',
      path: ['gpa'],
    })
  }

  // TEST SCORE VALIDATION
  if (test_type === 'IELTS' && test_score !== undefined && test_score > 9.0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'IELTS score cannot be more than 9.0',
      path: ['test_score'],
    })
  }
  if (test_type === 'PTE' && test_score !== undefined && test_score > 90) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'PTE score cannot be more than 90',
      path: ['test_score'],
    })
  }
  if (test_type === 'TOFEL' && test_score !== undefined && test_score > 120) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'TOFEL score cannot be more than 120',
      path: ['test_score'],
    })
  }
})

export const aboutMeSchema = z.object({
  address: z
    .string({
      invalid_type_error: 'Address is required.',
      required_error: 'Address is required.',
    })
    .min(3, { message: 'Address is too short.' }),
  birth_date: z.coerce.date(),
  nationality: z
    .string({
      invalid_type_error: 'Nationality is required.',
      required_error: 'Nationality is required.',
    })
    .min(1, { message: 'Nationality is too short.' }),
  highest_education: z
    .string({
      invalid_type_error: 'Highest education is required.',
      required_error: 'Highest education is required.',
    })
    .min(1, { message: 'Higest education is required.' }),
  // course_preference: array(string(), {
  //   invalid_type_error: 'Please select at least a course.',
  //   required_error: 'Please select at least a course.',
  // }),
})

export const testSchema = z.object({
  ielts: z.coerce
    .number()
    .max(9, { message: 'IELTS score cannot be more than 9.' })
    .optional(),
  pte: z.coerce
    .number()
    .max(90, { message: 'PTE score cannot be more than 90.' })
    .optional(),
  tofel: z.coerce
    .number()
    .max(120, { message: 'TOFEL score cannot be more than 120.' })
    .optional(),
  sat: z.coerce
    .number()
    .max(1600, { message: 'SAT score cannot be more than 1600.' })
    .optional(),
  gmat: z.coerce
    .number()
    .max(805, { message: 'GMAT score cannot be more than 805.' })
    .optional(),
  gre: z.coerce
    .number()
    .max(170, { message: 'GRE score cannot be more than 170.' })
    .optional(),
})

export const educationSchema = z
  .object({
    course: z.string().min(1, { message: 'Degree name is required.' }),
    university: z.string().min(5, { message: 'University name is too short.' }),
    faculty: z.string().optional(),
    specialization: z.string().optional(),
    level: z.string().optional(),
    starting_year: z.string().min(1, { message: 'Starting year is required.' }),
    graduation_year: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value || value == '') return true
          const now = new Date()
          const date = new Date(value!)
          return !date || date < now
        },
        {
          message: 'Graduation Date should be in past.',
        },
      ),

    // FOR GPA
    scoreType: z.string(),
    out_of: z.coerce
      .number()
      .max(100, { message: 'Full Marks cannot be more than 2 digit.' })
      .optional(),
    gpa: z.coerce
      .number()
      .max(100, { message: 'GPA/Percentage cannot be more than 2 digit.' })
      .optional(),
  })
  .superRefine(({ gpa, out_of }, ctx) => {
    if (gpa !== undefined && gpa > 0 && (out_of === undefined || out_of <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Out of is required for GPA.',
        path: ['out_of'],
      })
    }

    if (gpa !== undefined && out_of !== undefined && gpa > out_of) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'GPA cannot be more than Full Marks',
        path: ['gpa'],
      })
    }
  })

export const workExperienceSchema = z.object({
  company_name: z.string().min(3, { message: 'Company name is too short.' }),
  job_title: z.string().min(3, { message: 'Job title is too short.' }),
  starting_date: z.coerce.date({
    invalid_type_error: 'Passed out date is required.',
    required_error: 'Passed out date is required.',
  }),
  end_date: z.any().transform((val) => {
    if (val && val !== '') {
      return new Date(val)
    }
  }),
})

export type TtestSchema = z.infer<typeof testSchema>
export type TWorkExpSchema = z.infer<typeof workExperienceSchema>
export type TEducationSchema = z.infer<typeof educationSchema>
export type TStudentRegSchema = z.infer<typeof studentRegistrationSchema>
export type TAboutMeSchema = z.infer<typeof aboutMeSchema>
