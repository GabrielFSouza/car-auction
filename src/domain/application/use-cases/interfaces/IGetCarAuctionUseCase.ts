import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Car } from '@/domain/enterprise/entities/car'

export interface IGetCarAuctionUseCaseRequest {
  licensePlate: string
}

export type IGetCarAuctionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    car: Car
  }
>
