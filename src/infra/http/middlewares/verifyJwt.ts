import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { TokenMissingError } from '../errors/token-missing-error'
import { env } from '@/core/env'
import { InvalidTokenError } from '../errors/invalid-token-error'
import { IPayload } from './interfaces/IPayload'

export async function verifyJwt(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      message: new TokenMissingError().message,
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, env.JWT_SECRET) as IPayload

    request.user = {
      id: userId,
    }

    next()
  } catch {
    return response.status(401).json({
      message: new InvalidTokenError().message,
    })
  }
}
