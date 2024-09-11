import { GetCarAuctionUseCase } from '@/domain/application/use-cases/get-car-auction'
import { MongoCarsRepository } from '@/infra/database/mongo/repositories/mongo-cars-repository'

export function makeGetCarAuctionUseCase() {
  const carsRepository = new MongoCarsRepository()
  const getCarAuctionUseCase = new GetCarAuctionUseCase(carsRepository)

  return getCarAuctionUseCase
}
