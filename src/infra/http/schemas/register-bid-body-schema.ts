import { z } from 'zod'

export const registerBidBodySchema = z.object({
  userEmail: z.string().email(),
  bid: z.number().positive(),
})
