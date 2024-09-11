import { z } from 'zod'

export const registerCarBodySchema = z.object({
  name: z.string(),
  licensePlate: z.string(),
  brand: z.string(),
  category: z.string(),
  year: z.number(),
  specifications: z.string(),
  initialBid: z.number().positive(),
})
