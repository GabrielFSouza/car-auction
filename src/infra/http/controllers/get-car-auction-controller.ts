import { Request, Response } from 'express'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeGetCarAuctionUseCase } from '../factories/make-get-car-auction-use-case'
import { CarPresenter } from '../presenters/car-presenter'

export async function getCarAuctionController(
  request: Request,
  response: Response,
) {
  const { licensePlate } = request.params

  const getCarAuctionUseCase = makeGetCarAuctionUseCase()

  const result = await getCarAuctionUseCase.execute({ licensePlate })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return response.status(404).send({
          message: error.message,
        })
      default:
        return response.status(400).send({
          message: error.message,
        })
    }
  }

  const carResponse = CarPresenter.toHTTP(result.value.car)

  return response.json(carResponse).send()
}
