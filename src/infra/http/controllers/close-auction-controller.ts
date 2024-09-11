import { Request, Response } from 'express'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeCloseAuctionUseCase } from '../factories/make-close-auction-use-case'
import { AuctionWinnerPresenter } from '../presenters/auction-winner-presenter'
import { AuctionAlreadyFinishedError } from '@/domain/application/use-cases/errors/auction-already-finished-error'

export async function closeAuctionController(
  request: Request,
  response: Response,
) {
  const { licensePlate } = request.params

  const closeAuctionUseCase = makeCloseAuctionUseCase()

  const result = await closeAuctionUseCase.execute({ licensePlate })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return response.status(404).send({
          message: error.message,
        })
      case AuctionAlreadyFinishedError:
        return response.status(409).send({
          message: error.message,
        })
      default:
        return response.status(400).send({
          message: error.message,
        })
    }
  }

  const { car, userEmail, bidValue } = result.value

  const auctionWinner = AuctionWinnerPresenter.toHTTP(car, userEmail, bidValue)

  return response.json(auctionWinner).send()
}
