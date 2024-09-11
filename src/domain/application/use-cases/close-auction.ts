import { left, right } from '@/core/either'
import { ICarsRepository } from '../repositories/cars-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import {
  ICloseAuctionUseCaseRequest,
  ICloseAuctionUseCaseResponse,
} from './interfaces/ICloseAuctionUseCase'
import { AuctionAlreadyFinishedError } from './errors/auction-already-finished-error'
import { RankingsBidsAndGetAuctionWinner } from './utils/ranking-bids-and-get-auction-winner'

export class CloseAuctionUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({
    licensePlate,
  }: ICloseAuctionUseCaseRequest): Promise<ICloseAuctionUseCaseResponse> {
    const car = await this.carsRepository.findByLicensePlate(licensePlate)

    if (!car) {
      return left(new ResourceNotFoundError())
    }

    if (car.isAuctionFinished) {
      return left(new AuctionAlreadyFinishedError())
    }

    car.isAuctionFinished = true

    await this.carsRepository.closeAuction(car)

    const auctionWinner =
      RankingsBidsAndGetAuctionWinner.rankingsBidsAndGetAuctionWinner(car)

    const response = {
      car,
      userEmail: auctionWinner.userEmail,
      bidValue: auctionWinner.bid,
    }

    return right(response)
  }
}
