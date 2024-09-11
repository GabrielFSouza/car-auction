import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetCarAuctionUseCase } from '@/domain/application/use-cases/get-car-auction'
import { makeCar } from 'tests/factories/make-car'
import { InMemoryCarsRepository } from 'tests/repositories/in-memory-cars-repository'

let inMemoryCarsRepository: InMemoryCarsRepository
let sut: GetCarAuctionUseCase

describe('Get Car Auction Use Case', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    sut = new GetCarAuctionUseCase(inMemoryCarsRepository)
  })

  it('should be able to get a car auction', async () => {
    const licensePlate = 'license plate test'

    const car = makeCar({
      licensePlate,
    })

    await inMemoryCarsRepository.create(car)

    const result = await sut.execute({
      licensePlate,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      car: inMemoryCarsRepository.items[0],
    })
  })

  it('should not be able to get an nonexistent car', async () => {
    const result = await sut.execute({
      licensePlate: 'license plate test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
