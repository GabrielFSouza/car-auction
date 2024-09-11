import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Car } from '@/domain/enterprise/entities/car'
import { AuctionAlreadyFinishedError } from '../errors/auction-already-finished-error'

export interface ICloseAuctionUseCaseRequest {
  licensePlate: string
}

export type ICloseAuctionUseCaseResponse = Either<
  ResourceNotFoundError | AuctionAlreadyFinishedError,
  {
    car: Car
    userEmail: string
    bidValue: number
  }
>
