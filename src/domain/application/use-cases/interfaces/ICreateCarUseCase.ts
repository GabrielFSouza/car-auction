import { Either } from '@/core/either'
import { CarAlreadyExistsError } from '../errors/car-already-exists-error'
import { Car } from '@/domain/enterprise/entities/car'

export interface ICreateCarUseCaseRequest {
  name: string
  licensePlate: string
  year: number
  brand: string
  category: string
  specifications: string
  initialBid: number
}

export type ICreateCarUseCaseResponse = Either<
  CarAlreadyExistsError,
  {
    car: Car
  }
>
