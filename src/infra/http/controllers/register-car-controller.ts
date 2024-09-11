import { Request, Response } from 'express'
import { registerCarBodySchema } from '../schemas/register-car-body-schema'
import { makeRegisterCarUseCase } from '../factories/make-register-car-use-case'
import { CarAlreadyExistsError } from '@/domain/application/use-cases/errors/car-already-exists-error'
import { zodValidationError } from '../errors/zod-validation-error'

export async function registerCarController(
  request: Request,
  response: Response,
) {
  try {
    const {
      name,
      licensePlate,
      brand,
      category,
      year,
      specifications,
      initialBid,
    } = registerCarBodySchema.parse(request.body)

    const registerUseCase = makeRegisterCarUseCase()

    const result = await registerUseCase.execute({
      name,
      licensePlate,
      brand,
      category,
      year,
      specifications,
      initialBid,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CarAlreadyExistsError:
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
