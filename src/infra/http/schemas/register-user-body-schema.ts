import { z } from 'zod'

export const registerUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})
