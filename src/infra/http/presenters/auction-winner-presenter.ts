import { Car } from '@/domain/enterprise/entities/car'

export class AuctionWinnerPresenter {
  static toHTTP(car: Car, userEmail: string, bidValue: number) {
    return {
      name: car.name,
      licensePlate: car.licensePlate,
      brand: car.brand,
      category: car.category,
      year: car.year,
      specifications: car.specifications,
      initialBid: car.initialBid,
      auctionWinner: userEmail,
      auctionWinnerBid: bidValue,
    }
  }
}
