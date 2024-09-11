import { left, right } from '@/core/either'
import { ICarsRepository } from '../repositories/cars-repository'
import {
  IGetCarAuctionUseCaseRequest,
  IGetCarAuctionUseCaseResponse,
} from './interfaces/IGetCarAuctionUseCase'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export class GetCarAuctionUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({
    licensePlate,
  }: IGetCarAuctionUseCaseRequest): Promise<IGetCarAuctionUseCaseResponse> {
    const car = await this.carsRepository.findByLicensePlate(licensePlate)

    if (!car) {
      return left(new ResourceNotFoundError())
    }

    return right({ car })
  }
}
