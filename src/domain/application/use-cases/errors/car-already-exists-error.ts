import { UseCaseError } from '@/core/errors/use-case-error'

export class CarAlreadyExistsError extends Error implements UseCaseError {
  constructor(licensePlate: string) {
    super(`Car with licensePlate ${licensePlate} already exists`)
  }
}
