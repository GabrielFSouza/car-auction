import { ICarsRepository } from '../repositories/cars-repository'
import {
  ICreateCarUseCaseRequest,
  ICreateCarUseCaseResponse,
} from './interfaces/ICreateCarUseCase'
import { left, right } from '@/core/either'
import { CarAlreadyExistsError } from './errors/car-already-exists-error'
import { Car } from '@/domain/enterprise/entities/car'

export class RegisterCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({
    name,
    licensePlate,
    brand,
    category,
    year,
    specifications,
    initialBid,
  }: ICreateCarUseCaseRequest): Promise<ICreateCarUseCaseResponse> {
    const carWithSameLicensePlate =
      await this.carsRepository.findByLicensePlate(licensePlate)

    if (carWithSameLicensePlate) {
      return left(new CarAlreadyExistsError(licensePlate))
    }

    const car = Car.create({
      name,
      licensePlate,
      brand,
      category,
      year,
      specifications,
      initialBid,
    })

    await this.carsRepository.create(car)

    return right({
      car,
    })
  }
}
