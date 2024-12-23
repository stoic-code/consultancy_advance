import { z } from 'zod'

const envVariables = z.object({
  ENV: z.enum(['production', 'development', 'test']),
  CLOUDFLARE_URL: z.string(),
  AUTH_KEY_SECRET: z.string(),
  NEXT_PUBLIC_ENCRYPTION_KEY: z.string(),
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
})

const env = envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export default env
