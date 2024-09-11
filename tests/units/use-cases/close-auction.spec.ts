import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CloseAuctionUseCase } from '@/domain/application/use-cases/close-auction'
import { AuctionAlreadyFinishedError } from '@/domain/application/use-cases/errors/auction-already-finished-error'
import { makeCar } from 'tests/factories/make-car'
import { InMemoryCarsRepository } from 'tests/repositories/in-memory-cars-repository'

let inMemoryCarsRepository: InMemoryCarsRepository
let sut: CloseAuctionUseCase

describe('Close Auction Use Case', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    sut = new CloseAuctionUseCase(inMemoryCarsRepository)
  })

  it('should be able to close an auction', async () => {
    const licensePlate = 'license plate test'
    const userEmailWinner = 'testing@test.com'
    const bidWinner = 100000

    const car = makeCar({
      licensePlate,
      bids: [
        {
          userEmail: userEmailWinner,
          bid: bidWinner,
        },
        {
          userEmail: 'newemail@test.com',
          bid: 1000,
        },
        {
          userEmail: 'anotheremail@test.com',
          bid: 45678,
        },
      ],
    })

    await inMemoryCarsRepository.create(car)

    const result = await sut.execute({
      licensePlate,
    })

    car.isAuctionFinished = true

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      car: inMemoryCarsRepository.items[0],
      userEmail: userEmailWinner,
      bidValue: bidWinner,
    })
  })

  it('should not be able to close an auction if car does not exist', async () => {
    const result = await sut.execute({
      licensePlate: 'license plate test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to close an already finished auction', async () => {
    const licensePlate = 'license plate test'

    const car = makeCar({
      licensePlate,
      isAuctionFinished: true,
    })

    await inMemoryCarsRepository.create(car)

    const result = await sut.execute({
      licensePlate: 'license plate test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AuctionAlreadyFinishedError)
  })
})
