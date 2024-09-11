import { CarAlreadyExistsError } from '@/domain/application/use-cases/errors/car-already-exists-error'
import { RegisterCarUseCase } from '@/domain/application/use-cases/register-car'
import { InMemoryCarsRepository } from 'tests/repositories/in-memory-cars-repository'

let inMemoryCarsRepository: InMemoryCarsRepository
let sut: RegisterCarUseCase

describe('Register Car Use Case', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    sut = new RegisterCarUseCase(inMemoryCarsRepository)
  })

  it('should be able to register a car', async () => {
    const result = await sut.execute({
      name: 'naming test',
      brand: 'brand test',
      category: 'category test',
      licensePlate: 'license plate test',
      year: 2022,
      specifications: 'specifications test',
      initialBid: 1000,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      car: inMemoryCarsRepository.items[0],
    })
  })

  it('should not be able to register a car with same license plate', async () => {
    const licensePlate = 'license plate test'

    await sut.execute({
      name: 'naming test',
      brand: 'brand test',
      category: 'category test',
      licensePlate,
      year: 2022,
      specifications: 'specifications test',
      initialBid: 1000,
    })

    const result = await sut.execute({
      name: 'naming test',
      brand: 'brand test',
      category: 'category test',
      licensePlate,
      year: 2022,
      specifications: 'specifications test',
      initialBid: 1000,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(CarAlreadyExistsError)
  })
})
