import { RegisterCarUseCase } from '@/domain/application/use-cases/register-car'
import { MongoCarsRepository } from '@/infra/database/mongo/repositories/mongo-cars-repository'

export function makeRegisterCarUseCase() {
  const carsRepository = new MongoCarsRepository()
  const registerCarUseCase = new RegisterCarUseCase(carsRepository)

  return registerCarUseCase
}
