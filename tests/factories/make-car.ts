import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ICarProps } from '@/domain/enterprise/entities/interfaces/ICarProps'
import { Car } from '@/domain/enterprise/entities/car'

export function makeCar(
  override: Partial<ICarProps> = {},
  id?: UniqueEntityID,
) {
  const car = Car.create(
    {
      name: faker.person.fullName(),
      licensePlate: faker.vehicle.vrm(),
      brand: faker.vehicle.manufacturer(),
      category: faker.vehicle.model(),
      year: faker.number.int({ min: 1970, max: 2022 }),
      specifications: faker.vehicle.vehicle(),
      initialBid: faker.number.int({ min: 1, max: 99999999 }),
      ...override,
    },
    id,
  )

  return car
}
