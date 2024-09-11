import { env } from '@/core/env'
import { Response } from 'express'
import { ZodError } from 'zod'

export function zodValidationError(error: unknown, response: Response) {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return response.status(500).json({ message: 'Internal server error' })
}
