import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { authenticateBodySchema } from '../schemas/authenticate-body-schema'
import { makeAuthenticateUseCase } from '../factories/make-authenticate-use-case'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { env } from '@/core/env'
import { zodValidationError } from '../errors/zod-validation-error'

export async function authenticateController(
  request: Request,
  response: Response,
) {
  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const result = await authenticateUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          return response.status(401).send({
            message: error.message,
          })
        default:
          return response.status(400).send({
            message: error.message,
          })
      }
    }

    const userId = result.value.user.id.toString()

    const token = sign({}, env.JWT_SECRET, {
      subject: userId,
      expiresIn: env.TOKEN_EXPIRATION,
    })

    return response.json({ access_token: token }).send()
  } catch (error) {
    zodValidationError(error, response)
  }
}
