import { RegisterBidUseCase } from '@/domain/application/use-cases/register-bid'
import { MongoCarsRepository } from '@/infra/database/mongo/repositories/mongo-cars-repository'

export function makeRegisterBidUseCase() {
  const carsRepository = new MongoCarsRepository()
  const registerCarUseCase = new RegisterBidUseCase(carsRepository)

  return registerCarUseCase
}
