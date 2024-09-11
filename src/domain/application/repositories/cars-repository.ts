import { Car } from '@/domain/enterprise/entities/car'
import { Bids } from '@/domain/enterprise/entities/interfaces/ICarProps'

export interface ICarsRepository {
  create(car: Car): Promise<void>
  findByLicensePlate(licensePlate: string): Promise<Car | null>
  registerBid(licensePlate: string, bid: Bids): Promise<void>
  closeAuction(car: Car): Promise<void>
}
