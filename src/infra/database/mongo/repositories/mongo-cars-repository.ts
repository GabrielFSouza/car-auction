import { Collection } from 'mongodb'
import { ICarsRepository } from '@/domain/application/repositories/cars-repository'
import {
  Bids,
  ICarProps,
} from '@/domain/enterprise/entities/interfaces/ICarProps'
import { Car } from '@/domain/enterprise/entities/car'
import { MongoService } from '../mongo-service'
import { env } from '@/core/env'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongoCarsRepository implements ICarsRepository {
  private carsCollection: Collection<ICarProps>

  private mongo: MongoService

  constructor() {
    const { CARS_COLLECTION } = env

    this.mongo = MongoService.getInstance()

    this.carsCollection =
      this.mongo.databaseInstance.collection<ICarProps>(CARS_COLLECTION)

    this.carsCollection.createIndex({ licensePlate: 1 }, { unique: true })
  }

  async create(car: Car): Promise<void> {
    await this.carsCollection.insertOne({
      name: car.name,
      brand: car.brand,
      licensePlate: car.licensePlate,
      year: car.year,
      category: car.category,
      specifications: car.specifications,
      isAuctionFinished: car.isAuctionFinished,
      initialBid: car.initialBid,
      bids: car.bids,
      createdAt: car.createdAt,
    })
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const dbCar = await this.carsCollection.findOne({ licensePlate })

    if (!dbCar) {
      return null
    }

    const id = new UniqueEntityID(dbCar._id.toString())

    const car = Car.create(dbCar, id)

    return car
  }

  async registerBid(licensePlate: string, bid: Bids): Promise<void> {
    await this.carsCollection.updateOne(
      { licensePlate },
      {
        $push: {
          bids: bid,
        },
      },
    )
  }

  async closeAuction(car: Car): Promise<void> {
    await this.carsCollection.updateOne(
      { licensePlate: car.licensePlate },
      {
        $set: {
          isAuctionFinished: car.isAuctionFinished,
        },
      },
    )
  }
}
