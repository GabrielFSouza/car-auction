import { left, right } from '@/core/either'
import { ICarsRepository } from '../repositories/cars-repository'
import {
  IRegisterBidUseCaseRequest,
  IRegisterBidUseCaseResponse,
} from './interfaces/IRegisterBidUseCase'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AuctionAlreadyFinishedError } from './errors/auction-already-finished-error'

export class RegisterBidUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({
    licensePlate,
    bid,
  }: IRegisterBidUseCaseRequest): Promise<IRegisterBidUseCaseResponse> {
    const car = await this.carsRepository.findByLicensePlate(licensePlate)

    if (!car) {
      return left(new ResourceNotFoundError())
    }

    if (car.isAuctionFinished) {
      return left(new AuctionAlreadyFinishedError())
    }

    car.bids.push(bid)

    await this.carsRepository.registerBid(car.licensePlate, bid)

    return right({
      car,
    })
  }
}
