import { RegisterBidUseCase } from '@/domain/application/use-cases/register-bid'
import { makeCar } from 'tests/factories/make-car'
import { InMemoryCarsRepository } from 'tests/repositories/in-memory-cars-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AuctionAlreadyFinishedError } from '@/domain/application/use-cases/errors/auction-already-finished-error'

let inMemoryCarsRepository: InMemoryCarsRepository
let sut: RegisterBidUseCase

describe('Register Bid Use Case', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    sut = new RegisterBidUseCase(inMemoryCarsRepository)
  })

  it('should be able to register a bid', async () => {
    const licensePlate = 'license plate test'

    const car = makeCar({
      licensePlate,
    })

    await inMemoryCarsRepository.create(car)

    const result = await sut.execute({
      licensePlate: 'license plate test',
      bid: {
        userEmail: 'testing@test.com',
        bid: 1000,
      },
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      car: inMemoryCarsRepository.items[0],
    })
  })

  it('should not be able to register a bid if car does not exist', async () => {
    const result = await sut.execute({
      licensePlate: 'license plate test',
      bid: {
        userEmail: 'testing@test.com',
        bid: 1000,
      },
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to register a bid if auction for that car is closed', async () => {
    const licensePlate = 'license plate test'

    const car = makeCar({
      licensePlate,
      isAuctionFinished: true,
    })

    await inMemoryCarsRepository.create(car)

    const result = await sut.execute({
      licensePlate: 'license plate test',
      bid: {
        userEmail: 'testing@test.com',
        bid: 1000,
      },
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AuctionAlreadyFinishedError)
  })
})
