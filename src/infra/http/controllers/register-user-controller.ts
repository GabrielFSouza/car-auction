import { Request, Response } from 'express'
import { registerUserBodySchema } from '../schemas/register-user-body-schema'
import { makeRegisterUserUseCase } from '../factories/make-register-user-use-case'
import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-already-exists-error'
import { zodValidationError } from '../errors/zod-validation-error'

export async function registerUserController(
  request: Request,
  response: Response,
) {
  try {
    const { name, email, password } = registerUserBodySchema.parse(request.body)

    const registerUseCase = makeRegisterUserUseCase()

    const result = await registerUseCase.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          return response.status(409).send({
            message: error.message,
          })
        default:
          return response.status(400).send({
            message: error.message,
          })
      }
    }

    return response.status(201).send()
  } catch (error) {
    zodValidationError(error, response)
  }
}
