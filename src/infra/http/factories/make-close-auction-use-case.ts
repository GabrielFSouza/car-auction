import { CloseAuctionUseCase } from '@/domain/application/use-cases/close-auction'
import { MongoCarsRepository } from '@/infra/database/mongo/repositories/mongo-cars-repository'

export function makeCloseAuctionUseCase() {
  const carsRepository = new MongoCarsRepository()
  const closeAuctionUseCase = new CloseAuctionUseCase(carsRepository)

  return closeAuctionUseCase
}
