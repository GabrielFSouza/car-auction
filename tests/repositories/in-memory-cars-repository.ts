import { ICarsRepository } from '@/domain/application/repositories/cars-repository'
import { Car } from '@/domain/enterprise/entities/car'
import { Bids } from '@/domain/enterprise/entities/interfaces/ICarProps'

export class InMemoryCarsRepository implements ICarsRepository {
  public items: Car[] = []

  async create(car: Car) {
    this.items.push(car)
  }

  async findByLicensePlate(licensePlate: string) {
    const car = this.items.find((item) => item.licensePlate === licensePlate)

    if (!car) {
      return null
    }

    return car
  }

  async registerBid(licensePlate: string, bid: Bids) {
    const carIndex = this.items.findIndex(
      (item) => item.licensePlate === licensePlate,
    )

    this.items[carIndex].bids.push(bid)
  }

  async closeAuction(car: Car): Promise<void> {
    const carIndex = this.items.findIndex(
      (item) => item.licensePlate === car.licensePlate,
    )

    this.items[carIndex].isAuctionFinished = true
  }
}
